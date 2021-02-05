import dateUtils from 'redux/utils/date'
import moment from 'moment'
import * as _ from 'lodash'
import { colors } from 'components/styled-components-mixins/colors'

export default {
  getDueDateFormat(dueDate) {
    // dueDate title
    const momentDueDate = moment(dueDate)
    const dueDateTitleFormat = dateUtils.formatDate(
      momentDueDate,
      dateUtils.DEFAULT_DATE_TIME_FORMAT
    )

    // dueDate
    let dueDateFormat = dateUtils.formatDate(
      momentDueDate,
      dateUtils.DEFAULT_DAY
    )

    // yesterday
    const yesterdayStart = moment().subtract(1, 'day').startOf('day')
    const yesterdayEnd = moment().subtract(1, 'day').endOf('day')
    if (momentDueDate >= yesterdayStart && momentDueDate <= yesterdayEnd) {
      dueDateFormat = _.capitalize(dateUtils.YESTERDAY)
    }

    // today
    const todayStart = moment().startOf('day')
    const todayEnd = moment().endOf('day')

    if (momentDueDate >= todayStart && momentDueDate <= todayEnd) {
      dueDateFormat = _.capitalize(dateUtils.TODAY)
    }

    // tomorrow
    const tomorrowStart = moment().add(1, 'day').startOf('day')
    const tomorrowEnd = moment().add(1, 'day').endOf('day')

    if (momentDueDate >= tomorrowStart && momentDueDate <= tomorrowEnd) {
      dueDateFormat = _.capitalize(dateUtils.TOMORROW)
    }

    return {
      dueDate: dueDateFormat,
      dueDateTitle: dueDateTitleFormat,
    }
  },

  getDueDateColor(dueDate) {
    const now = moment()
    const dueDateFormat = this.getDueDateFormat(dueDate)
    const momentDueDate = moment(dueDate)

    if (momentDueDate < now) {
      return colors.pompelmo
    }

    if (dueDateFormat.dueDate === dateUtils.TODAY) {
      return colors.drunkenDragonfly
    }

    if (dueDateFormat.dueDate === dateUtils.TOMORROW) {
      return colors.agedGouda
    }

    return colors.batman
  },
}
