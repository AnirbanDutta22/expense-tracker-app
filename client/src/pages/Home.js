import { Button, Typography } from "@material-tailwind/react";
import Layout from "../Layout/Layout";

export default function Home() {
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
            Here at we focus on markets where technology, innovation, and
            capital can unlock long-term value and drive economic growth.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Button variant="gradient" size="lg" className="inline-block">
              <span>Learn more</span>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
