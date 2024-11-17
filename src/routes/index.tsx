import { redirect } from "react-router-dom";
import { fakeAuth } from "../data/jobs";

export async function loader() {
  const user = fakeAuth.authInfo();
  if (!user) {
    return redirect("/login");
  }
  return redirect("/jobs");
}