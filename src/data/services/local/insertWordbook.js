import db from '../../database/db';

export function insertWordbook(book) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `
        INSERT OR REPLACE INTO books
        (_id,name,owner,source_type,category,subcategory,book_word_count)
        VALUES (?,?,?,?,?,?,?)
        `,
        [
          book._id,
          book.name,
          book.owner ?? null,
          book.source_type ?? null,
          book.category ?? null,
          book.subcategory ?? null,
          book.book_word_count ?? 0,
        ],
        () => resolve(),
        (_, error) => reject(error),
      );
    });
  });
}
