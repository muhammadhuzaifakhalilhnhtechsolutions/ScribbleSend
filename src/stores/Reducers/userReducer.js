const init = {
  user: [],
  getSpecilities: [],
  getViewHospital: [],
  getprofileDetails: [],
  getappointment: [],
  all_hospitals: [],
  patient_Message: [],
  doctor_Message: [],
  doctor_list: [],
  patient_list: [],
  appointments: [],
  all_appointments: [],
  allregin: 'Canada',
  doctor_appointments: [],
  patient_appointments: [],
  msg_state: 0,
  Loading_hospital: false,
  docDetailApp: null,
  detailsApp: null,
  analytics: [],
  package_Status: true,
};
const reducer = (state = init, action) => {
  // console.log('action user', action)

  switch (action.type) {
    case 'UPDATE_USER': {
      // console.log('action user', action.user)
      return {
        ...state,
        user: action.user,
      };
    }

    case 'REMOVE_USER': {
      return { ...state, user: null };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
