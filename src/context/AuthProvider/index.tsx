import React, { createContext, useContext, useEffect, PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@services/api";
import privateRoutes from "@router/routes/private";
import { AuthProviderProps, IAuthContextType } from "@interfaces/index";

const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

export function AuthProvider({ children }: PropsWithChildren<AuthProviderProps>) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isPrivateRoute = (pathname: string) => privateRoutes.some(route => route.path === pathname);
  useEffect(() => {
    const checkAuth = async () => {
      const hasLogin = await api.login.isAuthenticated();
      if (!hasLogin && isPrivateRoute(pathname)) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const authContextValue: IAuthContextType = {
    isAuthenticated: api.login.isAuthenticated(),
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export function useAuth(): IAuthContextType {
  return useContext(AuthContext);
}
