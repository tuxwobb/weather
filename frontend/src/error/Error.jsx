import { Link } from "react-router-dom";

export default function Error({ message }) {
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            {message && <h3>{message}</h3>}
            {!message && <h3>Error occured</h3>}
            <p>
              Please go back to <Link to="/">home page</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
