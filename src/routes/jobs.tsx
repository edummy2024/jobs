import { defer, Form, LoaderFunctionArgs, redirect, useLoaderData, useNavigation, useSearchParams } from "react-router-dom"
import moment from "moment";
import { fakeAuth, fetchJobs, Job } from "../data/jobs"

export async function loader({ request }: LoaderFunctionArgs) {
  const user = fakeAuth.authInfo();
  if (!user) {
    return redirect("/login");
  }

  const searchParams = new URL(request.url).searchParams;
  const location = searchParams.get("location") || "";
  const description = searchParams.get("description") || "";
  const is_remote_work = searchParams.get("remote_work") === "on" ? 1 : 0;
  const page = searchParams.get("page") || 1;
  const jobs = await fetchJobs(location, description, is_remote_work, Number(page));
  return defer({
    jobs
  })
}

export default function JobsRoute() {
  const loader: any = useLoaderData();
  const jobs: Job[] = loader.jobs || [];

  return (
    <main className="px-3 flex flex-col gap-6">
      <FilterJobs />
      <ListJobs jobs={jobs} />
    </main>
  )
}

function ListJobs({ jobs }: { jobs: Job[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const location = searchParams.get("location") || "";
  const description = searchParams.get("description") || "";
  const is_remote_work = searchParams.get("remote_work");
  const page = searchParams.get("page") || 1;
  const nextPage = Number(page)  + 1;

  console.log(page)
  function handleLoadMore() {
    setSearchParams({
      location: location,
      description: description,
      page: nextPage.toString(),
    }) 
  }

  return (
    jobs.length > 0 ?
    <section className="shadow-md bg-white p-3 rounded-md">
      <h1 className="font-bold text-4xl text-gray-600 my-5">Job List</h1>
      <ul>
        {
          jobs.map((job) => (
            <ItemJob job={job} key={job.id} />
          ))
        }
      </ul>
      <button 
        value={page || 1}
        onClick={handleLoadMore}
        className="w-full bg-[#2f7fce] text-white text-xl py-1.5 hover:bg-[#458cd2] font-semibold"
        disabled={navigation.state === "loading"}>{navigation.state === "loading" ? "...Loading" : "Load More"}</button>
    </section>
    : <div className="mx-auto">
    <span >Data not found</span>
    </div>
  )
}

function ItemJob({ job }: { job: Job }) {
  const isWFH = job.is_remote_work === 1;
  return <li className="flex justify-between items-center w-full py-4 border-y">
    <section className="flex flex-col gap-2">
      <h2 className="font-bold text-xl text-[#2f7fce] break-words">{job.title}</h2>
      <span className="text-gray-400">{job.company} - <span className="text-green-600 font-bold">{isWFH ? "Remote" : "Office"}</span></span>
    </section>

    <section className="flex flex-col gap-2 items-end">
      <address className="font-medium text-gray-500">{job.location}</address>
      <time className="text-gray-400">{moment(job.created_at).fromNow()}</time>
    </section>
  </li>
}

function FilterJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const location = searchParams.get("location") || "";
  const description = searchParams.get("description") || "";
  const is_remote_work = searchParams.get("remote_work");
  
  function handleKeyDown(e:  React.KeyboardEvent<HTMLInputElement>) {
    return e.key === "Enter" ? e.preventDefault(): true;
  }
  
  return (
    <Form className="flex items-center gap-4 flex-wrap">
      <section className="flex flex-col gap-1.5 w-full max-w-[440px]">
        <label
          htmlFor="description"
          className="font-semibold text-gray-800">Job Description</label>
        <input
          id="description"
          type="text"
          name="description"
          defaultValue={description}
          placeholder="Filter by title"
          className="border p-2 w-full shadow-md"
          onKeyDown={handleKeyDown}
        />
      </section>

      <section className="flex flex-col gap-1.5 w-full max-w-[440px]">
        <label
          htmlFor="location"
          className="font-semibold text-gray-800">Location</label>
        <input
          id="location"
          type="text"
          defaultValue={location}
          name="location"
          placeholder="Filter by city"
          className="border p-2 w-full shadow-md"
          onKeyDown={handleKeyDown}
        />
      </section>

      <section>
        <input
          id="remote-work"
          type="checkbox"
          name="remote-work"
          defaultChecked={is_remote_work === "true"}
        />
        <label
          htmlFor="remote-work"
          className="font-semibold text-gray-800 ml-1.5">
          remote work
        </label>
      </section>

      
        <button className="font-semibold text-white py-1.5 px-4 bg-gray-400 hover:bg-gray-500 rounded-sm" disabled={navigation.state === "loading"}>{navigation.state === "loading" ? "...Loading" : "Search"}</button>
    </Form>
  )
}
