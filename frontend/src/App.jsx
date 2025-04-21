import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <div>My Drive</div> },
  { path: "/register", element: <div>Register Page</div> },
  { path: "/login", element: <div>Login Page</div> },
  { path: "/directory/:dirId", element: <div>Directory View</div> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
