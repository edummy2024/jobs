import { redirect } from "react-router-dom";
import { fakeAuth } from "../data/jobs";

export function action() {
  fakeAuth.logout();
  return redirect("/login");
}