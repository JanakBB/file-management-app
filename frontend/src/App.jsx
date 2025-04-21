import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const router = createBrowserRouter([
  { path: "/", element: <div>My Drive</div> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/directory/:dirId", element: <div>Directory View</div> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
