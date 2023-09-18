import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });
export const putDb = async (content) => {
  console.log("PUT to database");
  const contactDB = await openDB("jate", 1);
  const txt = contactDB.transaction("jate", "readwrite");

  const store = txt.objectStore("jate");

  const request = store.put({ value: content });

  const result = await request;
  console.log("Data Saved!", result);
};
export const getDb = async () => {
  console.log("GET from database");
  const contactDB = await openDB("jate", 1);
  const txt = contactDB.transaction("jate", "readonly");

  const store = txt.objectStore("jate");

  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();
