const baseURL = 'https://codingbutter.com'
const getToday = window.getToday
/**
 *
 * @REMEBERS Remember to get user id from token on backend
 *
 */
const getHeaders = (token) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

const sendRequest = async (endpoint, body) => {
  const requestOptions = {
    method: endpoint.includes('crud') ? 'POST' : 'GET',
    headers: getHeaders(),
    body: JSON.stringify(body)
  }
  //if endpoint doesnt start with a forward slash add one
  endpoint = endpoint[0] !== '/' ? `/${endpoint}` : endpoint

  const response = await fetch(
    `${baseURL}${endpoint}`,
    requestOptions
  )
  const jsonResponse = await response.json()

  return jsonResponse
}

const getTodaysRaffles = async () => {
  const options = await sendRequest('crud/read/raffles')
  return options.filter((option) =>
    option.datetime.includes(getToday())
  )
}
const sendWinningTicket = async (ticketNumber) => {
  const resp = await sendRequest(`/st/${ticketNumber}`)
  return resp
}
const confirmWinningTicket = async (ticketNumber) => {
  const resp = await sendRequest('/confirm')
  return resp
}

export {
  getTodaysRaffles,
  sendWinningTicket,
  confirmWinningTicket
}
