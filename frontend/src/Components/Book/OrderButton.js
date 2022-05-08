import React from "react";

function OrderButton() {
    return (
        <>
            <h2 className="text-2xl">Bước 3: Thanh toán</h2>

            <button
                type="submit"
                className="bg-orange-700 mt-5 py-2 px-6 text-3xl text-gray-200 block w-2/5 mx-auto hover:bg-orange-900"
            >
                Đặt ngay
            </button>
        </>
    );
}

export default OrderButton;
