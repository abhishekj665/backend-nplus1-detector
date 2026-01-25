import { NavLink } from "react-router-dom";
import BoltIcon from "@mui/icons-material/Bolt";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Sidebar({ open, setOpen }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md transition 
     ${isActive ? "bg-gray-300 text-black" : "text-gray-600 hover:text-black"}`;

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 z-50 h-full w-64 bg-[#ded9c9] shadow-md
        flex flex-col p-5 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <h1 className="text-xl font-bold mb-8 text-gray-800">
        <div className="text-lg font-medium flex italic tracking-tight">
          <p>OPTI - CORE</p>
        </div>
      </h1>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/explore"
          onClick={() => setOpen(false)}
          className={linkClass}
        >
          <BoltIcon /> Explore
        </NavLink>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-300 text-sm text-gray-600">
        <a className="hover:underline" href="https://github.com/abhishekj665">
          <GitHubIcon className="text-gray-600 hover:text-gray-700" />
        </a>
        <span className="mx-3">|</span>
        <a
          className="hover:underline"
          href="https://www.linkedin.com/in/abhishek-jevene-2a3b18267/"
        >
          <LinkedInIcon className="text-blue-600 hover:text-blue-700" />
        </a>
        <span className="mx-3">|</span>
        <a
          className="hover:underline"
          href="https://www.instagram.com/abhishek.jawney/"
        >
          <InstagramIcon className="text-red-600 hover:text-red-700" />
        </a>
        <span className="mx-3">|</span>
        <a
          className="hover:underline"
          href="https://www.instagram.com/abhishek.jawney/"
        >
          <TwitterIcon className="text-blue-600 hover:text-blue-700" />
        </a>
      </div>
    </aside>
  );
}
