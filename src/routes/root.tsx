import { Form, json, Outlet, redirect, useLoaderData } from "react-router-dom";
import { fakeAuth } from "../data/jobs";

export async function loader() {
    const user = fakeAuth.authInfo();
  if (!user) {
    return redirect("/login");
  }  

  return json(
    user,
  )
}

export default function RootRoute() {
  const loader: any = useLoaderData();
  
    return (
      <div className="w-screen bg-white">
        <div className="w-full max-w-7xl mx-auto bg-gradient-to-b from-gray-100 from-40% to-white to-60% h-screen">
          <header className="bg-[#2f7fce] py-2 mb-3 flex justify-between px-3 items-center">
            <h1 className="text-3xl text-gray-200 font-bold">GitHub <span className="font-thin">Jobs</span></h1>

            <section className="flex gap-3 items-center text-gray-200">
              <span>Hallo, <i className="font-thin">{loader?.username}</i></span>
              <Form method="POST" action="logout">
              <button 
                type="submit"
                className="px-4 py-1.5 font-semibold bg-red-500 hover:bg-red-600 rounded-sm">Log out</button>
              </Form>
            </section>
          </header>
          <Outlet />
        </div>
      </div>
  )
}
