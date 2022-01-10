export const LIMIT_TABLE = 20
export const ROLE_CLIENT = '3'
export const ROLE_AGENCY = '2'
export const MAX_LENGTH_100 = 100
export const PATH = Object.freeze({
  USER: '/user',
  EVENT: '/event',
  VIDEO: '/video',
  LOGIN: '/login',
  LOTTERY: '/lottery',
  MANAGE_GENERATE: '/qr-manager',
  LISTOFCODE: '/list-of-code',
  EXPORT_CODE: '/export-qr'
})

export const SIDEBAR = Object.freeze({
  USER: PATH.USER,
  EVENT: PATH.EVENT,
  VIDEO: PATH.VIDEO,
  MANAGE_GENERATE: PATH.MANAGE_GENERATE,
  LOGOUT: 'logout'
})

export const ROLE = Object.freeze({
  ADMIN: 'admin',
  AGENCY: 'agency',
  CLIENT: 'client'
})

export const ROUTES = Object.freeze({
  PRIVATE: [
    { path: PATH.USER, component: 'UserPage' },
    { path: PATH.EVENT, component: 'EventPage' },
    { path: PATH.VIDEO, component: 'VideoPage' },
    { path: PATH.MANAGE_GENERATE, component: 'ManageGeneratePage' },
    { path: PATH.EXPORT_CODE, component: 'ExportQRPage' }
    // { path: PATH.LISTOFCODE, component: 'ListOfCodePage' },
  ],
  PUBLIC: [
    { path: PATH.LOGIN, component: 'LoginPage' },
    { path: PATH.LOTTERY, component: 'LotteryPage' }
  ]
})

export const NOTIFICATION_TYPE = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
})

export const COLUMN_TYPE = Object.freeze({
  TEXT: 'text',
  DATE: 'date',
  DATE_STRING: 'dateString',
  NUMBER: 'number',
  LINK: 'link'
})

export const CREATE_UPDATE_DELETE_STATUS = Object.freeze({
  UPCOMING: 'upcoming',
  SUCCESS: 'success',
  ERROR: 'error'
})
