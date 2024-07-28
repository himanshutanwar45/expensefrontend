import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Login = ({showAlert}) => {
    useEffect(()=>{
        
        // eslint-disable-next-line
    },[])

    const history = useNavigate();
    const host = process.env.REACT_APP_HOST;
    
    ////////////////// For set the value in the text box////////////////////////////////////////////////
    const [credentials, setCredentials] = useState({
        email:"",
        password:""    
    });

    const {email, password} = credentials;

    const onChangeMethod = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    ////////////////////// END///////////////////////////////////////////////////////////////////

    ////////////////// Login Users///////////////////////////////////////////////////////////
    const handleClickLogin = async () =>{
        try{
            const response = await fetch(`${host}/api/auth/loginuser`,{ //from RLogins - Route 2
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email,password: password})
            });
    
            const result = await response.json();
            const {success, error} = result;          
            if(success){
                localStorage.setItem('token',error)
                history('/expense')
            }
            else{
                showAlert('error',error)
            }
        }catch(error){
            throw error.message
        }
        
    }

    ////////////////////// END////////////////////////////////////////////////////////////////////////
    return (
        <>
            <div className="container" >
                <div className="row">
                   
                    <div className="col p-3 my-2" style={{ backgroundColor: "white", boxShadow: "0 2px 12px -2px rgba(0, 0, 0, .15)", borderRadius: "10px" }}>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email Address" onChange={onChangeMethod} value={email} />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={onChangeMethod} value={password} />
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <div className='mb-3 d-flex justify-content-between'>
                            <button type="button" className="btn btn-outline-secondary" onClick={handleClickLogin}>Login</button>
                            <Link className="nav-link text-primary" type="submit" to="/"> Lost Password </Link>
                            <Link className="nav-link text-primary" type="submit" to="/"> SignUp </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}


export default Login
