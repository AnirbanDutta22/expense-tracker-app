import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className=" min-h-screen flex flex-grow items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl w-[calc(100vw-50%)]">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for could not be found.
        </p>
        <Link to="/">
          <Button
            variant="gradient"
            size="lg"
            className="inline-block capitalize"
          >
            <span>Go back to Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
