export default {
  isLogin: state => state.login.isLogin,
  recaptchaKey: () => process.env.VUE_APP_GOOGLE_RECAPTCHA_SECRET,
  isLoading: state => state.app.isLoading
}
