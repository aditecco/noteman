/* ---------------------------------
Home
--------------------------------- */

import Head from 'next/head'
import {connectToDatabase} from '../util/mongodb'
import {Navbar} from "../components/Navbar";
import {Button, SecondaryButton} from "../components/Button";
import {Grid} from "../components/Grid";
import {Sidebar} from "../components/Sidebar";
import {List, ListItem} from "../components/List";
import classnames from "classnames";
import {Actionable} from "../components/Actionable";
import {ContentArea} from "../components/ContentArea";
import {Footer} from "../components/Footer";
import {Layout} from "../components/Layout";
import * as React from "react";
import {SecondaryText} from "../components/SecondaryText";
import Logo from "../components/Logo";
import ReactMde, {ReactMdeProps} from "react-mde";
import {Input} from "../components/Input";
import * as ReactMarkdown from "react-markdown";
import {Form} from "../components/Form";
import {INote, UserGeneratedNoteContent, } from "../types";
import {ReactNode, useContext, useEffect, useState} from "react";
import {ThemeContext} from "styled-components";
import {ContentEditor} from "../components/ContentEditor";
import {Spinner} from "../components/Spinner/Spinner";
import {Note} from "../components/Note";



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
  values: UserGeneratedNoteContent;
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



export default function Home({isConnected}) {


  const INITIAL_CONTENT: UserGeneratedNoteContent = { title: "", body: "" };

  // state
  const [state, setState] = useState<LocalStates>(LocalStates.loading);
  const [currentNote, setCurrentNote] = useState<
    INote | Record<string, string | number>
    >({});
  const [content, setContent] = useState<UserGeneratedNoteContent>(
    INITIAL_CONTENT
  );
  const [activeTab, setActiveTab] = useState<EditorTabs>("write");

  // DB subs
  const [{ user, notes, loading }, _setState] = useState({user: '', notes: [], loading: false});

  // theme
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
  // function handleSubmit(e: React.MouseEvent): undefined | void {
  //   e.preventDefault();
  //
  //   Meteor.call(
  //     "notes.insert",
  //     content,
  //     // cb
  //     (err: Meteor.Error, result: string) => {
  //       if (err) {
  //         // TODO display an error message
  //
  //         handleCancel();
  //
  //         console.error(err.stack);
  //         throw err;
  //       }
  //
  //       // TODO fix this
  //       const newNote = notes.find(note => note?._id === result);
  //
  //       handleCancel();
  //       setCurrentNote(newNote ?? [...notes].shift());
  //     }
  //   );
  // }
  function handleSubmit() {}

  /**
   * handleUpdate
   * @param note
   */
  // function handleUpdate(
  //   note: INote
  // ): undefined | ((e: React.MouseEvent) => void) {
  //   return function (e) {
  //     e.preventDefault(); // TODO do we need this?
  //
  //     Meteor.call(
  //       "notes.update",
  //       [note?._id, content],
  //       // cb
  //       (err: Meteor.Error) => {
  //         if (err) {
  //           // TODO display an error message
  //
  //           handleCancel();
  //
  //           console.error(err.stack);
  //           throw err;
  //         }
  //
  //         // TODO show a success message
  //         handleCancel();
  //       }
  //     );
  //   };
  // }
  function handleUpdate() {}



  /**
   * handleDelete
   * @param note
   */
  // function handleDelete(note: INote): void | undefined {
  //   const id = note?._id;
  //
  //   Meteor.call("notes.remove", id, (err: Meteor.Error) => {
  //     if (err) {
  //       // TODO display an error message
  //
  //       console.error(err.stack);
  //       throw err;
  //     }
  //
  //     // TODO show a confirmation
  //     const i = notes.findIndex(note => note?._id === id);
  //
  //     if (i === 0) {
  //       setCurrentNote(notes[i + 1] ?? [...notes].shift());
  //     } else {
  //       setCurrentNote(notes[i - 1] ?? [...notes].shift());
  //     }
  //   });
  // }
function handleDelete() {}



  /**
   * handleNoteSelection
   * @param note
   */
  function handleNoteSelection(note: INote): () => void {
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

  // useEffect
  useEffect(() => {
    if (!Object.keys(currentNote).length && state !== LocalStates.creating) {
      console.count("FX executing");

      setState(LocalStates.loading);

      notes?.length && setCurrentNote([...notes]?.shift());

      setState(LocalStates.reading);
    }
  }, [notes]);



  return (

    <Layout marginTop={60}>
      <Navbar>
        <Logo />

        <Button
          type={"button"}
          variant={"small"}
          onClick={() => {}}
        >
          Logout {user?.username}
        </Button>
      </Navbar>

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
            {notes.map((note, i: number) => (
              <ListItem
                key={i}
                className={classnames({
                  selected: note?._id === currentNote?._id,
                })}
              >
                <Actionable onClick={handleNoteSelection(note)}>
                  <span className={"title"}>{note?.title}</span>
                  <span className={"timestamp"}>
                    {new Date(note?.timestamp).toLocaleString()}
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

  )


}

export async function getServerSideProps(context) {
  const {client} = await connectToDatabase()

  const isConnected = await client.isConnected() // Returns true or false

  return {
    props: {isConnected},
  }
}
