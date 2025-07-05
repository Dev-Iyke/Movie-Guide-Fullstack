import { UserCircleIcon } from "lucide-react";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { AuthContext } from "../../context/features";

const Navbar = () => {
  const options = [
  {
    id: 1,
    name: 'Leanne Graham'
  },
  {
    id: 2,
    name: 'Ervin Howell'
  }
];
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="fixed w-full bg-white py-4">
      <nav className="flex items-center justify-between w-[90%] md:w-[80%] max-w-[1440px] mx-auto">
        <NavLink to={'/'}>
          <div className="w-12 h-12">
            <img
              src="/movie-guide-logo.png"
              alt="movie guide logo"
              className="w-full"
            />
          </div>
        </NavLink>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Log Out
              </Button>
              <NavLink to={"/user"}>
                <UserCircleIcon />
              </NavLink>
            </>
          ) : (
            <Button onClick={() => navigate("/login")}>Sign In</Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
