import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./components/Menu";
import './index.css'
import { lazy } from "react";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Cart from "./components/Cart";
// import Grocery from "./components/Grocery";

const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {

  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "Sana",
    };
    setUserName(data.name)
  }, [])

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div>
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/Contact", element: <Contact /> },
      { path: "/grocery", element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense> },
      { path: "/restaurants/:resId", element: <Menu /> },
      { path: "/cart", element: <Cart/>},
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />
);

export default App;