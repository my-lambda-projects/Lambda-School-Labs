import {
  AUTHENTICATION_ERROR,
  CREATE_USER,
  CHANGESETTINGS,
  CREATE_TEACHER,
  FORGOTPASSWORD,
  GETUSERROLES,
  RESETPASSWORD,
  SCHOOL_ADMIN_AUTHORIZED,
  SIGNIN,
  SIGNOUT,
  SUPER_ADMIN_AUTHORIZED,
  TEACHER_AUTH,
} from '../actions/index';

const authReducer = (auth = {}, action) => {
  switch (action.type) {
    // When user is created send signedUpusername in props so that username field
    // can be auto populate at first instance of signin
    case AUTHENTICATION_ERROR:
      return { ...auth, error: action.payload };
    case CHANGESETTINGS:
      return { ...auth, changedSettings: true };
    case CREATE_TEACHER:
      return { ...auth, teacherSignup: true };
    case CREATE_USER:
      return { ...auth, signedUpusername: action.payload.data.username };
    case FORGOTPASSWORD:
      return { ...auth, emailSent: true };
    case GETUSERROLES:
      return {
        ...auth,
        isSchoolAdmin: action.payload.data.isAdmin,
        isSuperAdmin: action.payload.data.isSuperAdmin,
        isTeacher: action.payload.data.isTeacher,
      };
    case RESETPASSWORD:
      return { ...auth, resetPassword: true };
    case SCHOOL_ADMIN_AUTHORIZED:
      return { ...auth, isSchoolAdmin: action.payload.data.success };
    case SIGNIN:
      return { ...auth };
    case SIGNOUT:
      return {};
    case SUPER_ADMIN_AUTHORIZED:
      return { ...auth, isSuperAdmin: action.payload.data.success };
    case TEACHER_AUTH:
      return { ...auth, isTeacher: action.payload.data.success };
    default:
      return auth;
  }
};

export default authReducer;
