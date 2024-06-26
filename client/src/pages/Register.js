import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";

export default function Register() {
  const user = useSelector((store) => store.app.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <AuthLayout
      target_route="register"
      formTitle="Sign up"
      formText="Register and be an Expense Tracker user now !"
      user_name="Your name"
      user_email="Your email"
      user_password="Password"
      tc_text
      submit_btn="Sign up"
      route_text="Already have an account "
      route_link="/login"
      route_type="Sign in"
    />
  );
}
