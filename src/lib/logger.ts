/**
 * Minimal console-backed logger.
 *
 * This replaces pino, which cannot run on Cloudflare Workers: its
 * `sonic-boom` transport writes to a file descriptor, and `unenv`'s `fs`
 * shim throws "fs.write is not implemented yet!". `console` is captured by
 * Workers' own logging, so nothing is lost.
 */
const format = (args: unknown[]): unknown[] =>
  args.map(arg => (typeof arg === 'object' && arg !== null ? JSON.stringify(arg) : arg));

const logger = {
  info: (...args: unknown[]) => console.log(...format(args)),
  warn: (...args: unknown[]) => console.warn(...format(args)),
  error: (...args: unknown[]) => console.error(...format(args)),
  debug: (...args: unknown[]) => console.debug(...format(args))
};

export default logger;
