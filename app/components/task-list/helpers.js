import dateUtils from 'redux/utils/date'
import moment from 'moment'
import * as _ from 'lodash'
import { colors } from 'components/styled-components-mixins/colors'

export default {
  getDateMetaData(date) {
    // dueDate title
    const now = moment()
    const momentDate = moment(date)
    const metaData = {
      date: null,
      title: null,
      color: colors.batman,
      isOver: false,
    }

    // get date DD.MM.YYYY HH:mm
    // set title and date
    metaData.title = dateUtils.formatDate(
      momentDate,
      dateUtils.DEFAULT_DATE_TIME_FORMAT
    )
    metaData.date = metaData.title

    // get time HH:mm
    let dateTimeFormat = dateUtils.formatDate(
      momentDate,
      dateUtils.DEFAULT_TIME_FORMAT
    )

    // set over date
    if (momentDate < now) {
      metaData.isOver = true
      metaData.color = colors.pompelmo
    }

    // set yesterday
    const yesterdayStart = moment().subtract(1, 'day').startOf('day')
    const yesterdayEnd = moment().subtract(1, 'day').endOf('day')

    if (momentDate >= yesterdayStart && momentDate <= yesterdayEnd) {
      metaData.date = `${_.capitalize(dateUtils.YESTERDAY)} ${dateTimeFormat}`
      metaData.color = colors.pompelmo
    }

    // set today
    const todayStart = moment().startOf('day')
    const todayEnd = moment().endOf('day')

    if (momentDate >= todayStart && momentDate <= todayEnd) {
      metaData.date = `${_.capitalize(dateUtils.TODAY)} ${dateTimeFormat}`
      metaData.color =
        momentDate >= now ? colors.drunkenDragonfly : colors.pompelmo
    }

    // set tomorrow
    const tomorrowStart = moment().add(1, 'day').startOf('day')
    const tomorrowEnd = moment().add(1, 'day').endOf('day')

    if (momentDate >= tomorrowStart && momentDate <= tomorrowEnd) {
      metaData.date = `${_.capitalize(dateUtils.TOMORROW)} ${dateTimeFormat}`
      metaData.color = colors.agedGouda
    }

    return metaData
  },
}
