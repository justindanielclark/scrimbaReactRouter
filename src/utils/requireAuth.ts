import { redirect } from "react-router-dom";

export async function requireAuth(): Promise<Response | null> {
  const isLoggedIn = false;
  console.log("hit here");
  if (!isLoggedIn) {
    console.log("hit here2");
    throw redirect("/login");
  }
  return null;
}
