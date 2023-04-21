import React, { useState } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";

type loaderData = {
  title: string | null;
  message: string | null;
};

function loader({ request }: LoaderFunctionArgs): loaderData {
  const urlSearchParams = new URL(request.url).searchParams;
  const titleParams = urlSearchParams.get("title");
  const messageParams = urlSearchParams.get("message");
  const returnable: loaderData = {
    title: titleParams,
    message: messageParams,
  };
  return returnable;
}

function Login() {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  const data = useLoaderData() as loaderData;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserLoginInfo((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <main className="flex flex-1 flex-col justify-center items-center">
      <div className="max-w-lg w-full">
        {data.title && data.message ? (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center">{data.title}</h1>
            <h2 className="text-xl font-bold text-center">{data.message}</h2>
          </div>
        ) : undefined}
        <h1 className="text-4xl font-bold mb-6 text-center">
          Sign In to your account
        </h1>
        <form className="text-lg">
          <div className="border-2 border-gray-400 rounded overflow-hidden mb-6">
            <input
              type="email"
              name="email"
              className="p-2 border-b-2 border-gray-400 w-full"
              placeholder="Email Address"
              value={userLoginInfo.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="p-2 w-full"
              min={6}
              placeholder="Password"
              value={userLoginInfo.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded w-full text-center"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
export { loader };
