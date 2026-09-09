import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export const setCookies = (name, value) => {
  cookies.set(name, value, { maxAge: (24 * 60 * 60) });
};

export const getCookies = (name) => {
  return cookies.get(name);
};

export const removeCookies = (name) => {
  cookies.remove(name);
};