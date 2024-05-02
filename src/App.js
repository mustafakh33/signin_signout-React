import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import {useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from "./pages/signIn/Signin";
import Signup from "./pages/signUp/Signup";
import Home from "./pages/Home/Home.jsx";
import Error404 from './pages/Error404/Error404';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404/>,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
function App() {
  const {theme} = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
