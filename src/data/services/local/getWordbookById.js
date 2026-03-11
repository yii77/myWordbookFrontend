import db from '../../database/db'; // 你现有的 db.js

export async function getWordbookById(id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT _id FROM books WHERE _id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}
