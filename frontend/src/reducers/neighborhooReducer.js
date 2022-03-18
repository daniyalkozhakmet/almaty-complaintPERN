import {
    GET_REQUEST_NEIGHBORHOOD,
    GET_SUCCESS_NEIGHBORHOOD,
    GET_FAIL_NEIGHBORHOOD,
    DELETE_REQUEST_NEIGHBORHOOD,
    DELETE_SUCCESS_NEIGHBORHOOD,
    DELETE_FAIL_NEIGHBORHOOD,
    ADD_REQUEST_NEIGHBORHOOD,
    ADD_SUCCESS_NEIGHBORHOOD,
    ADD_FAIL_NEIGHBORHOOD,
}from '../types/neighborhood'
export const getNeighborhood=(state={neighborhood:null},action)=>{
    switch(action.type){
        case GET_REQUEST_NEIGHBORHOOD:
            case DELETE_REQUEST_NEIGHBORHOOD:
                case ADD_REQUEST_NEIGHBORHOOD:
            return{
                ...state,
                loading:true
            }
        case GET_SUCCESS_NEIGHBORHOOD:
            return{
                loading:false,
                neighborhood:action.payload,
            }
        case DELETE_SUCCESS_NEIGHBORHOOD:
            return{
                ...state,
                loading:false,
                neighborhood:state.neighborhood.filter(n=>n.id!=action.payload)    
            }
        case ADD_SUCCESS_NEIGHBORHOOD:
            return{
                ...state,
                loading:false,
                neighborhood: [...state.neighborhood, action.payload]
            }
        case GET_FAIL_NEIGHBORHOOD:
            case DELETE_FAIL_NEIGHBORHOOD:
                case ADD_FAIL_NEIGHBORHOOD:
            return{
                loading:false,
                neighborhood:null,
                error:action.payload
            }
        default:
            return state
    }
}