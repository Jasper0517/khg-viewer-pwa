export default {
  loading: '資料讀取中',
  header: {
    version: '版本：',
    setting: '設定',
    logout: '登出系統',
    Refresh: '重新整理'
  },
  home: {
    chart: {
      today: '今日',
      yesterday: '昨日',
      thisWeek: '本週',
      lastWeek: '上週',
      thisMonth: '本月',
      lastMonth: '上月',
      isOpenNumber: '開啟數字'
    },
    log: {
      tabs: {
        KHRecord: 'KH記錄',
        messageRecord: '系統記錄',
        originRecord: '原始訊息'
      },
      KHRecord: {
        date: '日期',
        time: '時間',
        dosing: '添加',
        distance: '步數',
        deviation: '誤差值'
      },
      messageRecord: {
        date: '日期',
        time: '時間',
        message: '訊息'
      },
      originRecord: {
        createImage: '產生圖片',
        data: '資料'
      }
    },
    systemInfo: {
      title: '系統資訊',
      lastKH: '最後KH值：',
      lastTestingTime: '最後測量：',
      nextTestingTime: '下次測量：',
      intervalTime: '測量間隔：',
      minutes: '分鐘',
      errorMessage: '無法取得系統資訊，請確認E.D.A.P Key'
    },
    functionButtons: {
      title: '功能列表',
      openFunctionButtons: '開啟功能列表',
      buttons: {
        getdKH: '取得KH'
      },
      exit: '離開',
      tips: {
        getdKH: {
          success: '已開始測試KH。',
          error: '發生錯誤，請稍候重新測試一次'
        }
      }
    }
  },
  setting: {
    url: '對外網址：',
    oldPassword: '密碼：',
    KHGPassword: 'KHG 密碼：',
    newPassword: '新密碼：',
    confirmNewPassword: '確認新密碼：',
    send: '儲存',
    example: '如：',
    telegramNotification: 'Telegram 通知',
    language: '語言',
    changePassword: '更換密碼',
    confirm: '確認',
    cancel: '取消',
    success: {
      set: '設定成功',
      change: '變更密碼成功'
    },
    warning: {
      url: 'KHG對外網址，無法使用家裡內網IP',
      password: 'KHG登入密碼，預設是: Admin',
      EDAP: '需要開啟Eng mode式查看System Setup裡的E.D.A.P Key, 預設是: Dr. Bridge'
    },
    validatorMessage: {
      url: {
        format: '請依照網址格式輸入',
        required: '請輸入網址'
      },
      KHGPassword: {
        required: '請輸入KHG密碼'
      },
      oldPassword: {
        required: '請輸入密碼'
      },
      newPassword: {
        required: '請輸入密碼'
      },
      confirmNewPassword: {
        required: '請輸入密碼',
        confirm: '兩次密碼不一致'
      }
    },
    dialog: {
      title: '變更密碼'
    }
  },
  login: {
    password: '密碼',
    login: '登入',
    signup: '註冊',
    forgetPassword: '忘記密碼',
    success: '登入成功',
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
        required: '請輸入密碼'
      },
      confirmPassword: {
        required: '請再次輸入密碼',
        notEqual: '兩次密碼不相同'
      }
    }
  },
  forgetPassword: {
    send: '寄送信箱',
    success: '寄送成功，請使用新密碼登入'
  }
}
