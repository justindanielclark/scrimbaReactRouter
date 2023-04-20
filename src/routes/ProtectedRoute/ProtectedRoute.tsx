import loggedInStatus from "../../server/loggedInStatus"; // Mocks Auth
import { Outlet, redirect } from "react-router-dom";

async function loader() {
  if (!loggedInStatus) {
    console.log("hit in loader");
    redirect("/login");
    return redirect("/login");
  }
  return null;
}

function ProtectedRoute() {
  return <Outlet />;
}

export { loader };
export default ProtectedRoute;
