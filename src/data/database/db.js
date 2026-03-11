import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('wordbook.db');

export default db;

export function initDB() {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS books (
        _id TEXT PRIMARY KEY,
        name TEXT,
        owner TEXT,
        source_type TEXT,
        category TEXT,
        subcategory TEXT,
        book_word_count INTEGER
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS words (
        _id TEXT PRIMARY KEY,
        word TEXT,
        book_id TEXT,
        order_index INTEGER,
        unit_id TEXT,
        title TEXT,
        definition TEXT
      );
    `);
  });
}
