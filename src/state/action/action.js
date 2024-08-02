
import {
    //LOGIN_DETAILS,
    GETEXPENSES,
    CURRENTDATEEXPENSE,
    REPORTDATEGENERATION,
    FETCH_ERRORS
    
} from './actionType'

const host = process.env.REACT_APP_HOST;

//Route 2 ::::::::::::::::::::::::Get Expense :::::::::::::::::::::::::::::::::: from RAddExpense - Route 2
export const getExpenses = (userId) => async(dispatch)=>{
    try{
        const token = localStorage ? localStorage.getItem('token') : null;
        const response = await fetch(`${host}/api/expense/getexpense`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token
            },
            body: JSON.stringify({userId:userId})
        });

        const json = await response.json();
        dispatch({type:GETEXPENSES,payload:json})
    }catch(error){
        dispatch({type: FETCH_ERRORS,payload: error.response.data})
    }
}

//Route 3 :::::::::::::::::::::Add Expenses ::::::::::::::::::::::::::::::::::::: from RAddExpense - Route 1
export const addExpenses = (description, amount, date) => async(dispatch)=>{
    try{
        const token = localStorage ? localStorage.getItem('token') : null;
        const response = await fetch(`${host}/api/expense/addexpense`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token
            },
            body: JSON.stringify({description:description, amount:amount, date:date})
        });

        const json = await response.json();
        //dispatch({type:GETEXPENSES,payload:json})
        return json;
    }catch(error){
        dispatch({type: FETCH_ERRORS,payload: error.response.data})
    }
}

//Route 4 ::::::::::::::::::::::: Get Current Date Expense :::::::::::::::::::::::::: FROM RAddExpense - Route 3
export const currentDateExpense = (date) => async(dispatch)=>{
    try{
        const token = localStorage ? localStorage.getItem('token') : null;
        
        const response = await fetch(`${host}/api/expense/currentdateexpense`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token
            },
            body: JSON.stringify({date:date})
        });

        const json = await response.json();
        dispatch({type:CURRENTDATEEXPENSE,payload:json})

    }catch(error){
        dispatch({type: FETCH_ERRORS,payload: error.response.data})
    }
}


//Route 5 :::::::::::::::::::::::Get Expense Details with date ::::::::::::::::::::: FROM RReports - Route 1
export const getDateGeneration = (fromDate, toDate) => async (dispatch)=>{
    try{
        const token = localStorage ? localStorage.getItem('token') : null;

        const response = await fetch(`${host}/api/expense/report/dategeneration`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'auth-token':token
            },
            body: JSON.stringify({fromDate:fromDate, toDate:toDate})
        });

        const json = await response.json();
        dispatch({type:REPORTDATEGENERATION,payload:json});

    }catch(error){
        dispatch({type: FETCH_ERRORS,payload: error.response.data})
    }
};

//Route 6 ::::::::::::::::::::::: Add New Users ::::::::::::::::::::::::::::::::::::::: FROM RLogin - Route - 1 
export const addNewUser = (firstName, lastName, email, mobile, password, conPass) => async (dispatch) => {
    try{
        const response = await fetch(`${host}/api/auth/createuser`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstName:firstName, lastName:lastName, email:email, mobile:mobile, password:password, conPass:conPass})
        });

        const json = await response.json();
        return json;

    }catch(error){
        dispatch({type: FETCH_ERRORS,payload: error.response.data})
    }
}