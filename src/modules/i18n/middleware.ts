import createMiddleware from 'next-intl/middleware';
import { routing } from './utils/routing';

const intlMiddleware = createMiddleware(routing);

export { intlMiddleware };
