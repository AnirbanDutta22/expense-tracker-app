import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../features/users/userSlice";
import { API_END_POINT } from "../utils/constants";

export default function AuthLayout(props) {
  const [serverErrors, setServerErrors] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    try {
      const res = await axios.post(
        `${API_END_POINT}/${props.target_route}`,
        data,
        { withCredentials: true }
      );
      console.log(res);

      //functionality based on route's hit
      if (props.target_route === "login") {
        dispatch(setUser(res.data.data));
        navigate("/dashboard");
      } else {
        //auto login after signing up
        const { email, password } = data;
        const res = await axios.post(
          `${API_END_POINT}/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        console.log(res);
        dispatch(setUser(res.data.data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setServerErrors(error.response.data.message);
    }
    e.target.reset();
  };

  return (
    <section className="h-screen flex items-center justify-center bg-blue-50">
      <Card color="white" className="p-8 shadow-md" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          {props.formTitle}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {props.formText}
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="mb-1 flex flex-col gap-6">
            {props.user_name && (
              <>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  {props.user_name}
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  placeholder="yourname"
                  className=" !border-t-blue-gray-200"
                  {...register("name", { required: "Name is required" })}
                />
                <p className="text-red-700">{errors.name?.message}</p>
              </>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              {props.user_email}
            </Typography>
            <Input
              type="email"
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Enter an valid email",
                },
              })}
            />
            <p className="text-red-700">{errors.email?.message}</p>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              {props.user_password}
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least of 8 characters",
                },
              })}
            />
            <p className="text-red-700">{errors.password?.message}</p>
          </div>
          {props.tc_text && (
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <Link
                    to="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </Link>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
          )}
          {serverErrors && (
            <p className="text-red-700 text-center text-lg">{serverErrors}</p>
          )}
          <Button className="mt-6" fullWidth type="submit">
            {props.submit_btn}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            {props.route_text}
            <Link to={props.route_link} className="font-medium text-gray-900">
              {props.route_type}
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
}
