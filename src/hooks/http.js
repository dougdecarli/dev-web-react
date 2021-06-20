import axios from 'axios'

import { API_CONSTANTS } from '../constants'

export const http = axios.create({
  baseURL: API_CONSTANTS.BASE_URL,
  timeout: API_CONSTANTS.REQUEST_TIMEOUT
})
