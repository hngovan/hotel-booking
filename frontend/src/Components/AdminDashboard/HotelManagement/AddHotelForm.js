import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addHotel } from "../../../redux/actions/hotels";
import { setSuccess } from "../../../redux/actions/global";
import ErrorMessage from "../../Global/ErrorMessage";
import SuccessMessage from "../../Global/SuccessMessage";
import Loading from "../../Global/Loading";
function AddHotelForm() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [hotel, setHotel] = useState({
        name: "",
        address: "",
        city: "",
        star: "",
        x_coordinate: "",
        y_coordinate: ""
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", hotel.name);
        formData.append("address", hotel.address);
        formData.append("city", hotel.city);
        formData.append("star", hotel.star);
        formData.append("x_coordinate", hotel.x_coordinate);
        formData.append("y_coordinate", hotel.y_coordinate);
        image && formData.append("image", image);

        addHotel(dispatch, formData, state.auth.token);
    };

    let history = useHistory();
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
            if (state.hotels.success) {
                history.push("/hotel-management");
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [state.hotels.success]); // eslint-disable-line

    useEffect(() => {
        if(image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result.toString())
            }
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    },[image])

    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  ">
            {state.hotels.loading && <Loading />}

            {state.hotels.success === false && (
                <ErrorMessage errors={state.hotels.errors} />
            )}
            {state.hotels.success && <SuccessMessage message="Success" />}

            <h2 className="text-xl font-semibold">Add Hotel</h2>
            <form
                action=""
                className="mt-5 bg-gray-300 p-5 rounded-sm "
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="first_name" className="block mt-5">
                    H??nh ???nh ch??nh c???a kh??ch s???n:{" "}
                </label>
                <div className="flex items-center mt-5">
                    {preview ? (
                        <img
                            src={preview}
                            alt="hotel"
                            className="w-32 h-32 rounded-sm object-cover"
                        />
                    ): (
                        <img
                            src={
                                hotel && hotel.image
                                    ? `${process.env.REACT_APP_BASE_URL}/img/hotels/${hotel.image}`
                                    : "https://via.placeholder.com/150"
                            }
                            alt="hotel"
                            className="w-32 h-32 rounded-sm object-cover"
                        />
                    )}

                    <label className="ml-5 px-5 py-2 text-gray-200 bg-orange-500 hover:bg-orange-900 rounded-sm cursor-pointer">
                        <input
                            type="file"
                            id="test"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                        />
                        <i className="fas fa-camera mr-2"></i>
                        <span>{image ? image.name : "T???i ???nh l??n"}</span>
                    </label>
                </div>

                <label htmlFor="name" className="block mt-5">
                    T??n kh??ch s???n:{" "}
                </label>
                <input
                    type="text"
                    name="name"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={hotel.name}
                    onChange={(e) =>
                        setHotel({ ...hotel, name: e.target.value })
                    }
                />

                <label htmlFor="star" className="block mt-5">
                    S??? sao:{" "}
                </label>
                <input
                    type="number"
                    name="star"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={hotel.star}
                    onChange={(e) =>
                        setHotel({ ...hotel, star: e.target.value })
                    }
                />

                <label htmlFor="address" className="block mt-5">
                    ?????a ch???:{" "}
                </label>
                <input
                    type="text"
                    name="address"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={hotel.address}
                    onChange={(e) =>
                        setHotel({ ...hotel, address: e.target.value })
                    }
                />

                <label htmlFor="city" className="block mt-5">
                    Th??nh ph???:{" "}
                </label>
                <input
                    type="text"
                    name="city"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={hotel.city}
                    onChange={(e) =>
                        setHotel({ ...hotel, city: e.target.value })
                    }
                />

                <label
                    htmlFor="map_coordinates"
                    className="block mt-5 font-semibold"
                >
                    T???a ????? b???n ?????:{" "}
                </label>
                <label htmlFor="map_coordinates" className="block mt-5">
                    T???a ????? X:{" "}
                </label>
                <input
                    type="text"
                    name="map_coordinates"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={hotel.x_coordinate}
                    onChange={(e) =>
                        setHotel({ ...hotel, x_coordinate: e.target.value })
                    }
                />
                <label htmlFor="map_coordinates" className="block mt-5">
                    T???a ????? Y:{" "}
                </label>
                <input
                    type="text"
                    name="map_coordinates"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={hotel.y_coordinate}
                    onChange={(e) =>
                        setHotel({ ...hotel, y_coordinate: e.target.value })
                    }
                />

                <button
                    className="text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase text-sm px-6 py-2 shadow
                    hover:shadow-lg block mt-5"
                    type="submit"
                >
                    Add Hotel
                </button>
            </form>
        </div>
    );
}

export default AddHotelForm;
