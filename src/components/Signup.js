import React, { useState } from 'react'
import { connect } from 'react-redux'
import { 
        addNewUser //Route 6 
    } from '../state/action/action'
const Signup = ({ clickbtn, addNewUser, showAlert } ) => {


    //////////////////// Value add in all textbox /////////////////////////////////////////////
    const [credentials, setCredentials] = useState({
        firstName:"",
        lastName:"",
        signemail:"",
        mobile:"",
        signpassword:"",
        conPass:""
    });

    const {firstName, lastName, signemail, mobile, signpassword, conPass} = credentials;

    const onHandleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    //////////////////////// End ////////////////////////////////////////////////////////////


    ////////////////////// Button Click to add users ///////////////////////////////////////

    const handleClick = async () =>{
        try{
            const result = await addNewUser (firstName, lastName, signemail, mobile, signpassword, conPass);
            const {success, error} = result;
            if (success){
                showAlert('success',error)
                setCredentials({
                    firstName:"",
                    lastName:"",
                    signemail:"",
                    mobile:"",
                    signpassword:"",
                    conPass:""
                })
            }
            else{
                showAlert('error',error)
            }
            
        }catch(error){
            throw error.message;
        }
    }

    ////////////////////// End //////////////////////////////////////////////////////////

    return (
        <>
            <button ref={clickbtn} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable bg-body-tertiary p-2">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Signup</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input type="text" className="form-control" id="firstName" name="firstName" placeholder='Enter First Name' onChange={onHandleChange} value={firstName}/>
                            </div>

                            <div className="mb-3">
                                <input type="text" className="form-control" id="lastName" name="lastName" placeholder='Enter Last Name' onChange={onHandleChange} value={lastName}/>
                            </div>

                            <div className="mb-3">
                                <input type="email" className="form-control" id="signemail" name="signemail" placeholder='Enter Email' onChange={onHandleChange} value={signemail}/>
                            </div>

                            <div className="mb-3">
                                <input type="number" className="form-control" id="mobile" name="mobile" placeholder='Enter Mobile' onChange={onHandleChange} value={mobile}/>
                            </div>

                            <div className="mb-3">
                                <input type="password" className="form-control" id="signpassword" name="signpassword" placeholder='Enter Password' onChange={onHandleChange} value={signpassword}/>
                            </div>

                            <div className="mb-3">
                                <input type="password" className="form-control" id="conPass" name="conPass" placeholder='Enter Confirm Password' onChange={onHandleChange} value={conPass}/>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    addnewusers: state.addnewusers,
    error: state.error

})

const mapDispatchToProps = {
    addNewUser
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup)
