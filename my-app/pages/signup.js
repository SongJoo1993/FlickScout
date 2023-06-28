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
        fullName: "",
        password: "",
        password2: "",
        role:""
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
        <br />
        <Card bg="light">
            <Card.Body>
            <h2>Create account</h2>
            </Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit(submitLogin)}>
            <Form.Group >
                <strong><Form.Label>User ID:</Form.Label></strong>
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
            <Form.Group >
                <strong><Form.Label>Your name:</Form.Label></strong>
                <Form.Control 
                    {...register("fullName")}
                    type="text" 
                    // value={user} 
                    id="userName" 
                    name="fullName" 
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
                    />
            </Form.Group  >
            <br />
            <Form.Group>
                <strong><Form.Label> Re-enter password:</Form.Label></strong>
                <Form.Control
                    {...register("password2")}
                    type="password" 
                    // value={password} 
                    id="password" 
                    name="password2" 
                    />
            </Form.Group  >
            <br />
            <Form.Group>
                <strong><Form.Label>Role</Form.Label></strong>
                <Form.Select 
                    {...register("role")}
                    name="role" 
                    className="mb-3">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </Form.Select>
            </Form.Group>
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
                style={{width: "50%"}}
                >Sign Up
                </Button>
            </div>
        </Form>
    </div>
    );
}