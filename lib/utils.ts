export function cn(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}
