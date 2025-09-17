import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { checkRole } from "../helpers";

export default function MainNavigation() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    return navigate("/login");
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">
        <NavLink to="/" className="navbar-brand" end>
          Bobkovo-fun.cz
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
          <div className="navbar-nav">
            <NavLink to="/" className="nav-link" aria-current="page" end>
              Home
            </NavLink>

            <NavLink to="/weather" className="nav-link" aria-current="page" end>
              Weather
            </NavLink>

            <NavLink to="/blog" className="nav-link" aria-current="page" end>
              Blog
            </NavLink>

            {checkRole(user, "files") && (
              <NavLink
                to="/files"
                className="nav-link disabled"
                aria-current="page"
                end
              >
                Files
              </NavLink>
            )}

            {checkRole(user, "gallery") && (
              <NavLink
                to="/gallery"
                className="nav-link disabled"
                aria-disabled="true"
                aria-current="page"
                end
              >
                Gallery
              </NavLink>
            )}

            {checkRole(user, "admin") && (
              <NavLink to="/users" className="nav-link" aria-current="page" end>
                Users
              </NavLink>
            )}

            {!token && (
              <NavLink to="/login" className="nav-link" aria-current="page" end>
                Login
              </NavLink>
            )}

            {token && (
              <NavLink
                to="/profile"
                className="nav-link"
                aria-current="page"
                end
              >
                Profile
              </NavLink>
            )}

            {token && (
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
