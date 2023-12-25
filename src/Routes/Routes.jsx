import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/Layout/MainLayout";
import Home from "../pages/Home/Home";
import DashboardLayout from "../pages/Layout/DashboardLayout";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import Error from "../pages/shared/Error/Error";
import Test from "../pages/test/test";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddNewTask from "../pages/Dashboard/AddNewTask/AddNewTask";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    errorElement: <Error></Error>,
    element: <DashboardLayout></DashboardLayout>,
    children: [
      //Admin Routes

      //User Routes
      {
        path: "user",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "addNewTask",
        element: <AddNewTask></AddNewTask>,
      },
    ],
  },

  {
    path: "/test",
    element: <Test></Test>,
  },
]);

export default router;
