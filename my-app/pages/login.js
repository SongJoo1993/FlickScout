import { Card, Form, Alert, Button } from "react-bootstrap";
import Link from "next/link"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'
import { authenticateUser } from "../lib/authenticate";


export default function Login(props) {
    // const [user, setUser] = useState("");
    // const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
        userName: "",
        password: ""
    }
    });

    async function submitLogin(data, e) {
        const {userName, password} = data;
        try{
            await authenticateUser(userName, password);
            router.push("/");
        }
        catch(err){
            console.log("sign in error:", err);
            setWarning(err.message);
        }
    }

    return (
    <div style={{ maxWidth: "50%", margin: "0 auto"}}>
        <br/>
        <Card bg="light">
            <Card.Body style={{textAlign: "center"}}>
            <h2>Welcome! Please sign in.</h2>
            </Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit(submitLogin)}>
            <Form.Group >
                <strong><Form.Label>Username:</Form.Label></strong>
                <Form.Control 
                {...register("userName", {required: true})}
                type="text" 
                // value={user} 
                id="userName" 
                name="userName" 
                // onChange={e => setUser(e.target.value)}
                />
                {/* Form Validation to be worked! */}
                {errors.userName?.type === "required" && 
                <span style={{color: 'red'}}>Please enter your username.</span>}
            </Form.Group>
            <br />
            <Form.Group>
                <strong><Form.Label>Password:</Form.Label></strong>
                <Form.Control
                    {...register("password",{required: true})}
                    type="password" 
                    // value={password} 
                    id="password" 
                    name="password" 
                    // onChange={e => setPassword(e.target.value)} 
                    />
                    {errors.password?.type === "required" && 
                <span style={{color: 'red'}}>Please enter your password.</span>}
            </Form.Group  >
            {warning && (<>
            <br />
            <Alert variant='danger'>
                {warning}
            </Alert>
            </>)}
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
        <br/>
        <p style={{textAlign: "center"}}>
        Need a new <Link href="/signup">account</Link>?
        </p>
    </div>
    );
}