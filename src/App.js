import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register.jsx';
import Layout from './components/Layout/Layout.jsx';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ProtectRoute from './components/ProtectRoute/ProtectRoute.jsx';
import InverseProtectRoute from './components/InverseProtectRoute/InverseProtectRoute.jsx';

function App() {




  let routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <InverseProtectRoute><Register /></InverseProtectRoute> },
        { path: '/login', element: <InverseProtectRoute><Login /></InverseProtectRoute> },
        { path: '/home', element: <ProtectRoute><Home /></ProtectRoute> },
      ]
    }
  ])




  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
