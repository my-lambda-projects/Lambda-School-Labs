import axios from 'axios';

// Auth Actions please maintain alphabetical order
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHANGESETTINGS = 'CHANGESETTINGS';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_TEACHER = 'CREATE_TEACHER';
export const FORGOTPASSWORD = 'FORGOTPASSWORD';
export const RESETPASSWORD = 'RESETPASSWORD';
export const SCHOOL_ADMIN_AUTHORIZED = 'SCHOOL_ADMIN_AUTHORIZED';
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const SUPER_ADMIN_AUTHORIZED = 'SUPER_ADMIN_AUTHORIZED';
export const TEACHER_AUTH = 'TEACHER_AUTH';
export const GETUSERROLES = 'GETUSERROLES';

// House Actions
export const ADDHOUSE = 'ADDHOUSE';
export const DELETEHOUSE = 'DELETEHOUSE';
export const GETHOUSES = 'GETHOUSES';
export const UPDATEHOUSE = 'UPDATEHOUSE';

// School Actions
export const ADDSCHOOL = 'ADDSCHOOL';
export const DELETESCHOOL = 'DELETESCHOOL';
export const GETSCHOOLS = 'GETSCHOOLS';
export const SEARCHSCHOOLS = 'SEARCHSCHOOLS';

// Teacher Actions
export const ADDTEACHER = 'ADDTEACHER';
export const DELETETEACHER = 'DELETETEACHER';
export const GETTEACHERS = 'GETTEACHERS';

// Pricing Plans
export const GETPLANS = 'GETPLANS';

// Api url To be changed for Production
// const ROOT_URL = 'Insert Production URL here'

const ROOT_URL = 'http://127.0.0.1:5000';

// Auth Actions functions
export const authError = (error) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATION_ERROR, payload: error });
    setTimeout(() => {
      dispatch({ type: AUTHENTICATION_ERROR });
    }, 4000);
  };
};

export const changeSettings = async (user) => {
  const apiurl = `${ROOT_URL}/settings`;
  try {
    const token = localStorage.getItem('token');
    await axios.post(apiurl, user, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: CHANGESETTINGS,
    };
  } catch (error) {
    return authError(error.response.data.message);
  }
};

export const createUser = async (user, history) => {
  const apiurl = `${ROOT_URL}/signup`;
  try {
    const adduserrequest = await axios.post(apiurl, user);
    history.push('/signin');
    return {
      type: CREATE_USER,
      payload: adduserrequest,
    };
  } catch (error) {
    if (error.message === 'Network Error') return authError('Network Error - Email jaspinder to start server');
    if (error.response.data.message.errmsg) {
      const duplicateKey = error.response.data.message.errmsg;
      const emailKeyWordPresent = duplicateKey.search(/email/i);
      if (emailKeyWordPresent === -1) {
        return authError('Username Unavailable');
      }
      return authError('Email already registered');
    }
    if (error.response.data.message) return authError(error.response.data.message);
  }
};

export const signin = async (user, history) => {
  const apiurl = `${ROOT_URL}/signin`;
  try {
    const signinrequest = await axios.post(apiurl, user);
    localStorage.setItem('token', signinrequest.data.token);
    // After signin the user needs to be redirected to
    history.push('/forgotpassword');
    return {
      type: SIGNIN,
      payload: signinrequest,
    };
  } catch (error) {
    return authError(error.response.data.message);
  }
};
export const forgotPassword = async (email) => {
  try {
    await axios.post(`${ROOT_URL}/forgotpassword`, { email });
    return {
      type: FORGOTPASSWORD,
    };
  } catch (error) {
    return authError(error.response.data.message);
  }
};
export const resetPassword = async (passwords, history) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`${ROOT_URL}/reset`, passwords, {
      headers: {
        Authorization: token,
      },
    });
    history.push('/signin');
    return {
      type: RESETPASSWORD,
    };
  } catch (error) {
    return authError(error.response.data.message);
  }
};

export const createTeacher = async (passwords, history) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`${ROOT_URL}/teachersignup`, passwords, {
      headers: {
        Authorization: token,
      },
    });
    history.push('/signin');
    return {
      type: CREATE_TEACHER,
    };
  } catch (error) {
    return authError(error.response.data.message);
  }
};
export const signout = async (history) => {
  const apiurl = `${ROOT_URL}/signout`;
  const token = localStorage.getItem('token');
  try {
    await axios.get(apiurl, {
      headers: {
        Authorization: token,
      },
    });
    // remove the JWT from local storage
    localStorage.removeItem('token');
    history.push('/signin');
    return {
      type: SIGNOUT,
    };
  } catch (error) {
    return authError(error.response.data.message);
  }
};

export const getUserRoles = async (history) => {
  try {
    const token = localStorage.getItem('token');
    const getRolesRequest = await axios.get(
      `${ROOT_URL}/getuserroles`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return {
      type: GETUSERROLES,
      payload: getRolesRequest,
    };
  } catch (error) {
    // history.push('/signin');
    return authError('You are not signed, Please signin');
  }
};
// Houses Action Functions
export const addHouse = async (house, history) => {
  const apiurl = `${ROOT_URL}/api/house`;
  try {
    const token = localStorage.getItem('token');
    const addHouseRequest = await axios.post(apiurl, house, {
      headers: {
        Authorization: token,
      },
    });
    history.push('/houses');
    return {
      type: ADDHOUSE,
      payload: addHouseRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};

export const deleteHouse = async (houseid, history) => {
  const apiurl = `${ROOT_URL}/api/house/${houseid}`;
  try {
    const token = localStorage.getItem('token');
    const deleteRequest = await axios.delete(apiurl, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: DELETEHOUSE,
      payload: deleteRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};

export const updateHouse = async (house, history) => {
  const apiurl = `${ROOT_URL}/api/house/${house.id}`;
  try {
    const token = localStorage.getItem('token');

    const updateHouseRequest = await axios.put(apiurl, house, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: UPDATEHOUSE,
      payload: updateHouseRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};

export const getHousesBySchool = async (history) => {
  const apiurl = `${ROOT_URL}/api/house`;
  try {
    const token = localStorage.getItem('token');
    const getAllHousesRequest = await axios.get(apiurl, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: GETHOUSES,
      payload: getAllHousesRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};

// School Action Functions
export const addSchool = async (school, history) => {
  const apiurl = `${ROOT_URL}/api/schools`;
  try {
    const token = localStorage.getItem('token');
    const addSchoolRequest = await axios.post(apiurl, school, {
      headers: {
        Authorization: token,
      },
    });
    localStorage.setItem('token', addSchoolRequest.data.token);
    // Redirecting to /houses after we separated houses and teachers
    // into two different views.
    history.push('/houses');
    return {
      type: ADDSCHOOL,
      payload: addSchoolRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};
export const deleteSchool = async (schoolId, history) => {
  const apiurl = `${ROOT_URL}/api/school/${schoolId}`;
  try {
    const token = localStorage.getItem('token');
    const deleteRequest = await axios.delete(apiurl, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: DELETESCHOOL,
      payload: deleteRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};
export const getAllSchools = async (history) => {
  const apiurl = `${ROOT_URL}/api/schools`;
  try {
    const token = localStorage.getItem('token');
    const getAllSchoolsRequest = await axios.get(apiurl, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: GETSCHOOLS,
      payload: getAllSchoolsRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};
// Search Schools based on the School-name and Location
export const searchSchools = async (query, history) => {
  const apiurl = `${ROOT_URL}/api/schools/search`;
  try {
    const searchSchoolsRequest = await axios.get(apiurl, {
      params: query,
    });
    return {
      type: SEARCHSCHOOLS,
      payload: searchSchoolsRequest,
    };
  } catch (error) {
    console.error('Error on searchSchools()', error);
  }
};

// Teacher Action Functions
export const addTeacher = async (teacher, history) => {
  const apiurl = `${ROOT_URL}/api/teacher`;
  try {
    const token = localStorage.getItem('token');
    await axios.post(apiurl, teacher, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: ADDTEACHER,
    };
  } catch (error) {
    return authError(error.response.data.message);
  }
};

export const deleteTeacher = async (teacherid, history) => {
  const apiurl = `${ROOT_URL}/api/teacher/${teacherid}`;
  try {
    const token = localStorage.getItem('token');
    const deleteRequest = await axios.delete(apiurl, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: DELETETEACHER,
      payload: deleteRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};

export const getTeachers = async (history) => {
  const apiurl = `${ROOT_URL}/api/teacher`;
  try {
    const token = localStorage.getItem('token');
    const getTeachersRequest = await axios.get(apiurl, {
      headers: {
        Authorization: token,
      },
    });
    return {
      type: GETTEACHERS,
      payload: getTeachersRequest,
    };
  } catch (error) {
    history.push('/signin');
    return authError('You are not authorized, Please signin as schooladmin');
  }
};

export const getPlans = async () => {
  const apiurl = `${ROOT_URL}/api/plan`;
  try {
    const getAllPlansRequest = await axios.get(apiurl);
    return {
      type: GETPLANS,
      payload: getAllPlansRequest,
    };
  } catch (error) {
    console.error(error);
  }
};
