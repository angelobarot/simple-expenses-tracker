import { sql } from 'slonik';
import { slonik } from '../../config/db';

async function createTable() {
  try {
    const result = (await slonik).query(sql.unsafe`
      CREATE TABLE EXPENSES (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        date DATE NOT NULL,
        type VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL
      );

      CREATE INDEX idx_user_id ON expenses(user_id);
    `);

    console.log(`Table created successfully: ${result}`);
  } catch (err) {
    console.error(`Error creating table: ${err}`);
  } finally {
    (await slonik).end();
  }
}

createTable();
