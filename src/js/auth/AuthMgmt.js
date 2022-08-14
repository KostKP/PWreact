
export const getUser = () => {
  return localStorage.getItem('user') || null;
}

export const getToken = () => {
  return localStorage.getItem('token') || null;
}

  export const getTokenId = () => {
  return localStorage.getItem('id') || null;
}
   
export const removeUserSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('id');
}
   
export const setUserSession = (user, token, id) => {
  localStorage.setItem('user', user);
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
}