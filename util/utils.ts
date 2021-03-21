/* ---------------------------------
Utils
--------------------------------- */

export function rem(target: number, context: number = 16): string {
  return `${target / context}rem`;
}

const URL_FILTER = "";

const replace = () => {};

// concise console.log
export const log = console.log.bind(console);

// concise querySelector
// export const $ = document.querySelector.bind(document);

// buildQuery
export const buildQuery = params =>
  Object.entries(params)
    .map(([param, query]) => `&${param}=${query}`)
    .join("");

// concise localStorage, w/ JSON manipulation included
export const storage = (() => {
  const boundFn = fn => fn.bind(window.localStorage);

  return {
    pull(item) {
      // TODO
      // if no item is passed, return
      // all the content as an array

      try {
        const data = boundFn(window.localStorage.getItem)(item);
        return data && JSON.parse(data);
      } catch (err) {
        console.error(err);
      }
    },
    push(id, data) {
      try {
        data = JSON.stringify(data);
        boundFn(window.localStorage.setItem)(id, data);
      } catch (err) {
        console.error(err);
      }
    },
    destroy() {
      boundFn(window.localStorage.clear)();
    },
  };
})();

// random number
export const rand = () => {
  const number = Math.floor(Math.random() * 10);

  if (!number) {
    return rand();
  } else {
    return number;
  }
};

// capitalize
export function capitalize(word: string): string | undefined {
  const capitalizer = w => w.charAt(0).toUpperCase() + w.slice(1);

  if (!word) return undefined;

  if (word.includes(" ")) {
    return word.split(" ").map(capitalizer).join(" ");
  }

  return capitalizer(word);
}

// filterKeys
export function filterKeys(obj, filtered) {
  return Object.entries(obj).reduce((acc, [k, val]) => {
    if (filtered instanceof Array) {
      !filtered.includes(k) && (acc[k] = val);
    } else {
      k !== filtered && (acc[k] = val);
    }

    return acc;
  }, {});
}

// normalize
export function normalize(data) {
  if (!data) return {};

  return Object.entries(data).reduce((acc, [key, val]) => {
    acc[key.toLowerCase()] = val;
    return acc;
  }, {});
}

/**
 * handles additional classes
 * @usage: className={"SomeClass" + addClasses(className)}
 */
export function addClasses(classes: string) {
  return classes ? " " + classes : "";
}

/**
 * Removes dupes from a dataset
 */
export function removeDuplicates(data: string[]): string[] {
  return [...new Set(data)];
}

/**
 * Truncates text at given length
 */
export function clipText(t: string, maxLength: number = 15) {
  if (t.length < maxLength) return t;

  return t.substring(0, maxLength) + "…";
}

/**
 * Creates bookmark descriptions out of URL slugs (WIP)
 */

export function slugToDesc(url: string): string {
  let desc: string;

  if (url.charAt(url.length - 1) === "/") {
    url = url.substr(0, url.length - 1);
  }

  desc = url
    .replace(URL_FILTER, "")
    .split("/")
    .pop()
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.substring(1))
    .join(" ")
    .replace(".html", "")
    .replace("#", "")
    .replace(/[\d]*/, "");

  return desc || url;
}

/**
 * handleError
 */

// TODO make reusable

// function handleError(error) {
//   const { code, message } = error;

//   switch (code) {
//     case "400": {
//       /**
//        * EMAIL_NOT_FOUND
//        * INVALID_PASSWORD
//        */
//       break;
//     }

//     default: {
//       dispatch(
//         showNotif({
//           message: `${code}: ${message}`,
//           timeOut: 4000,
//         })
//       );

//       log("@Auth", error);
//       break;
//     }
//   }
// }
