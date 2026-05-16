export const users = [
    
   {
    username: 'standard_user',
    password: 'secret_sauce',
    expected: 'success'
  },

  {
    username: 'invalid_user',
    password: 'invalid_password',
    expected: 'failed',
    errorMessage: 'Epic sadface: Username and password do not match any user in this service'
  },
  
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expected: 'failed',
    errorMessage: 'Epic sadface: Sorry, this user has been locked out.'
  },

  {
    username: 'problem_user',
    password: 'secret_sauce',
    expected: 'success'
  },

  {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    expected: 'success'
  },

  {
    username: 'error_user',
    password: 'secret_sauce',
    expected: 'success'
  },

  {
    username: 'visual_user',
    password: 'secret_sauce',
    expected: 'success'
  }

];