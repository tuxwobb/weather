import MainNavigation from "../navigation/MainNavigation";
import { Link } from "react-router-dom";

export default function PageNotFoundError() {
  return (
    <>
      <MainNavigation />
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <h3>Page not found</h3>
            <p>
              Please go back to <Link to="/">home page</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
