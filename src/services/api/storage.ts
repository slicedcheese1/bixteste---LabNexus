const TOKEN_KEY = "token";
const USER_NAME_KEY = "userName";
const USER_ID_KEY = "userID";

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function setUserName(userName: string) {
  localStorage.setItem(USER_NAME_KEY, userName);
}

function setUserId(userId: number) {
  localStorage.setItem(USER_ID_KEY, JSON.stringify(userId));
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

function hasToken(): boolean {
  return Object.hasOwn(localStorage, TOKEN_KEY);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getUserName() {
  return localStorage.getItem(USER_NAME_KEY);
}
function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

export const storage = {
  setToken,
  setUserName,
  setUserId,
  hasToken,
  getToken,
  getUserName,
  getUserId,
  removeToken,
};
