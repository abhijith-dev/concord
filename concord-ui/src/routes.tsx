import { createBrowserRouter } from 'react-router-dom';
import Login from './layouts/Login';
import ChatRoom from './layouts/ChatRoom';
import Home from './layouts/Home';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
        path:'/room',
        element:<ChatRoom />
    },
    {
      path:'/home',
      element:<Home />
    }
  ]);

export default router;  