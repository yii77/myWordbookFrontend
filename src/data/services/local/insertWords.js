import db from '../../database/db';

export function insertWords(words) {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        words.forEach(w => {
          tx.executeSql(
            `
            INSERT OR REPLACE INTO words
            (_id, word, book_id, order_index, unit_id, title, definition)
            VALUES (?,?,?,?,?,?,?)
            `,
            [
              w._id,
              w.word,
              w.book_id,
              w.order,
              w.unit_id,
              w.title,
              JSON.stringify(w.definition),
            ],
          );
        });
      },
      error => reject(error),
      () => resolve(),
    );
  });
}
