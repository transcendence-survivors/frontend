import createMiddleware from 'next-intl/middleware';
import { routing } from './utils/routing';

export const intlMiddleware = createMiddleware(routing);
