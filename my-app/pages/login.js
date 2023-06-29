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
    <div style={{ maxWidth: "70%", margin: "0 auto"}}>
        <br/>
        <Card bg="light">
            <Card.Body>
            <h2>Login</h2>
            </Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit(submitLogin)}>
            <Form.Group >
                <strong><Form.Label>User:</Form.Label></strong>
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
                <strong><Form.Label>Password:</Form.Label></strong>
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
            <div style={{textAlign: "center"}}>
                <Button 
                variant="secondary" 
                className="pull-right" 
                type="submit"
                style={{width: "50%"}}>
                    Login
                </Button>
            </div>
        </Form>
    </div>
    );
}