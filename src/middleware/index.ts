import { sequence } from 'astro/middleware';
import { cookiesCheck } from './middleware';

export const onRequest = sequence(cookiesCheck);
