import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

// This meta export provides metadata for this route
// Similar to Angular's route data, but more powerful
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// This default export is the component that will render when this route is active
// No need to register this route elsewhere - the file path itself serves as the route registration
export default function Home() {
  return <Welcome />;
}
