import {
    GET_REQUEST_CATEGORY,
    GET_SUCCESS_CATEGORY,
    GET_FAIL_CATEGORY,
    DELETE_REQUEST_CATEGORY,
    DELETE_SUCCESS_CATEGORY,
    DELETE_FAIL_CATEGORY,
    DELETE_REQUEST_SUB_CATEGORY,
    DELETE_SUCCESS_SUB_CATEGORY,
    DELETE_FAIL_SUB_CATEGORY,
    ADD_REQUEST_CATEGORY,
    ADD_SUCCESS_CATEGORY,
    ADD_FAIL_CATEGORY,
    ADD_REQUEST_SUB_CATEGORY,
    ADD_SUCCESS_SUB_CATEGORY,
    ADD_FAIL_SUB_CATEGORY,
} from '../types/category'

export const categoryRedcuer=(state={category:null},action)=>{
    switch(action.type){
        case GET_REQUEST_CATEGORY:
            case DELETE_REQUEST_CATEGORY:
                case DELETE_REQUEST_SUB_CATEGORY:
                    case ADD_REQUEST_CATEGORY:
                        case ADD_REQUEST_SUB_CATEGORY:
            return{
                ...state,
                loading:true
            }
        case ADD_SUCCESS_CATEGORY:
            console.log(action.payload)
            return{
                loading:false,
                category:[...state.category,action.payload]
            }
        case ADD_SUCCESS_SUB_CATEGORY:
            return{
                loading:false,
                category:state.category.map(c=>c.id==action.payload.id ? action.payload : c )
            }
        case DELETE_SUCCESS_CATEGORY:
            return{
                loading:false,
                category:state.category.filter(c=>c.id!=action.payload)
            }
        case DELETE_SUCCESS_SUB_CATEGORY:
            return{
                loading:false,
                category:state.category.map(c=>c.id==action.payload.id ? action.payload : c )
            }
        case GET_SUCCESS_CATEGORY:
            return{
                loading:false,
                category:action.payload
            }
        case GET_FAIL_CATEGORY:
            case DELETE_FAIL_CATEGORY:
                case DELETE_FAIL_SUB_CATEGORY:
                    case ADD_FAIL_CATEGORY:
                        case ADD_FAIL_SUB_CATEGORY:
            return{
                loading:false,
                category:null,
                error:action.payload
            }
        default:return state
    }
}