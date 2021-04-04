/* ---------------------------------
Notes
--------------------------------- */

import { Button, SecondaryButton } from "../components/Button";
import { Grid } from "../components/Grid";
import { Sidebar } from "../components/Sidebar";
import { List, ListItem } from "../components/List";
import classnames from "classnames";
import { Actionable } from "../components/Actionable";
import { ContentArea } from "../components/ContentArea";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import * as React from "react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { SecondaryText } from "../components/SecondaryText";
import ReactMde, { ReactMdeProps } from "react-mde";
import { Input } from "../components/Input";
import * as ReactMarkdown from "react-markdown";
import { Form } from "../components/Form";
import { ThemeContext } from "styled-components";
import { ContentEditor } from "../components/ContentEditor";
import { Spinner } from "../components/Spinner/Spinner";
import { Note } from "../components/Note";
import Header from "../components/Header";
import { TOKEN_STORAGE_KEY } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { signOutUser } from "../state/auth";
import {
  deleteNotes,
  getNotes,
  postNotes,
  putNotes,
} from "../state/notes/thunks";
import { NewNotes, Notes as _Notes } from "../gen/models";

// types
enum LocalStates {
  creating = "creating",
  error = "error",
  loading = "loading",
  reading = "reading",
  updating = "updating",
}

type EditorTabs = ReactMdeProps["selectedTab"];

// CancelButton
const CancelButton: React.FC<{ handler: () => void }> = ({ handler }) => (
  <SecondaryButton style={{ marginRight: 16 }} onClick={handler}>
    Cancel
  </SecondaryButton>
);

// _Form
const _Form: React.FC<{
  values;
  changeHandler: (item: string) => (e: React.ChangeEvent | string) => void;
  tabHandler: {
    selectedTab: EditorTabs;
    onTabChange: React.SetStateAction<EditorTabs>;
  };
}> = ({ values, changeHandler, tabHandler }) => (
  <Form>
    <Input
      value={values?.title}
      id={"title"}
      type="text"
      placeholder={"Title"}
      onChange={changeHandler("title")}
    />

    <ReactMde
      value={values?.body}
      onChange={changeHandler("body")}
      generateMarkdownPreview={markdown =>
        Promise.resolve(<ReactMarkdown source={markdown} />)
      }
      {...tabHandler}
    />
  </Form>
);

// Notes
export default function Notes() {
  const INITIAL_CONTENT: Partial<_Notes> | Partial<NewNotes> = {
    title: "",
    body: "",
  };

  // state
  const [state, setState] = useState<LocalStates>(LocalStates.loading);
  const [activeTab, setActiveTab] = useState<EditorTabs>("write");
  const [_notes, _setNotes] = useState([]);

  const [currentNote, setCurrentNote] = useState<
    _Notes | Record<string, string | number>
  >({});

  const [content, setContent] = useState<Partial<_Notes> | Partial<NewNotes>>(
    INITIAL_CONTENT
  );

  // hooks
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector(state => state.notes);
  const { user, jwt: token } = useAppSelector(state => state.auth);
  const themeContext = useContext(ThemeContext);

  // resetForm
  function resetForm() {
    setContent(INITIAL_CONTENT);
    setActiveTab("write");
  }

  // handleCancel
  function handleCancel() {
    resetForm();
    setState(LocalStates.reading);
  }

  /**
   * handleChange
   * @param item
   */
  function handleChange(
    item: string
  ): (arg: React.ChangeEvent<HTMLInputElement> | string) => void {
    return function (eventOrValue) {
      typeof eventOrValue === "object" && eventOrValue.persist?.();

      setContent(prevContent => ({
        ...prevContent,
        [item]:
          typeof eventOrValue === "object"
            ? eventOrValue.target?.value
            : eventOrValue,
      }));
    };
  }

  /**
   * handleSubmit
   * @param e
   */
  async function handleSubmit(e: React.MouseEvent): Promise<undefined | void> {
    e.preventDefault();

    dispatch(
      postNotes({
        note: {
          ...content,
          author: user?._id,
        },
        token,
      })
    ).then(fulfilledAction => {
      const { payload: newNote } = fulfilledAction;

      handleCancel();

      setCurrentNote((newNote as _Notes) ?? [...notes].shift());
    });
  }

  /**
   * handleUpdate
   * @param note
   */
  function handleUpdate(
    note: _Notes
  ): undefined | ((e: React.MouseEvent) => void) {
    return async function (e) {
      e.preventDefault(); // TODO do we need this?

      dispatch(
        putNotes({
          id: note.id,
          newContent: {
            ...content,
            // author: user?._id,
          },
          token,
        })
      ).then(() => {
        handleCancel();
      });
    };
  }

  /**
   * handleDelete
   * @param note
   */
  async function handleDelete(note: _Notes): Promise<void | undefined> {
    const id = note?.id;

    dispatch(
      deleteNotes({
        id: note.id,
        token,
      })
    ).then(() => {
      const i = notes.findIndex(note => note?.id === id);

      if (i === 0) {
        setCurrentNote(notes[i + 1] ?? [...notes].shift());
      } else {
        setCurrentNote(notes[i - 1] ?? [...notes].shift());
      }
    });
  }

  /**
   * handleNoteSelection
   * @param note
   */
  function handleNoteSelection(note: _Notes): () => void {
    return function () {
      setCurrentNote(note);

      // resets the app to idle state if
      // we click away from another state
      if (state !== LocalStates.reading) {
        resetForm();
        setState(LocalStates.reading);
      }
    };
  }

  /**
   * renderBody
   * @param state
   */
  function renderBody(state: LocalStates): ReactNode {
    switch (state) {
      // idle
      case LocalStates.reading:
        // TODO blank slate
        return !notes?.length ? (
          <span>No notes!</span>
        ) : (
          <Note
            note={currentNote}
            actions={[
              {
                name: "Edit",
                icon: "edit",
                callback: () => {
                  setContent({
                    title: currentNote.title,
                    body: currentNote.body,
                  });

                  setState(LocalStates.updating);
                },
              },
              {
                name: "Delete",
                icon: "remove_circle_outline",
                callback: () => handleDelete(currentNote),
              },
            ]}
          />
        );

      // creating
      case LocalStates.creating:
        return (
          <ContentEditor>
            <_Form
              values={content}
              changeHandler={handleChange}
              tabHandler={{
                selectedTab: activeTab,
                onTabChange: setActiveTab,
              }}
            />
          </ContentEditor>
        );

      // updating
      case LocalStates.updating:
        return (
          <ContentEditor note={currentNote}>
            <_Form
              values={content}
              changeHandler={handleChange}
              tabHandler={{
                selectedTab: activeTab,
                onTabChange: setActiveTab,
              }}
            />
          </ContentEditor>
        );

      // error
      case LocalStates.error:
        return "☢️ ERROR!";

      // default
      case LocalStates.loading:
      default:
        return <Spinner />;
    }
  }

  //
  function handleLogout() {
    dispatch(signOutUser());
    sessionStorage?.removeItem?.(TOKEN_STORAGE_KEY);
  }

  // useEffect
  // useEffect(() => {
  //   if (!Object.keys(currentNote).length && state !== LocalStates.creating) {
  //     console.count("FX executing");
  //
  //     setState(LocalStates.loading);
  //
  //     notes?.length && setCurrentNote([...notes]?.shift());
  //
  //     setState(LocalStates.reading);
  //   }
  // }, [notes]);

  // useEffect
  // useEffect(() => {
  //   const JWT = sessionStorage?.getItem?.(TOKEN_STORAGE_KEY);
  //
  //   if (!user || !JWT) {
  //     router.push("/");
  //   }
  // }, [user]);

  useEffect(() => {
    // TODO try to centralize
    const JWT = sessionStorage?.getItem?.(TOKEN_STORAGE_KEY);
    const _token = token ?? JWT;

    dispatch(
      getNotes({
        authorId: user?.id,
        token: _token,
      })
    ).then(() => setState(LocalStates.reading));
  }, []);

  return (
    <Layout marginTop={60}>
      <Header>
        <SecondaryButton
          type={"button"}
          variant={"small"}
          onClick={handleLogout}
        >
          Logout {user?.username || user?.email}
        </SecondaryButton>
      </Header>

      <Grid
        cols={"260px 1fr"}
        gap={"0"}
        height={`calc(100vh - (${
          themeContext?.navHeight + themeContext?.footerHeight
        }px))`}
      >
        <Sidebar>
          {/*<Input />*/}

          <List>
            {notes?.map?.((note, i: number) => (
              <ListItem
                key={i}
                className={classnames({
                  selected: note?.id === currentNote?._id,
                })}
              >
                <Actionable onClick={handleNoteSelection(note)}>
                  <span className={"title"}>{note?.title}</span>
                  <span className={"timestamp"}>
                    {new Date(note?.published_at).toLocaleString()}
                  </span>
                </Actionable>
              </ListItem>
            ))}
          </List>
        </Sidebar>

        <ContentArea>{renderBody(state)}</ContentArea>
      </Grid>

      <Footer>
        <SecondaryText className="SecondaryText">
          {notes?.length} NOTES
        </SecondaryText>{" "}
        <div className="footerControls">
          {/* READING */}
          {state === LocalStates.reading ? (
            <Button
              onClick={() => {
                resetForm();
                setState(LocalStates.creating);
              }}
            >
              New Note
            </Button>
          ) : // CREATING
          state === LocalStates.creating ? (
            <>
              <CancelButton handler={handleCancel} />

              <Button onClick={handleSubmit}>Submit</Button>
            </>
          ) : // UPDATING
          state === LocalStates.updating ? (
            <>
              <CancelButton handler={handleCancel} />

              <Button onClick={handleUpdate(currentNote)}>Save</Button>
            </>
          ) : null}
        </div>
      </Footer>
    </Layout>
  );
}

// getServerSideProps
// export async function getServerSideProps() {
//   try {
//     const { data } = await axios.get("http://localhost:1337/notes", {
//       headers: {
//         Authorization: "Bearer " + JWT,
//       },
//     });
//
//     return {
//       props: { notes: data ?? [] },
//     };
//   } catch (err) {
//     console.error(err);
//
//     return {
//       props: { notes: [] },
//     };
//   }
// }
