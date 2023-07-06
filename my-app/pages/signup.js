import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'
// import { authenticateUser } from "../lib/authenticate";


export default function Signup(props) {
    const [warning, setWarning] = useState("");
    const [adminPassword, setAdminPassword] = useState(undefined);
    const router = useRouter();

    const {register, watch, getValues, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
        userName: "",
        fullName: "",
        password: "",
        password2: "",
        role:""
    }});

    const watchRole = watch("role", undefined);

    async function submitSignUp(data, e) {
        const {userName, fullName, password, password2, role} = data;
        try{
            if (role === 'user' || role === 'admin'&& adminPassword === '123') {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
                    method: `POST`,
                    body: JSON.stringify({
                        userName: userName,
                        fullName: fullName,
                        role: role,
                        password:  password,
                        password2:  password2
                    }),
                    headers: {
                        'content-type': 'application/json',
                    },
                });
                const data = await res.json();
                if(res.status === 200) {
                    router.push("/login");
                } else  {
                    throw new Error(data.message);
                }
            }
            else {
                throw new Error("Please provide valid admin password!");
            }
        }catch(err){
            setWarning(err.message);
        }
    }

    return (
    <div style={{ maxWidth: "50%", margin: "0 auto"}}>
        <Card bg="light">
            <Card.Body style={{textAlign: "center"}}>
            <h2>Create your Account</h2>
            </Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit(submitSignUp)}>
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
            </Form.Group>
            <br />
            <Form.Group >
                <strong><Form.Label>Full name:</Form.Label></strong>
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
                    {...register("password", {required: true})}
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
                    {...register("password2", {required: true})}
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
                    {...register("role", {required: true})}
                    name="role" 
                    className="mb-3">
                    <option value="user">User</option>
                    <option value="admin">Administrator</option>
                </Form.Select>
            </Form.Group>
            {/* contionally pop admin pwd */}
            {(watchRole === "admin") &&
            <Form.Group>
                <strong><Form.Label>Admin Password</Form.Label></strong>
                <Form.Control
                    // {...register ("adminPassword", {required: true})}
                    type="password"
                    id="adminPwd"
                    name="adminPwd" 
                    className="mb-3"
                    onChange={(e) => {setAdminPassword(e.target.value)}}
                    >
                </Form.Control>
                {(adminPassword === "123")  && <span style={{color: 'blue'}}>You are verified!</span>}
                {(adminPassword === undefined)  && <span style={{color: 'black'}}>Please enter the password</span>}
                {(adminPassword !== undefined && adminPassword !== "123")  && <span style={{color: 'red'}}>Wrong admin password!</span>}
            </Form.Group>}
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