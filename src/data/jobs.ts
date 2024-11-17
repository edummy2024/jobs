export interface Job {
  application_deadline: string;
  company: string;
  contact: string;
  created_at: string;
  description: string;
  id: number;
  is_remote_work: number;
  job_category: string;
  location: string;
  number_of_opening: number;
  qualifications: string;
  salary_from: number;
  salary_to: number;
  title: string;
  updated_at: string;
}


const API_JOBS = "https://jsonfakery.com/jobs";

export async function fetchJobs(location: string, description: string, is_remote_work?: number, page?: number) {
  const data = await fetch(API_JOBS);
  let jobs: Job[] = await data.json();

  if (location) {
    jobs = jobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
  }

  if (description) {
    jobs = jobs.filter((job) => 
      job.description.toLowerCase().includes(description.toLowerCase()) || job.title.toLowerCase().includes(description.toLowerCase()));
  }

  if (typeof is_remote_work === 'number') {
    jobs = jobs.filter((job) => job.is_remote_work === Number(is_remote_work));
  }
  
  const initPerPage = 9;
  const perPage = page ? initPerPage * page : initPerPage;
  jobs = jobs.slice(0, perPage);
  return jobs;
}

export const fakeAuth = {
  login: (auth: { username: string }) => {
    localStorage.setItem("auth", JSON.stringify(auth))
  },
  authInfo: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  },
  logout: () => {
    localStorage.clear()
  },
}