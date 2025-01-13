import { lucia } from '@/lib/auth';
import { defineMiddleware } from 'astro:middleware';

export const cookiesCheck = defineMiddleware(async (context, next) => {
  // console.log('Middleware ejecutado');

  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
  // console.log('Session ID:', sessionId);

  if (!sessionId) {
    context.locals.user = null;
    context.locals.session = null;
    // console.log('No hay sesión. Continuando...');
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  // console.log('Sesión validada:', { session, user });

  if (session) {
    // Si ya existe una sesión activa, redirigir a otra página (ejemplo: "/")
    if (context.url.pathname === '/signin') {
      // console.log('Usuario ya tiene sesión activa. Redirigiendo...');
      return context.redirect('/');
    }
    if (context.url.pathname === '/signup') {
      // console.log('Usuario ya tiene sesión activa. Redirigiendo...');
      return context.redirect('/');
    }

    // Si la sesión está fresca, renovamos la cookie
    if (session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      // console.log('Sesión fresca. Cookie renovada.');
    }
  } else {
    // Si no hay sesión válida, limpiamos la cookie
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    // console.log('Sesión inválida. Cookie limpiada.');
  }

  context.locals.session = session;
  context.locals.user = user;
  return next();
});
