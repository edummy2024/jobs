import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { fakeAuth } from "../data/jobs";

export default function LoginRoute() {
  return (
    <main className="h-screen w-screen bg-gradient-to-b from-gray-200 from-30% to-white to-70% grid place-content-center">
      <article className="w-[450px] border rounded-md shadow-md bg-white p-5">
        <Form method="POST" className="flex flex-col gap-5 text-gray-600">
          <header>
            <h1 className="text-center  text-4xl font-semibold">Login</h1>
          </header>
          <section>
            <label 
            htmlFor="username"
            className="block text-lg mb-2">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username"
              required
              className="block border w-full p-2" />
          </section>

          <section>
            <label 
              htmlFor="password"
              className="block text-lg mb-2"
              >Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required
              className="block border w-full p-2" />
          </section>

          <section>
            <button type="submit" className="w-full bg-blue-400 text-white text-2xl py-2 hover:bg-blue-500 font-semibold">Login</button>
          </section>
        </Form>
      </article>
    </main>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  fakeAuth.login({
    username: formData.get("username") as string
  })
  return redirect("/jobs");
}