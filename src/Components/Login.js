import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/Common";
function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("dev+kodtest@refunder.se");
  const password = useFormInput("cashback4ever");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    const CLIENT_ID = "aXBob25lOkFsMkwyOFpPeTJvOTFxcnY0alMzNjRJN3Q2UEhVMEEy";
    axios
      .post(
        "https://www.refunder.se/app/user/login",
        {
          username: username.value,
          password: password.value,
          grant_type: "password",
        },
        {
          headers: {
            Authorization: `Basic ${CLIENT_ID}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setUserSession(
          response.data.data.type,
          response.data.data.access_token
        );
        props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div>
      <p>Login</p>
      <div>
        <p>Username</p>
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        <p>Password</p>

        <input type="text" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
        </>
      )}

      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
