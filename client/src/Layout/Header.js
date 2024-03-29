import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useSelector((store) => store.app.users);
  console.log(user);
  return (
    <div className="py-2 lg:py-4 shadow-md">
      <div className="px-12 flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Expense Tracker
        </Typography>
        <div className="flex items-center gap-x-1">
          {!user ? (
            <Link to="/login">
              <Button variant="gradient" size="lg" className="inline-block">
                <span>Sign in</span>
              </Button>
            </Link>
          ) : (
            <>
              <span className="capitalize">
                Hi, {user.name.split(" ")[0]} !
              </span>
              <Link to="#">
                <UserCircleIcon className="ml-4 w-10 h-10" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
