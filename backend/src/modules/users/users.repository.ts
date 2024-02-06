import { Injectable } from '@nestjs/common';
import { slonik, sql } from '@config/db';
import { z } from 'zod';

const usersObject = z.object({
  user_id: z.number(),
});

@Injectable()
export class UsersRepository {
  /**
   * Get list of users
   */
  async get() {
    const query = sql.type(usersObject)`SELECT user_id FROM users`;

    return (await slonik).query(query);
  }
}
