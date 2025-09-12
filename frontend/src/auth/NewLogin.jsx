import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";
import { CUSTOM_API_URL, getMe } from "../http";

export default function LoginForm() {
  const [data, setData] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get token
    const response = await fetch(`${CUSTOM_API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: e.target.username.value,
        password: e.target.password.value,
      }).toString(),
    });
    const resData = await response.json();

    if (response.status === 401) {
      setData(resData);
    }

    if (!response.ok) {
      throw new Error(resData.message || "error occured");
    }

    localStorage.setItem("token", resData.access_token);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 30);
    localStorage.setItem("expiration", expiration.toISOString());

    const user = await getMe();
    await login(user, resData.access_token);
    navigate("/");
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h3>Login</h3>
          {data && <p className="alert alert-danger">{data.detail}</p>}
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control form-control-sm"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-sm"
              />
            </div>
            <button type="submit" className="btn btn-sm btn-secondary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
