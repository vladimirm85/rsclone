// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set(name: string, value: any): void {
  window.localStorage.setItem(name, JSON.stringify(value));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get(name: string, subst: any = null) {
  return JSON.parse(window.localStorage.getItem(name) || subst);
}

export function del(name: string) {
  localStorage.removeItem(name);
}
