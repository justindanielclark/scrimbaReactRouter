import React, { useState } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  Form,
  ActionFunctionArgs,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import API from "../../api/API";
import LoginCredentials from "../../types/LoginCredentials";

type FormSubmitStatus = "idle" | "submitting";
type loaderData = {
  title: string | null;
  message: string | null;
};
type actionData = {
  message: string;
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

async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formDataEmail = formData.get("email");
  const formDataPassword = formData.get("password");
  const credentials: LoginCredentials = {
    email: formDataEmail ? formDataEmail.toString() : "",
    password: formDataPassword ? formDataPassword.toString() : "",
  };
  return await API.loginUser(credentials)
    .then((data) => {
      localStorage.setItem("loggedIn", "true");
      return redirect("/host");
    })
    .catch((err) => {
      return { message: "Invalid Credentials, Please Try Again" };
    });
}

function Login() {
  const navigation = useNavigation();
  const loaderData = useLoaderData() as loaderData;
  const actionData = useActionData() as actionData | null;

  return (
    <main className="flex flex-1 flex-col justify-center items-center">
      <div className="max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Sign In to your account
        </h1>
        {loaderData.title && loaderData.message ? (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center">
              {loaderData.title}
            </h1>
            <h2 className="text-xl font-bold text-center">
              {loaderData.message}
            </h2>
          </div>
        ) : undefined}
        {actionData && actionData.message ? (
          <div className="mb-6">
            <h1 className="text-lg font-bold">{actionData.message}</h1>
          </div>
        ) : undefined}
        <Form className="text-lg" method="post" replace={true}>
          <div className="border-2 border-gray-400 rounded overflow-hidden mb-6">
            <input
              type="email"
              name="email"
              className="p-2 border-b-2 border-gray-400 w-full"
              placeholder="Email Address"
            />
            <input
              type="password"
              name="password"
              className="p-2 w-full"
              min={6}
              placeholder="Password"
            />
          </div>

          <button
            className={`text-white p-2 rounded w-full text-center transition-colors duration-500 ${
              navigation.state === "idle" ? "bg-orange-500" : "bg-grey-400"
            }`}
            disabled={navigation.state !== "idle"}
          >
            {navigation.state === "idle" ? "Log In" : "Logging In..."}
          </button>
        </Form>
      </div>
    </main>
  );
}

export default Login;
export { loader, action };
