import React, { useRef } from "react";
// import { ReactDOM } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import { Row } from "react-bootstrap";
import SignIn from "./SignIn";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./Mutations";
import { NavLink } from "react-router-dom";

const SignUp = (props) => {
  const name = useRef();
  const password = useRef();
  const email = useRef();
  const role = useRef();
  const [Signup, { data, loading, error }] = useMutation(CREATE_USER, {
    onError: (error) => {
      // debugger;
      console.log("error");
    },
    onCompleted: (data) => {
      console.log(data);
    },
    fetchPolicy: "no-cache",
  });
  console.log(data);
  if (loading) return "Submitting...";

  const handleSubmit = (values) => {
    // debugger;
    console.log(JSON.stringify(values, null, 2));

    const { name, password, email, role } = values;

    console.log({ name, password, email, role });

    Signup({
      variables: {
        signupUserName: name,
        signupPassword: password,
        signupEmail: email,
        signupRole: role,
      },
    });
  };
  return (
    <>
      <div className="container contact_div pb-1 bg-light">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            {error && <div className="stu1 text-danger">{error.message}</div>}
            {data && (
              <div className="box">
                <div className="logo">&#x2713;</div>
                <h3>Thank You!</h3>
                <p>You details has been successfully submitted. Thanks!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {data ? (
        <SignIn />
      ) : (
        <Formik
          initialValues={{
            name: "",
            password: "",
            email: "",
            role: "",
          }}
          onSubmit={handleSubmit}
        >
          <div className="container contact_div pt-5 pb-5 bg-light">
            <div className="row">
              <div className="col-md-6 col-10 mx-auto">
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name">User Name:</label>
                    <Field
                      name="name"
                      id="name"
                      type="text"
                      className="form-control"
                      ref={name}
                    />
                    <ErrorMessage name="name" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email">Email Address:</label>
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      ref={email}
                      className="form-control"
                    />
                    <ErrorMessage name="email" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password">Password:</label>
                    <Field
                      name="password"
                      id="password"
                      type="password"
                      ref={password}
                      className="form-control"
                    />
                    <ErrorMessage name="password" />
                  </div>

                  <div className="mb-3">
                    <label>Role:</label>
                    <Field name="role" as="select" ref={role}>
                      <option value="1" selected>
                        ---Role----
                      </option>
                      <option value="Director">Director</option>
                      <option value="HOD">HOD</option>
                      <option value="Accountant">Accountant</option>
                      <option value="Admin">Admin</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Support">Support</option>
                      <option value="Student">Student</option>
                    </Field>
                    <ErrorMessage name="Role" />
                  </div>

                  <button className="btn btn-primary" type="submit">
                    SignUp
                  </button>
                </Form>
                <span>
                  <p>
                    <NavLink to="/signIn">SignIn</NavLink>
                  </p>
                </span>
                {/* <hr /> */}
              </div>
            </div>
          </div>
        </Formik>
      )}{" "}
    </>
  );
};
export default SignUp;
