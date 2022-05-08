import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useSecureLs from "../Global/useSecureLs";

function AdminDropDown() {
    let location = useLocation();
    const [id] = useSecureLs("user_id");
    const [currentPage, setCurrentPage] = useState("0");
    useEffect(() => {
        switch (location.pathname) {
            case `/admin-profile/${id}`:
                setCurrentPage("My Profile");
                break;
            case "/hotel-management":
                setCurrentPage("Hotels Management");
                break;
            case "/room-management":
                setCurrentPage("Rooms Management");
                break;
            case "/booking-management":
                setCurrentPage("Bookings Management");
                break;
            case "/review-management":
                setCurrentPage("Reviews Management");
                break;
            default:
                break;
        }
    }, []); // eslint-disable-line
    return (
        <div className="bg-gray-200 p-5 md:hidden rounded-t-md w-full">
            <div className="dropdown px-5">
                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-sm w-full">
                    <span>{currentPage} 🠋</span>
                </button>
                <ul className="dropdown-content hidden text-gray-700 pt-2">
                    <li>
                        <Link
                            to={`/admin-profile/${id}`}
                            className="rounded-sm bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                            <i className="fas fa-user-alt mr-2"></i>
                            <span className="mt-2 lg:mt-0">Cá nhân</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/hotel-management"
                            className="rounded-sm bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                            <i className="fas fa-building mr-2"></i>
                            <span className="mt-2 lg:mt-0">
                                Quản lý khách sạn
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/room-management"
                            className="rounded-sm bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                            <i className="fas fa-bed mr-2"></i>
                            <span className="mt-2 lg:mt-0">
                                Quản lý phòng
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/booking-management"
                            className="rounded-sm bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                            <i className="fas fa-ticket-alt mr-2"></i>
                            <span className="mt-2 lg:mt-0">
                                Quản lý đặt phòng
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/review-management"
                            className="rounded-sm bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                            <i className="fas fa-pen mr-2"></i>
                            <span className="mt-2 lg:mt-0">
                                Quản lý bài đánh giá
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminDropDown;
