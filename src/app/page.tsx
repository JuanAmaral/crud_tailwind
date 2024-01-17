"use client";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/userContext";
import Manager from "./manager";

export default function Home() {
  return (
    <main>
      <UserProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          transition={Slide}
          theme={"colored"}
          limit={1}
        />
        <Manager />
      </UserProvider>
    </main>
  );
}
