import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from './utils';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

// export function saveMenuItem(uuid, title, price, category) {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'insert into menuitems (uuid, title, price, category) values (?, ?, ?, ?);',
//         [uuid, title, price, category],
//         (_, result) => {
//           console.log('resolved');
//           resolve(result);
//         },
//         (_, error) => {
//           console.log('rejected');
//           reject(error);
//         }
//       );
//     },
//     reject,
//     resolve
//     );
// });
// }

// export async function saveMenuItems(menuItems) {
//     for (const it of menuItems) {
//       try {
//         await saveMenuit(it.id, it.title, it.price, it.category);
//         // console.log(`Inserted it: ${it.title}`);
//       } catch (error) {
//         console.error(`Error inserting it: ${it.title}`);
//         console.error(error);
//       }
//     }
//   }

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    try {
      tx.executeSql(
        `INSERT INTO menuitems (id,uuid,title,price,category) VALUES ${menuItems
          .map(
            (item) =>
              `('${item.id}','${item.id}','${item.title}','${item.price}','${item.key}')`
          )
          .join(", ")} `
      );
    } catch (e) {
      console.log(e);
    }
  });
}

/**
 * 4. Implement a transaction that executes a SQL statement to filter the menu by 2 criteria:
 * a query string and a list of categories.
 *
 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */
// export async function filterByQueryAndCategories(query, activeCategories) {
//   // return new Promise((resolve, reject) => {
//   //   resolve(SECTION_LIST_MOCK_DATA);
//   // });
//   return new Promise((resolve, reject) => {
//     db.transaction(
//       (tx) => {
//         const categoryConditions = activeCategories.map(category => `category = ?`).join(' OR ');
//         const queryCondition = `title LIKE '%' || ? || '%'`;

//         const conditions = [];
//         if (activeCategories.length > 0) {
//           conditions.push(`(${categoryConditions})`);
//         }
//         if (query) {
//           conditions.push(`(${queryCondition})`);
//         }

//         let conditionString = conditions.join(' AND ');

//         let params = [];
//         if (activeCategories.length > 0) {
//           params = params.concat(activeCategories);
//         }
//         if (query) {
//           params.push(query);
//         }

//         const sql = `SELECT * FROM menuitems WHERE ${conditionString};`;

//         tx.executeSql(
//           sql,
//           params,
//           (_, result) => {
//             resolve(result);
//           },
//           (_, error) => {
//             reject(error);
//           }
//         );
//       },
//       reject,
//       resolve
//     );
//   });
// }
export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(" or ")}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where (title like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(" or ")})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    }
  });
}
