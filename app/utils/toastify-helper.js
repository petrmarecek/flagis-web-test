import { toast } from 'react-toastify'

export default {
  success(text, options) {
    const { position, autoClose } = options

    // clear all toasts
    toast.dismiss()

    // show success toast
    toast.success(text, {
      position,
      autoClose,
    })
  },

  error(text, options) {
    const { position, autoClose } = options

    // clear all toasts
    toast.dismiss()

    // show error toast
    toast.error(text, {
      position,
      autoClose,
    })
  },

  info(text, options) {
    const { position, autoClose } = options

    // clear all toasts
    toast.dismiss()

    // show info toast
    toast.info(text, {
      position,
      autoClose,
    })
  },
}
