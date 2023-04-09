
let defaultState = {
    UserState: {
    user: {},
    location: {},
    error: undefined,
    Cart: {},
    coords:{},
    clinics:[],
    nearestclinic:[],
    },
  };


const UserReducer = (state = defaultState, action) => {
    
 
    const { type, payload } = action;

    switch(type){
        case 'ON_UPDATE_LOCATION':
            return {
                ...state,
                location: payload.location,
                coords: payload.coords,
                clinics: payload.clinics,
                nearestclinic: payload.nearestclinic,
            }
    
                case 'ON_USER_LOGIN':

                    return {
                        ...state,
                       user: payload.user
                       
                    }
                case 'ON_USER_ERROR':
        
                    return {
                        ...state,
                      error: action.payload,
                    
                    }
             
                case 'ON_USER_LOGOUT':
                    return {
                        ...state,
                       user: action.payload
                    }
               
                case 'ON_PROFILE_UPDATE':
                    return {
                        ...state,
                       store: action.payload
                    }

        default:
            return state;

    }


}


export default UserReducer