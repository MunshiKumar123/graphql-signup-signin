import React, { useRef } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { Row } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "./Queries";
import { NavLink } from "react-router-dom";

import Main from "./Main";
const SignIn = (props) => {
  const email = useRef();
  const password = useRef();

  const [login, { error, data, loading }] = useLazyQuery(LOGIN_USER, {
    onError: () => {
      console.log("error");
    },

    onCompleted: (data) => {
      if (data) {
        localStorage.setItem("Token", data.login.Token);
        props.history.push("./main");
      }
    },
    fetchPolicy: "no-cache",
  });
  console.log({ error, data });
  // if (loading) return "Loading...";

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    const { email, password } = values;
    console.log({ email, password });
    localStorage.setItem("token", "abcddd");

    login({
      variables: {
        email: email,
        password: password,
      },
    });
  };

  return (
    <>
      <div className="container contact_div pt-1 pb-1 bg-light">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>

      {data ? (
        <Main />
      ) : (
        <div className="container contact_div pt-1 pb-1 bg-light">
          <div className="row">
            <div className="col-md-6 col-10 mx-auto">
              {error && <div className="text-danger">{error.message}</div>}

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mb-1">
                    <label htmlFor="email">Email Address:</label>
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      className="form-control"
                      ref={email}
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone">Password:</label>
                    <Field
                      name="password"
                      id="phone"
                      type="password"
                      className="form-control"
                      ref={password}
                    />
                    <ErrorMessage name="password" />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    SignIn
                  </button>
                </Form>
              </Formik>

              <span>
                <p>
                  <NavLink to="/signup">SignUp</NavLink>
                </p>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
