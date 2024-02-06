import { sql } from 'slonik';
import { slonik } from '../../config/db';

async function createTable() {
  try {
    const result = (await slonik).query(sql.unsafe`
      CREATE TABLE users (user_id SERIAL PRIMARY KEY);
    `);

    console.log(`Table created successfully: ${result}`);
  } catch (err) {
    console.error(`Error creating table: ${err}`);
  } finally {
    (await slonik).end();
  }
}

createTable();
