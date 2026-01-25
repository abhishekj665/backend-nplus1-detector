import { useState } from "react";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { user } = useSelector((state) => {
    console.log(state);
    return state.auth;
  });

  const [open, setOpen] = useState(false);

  console.log(user);

  return (
    <div className="flex h-[96vh] bg-gray-100 relative">
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar open={open} setOpen={setOpen} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
