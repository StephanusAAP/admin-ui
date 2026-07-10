import React, { useContext, useEffect, useState } from "react";
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { logoutService } from "../../Service/authService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function MainLayout(props) {
  const { children } = props;

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme-mode") === "dark",
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      localStorage.setItem("theme-mode", nextMode ? "dark" : "light");
      return nextMode;
    });
  };

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    {
      id: 3,
      name: "Transaction",
      icon: <Icon.Transaction />,
      link: "/transaction",
    },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutService();
      setTimeout(() => {
        logout();
        setIsLoggingOut(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        logout();
      }
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div
        className={`flex min-h-screen ${theme.name} ${isDarkMode ? "dark bg-[#191919] text-white" : "bg-white text-black"}`}
      >
        <aside
          className="bg-defaultBlack w-28 sm:w-64 text-special-bg2
        flex flex-col justify-between px-7 py-12"
        >
          <div>
            <div className="mb-10">
              <Logo variant="secondary" />
            </div>
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="my-4 hidden sm:block">
            <span className="text-xs text-gray-400 block mb-2">Themes</span>
            <div className="flex items-center gap-2">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110`}
                  onClick={() => setTheme(t)}
                ></div>
              ))}

              <button
                onClick={toggleDarkMode}
                className="text-gray-400 hover:text-white ms-1 cursor-pointer transition-transform hover:scale-120"
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <div onClick={handleLogout} className="cursor-pointer">
              <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout />
                </div>
                <div className="ms-3 hidden sm:block">Logout</div>
              </div>
            </div>
            <div className="border my-10 border-b-special-bg"></div>
            <div className="flex justify-between items-center">
              <div>Avatar</div>
              <div className="hidden sm:block">
                Username
                <br />
                <div>{user.name}</div>
                <div>View Profile</div>
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={15} />
              </div>
            </div>
          </div>
        </aside>

        <div
          className={`flex-1 flex flex-col ${isDarkMode ? "bg-[#1F1F1F] text-white" : "bg-special-mainBg text-black"}`}
        >
          <header
            className={`border-b px-6 py-7 flex justify-between items-center ${isDarkMode ? "border-zinc-800 bg-[#1F1F1F]" : "border-gray-05 bg-white"}`}
          >
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6">{user.name}</div>
              <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="me-10">
                <NotificationsIcon className="text-primary scale-110" />
              </div>
              <Input
                backgroundColor={isDarkMode ? "bg-[#2D2D2D]" : "bg-white"}
                border={isDarkMode ? "border-zinc-700" : "border-white"}
              />
            </div>
          </header>

          <main
            className={`flex-1 px-6 py-4 ${isDarkMode ? "[&_.bg-white]:bg-[#2D2D2D] [&_.text-black]:text-white [&_.border-gray-05]:border-zinc-700" : ""}`}
          >
            {children}
          </main>
        </div>
      </div>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoggingOut}
      >
        <div className="flex flex-col items-center gap-2">
          <CircularProgress color="inherit" size={50} />
          <span className="text-white font-bold text-sm">Logging out...</span>
        </div>
      </Backdrop>
    </>
  );
}

export default MainLayout;
