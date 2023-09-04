import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}
// name price description image category

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
  let id = 0;
  db.transaction((tx) => {
    try {
      tx.executeSql(
        `INSERT INTO menuitems (id,uuid,title,price,description,image,category) VALUES ${menuItems
          .map(
            (item) =>
              `('${item.id}','${item.id}','${item.name}','${item.price}','${item.description}','${item.image}','${item.category}')`
          )
          .join(", ")} `
      );
    } catch (e) {
      console.log(e);
    }
  });
}

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
