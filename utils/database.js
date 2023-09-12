import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lon REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sql = `INSERT INTO places (title, imageUri, address, lat, lon) VALUES (?, ?, ?, ?, ?)`;
      const values = [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lon,
      ];

      tx.executeSql(
        sql,
        values,
        (_, result) => {
          console.log("Insertion result:", result);
          resolve(result);
        },
        (_, error) => {
          console.error("Insertion error:", error);
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function logColumnNames() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      // Query the table schema to retrieve column names
      tx.executeSql(
        "PRAGMA table_info(places)",
        [],
        (_, result) => {
          const columnNames = result.rows._array.map((row) => row.name);
          console.log("Column Names:", columnNames);
          resolve(columnNames);
        },
        (_, error) => {
          console.error("Error querying table schema:", error);
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function deleteAndRecreateTable() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      // Step 1: Delete the existing "places" table if it exists
      tx.executeSql(
        "DROP TABLE IF EXISTS places",
        [],
        (_, result) => {
          console.log("Deleted existing 'places' table");

          // Step 2: Create a new "places" table with the "lng" column
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lon REAL NOT NULL
              )`,
            [],
            () => {
              console.log("Created new 'places' table with 'lon' column");
              resolve();
            },
            (_, error) => {
              console.error("Error creating new 'places' table:", error);
              reject(error);
            }
          );
        },
        (_, error) => {
          console.error("Error deleting 'places' table:", error);
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                { address: dp.address, lat: dp.lat, lon: dp.lon },
                dp.id
              )
            );
          }

          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id= ?`,
        [id],
        (_, result) => {
          console.log(result);
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
