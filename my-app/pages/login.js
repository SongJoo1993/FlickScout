import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'
// import { authenticateUser } from "../lib/authenticate";


export default function Login(props) {
    const [warning, setWarning] = useState("");
    // const [user, setUser] = useState("");
    // const [password, setPassword] = useState("");
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
        userName: "",
        password: ""
    }
    });

    async function submitLogin(data, e) {
        console.log(data);
        // try{
        // await authenticateUser(user, password);
        // router.push("/");
        // }catch(err){
        // setWarning(err.message);
        // }
    }

    return (
    <>
        <Card bg="light">
            <Card.Body>
            <h2>Login</h2>
            Enter your login information below
            </Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit(submitLogin)}>
            <Form.Group >
                <Form.Label>User:</Form.Label>
                <Form.Control 
                    {...register("userName")}
                    type="text" 
                    // value={user} 
                    id="userName" 
                    name="userName" 
                    // onChange={e => setUser(e.target.value)}
                     />
            </Form.Group>
            <br />
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    {...register("password")}
                    type="password" 
                    // value={password} 
                    id="password" 
                    name="password" 
                    // onChange={e => setPassword(e.target.value)} 
                    />
            </Form.Group  >
            {warning && <>
            <br />
            <Alert variant='danger'>
                {warning}
            </Alert>
            </>}
            <br />
            <Button variant="secondary" className="pull-right" type="submit">Login</Button>
        </Form>
    </>
    );
}