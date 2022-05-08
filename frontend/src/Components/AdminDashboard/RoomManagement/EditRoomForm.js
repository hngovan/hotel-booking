import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoom } from "../../../redux/actions/rooms";
import { updateRoom } from "../../../redux/actions/rooms";
import { getAllHotels } from "../../../redux/actions/hotels";
import { setSuccess } from "../../../redux/actions/global";
import { useParams, useHistory } from "react-router-dom";
import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; //

function EditRoomForm() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    let { id } = useParams();

    const [room, setRoom] = useState({
        name: "",
        description: "",
        price: "",
        guest: "",
        hotel_id: ""
    });
    const [image, setImage] = useState(null);
    const [features, setFeatures] = useState([]);
    const [previews, setPreviews] = useState("");

    useEffect(() => {
        getRoom(dispatch, id);
        getAllHotels(dispatch, state.auth.token);
    }, []); // eslint-disable-line

    useEffect(() => {
        state.rooms.room && setRoom(state.rooms.room);
        let _features =
            state.rooms.room &&
            state.rooms.room.features.map((e) => {
                return e.name;
            });

        state.rooms.room && setFeatures(_features);

        try {
            let images = state.rooms.room && state.rooms.room.image.split(",");
            state.rooms.room && setImage(images[0]);
        } catch (error) {}
    }, [state.rooms.room]); // eslint-disable-line

    useEffect(() => {
        setRoom({
            ...room,
            hotel_id: state.hotels.allHotels[0]
                ? state.hotels.allHotels[0].id
                : 0
        });
    }, [state.hotels.allHotels]); // eslint-disable-line
    const onSubmitHandler = (e) => {
        e.preventDefault();

        let _features;
        _features = JSON.parse(features);
        _features = _features && _features.map((feature) => feature.value);
        const formData = new FormData();
        formData.append("_method", "PUT");

        formData.append("id", id);
        formData.append("name", room.name);
        formData.append("description", room.description);
        formData.append("price", room.price);
        formData.append("guest", room.guest);
        formData.append("hotel_id", room.hotel_id);
        formData.append("features", JSON.stringify(_features));
        for (const key of Object.keys(image)) {
            image && formData.append(`image[${key}]`, image[key]);
        }

        updateRoom(dispatch, formData, state.auth.token);
    };

    let history = useHistory();
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
            if (state.rooms.success) {
                history.push("/room-management");
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [state.rooms.success]); // eslint-disable-line

    const handleUpload = (e) => {
        const fileList = Array.from(e.target.files);
        
        setImage(fileList); //Passei o valor de fileList para o State Files
        
        const mappedFiles = fileList.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }));

        setPreviews(mappedFiles); 
    };

    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  ">
            <h2 className="text-xl font-semibold">Sửa phòng</h2>

            <form
                action=""
                className="mt-5 bg-gray-300 p-5 rounded-sm "
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="first_name" className="block mt-5">
                    Thêm ít nhất 3 hình ảnh:{" "}
                </label>
                <div className="my-5 grid gap-3 grid-cols-5">
                    {previews.length > 0 ? (
                        previews.map((file) =>  
                            <img
                                key={file.preview}
                                src={file.preview}
                                alt="hotel"
                                className="w-full h-32 rounded-sm object-cover"
                            />
                        )   
                    ): (
                        <img
                            src={
                                room && room.image && typeof image === "string"
                                    ? `${process.env.REACT_APP_BASE_URL}/img/rooms/${image}`
                                    : "https://via.placeholder.com/150"
                            }
                            alt="room"
                            className="w-32 h-32 rounded-sm object-cover"
                        />
                    )}
                </div>
                <label className="px-5 py-2 text-gray-200 bg-orange-500 hover:bg-orange-900 rounded-sm cursor-pointer w-auto">
                    <input
                        type="file"
                        id="test"
                        className="hidden"
                        onChange={(e) => {
                            handleUpload(e)
                        }}
                        multiple
                        accept="image/*"
                    />
                    <i className="fas fa-camera mr-2"></i>
                    <span>
                        {image && typeof image === "object"
                            ? Object.keys(image).map(function (key, index) {
                                    return image[key].name + ", ";
                                })
                            : "Tải ảnh lên"}
                    </span>
                </label>

                <label htmlFor="name" className="block mt-5">
                    Tên phòng:{" "}
                </label>
                <input
                    type="text"
                    name="name"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={room.name}
                    onChange={(e) => setRoom({ ...room, name: e.target.value })}
                />

                <label htmlFor="description" className="block mt-5">
                    Mô tả phòng:{" "}
                </label>
                <textarea
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={room.description}
                    onChange={(e) =>
                        setRoom({ ...room, description: e.target.value })
                    }
                ></textarea>

                <label htmlFor="address" className="block mt-5">
                    Khách sạn:{" "}
                </label>

                <select
                    name=""
                    id=""
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={room.hotel_id}
                    onChange={(e) =>
                        setRoom({ ...room, hotel_id: e.target.value })
                    }
                >
                    {state &&
                        state.hotels.allHotels.map((hotel) => {
                            return (
                                <option key={hotel.id} value={hotel.id}>
                                    {hotel.name}
                                </option>
                            );
                        })}
                </select>

                <label htmlFor="guest" className="block mt-5">
                    Số lượng người ở:{" "}
                </label>
                <input
                    type="text"
                    name="guest"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={room.guest}
                    onChange={(e) =>
                        setRoom({ ...room, guest: e.target.value })
                    }
                />

                <label htmlFor="price" className="block mt-5">
                    Giá phòng:{" "}
                </label>
                <input
                    type="text"
                    name="price"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={room.price}
                    onChange={(e) =>
                        setRoom({ ...room, price: e.target.value })
                    }
                />
                <label className="block mt-5">Features: </label>

                <Tags
                    className="features p-2 bg-white w-full xl:w-1/2  border border-gray-400 focus:outline-none
                    focus:border-black"
                    value={features}
                    onChange={(e) => {
                        setFeatures(e.target.value);
                    }}
                />
                <button
                    className="text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase text-sm px-6 py-2 shadow
                    hover:shadow-lg block mt-5"
                    type="submit"
                >
                    Cập nhật phòng
                </button>
            </form>
        </div>
    );
}

export default EditRoomForm;
