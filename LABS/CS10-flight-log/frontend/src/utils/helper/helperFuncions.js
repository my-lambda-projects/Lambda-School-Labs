export const isLoggedIn = () => (!!localStorage.getItem('token'));

export function Capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
