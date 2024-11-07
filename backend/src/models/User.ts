import { eq } from 'drizzle-orm';
import { db } from '../db';
import { InsertUser, users } from '../db/schema';

class User {
  static async getUserByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  static async createUser(userData: InsertUser) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
}

export default User;
