// component's config object.
const components = {
    login: {
      component: 'Login',
      url: '/login',
    },
    signup: {
      component: 'Signup',
      url: '/signup',
    },
    changepassword: {
      component: 'ChangePassword',
      url: '/change-password',
    },
    home: {
      component: 'Home',
      url: '/home',
    },
    admin: {
      component: 'Admin',
      url: '/admin',
    }
  };
  
  export default {
    //role name as a key...
    admin: {
    // routes:[...Object.values(components)],
    // redirect :"/login"

    routes: [
      components.admin,
      
    ],
    redirect :"/admin"
  
  },
    
    user: {
      routes: [
        components.changepassword,
        components.home,
      ],
      redirect :"/home"
    },
    guest: {
      routes: [
        components.login,
        components.signup,
      ],
      redirect :"/login"
    }
  }