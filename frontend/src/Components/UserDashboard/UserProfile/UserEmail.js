import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserEmail } from "../../../redux/actions/users";

function UserEmail({ id }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [userEmail, setUserEmail] = useState({
        email: "",
        newEmail: "",
        confirmNewEmail: ""
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        updateUserEmail(dispatch, state.auth.token, id, userEmail);
    };

    return (
        <div className="mt-10">
            <h2 className="font-semibold">
                <i className="fas fa-envelope mr-2"></i> Thay đổi Email của bạn
            </h2>

            <form
                action=""
                className="mt-5 bg-gray-300 p-5 rounded-sm "
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="old-email" className="block mt-5">
                    Email cũ:{" "}
                </label>
                <input
                    type="email"
                    id="old-email"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={userEmail.email}
                    placeholder="Nhập email cũ"
                    onChange={(e) =>
                        setUserEmail({ ...userEmail, email: e.target.value })
                    }
                />
                <label htmlFor="new-email" className="block mt-5">
                    Email mới:{" "}
                </label>
                <input
                    type="email"
                    id="new-email"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={userEmail.newEmail}
                    placeholder="Nhập email mới"
                    onChange={(e) =>
                        setUserEmail({
                            ...userEmail,
                            newEmail: e.target.value
                        })
                    }
                />
                <label htmlFor="confirm-email" className="block mt-5">
                    Xác nhận Email:{" "}
                </label>
                <input
                    type="email"
                    id="confirm-email"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={userEmail.confirmNewEmail}
                    placeholder="Xác nhận email"
                    onChange={(e) =>
                        setUserEmail({
                            ...userEmail,
                            confirmNewEmail: e.target.value
                        })
                    }
                />

                <button
                    className="text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase text-sm px-6 py-2 shadow
                    hover:shadow-lg block mt-5"
                    type="submit"
                >
                    Cập nhật
                </button>
            </form>
        </div>
    );
}

export default UserEmail;
