export default {
  loading: 'Loading',
  header: {
    version: 'Version:',
    setting: 'Setting',
    logout: 'Logout',
    Refresh: 'Refresh'
  },
  home: {
    chart: {
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'Week',
      lastWeek: 'Last Week',
      thisMonth: 'Month',
      lastMonth: 'Last Month',
      isOpenNumber: 'Show Numbers'
    },
    log: {
      tabs: {
        KHRecord: 'KH',
        messageRecord: 'System',
        originRecord: 'Original'
      },
      KHRecord: {
        date: 'Date',
        time: 'Time',
        dosing: 'Dosing',
        distance: 'Distance',
        deviation: 'Deviation'
      },
      messageRecord: {
        date: 'Date',
        time: 'Time',
        message: 'Message'
      },
      originRecord: {
        createImage: 'Create Image',
        data: 'Data'
      }
    },
    systemInfo: {
      title: 'System Information',
      lastKH: 'Last KH:',
      lastTestingTime: 'Last Testing Time:',
      nextTestingTime: 'Next Testing Time:',
      intervalTime: 'Interval Timer:',
      minutes: 'minutes',
      errorMessage: 'Can\'t Get System Information, please check E.D.A.P Key.'
    },
    functionButtons: {
      title: 'Function Buttons',
      openFunctionButtons: 'Funtion Buttons',
      buttons: {
        getdKH: 'Get dKH'
      },
      exit: 'Exit',
      tips: {
        getdKH: {
          success: 'Start Testing dKh',
          error: 'Error, Please Try Again Later.'
        }
      }
    }
  },
  setting: {
    url: 'Url:',
    oldPassword: 'Password:',
    newPassword: 'New Password:',
    confirmNewPassword: 'Confirm New Password:',
    KHGPassword: 'KHG Password:',
    send: 'Save',
    confirm: 'Confirm',
    cancel: 'Cancel',
    example: 'EX:',
    telegramNotification: 'Telegram Notification',
    language: 'Language',
    changePassword: 'Cahnge Password',
    success: {
      set: 'Setting Successful',
      change: 'Change Password Successful'
    },
    warning: {
      url: 'KHG External IP， Can\'t Use Private IP Address.',
      password: 'KHG Password, Default Is "Admin".',
      EDAP: 'You Need Open Engine Mode To Check Your "E.D.A.P Key", Default Is "Dr. Bridge".'
    },
    validatorMessage: {
      url: {
        format: 'Please Follow The Right Format',
        required: 'Url Is Required'
      },
      KHGPassword: {
        required: 'KHG Password Is Require'
      },
      oldPassword: {
        required: 'Password Is Required'
      },
      newPassword: {
        required: 'Password Is Required'
      },
      confirmNewPassword: {
        required: 'Password Is Required',
        confirm: 'Those passwords didn\'t match'
      }
    },
    dialog: {
      title: 'Change Password'
    }
  },
  login: {
    password: 'Password',
    login: 'Login',
    signup: 'Sign Up',
    forgetPassword: 'Forget Password',
    success: 'Login Successful',
    help: 'Help',
    validatorMessage: {
      email: {
        required: 'E-mail is required',
        format: 'E-mail format is error'
      },
      password: {
        required: 'Password is required'
      }
    }
  },
  signup: {
    password: 'Password',
    confirmPassword: 'Confirmed Password',
    signup: 'Sign Up',
    validatorMessage: {
      email: {
        required: 'E-mail is required',
        format: 'E-mail format is error'
      },
      password: {
        required: 'Password is required'
      },
      confirmPassword: {
        required: 'Confirm Password is required',
        notEqual: 'Those passwords didn\'t match'
      }
    }
  },
  forgetPassword: {
    send: 'Send E-mail',
    success: 'Send Email Successful, please login with the new password'
  }
}
