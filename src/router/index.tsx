import { BrowserRouter } from "react-router-dom";
import { Renderer } from "./renderer";
import { AuthProvider } from "@context/AuthProvider";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Renderer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
