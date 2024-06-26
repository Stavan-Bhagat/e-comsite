/* eslint-disable camelcase */

// current user
export const get_session_user = () => {
  const value = JSON.parse(localStorage.getItem('user'));
  if (value) {
    return value;
  }
  return null;
};
export const set_session_user = (setValue) => {
  return localStorage.setItem('user', JSON.stringify(setValue));
};
export const remove_session_user = () => {
  return localStorage.removeItem('user');
};
// is login
export const get_is_authenticated = () => {
  return localStorage.getItem('isAuthenticated');
};
export const set_is_authenticated = (setValue) => {
  return localStorage.setItem('isAuthenticated', setValue);
};
export const remove_is_authenticated = () => {
  return localStorage.removeItem('isAuthenticated');
};
// token
export const get_token = () => {
  return localStorage.getItem('accessToken');
};
export const set_token = (setValue) => {
  return localStorage.setItem('accessToken', setValue);
};
export const remove_token = () => {
  return localStorage.removeItem('accessToken');
};
// orders
export const get_orders = () => {
  return localStorage.getItem('orders');
};
export const set_orders = (setValue) => {
  return localStorage.setItem('orders', setValue);
};
export const remove_orders = () => {
  return localStorage.removeItem('orders');
};
// cart
export const get_cart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const set_cart = (setValue) => {
  return localStorage.setItem('cart', JSON.stringify(setValue));
};
export const remove_cart = () => {
  return localStorage.removeItem('cart');
};
// notification
export const get_notification = () => {
  const notification = localStorage.getItem('notification');
  return notification ? JSON.parse(notification) : [];
};

export const set_notification = (setValue) => {
  return localStorage.setItem('notification', JSON.stringify(setValue));
};
export const remove_notification = () => {
  return localStorage.removeItem('notification');
};
