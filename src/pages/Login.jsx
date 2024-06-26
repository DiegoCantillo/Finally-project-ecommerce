import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { handleSubmit, register } = useForm()
    
    const navigate = useNavigate()

    const sumit = (data) =>{
        axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
            .then(res => {
                navigate("/")
                localStorage.setItem("token", res.data.token)
            })
            .catch(error => {
                if(error.response.status === 404){
                    alert("Credenciales incorrecta")
                }else{
                    console.log(error.response?.data);
                }
            })
    }


    return (
        <div className='div--contain__login'>

            <h3>Welcome! Enter your email and password to continue</h3>
            <Form onSubmit={handleSubmit(sumit)}>
                <div className='datas'>
                    <h3>Test data</h3>
                    <p><b><i class="fa-regular fa-envelope"></i>:</b> diegocanti@gmail.com</p>
                    <p><b><i class="fa-solid fa-lock"></i>:</b> probando123</p>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {... register("email")}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {... register("password")}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;