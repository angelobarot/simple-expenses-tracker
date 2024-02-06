import { createPool, createSqlTag } from 'slonik';
import { z } from 'zod';

const sql = createSqlTag({
  typeAliases: {
    void: z.object({}).strict(),
    user_id: z.object({
      user_id: z.number(),
    }),
    date: z.object({
      date: z.date(),
    }),
    type: z.object({
      type: z.string(),
    }),
    amount: z.object({
      amount: z.number(),
    }),
  },
});

export const slonikConfig = {
  clientConfiguration: {
    connectionString:
      process.env.DATABASE_URL ||
      'postgres://tracker:tracker@postgres:5432/tracker',
  },
};

export const slonik = createPool(
  slonikConfig.clientConfiguration.connectionString,
);

export { sql };
