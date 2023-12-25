// import { Link, NavLink } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogOut = () => {
    logout().then();
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="mr-2">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="mr-2">
          About
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/user" className="mr-2">
              Tasks
            </NavLink>
          </li>

          <li>
            <button onClick={handleLogOut} className="font-bold text-red-600">
              Logout
            </button>
          </li>
        </>
      )}

      {!user && (
        <li>
          <NavLink to="/login" className="mr-2">
            Login
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="bg-white border-b">
      <div className="navbar max-w-screen-2xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <div className="text-xl font-bold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 49 49"
                fill="none"
              >
                <path
                  d="M36.79 15.2999C37.2381 15.2262 37.696 15.3704 38.0224 15.6875C41.817 19.3773 43.9068 24.3155 43.9068 29.5926C43.9068 40.2938 35.2012 48.9999 24.5006 48.9999C15.649 48.9999 7.92726 43.0071 5.72274 34.4267C5.30499 32.7988 5.0932 31.1725 5.0932 29.5926C5.0932 26.4914 5.81767 23.5101 7.24652 20.7319C8.65269 18.0007 10.7204 15.609 13.2262 13.8149C13.2408 13.8045 13.2556 13.7943 13.2706 13.7844C13.3629 13.7235 13.4615 13.6513 13.5659 13.5749L13.5767 13.567C13.5873 13.5593 13.5979 13.5515 13.6085 13.5438C13.6503 13.5132 13.6921 13.4826 13.7341 13.4523C17.7185 10.6011 20.221 6.18114 20.6036 1.32287C20.6413 0.843395 20.9167 0.414741 21.3371 0.180938C21.7575 -0.0527691 22.2666 -0.0605211 22.694 0.160266C27.6021 2.69707 31.2053 7.21818 32.5794 12.5643C32.9974 14.1919 33.2092 15.8182 33.2092 17.3985C33.2092 18.2221 33.1555 19.0435 33.0488 19.8601C34.1191 18.7297 35.0289 17.451 35.7451 16.0596C35.9533 15.6552 36.341 15.3733 36.79 15.2999ZM23.8162 35.7243C27.1045 35.7243 29.7702 33.0586 29.7702 29.7702C29.7702 26.4819 27.1045 23.8162 23.8162 23.8162C20.5279 23.8162 17.8621 26.4819 17.8621 29.7702C17.8621 33.0586 20.5279 35.7243 23.8162 35.7243Z"
                  fill="#4734C0"
                />
              </svg>
              <span className="mt-2">TaskCrafter</span>
            </div>
          </Link>
        </div>
        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          <label className="btn btn-ghost btn-circle avatar ">
            <div className="w-14 rounded-full ">
              {user && (
                <img
                  alt={user?.displayName}
                  src={user?.photoURL}
                  className="w-full object-cover"
                />
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
