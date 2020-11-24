import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

// components
import { titles } from 'components/head-title/head-title-common'

// redux
import { connect } from 'react-redux'
import { getCountActiveNotification } from 'redux/store/entities/entities.selectors'

const HeadTitle = ({ title, notificationsCount }) => {
  console.log(new Date())
  console.log(notificationsCount)
  const editedTitle =
    notificationsCount > 0 ? `(${notificationsCount}) ${title}` : title

  return (
    <Helmet defer={false}>
      <title>{editedTitle}</title>
    </Helmet>
  )
}

HeadTitle.defaultProps = {
  title: titles.DEFAULT,
}

HeadTitle.propTypes = {
  title: PropTypes.string,
  notificationsCount: PropTypes.number,
}

const mapStateToProps = state => ({
  notificationsCount: getCountActiveNotification(state),
})

export default connect(mapStateToProps)(HeadTitle)
