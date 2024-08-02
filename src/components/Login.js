import React, { useEffect, useRef, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Signup from './Signup';

const Login = (props) => {
    useEffect(()=>{
        
        // eslint-disable-next-line
    },[])

    const history = useNavigate();
    const host = process.env.REACT_APP_HOST;

    const localemail = localStorage ? localStorage.getItem('email'):null;
    const localpassword = localStorage ? localStorage.getItem('password'):null;
    const localrememberMe = localStorage ? localStorage.getItem('rememberMe'):null;
    
    ////////////////// For set the value in the text box////////////////////////////////////////////////
    const [credentials, setCredentials] = useState({
        email:localemail || "",
        password:localpassword || "" ,
        rememberMe:JSON.parse(localrememberMe) || false,   
    });

    const {email, password, rememberMe} = credentials;

    const onChangeMethod = (e) =>{
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setCredentials({ ...credentials, [name]: newValue });
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
                if(rememberMe){
                    localStorage.setItem('email',email);
                    localStorage.setItem('password',password);
                    localStorage.setItem('rememberMe', rememberMe);
                }
                history('/expense')
            }
            else{
                props.showAlert('error',error)
            }
        }catch(error){
            throw error.message
        }
        
    }

    ////////////////////// END////////////////////////////////////////////////////////////////////////

    ///////////////////// Signup ////////////////////////////////////////////////////////////////////

    const ref = useRef(null);

    const openSignUp = () =>{
        ref.current.click();
    }

    ////////////////////// END ///////////////////////////////////////////////////////////////////


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
                                <input className="form-check-input" type="checkbox" id="rememberMe" name="rememberMe" onChange={onChangeMethod} value={rememberMe} checked={rememberMe}/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <div className='mb-3 d-flex justify-content-between'>
                            <button type="button" className="btn btn-outline-secondary" onClick={handleClickLogin}>Login</button>
                            <Link className="nav-link text-primary" type="submit" to="/"> Lost Password </Link>
                            <button className="nav-link text-primary" type="submit" onClick={openSignUp}> SignUp </button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Signup clickbtn={ref} showAlert = {props.showAlert}></Signup>
        </>
    )
}


export default Login
