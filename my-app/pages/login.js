import { Card, Form, Alert, Button } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { searchHistoryAtom, favouritesAtom } from "@/store";
import { authenticateUser } from "../lib/authenticate";

export default function Login() {
  const [warning, setWarning] = useState("");
  const [favouritesMovie, setFavouritesMovie] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "test",
      password: "123",
    },
  });
  const watchName = watch("userName")

  async function submitLogIn(data, e) {
    const { userName, password } = data;
    try {
      let userInfo = await authenticateUser(userName, password);
      setFavouritesMovie(userInfo.favourites);
      setSearchHistory(userInfo.history);
      router.push("/");
    } catch (err) {
      console.log("sign in error:", err);
      setWarning(err.message);
    }
  }

  return (
    <div style={{ maxWidth: "50%", margin: "0 auto" }}>
      <br />
      <Card bg="light">
        <Card.Body style={{ textAlign: "center" }}>
          <h2>Welcome</h2>
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit(submitLogIn)}>
        <Form.Group>
          <strong>
            <Form.Label>Username:</Form.Label>
          </strong>
          <Form.Control
            {...register("userName", { required: true })}
            type="text"
            id="userName"
            name="userName"
          />
          {/* Form Validation to be worked! */}
          {errors.userName?.type === "required" && (
            <span style={{ color: "red" }}>Please enter your username.</span>
          )}
        </Form.Group>
        <br />
        <Form.Group>
          <strong>
            <Form.Label>Password:</Form.Label>
          </strong>
          <Form.Control
            {...register("password", { required: true })}
            type="password"
            id="password"
            name="password"
          />
          {errors.password?.type === "required" && (
            <span style={{ color: "red" }}>Please enter your password.</span>
          )}
        </Form.Group>
        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}
        <br />
        <div style={{ textAlign: "center" }}>
          <Button
            variant="secondary"
            className="pull-right"
            type="submit"
            style={{ width: "50%" }}
          >
            Log In
          </Button>
        </div>
      </Form>
      <br />
      {
        getValues("userName") == "admin" ?
        <p style={{ textAlign: "center" }}> 
        <span onClick={() => {          
          setValue("userName","test");
          setValue("password","123");
        }}> Click <strong>here</strong> to try user account!
        </span>
        </p> :
        <p style={{ textAlign: "center" }}>
        <span onClick={() => {          
          setValue("userName","admin");
          setValue("password","123");
        }}> Click <strong>here</strong> to try admin account!
        </span>
        </p>
      }
      <p style={{ textAlign: "center" }}>
        Need a new <Link href="/signup">account</Link>?
      </p>
    </div>
  );
}
