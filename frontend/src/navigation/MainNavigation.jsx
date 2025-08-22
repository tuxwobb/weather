import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">
        <NavLink to="/" className="navbar-brand" end>
          Bobkovo.fun
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/weather"
                className="nav-link"
                aria-current="page"
                end
              >
                Weather
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className="nav-link" aria-current="page" end>
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                aria-disabled="true"
                target="_blank"
                rel="noopener noreferrer"
                href="https://bobkovo.cz/"
              >
                BC API
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
