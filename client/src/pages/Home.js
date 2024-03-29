import { Button, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

export default function Home() {
  const user = useSelector((store) => store.app.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <Layout>
      <section className="mt-36 h-auto">
        <div className="py-8 mx-auto max-w-screen-xl text-center lg:py-16">
          <Typography
            as="h1"
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          >
            Keep track of your daily expenses
          </Typography>
          <p className="mb-8 text-lg font-normal text-black lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Welcome to the Expense Tracker App! This is a MERN stack based
            application designed to help you keep track of your expenses easily
            and efficiently.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              to="https://github.com/AnirbanDutta22/expense-tracker-app"
              target="_blank"
            >
              <Button
                variant="gradient"
                size="lg"
                className="inline-block capitalize"
              >
                <span>Github</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
