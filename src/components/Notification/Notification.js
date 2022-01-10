import { notification } from 'antd'

export const Notification = ({ type, message, description }) => {
  notification[type]({
    message,
    description,
    placement: 'bottomRight'
  })
}
