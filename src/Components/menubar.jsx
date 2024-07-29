import { useNavigate } from "react-router-dom";
import { isAdminLoggedIn, isUserLoggedIn, userLogout } from "../helper/auth";
import { useAppContext } from "../Context/AppContext";

// MenuBar
export function MenuBar() {
    const navigate = useNavigate();
    const { loggedInUser } = useAppContext();

    // Logout Handling
    function handleLogout(e) {
        e.preventDefault();
        navigate("/")
        userLogout();
    };

    return (
        <>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    { isUserLoggedIn() || isAdminLoggedIn() ?
                    (
                    
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                        <li>
                        <a>Report</a>
                        <ul className="p-2">
                            <li><button onClick={() => navigate("/user/urlsdashboard")}>DashBoard</button></li>
                            <li><button onClick={() => navigate("/user/savedurlscardview")}>URLs Cards View</button></li>
                            <li><button onClick={() => navigate("/user/savedurlstableview")}>URLs Tables List View</button></li>
                        </ul>
                        </li>
                    </ul>
                    ):("")
                    }
                </div>
                <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>URL Shortener</a>
            </div>
            { isUserLoggedIn() || isAdminLoggedIn() ?
            (
            <div className="navbar-center hidden lg:flex">
                <div className="group relative cursor-pointer p-1">
                    <div className="flex items-center justify-between space-x-5 bg-white px-4 rounded-lg">
                        <a className="menu-hover my-1 py-1 text-base font-medium text-black lg:mx-4" onClick={()=>""}>
                            Reports
                        </a>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" className="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </div>
                    <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                        <a onClick={() => {navigate("/user/urlsdashboard")}} 
                            className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                            >
                            DashBoard
                        </a>
                        <a onClick={() => {navigate("/user/savedurlscardview")}}
                            className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                            >
                            URLs Cards View
                        </a>
                        <a onClick={() => {navigate("/user/savedurlstableview")}}
                            className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                            >
                            URLs Tables List View
                        </a>
                    </div>
                </div>
            </div>
            ):("")
            }
            <div className="navbar-end">
                { isUserLoggedIn() || isAdminLoggedIn() ?
                    (
                        <>
                        <label>Welcome {loggedInUser.userName} !</label>
                        <a>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    {/* <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li> */}
                                    <li><span onClick={(e) => handleLogout(e)}>Logout</span></li>
                                </ul>
                            </div>
                        </a>
                        </>
                    )
                    :
                    (
                        <>
                            <button className="btn" onClick={() => navigate("/signup")}>Signup</button>
                            <button className="btn" onClick={() => navigate("/login")}>Login</button>
                        </>
                    )
                }
            </div>
            </div>
        </>
    )
};

