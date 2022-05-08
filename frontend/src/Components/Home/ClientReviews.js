import React from "react";
import ClientReviewCard from "./ClientReviewCard";
import TitleSection from "../Global/TitleSection";

function ClientReviews() {
    return (
        <section className="reviews px-5 xl:px-48">
            <TitleSection title="Mọi Người Nói Gì Về Chúng Tôi" />

            <div className="relative flex flex-col md:flex-row">
                <ClientReviewCard
                    avatar="/assets/img/avatars/avatar-1.jpg"
                    name="Mậu"
                    location="Gia Lai - Việt Nam"
                    rating={5}
                    review="
                    vị trí gần trung tâm, tiện nghi đầy đủ, thiết kế phòng hợp lí, giá quá tốt so với kì vọng"
                />

                <ClientReviewCard
                    avatar="/assets/img/avatars/avatar-2.jpg"
                    name="Hoàng"
                    location="Quảng Trị - Việt Nam"
                    rating={5}
                    review="
                    Phòng giống hình, mình đi ngày sau tết nhưng vẫn đông khách quá trời. Đặt phòng 1 giường đôi có ban công nhưng đến nơi thì hết phòng nên khách sạn đổi sang cho mình phòng 2 giường."
                />

                <ClientReviewCard
                    avatar="/assets/img/avatars/avatar-3.jpg"
                    name="Quang"
                    location="Hà Tĩnh - Việt Nam"
                    rating={5}
                    review="
                    Phòng sách sẽ, vị trí thuận tiện để đi vào Trung tâm cũng như các địa điểm tham quan khác. Có tích hợp cho thuê xe máy. Xe mới, tốt"
                />
            </div>
        </section>
    );
}

export default ClientReviews;
