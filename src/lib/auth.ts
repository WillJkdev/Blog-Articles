import { Lucia, TimeSpan } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db, Session, User } from 'astro:db';

const adapter = new DrizzleSQLiteAdapter(
  db as any,
  Session as any,
  User as any
);
// console.log('ADAPTER EN BACKEND prueba', adapter);
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'auth-session-blog',
    attributes: {
      // set to `true` when using HTTPS

      secure: import.meta.env.PROD,
    },
  },
  sessionExpiresIn: new TimeSpan(2, 'd'),
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
interface DatabaseUserAttributes {
  username: string;
  email: string;
}
