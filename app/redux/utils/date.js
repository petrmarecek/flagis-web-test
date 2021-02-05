import moment from 'moment'

export const formats = {
  DEFAULT_DAY: 'dddd',
  DEFAULT_DAY_TIME: 'dddd HH:MM',
  DEFAULT_SIMPLE_DATE_FORMAT: 'D.M.YYYY',
  DEFAULT_DATE_FORMAT: 'DD.MM.YYYY',
  DEFAULT_TIME_FORMAT: 'HH:mm',
  DEFAULT_SIMPLE_DATE_SIMPLE_TIME_FORMAT: 'D.M.YYYY H:m',
  DEFAULT_SIMPLE_DATE_TIME_FORMAT: 'D.M.YYYY HH:mm',
  DEFAULT_DATE_TIME_FORMAT: 'DD.MM.YYYY HH:mm',
}

export const days = {
  YESTERDAY: 'yesterday',
  TODAY: 'today',
  TOMORROW: 'tomorrow',
}

export default {
  DEFAULT_DAY: formats.DEFAULT_DAY,
  DEFAULT_DAY_TIME: formats.DEFAULT_DAY_TIME,
  DEFAULT_SIMPLE_DATE_FORMAT: formats.DEFAULT_SIMPLE_DATE_FORMAT,
  DEFAULT_DATE_FORMAT: formats.DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT: formats.DEFAULT_TIME_FORMAT,
  DEFAULT_SIMPLE_DATE_SIMPLE_TIME_FORMAT:
    formats.DEFAULT_SIMPLE_DATE_SIMPLE_TIME_FORMAT,
  DEFAULT_SIMPLE_DATE_TIME_FORMAT: formats.DEFAULT_SIMPLE_DATE_TIME_FORMAT,
  DEFAULT_DATE_TIME_FORMAT: formats.DEFAULT_DATE_TIME_FORMAT,

  YESTERDAY: days.YESTERDAY,
  TODAY: days.TODAY,
  TOMORROW: days.TOMORROW,

  formatDate(date, format = formats.DEFAULT_DATE_FORMAT) {
    return date !== null ? moment(date).format(format) : ''
  },

  formatDateTimePrimary(date) {
    return date !== null
      ? moment(date).format(formats.DEFAULT_DATE_TIME_FORMAT)
      : ''
  },

  formatDateTimeSecondary(date) {
    if (date === null) {
      return ''
    }

    const dateFormat = moment(date).format(formats.DEFAULT_DATE_FORMAT)
    const timeFormat = moment(date).format(formats.DEFAULT_TIME_FORMAT)
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

  isAfterExpiration(expiresAt) {
    return moment().isSameOrAfter(expiresAt)
  },

  makeDateArray(startDate, stopDate, interval = 1, intervalUnit = 'days') {
    const dateArray = []
    let momentCurrent = moment(startDate)
    const momentStop = moment(stopDate)

    while (momentCurrent <= momentStop) {
      dateArray.push(moment(momentCurrent).format('YYYY-MM-DD'))
      momentCurrent = moment(momentCurrent).add(interval, intervalUnit)
    }

    return dateArray
  },

  setNoonTimeForZero(date) {
    if (date) {
      date.set({
        second: 0,
        millisecond: 0,
      })

      if (date.hour() === 0 && date.minute() === 0) {
        date.set({
          hour: 12,
          minute: 0,
        })
      }
    }

    return date
  },
}
