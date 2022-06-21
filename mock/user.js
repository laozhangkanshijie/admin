const tokens = {
  'super-admin': {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/sys/login',
    type: 'post',
    response: (config) => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        message: '登录成功',
        success: true,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/sys/profile',
    type: 'get',
    response: (config) => {
      // debugger
      const { rawHeaders } = config
      const info =
        users[
          rawHeaders[
            rawHeaders.findIndex((id) => id === 'Authorization') + 1
          ].slice(7)
        ]
      // mock error
      if (!info) {
        return {
          success: false,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        success: true,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
