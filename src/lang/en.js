export default {
  loading: 'Loading',
  header: {
    version: 'Version:'
  },
  home: {
    logout: 'Logout',
    Refresh: 'Refresh',
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
    password: 'Password:',
    send: 'Save',
    example: 'EX:',
    warning: {
      url: 'KHG External IP， Can\'t Use Private IP Address.',
      password: 'KHG Login Password, Default Is "Admin".',
      EDAP: 'You Need Open Engine Mode To Check Your Key, It IS Optional.'
    },
    validatorMessage: {
      url: {
        format: 'Please Follow The Right Format',
        required: 'Url Is Required'
      },
      password: {
        required: 'Password Is Required'
      }
    }
  },
  login: {
    password: '密碼',
    login: '登入',
    validatorMessage: {
      email: {
        required: '請輸入E-mail',
        format: 'E-mail格式錯誤'
      },
      password: {
        required: '請輸入密碼'
      }
    }
  },
  signup: {
    password: '密碼',
    confirmPassword: '重複密碼',
    signup: '註冊',
    validatorMessage: {
      email: {
        required: '請輸入E-mail',
        format: 'E-mail格式錯誤'
      },
      password: {
        required: '請輸入密碼',
        notEqual: '兩次密碼不相同'
      },
      confirmPassword: {
        required: '請再次輸入密碼',
        notEqual: '兩次密碼不相同'
      }
    }
  }
}
