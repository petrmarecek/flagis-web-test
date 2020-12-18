import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as _ from 'lodash'

// redux
import { connect } from 'react-redux'
import { updateNotificationsSettings } from 'redux/store/auth/auth.actions'
import { getUserSettings } from 'redux/store/auth/auth.selectors'

// styles
import styled from 'styled-components'
import {
  ButtonDefaultSmall,
  fontMain,
  Form,
  FormBody,
  FormRowButton,
} from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

const SettingsNotificationsFormWrapper = styled.div`
  ${fontMain};
  font-size: 16px;
`

const FormHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 25px 0 35px 0;
`

const HeaderTitle = styled.p`
  ${fontMain};
  font-size: 16px;
  font-weight: bold;
  margin-left: 50px;
`

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 25px 0;
`

const Label = styled.label`
  color: ${colors.batman};
  padding-left: 25px;
`

const Checkbox = styled.input`
  margin: 0 13px 0 64px;
`

// data
const notificationTypes = {
  PUSH: 'push',
  EMAIL: 'email',
}

const formData = [
  { label: 'Due Date', name: 'dueDate' },
  { label: 'Reminder Date', name: 'reminderDate' },
  { label: 'New Incoming Task', name: 'incomingTask' },
  { label: 'Accepted Task', name: 'acceptedTask' },
  { label: 'Rejected Task', name: 'rejectedTask' },
  { label: 'Comments', name: 'comment' },
  { label: 'Attachments', name: 'attachment' },
]

const SettingsNotificationsForm = ({
  notifications,
  updateNotificationsSettings,
}) => {
  const { register, handleSubmit } = useForm()
  const splitter = '-'
  const initialNotifications = {
    push: {},
    email: {},
  }
  const preparedNotifications = notifications
    ? notifications
    : _.cloneDeep(initialNotifications)

  // TODO: remove disabled after working notifications settings
  const disabled = true

  const onSubmit = data => {
    const updatedNotifications = _.cloneDeep(initialNotifications)

    _.forOwn(data, (value, key) => {
      const splitKey = _.split(key, splitter)

      if (_.first(splitKey) === notificationTypes.PUSH) {
        updatedNotifications.push[_.last(splitKey)] = value
      }

      if (_.first(splitKey) === notificationTypes.EMAIL) {
        updatedNotifications.email[_.last(splitKey)] = value
      }
    })

    updateNotificationsSettings(updatedNotifications)
  }

  return (
    <SettingsNotificationsFormWrapper disabled={true}>
      <Form nonMargin leftPadding maxWidth={500}>
        <FormHeader>
          <HeaderTitle>Push</HeaderTitle>
          <HeaderTitle>Email</HeaderTitle>
        </FormHeader>
        <FormBody onSubmit={handleSubmit(onSubmit)}>
          {formData.map((data, key) => (
            <FormItem key={key}>
              <Label>{data.label}</Label>
              <div>
                <Checkbox
                  type="checkbox"
                  name={`${notificationTypes.PUSH}${splitter}${data.name}`}
                  defaultChecked={
                    preparedNotifications[notificationTypes.PUSH][data.name]
                  }
                  ref={register}
                  disabled={disabled}
                />
                <Checkbox
                  type="checkbox"
                  name={`${notificationTypes.EMAIL}${splitter}${data.name}`}
                  defaultChecked={
                    preparedNotifications[notificationTypes.EMAIL][data.name]
                  }
                  ref={register}
                  disabled={disabled}
                />
              </div>
            </FormItem>
          ))}
          <FormRowButton>
            <ButtonDefaultSmall
              type="submit"
              value="Update"
              disabled={disabled}
            />
          </FormRowButton>
        </FormBody>
      </Form>
    </SettingsNotificationsFormWrapper>
  )
}

SettingsNotificationsForm.propTypes = {
  notifications: PropTypes.object,
}

const mapStateToProps = state => ({
  notifications: getUserSettings(state).notifications,
})

const mapDispatchToProps = { updateNotificationsSettings }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsNotificationsForm)
