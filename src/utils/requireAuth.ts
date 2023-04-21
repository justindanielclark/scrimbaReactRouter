import { redirect } from "react-router-dom";
import loggedInStatus from "../server/loggedInStatus";

export async function requireAuth() {
  if (!loggedInStatus) {
    return redirect(
      "/login?title=Unable To Access Page&message=You Must Login Or Create An Account First"
    );
  }
  return null;
}
