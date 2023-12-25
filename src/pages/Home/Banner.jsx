import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="mt-16">
      <div>
        <h1 className="text-6xl font-bold text-center ">
          Stay Organized, Stay Productive: <br /> Manage Tasks Seamlessly.
        </h1>
        <h3 className="text-2xl font-bold text-center mt-6">
          Effortless task management for a more <br /> productive you
        </h3>
        <div className="flex justify-center pt-6">
          <NavLink to={"/dashboard/user"}>
            <button
              type="button"
              className="  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-3 text-center me-2 mb-2"
            >
              {`   Let's Explore`}
            </button>
          </NavLink>
        </div>
        <div className="flex justify-center py-16">
          <img
            src="https://i.ibb.co/1QjY5BY/406793051-7143423119043202-7557431351799963802-n-removebg-preview.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
