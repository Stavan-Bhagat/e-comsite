// current user
export const get_session_user = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const set_session_user = () => {
  return localStorage.setItem("user");
};
export const remove_session_user = () => {
  return localStorage.removeItem("user");
};
// is login
export const get_is_login = () => {
  return JSON.parse(localStorage.getItem("isLogin"));
};
export const set_is_login = () => {
  return localStorage.setItem("isLogin");
};
export const remove_is_login = () => {
  return localStorage.removeItem("isLogin");
};
