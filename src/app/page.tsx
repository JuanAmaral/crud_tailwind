import Register from "./pages/register";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        transition={Slide}
        theme={"colored"}
        limit={1}
      />
      <Register />
    </main>
  );
}
