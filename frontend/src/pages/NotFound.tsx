import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export const NotFound = () => (
  <div className="grid min-h-[60vh] place-items-center text-center">
    <div>
      <p className="text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <Link to="/"><Button className="mt-6">Back to dashboard</Button></Link>
    </div>
  </div>
);
