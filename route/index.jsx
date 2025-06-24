import { createBrowserRouter } from 'react-router-dom';
import EventPage from '../src/pages/EventPage';
import EventDetail from '../src/pages/EventDetail';
import Login from '../src/pages/Auth/Login';
import PrivateRoute from '../src/pages/Auth/PrivateRoute';
import DashboardPage from '../src/pages/Auth/DashboardPage';

// ... add other pages

const router = createBrowserRouter([
  {
    path: "/",
    element: <EventPage/>,
  },
  
   {
  path: "/event/:id",
  element: <EventDetail />,

  },
  {
    path:"/login",
    element:<Login/>
  },
  {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardPage />
    </PrivateRoute>
  ),
}


]);

export default router;
