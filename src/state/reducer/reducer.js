
import {
    GETEXPENSES,
    FETCH_ERRORS,
    CURRENTDATEEXPENSE
} from '../action/actionType'


const initialState = {
    getexpenses: [],
    currentdateexpense:[],
    error: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GETEXPENSES:
            return{
                ...state,
                getexpenses: action.payload

            }

        case CURRENTDATEEXPENSE:
            return {
                ...state,
                currentdateexpense: action.payload
            }

        case FETCH_ERRORS:
            return {
                ...state, error: action.payload
                , getexpenses: []
                ,currentdateexpense:[]
            }
        default:
            return state;
    }
}

export default reducer;