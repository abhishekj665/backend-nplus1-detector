import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar({ open, setOpen }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="border-b border-gray-200"
      style={{ backgroundColor: "white", color: "black" }}
    >
      <Toolbar className="h-16 px-4 flex justify-between">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <IconButton onClick={() => setOpen(!open)}>
              <MenuIcon />
            </IconButton>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button className="hover:text-black">Dashboard</button>
          <button className="hover:text-black">Analyzer</button>
          <button className="hover:text-black">Jobs</button>
          <button className="hover:text-black">Reports</button>
          <button className="hover:text-black">Docs</button>
        </div>

        <div className="flex items-center gap-3">
          <Button className="normal-case text-gray-700">New Analysis</Button>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
