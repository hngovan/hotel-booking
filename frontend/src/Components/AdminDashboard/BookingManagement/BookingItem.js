import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import moment from 'moment';

export default class BookingItem extends Component {
    render() {
        const {
            id,
            name,
            image,
            city,
            price,
            check_in,
            check_out,
            first_name,
            last_name,
            created_at
        } = this.props.booking;
        return (
            <div
                className="mt-5 p-5 bg-gray-100 rounded-sm  shadow flex flex-col"
                ref={(el) => (this.componentRef = el)}
            >
                <img
                    src={
                        image
                            ? `${process.env.REACT_APP_BASE_URL}/img/hotels/${image}`
                            : "http://placehold.it/300x300?text=no image available"
                    }
                    alt="hotel"
                    className="w-full h-56 object-cover rounded-sm  shadow-xl "
                />
                <ul className="mt-5">
                    <li className="font-semibold">
                        Mã đặt Phòng : <span>#{id}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Khách sạn : <span>{name}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Thành phố : <span>{city}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Giá : <span>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Ngày nhận phòng : <span>{moment(check_in).format('DD/MM/YYYY')}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Ngày trả phòng : <span>{moment(check_out).format('DD/MM/YYYY')}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Người đặt :{" "}
                        <span>
                            {first_name} {last_name}
                        </span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Đặt vào lúc :{" "}
                        <span>  
                            {moment(new Date(created_at).toISOString().split("T")[0]).format('DD/MM/YYYY')}
                        </span>
                    </li>
                </ul>

                <ReactToPrint
                    documentTitle="test"
                    trigger={() => {
                        return (
                            <button
                                href="#"
                                className="mt-5 text-blue-600 font-semibold text-center hover:underline focus:outline-none"
                            >
                                <i className="fas fa-print"></i> In
                            </button>
                        );
                    }}
                    content={() => this.componentRef}
                />
            </div>
        );
    }
}
