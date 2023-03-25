const initialState = {
    Doctor: {},
    AppointmentTime: "",
    ConsultationMethod: [],
    Schedule: "",
    TimeShift: [],
    SelectedDoctor: {},
    Card: {},
  }
  
  const BookingReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SELECT_DOCTOR':
        return {
          ...state,
          Doctor: action.payload,
        }
      case 'SELECTED_DOCTOR':
        return {
          ...state,
          SelectedDoctor: action.payload
        }
      case 'SELECT_APPOINTMENT_TIME':
        return {
          ...state,
          AppointmentTime: action.payload
        }
      case 'SELECT_CONSULTATION_METHOD':
        return {
          ...state,
          ConsultationMethod: action.payload
        }
      case 'SELECT_SCHEDULE':
        return {
          ...state,
          Schedule: action.payload
        }
      case 'SELECT_TIME_SHIFT':
        return {
          ...state,
          TimeShift: action.payload
        }
      case 'ON_UPDATE_CARD':
        return {
          ...state,
          Card: action.payload
        }
      default:
        console.log(state);
        return state
    }
  }
  
  export default BookingReducer