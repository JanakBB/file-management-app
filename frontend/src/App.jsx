import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import DirectoryView from "./DirectoryView";
import FileUploader from "./useRefDemo1";
import UseRefDemo2 from "./useRefDemo2";

const router = createBrowserRouter([
  { path: "/uploader", element: <FileUploader /> },
  { path: "/", element: <DirectoryView /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/directory/:dirId?", element: <DirectoryView /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
