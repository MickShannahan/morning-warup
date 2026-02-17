export function isValidProp(target: Record<string, any>, prop: string) {
  if (typeof target[prop] === 'function') { return; }

  if (!target.hasOwnProperty(prop)) {
    throw new Error(`[BAD PROP]:[${prop.toString()}] Invalid Property Access via Proxy State`);
  }
}