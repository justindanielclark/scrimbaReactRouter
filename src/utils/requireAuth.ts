import { redirect } from "react-router-dom";

export async function requireAuth() {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === null || loggedIn === "false") {
    return redirect(
      "/login?title=Unable To Access Page&message=You Must Login Or Create An Account First"
    );
  }
  return null;
}
