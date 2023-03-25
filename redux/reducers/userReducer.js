
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
        case 'ON_UPDATE_CART':
            
            if(!Array.isArray(state.Cart)){
                return {
                    ...state,
                    Cart: [action.payload]
                }
            }
            
            const existingFoods = state.Cart.filter(item => item._id == action.payload._id);

            //Check for Existing Product to update unit
            if (existingFoods.length > 0){
                let updatedCart = state.Cart.map((food) => {
                    if(food._id == action.payload._id){
                       food.unit = action.payload.unit;
                    }
                    return food
                })

                return {
                    ...state,
                    Cart:  updatedCart.filter( item => item.unit > 0)
                }

            }else{ // Add to cart if not added
                return {
                    ...state,
                    Cart: [...state.Cart, action.payload]
                }
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