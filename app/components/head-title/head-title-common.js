const titles = {
  DEFAULT: 'Flagis',
  LANDING: 'Flagis',
  LEGAL: 'Legal',
  LEGAL_TERMS_AND_CONDITIONS: 'Legal - Terms and Conditions',
  LEGAL_PRIVACY_POLICY: 'Legal - Privacy Policy',
  LEGAL_COOKIES_POLICY: 'Legal - Cookies Policy',
  LEGAL_EULA: 'Legal - EULA',
  LEGAL_DISCLAIMER: 'Legal - Disclaimer',
  ABOUT: 'About',
  CONTACT_US: 'Contact Us',
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Sign Up',
  EMAIL_RESET_PASSWORD: 'Forgot Password',
  RESET_PASSWORD: 'Reset Password',
  VERIFICATION_EMAIL: 'Email Verification',
  TASKS: 'My Tasks',
  TAGS: 'Tags',
  ARCHIVE: 'Archive',
  CONTACTS: 'Contacts',
  DASHBOARD: 'Charts',
  NOTIFICATIONS: 'Notifications',
  SETTINGS_EDIT_PROFILE: 'Settings - Edit Profile',
  SETTINGS_CHANGE_PASSWORD: 'Settings - Change Password',
  SETTINGS_COLOR_THEME: 'Settings - Color Theme',
  SETTINGS_CONTACT_US: 'Settings - Contact Us',
  NOT_FOUND: 'Not Found!',

  TASK_DETAIL: 'My Task -',
  INCOMING_DETAIL: 'Incoming Task -',
  ARCHIVE_DETAIL: 'Archive -',
  TAG_DETAIL: 'Tag -',
  CONTACT_DETAIL: 'Contact -',

  NEW_NOTIFICATION: 'New Notification',
}

const blinkHeadTitle = title => {
  const oldTitle = document.title
  let timeoutId

  const blink = () => {
    document.title = document.title === title ? titles.NEW_NOTIFICATION : title
  }

  const clear = () => {
    window.clearInterval(timeoutId)
    document.title = oldTitle
    window.onmousemove = null
    timeoutId = null
  }

  if (!timeoutId) {
    timeoutId = window.setInterval(blink, 800)
    window.onmousemove = clear
  }
}

export { blinkHeadTitle, titles }
