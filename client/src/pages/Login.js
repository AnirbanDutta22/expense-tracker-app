import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";

export default function Login() {
  const user = useSelector((store) => store.app.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <AuthLayout
      target_route="login"
      formTitle="Sign in"
      formText="Welcome back !"
      user_email="Your email"
      user_password="Password"
      submit_btn="Sign in"
      route_text="Account not created yet ? "
      route_link="/register"
      route_type="Sign up"
    />
  );
}
