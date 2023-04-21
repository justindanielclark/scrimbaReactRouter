import React from "react";
import { useRouteError } from "react-router-dom";
import RouteError from "../types/RouteError";

function ErrorPage() {
  const error = useRouteError() as RouteError;
  return (
    <main className="flex-1 flex flex-col mt-10">
      <div className="mx-auto w-fit">
        <h1 className="font-bold text-lg">An Error Has Occurred</h1>
        <p className="ml-2">{error.message}</p>
      </div>
    </main>
  );
}

export default ErrorPage;
