import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "./Slider";
import { getHotelImages } from "../../redux/actions/hotels";

function Welcome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    getHotelImages(dispatch);
  }, []); // eslint-disable-line

  return (
    <section>
      <div className="mt-8 p-8 xl:px-48 ">
        <div className="text-center ">
          <h2 className="text-4xl font-semibold text-gray-800 font-serif">
            Chào mừng đến với Khách Sạn Sanhok
          </h2>

          <p className="text-gray-600 mt-5">
            Nằm trong khu khách sạn ven biển sầm uất nhất. Sanhoki mang
            một dáng vẻ sang trọng, hiện đại, một nét đẹp thanh nhã, hài hòa
            khiến bất cứ du khách nào khi đến Đà Nẵng cũng đều muốn ghé thăm.
          </p>
        </div>

        <Slider images={state.hotels.images} />
      </div>
    </section>
  );
}

export default Welcome;
