import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom } from "../../../redux/actions/rooms";
import { getAllHotels } from "../../../redux/actions/hotels";
import { setSuccess } from "../../../redux/actions/global";
import { useHistory } from "react-router-dom";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

function AddRoomForm() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [room, setRoom] = useState({
        name: "",
        description: "",
        price: "",
        guest: "",
        hotel_id: "",
        features: []
    });

    const [image, setImage] = useState("");
    const [previews, setPreviews] = useState("");

    useEffect(() => {
        getAllHotels(dispatch, state.auth.token);
    }, []); // eslint-disable-line

    useEffect(() => {
        setRoom({
            ...room,
            hotel_id: state.hotels.allHotels[0]
                ? state.hotels.allHotels[0].id
                : 0
        });
    }, [state.hotels.allHotels]); // eslint-disable-line

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

    useEffect(() => {
        var input = document.querySelector(".features"), // eslint-disable-next-line
            tagify = new Tagify(input, {
                whitelist: [
                    "B???n n?????c n??ng",
                    "Ph??ng t???m ri??ng",
                    "T???m nh??n ra bi???n",
                    "H??? b??i tr??n s??n th?????ng",
                    "Wifi mi???n ph??",
                    "TV m??n h??nh ph???ng",
                    "????? v??? sinh c?? nh??n mi???n ph??",
                    "B????n t????m ho????c Vo??i sen",
                    "Nh?? v??? sinh",
                    "??? ??i???n g???n gi?????ng",
                    "Khu v????c ti????p kha??ch",
                    "Ba??n u??i li qu????n",
                    "Tu?? la??nh",
                    "??i???u h??a",
                    "??i????n thoa??i",
                    "Kh??n t???m/B??? kh??n tr???i gi?????ng (c?? thu ph??)",
                    "S??n l??t g???ch/???? c???m th???ch",
                    "Gi?? treo qu???n ??o",
                    "N?????c r???a tay",
                ],
                dropdown: {
                    classname: "color-blue",
                    enabled: 0, // show the dropdown immediately on focus
                    maxItems: 20,
                    position: "text", // place the dropdown near the typed text
                    closeOnSelect: false, // keep the dropdown open after selecting a suggestion
                    highlightFirst: true
                }
            });
    }, []); // eslint-disable-line

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", room.name);
        formData.append("description", room.description);
        formData.append("price", room.price);
        formData.append("guest", room.guest);
        formData.append("hotel_id", room.hotel_id);
        formData.append("features", JSON.stringify(room.features));
        for (const key of Object.keys(image)) {
            image && formData.append(`image[${key}]`, image[key]);
        }
        addRoom(dispatch, formData, state.auth.token);
    };
    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  ">
            <h2 className="text-xl font-semibold">Th??m ph??ng</h2>
            <form
                action=""
                className="mt-5 bg-gray-300 p-5 rounded-sm "
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="first_name" className="block mt-5">
                    Th??m ??t nh???t 3 h??nh ???nh:{" "}
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
                                room && room.image
                                    ? `${process.env.REACT_APP_BASE_URL}/img/rooms/${room.image}`
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
                        {image
                            ? Object.keys(image).map(function (key) {
                                    return image[key].name + ", ";
                                })
                            : "T???i ???nh l??n"}
                    </span>
                </label>

                <label htmlFor="name" className="block mt-5">
                    T??n ph??ng:{" "}
                </label>
                <input
                    type="text"
                    name="name"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={room.name}
                    onChange={(e) => setRoom({ ...room, name: e.target.value })}
                />

                <label htmlFor="description" className="block mt-5">
                    M?? t??? ph??ng:{" "}
                </label>
                <textarea
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={room.description}
                    onChange={(e) =>
                        setRoom({ ...room, description: e.target.value })
                    }
                ></textarea>

                <label htmlFor="address" className="block mt-5">
                    Kh??ch s???n:{" "}
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
                    S??? l?????ng ng?????i ???:{" "}
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
                    Gi?? ph??ng:{" "}
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
                <label className="block mt-5">Ti???n nghi ph??ng: </label>
                <input
                    type="text"
                    name="features"
                    className="features p-2 bg-white w-full xl:w-1/2  border border-gray-400 focus:outline-none
                    focus:border-black"
                    value={room.features}
                    onChange={(e) => {
                        setRoom({
                            ...room,
                            features: JSON.parse(e.target.value).map(
                                (feature) => feature.value
                            )
                        });
                    }}
                />
                <button
                    className="text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase text-sm px-6 py-2 shadow
                    hover:shadow-lg block mt-5"
                    type="submit"
                >
                    Th??m ph??ng
                </button>
            </form>
        </div>
    );
}

export default AddRoomForm;
