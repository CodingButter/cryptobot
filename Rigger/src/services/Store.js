/**
 * 
 * @TODO store token in an http cookie (WTF does that mean) 
 */
const getItem = (key) => {
  return localStorage.getItem(key)
}
const storeItem = (key, value) => {
  localStorage.setItem(key, value)
}

export { getItem, storeItem }
