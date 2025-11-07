import { Navigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// NOTE: We avoid importing `jwt-decode` and `api` at module level so that
// a missing/invalid dependency or runtime error doesn't break the whole
// application on import. Instead we dynamically import them inside the
// functions that need them.

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  //Refreshes access token automatically
  const refreshToken = async () => {
    const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshTokenValue) {
      setIsAuthorized(false);
      return;
    }

    try {
      // dynamic import to avoid module-eval crashes
      const { default: api } = await import("../api");
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshTokenValue,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      // Log for debugging but don't throw — fail closed to login page
      // console.error(error);
      setIsAuthorized(false);
    }
  };

  //Checks if token is needed to be refreshed
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      // dynamically import jwt-decode to avoid import-time issues
      const { default: jwtDecode } = await import("jwt-decode");
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded?.exp;
      const now = Date.now() / 1000;

      if (!tokenExpiration) {
        // Malformed token — try refreshing
        await refreshToken();
        return;
      }

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      // If jwt-decode or anything throws, try refreshing; if that fails
      // we'll set unauthorized so user is redirected to login.
      // console.error(error);
      await refreshToken();
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
