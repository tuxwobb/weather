import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user.isAuthenticated) {
          return <Redirect to="/login" />;
        }

        if (roles && roles.indexOf(user.role) === -1) {
          return <Redirect to="/unauthorized" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default RoleProtectedRoute;
