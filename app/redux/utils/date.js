import moment from 'moment'

const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY'
const DEFAULT_TIME_FORMAT = 'HH:mm'
const DEFAULT_DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm'

export default {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,

  formatDate(date) {
    return date !== null ? moment(date).format(DEFAULT_DATE_FORMAT) : ''
  },

  formatDateTimePrimary(date) {
    return date !== null ? moment(date).format(DEFAULT_DATE_TIME_FORMAT) : ''
  },

  formatDateTimeSecondary(date) {
    if (date === null) {
      return ''
    }

    const dateFormat = moment(date).format(DEFAULT_DATE_FORMAT)
    const timeFormat = moment(date).format(DEFAULT_TIME_FORMAT)
    return `${dateFormat} (${timeFormat})`
  },

  toMoment(dateStr) {
    if (!dateStr) {
      return null
    }

    return moment(dateStr)
  },

  getExpiresAt(expiresIn) {
    return moment().add(expiresIn, 'ms')
  },

  getMilliseconds() {
    return new Date().valueOf()
  },

  getDateToISOString() {
    return new Date().toISOString()
  },
}
