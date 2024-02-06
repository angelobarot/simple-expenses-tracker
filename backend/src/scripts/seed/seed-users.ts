import * as fs from 'fs';
import * as path from 'path';
import { sql, SqlFragment } from 'slonik';
import { slonik } from '../../config/db';

const csvPath = path.join(__dirname, '../data/billroo-users.csv');

async function seedTable() {
  try {
    const csvData = fs.readFileSync(csvPath, 'utf-8');

    const rows = csvData.split('\n').map((line) => line.split(','));

    rows.shift();

    const dataFragments: SqlFragment[] = rows.map(
      (row) =>
        sql.unsafe`(${sql.join(
          row.map((value) => sql.unsafe`${value}`),
          sql.fragment`,`,
        )})`,
    );

    const result = (await slonik).query(sql.unsafe`
      INSERT INTO users (user_id)
      VALUES ${sql.join(dataFragments, sql.fragment`,`)}
    `);

    console.log(`Table created successfully: ${result}`);
  } catch (err) {
    console.error(`Error creating table: ${err}`);
  } finally {
    (await slonik).end();
  }
}

seedTable();
