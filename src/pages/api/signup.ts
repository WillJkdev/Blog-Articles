import type { APIContext } from 'astro';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db, User, eq } from 'astro:db';
import { lucia } from '@/lib/auth';
export async function POST(context: APIContext): Promise<Response> {
  // //Parse the form data
  // const formData = await context.request.formData();
  // const username = formData.get('username');
  // const password = formData.get('password');
  // const email = formData.get('email');
  const body = await context.request.json();
  const { username, email, password } = body;

  //Validate the form data
  if (!username || !password || !email) {
    return new Response('Username and Password are required', { status: 400 });
  }
  if (typeof username !== 'string' || username.length < 4) {
    return new Response('Username must be at least 4 characters long', {
      status: 400,
    });
  }

  if (typeof password !== 'string' || password.length < 4) {
    return new Response('Password must be at least 4 characters long', {
      status: 400,
    });
  }
  if (typeof email !== 'string' || email.length < 4) {
    return new Response('Email must be at least 4 characters long', {
      status: 400,
    });
  }

  // Check if user already exists in db
  const foundUser = (
    await db.select().from(User).where(eq(User.username, email))
  ).at(0);
  if (foundUser) {
    return new Response('User already exists', { status: 400 });
  }

  // Check if email already exists in db
  const foundEmail = (
    await db.select().from(User).where(eq(User.email, email))
  ).at(0);
  if (foundEmail) {
    return new Response('Email already exists', { status: 400 });
  }

  // Insert user into db
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);

  await db.insert(User).values([
    {
      id: userId,
      username,
      email,
      password: hashedPassword,
    },
  ]);

  // Generate session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect('/');
}
