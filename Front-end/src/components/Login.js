import React, { useState } from 'react';
import '../index.css';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
}
    from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Loggedin Successfully!", "success");
        }
        else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit} >
            <MDBContainer fluid className='my-5'>

                <MDBRow className='g-0 align-items-center'>
                    <MDBCol col='6'>

                        <MDBCard className='my-5 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                            <MDBCardBody className='p-5 shadow-5 text-center'>

                                <h2 className="fw-bold mb-5">Login</h2>

                                <MDBInput wrapperClass='mb-4' id='email' type='email' name="email" value={credentials.email} onChange={onChange} placeholder='Email' />
                                <MDBInput wrapperClass='mb-4' id='password' type='password' name="password" value={credentials.password} onChange={onChange} placeholder='Password' />


                                <MDBInput type="submit" value="Sign in" />
                                <br />

                                <div className="text-center">

                                    <p>or Sign in with:</p>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='facebook-f' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='twitter' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='google' size="sm" />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                        <MDBIcon fab icon='github' size="sm" />
                                    </MDBBtn>

                                </div>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol col='6'>
                        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" class="w-100 rounded-4 shadow-4"
                            alt="" fluid />
                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </form>

    )
}

export default Login