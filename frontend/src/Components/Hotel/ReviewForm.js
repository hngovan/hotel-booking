import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../redux/actions/reviews";
import { setSuccess } from "../../redux/actions/global";
import ErrorMessage from "../Global/ErrorMessage";
import SuccessMessage from "../Global/SuccessMessage";
import useSecureLs from "../Global/useSecureLs";

function ReviewForm(props) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [review, setReview] = useState({
        content: "",
        rating: "",
        user_id: "",
        hotel_id: ""
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        addReview(dispatch, state.auth.token, review);
    };

    const [user_id] = useSecureLs("user_id");

    useEffect(() => {
        setReview({
            content: "",
            rating: 10,
            user_id,
            hotel_id: props.match.params.id
        });
    }, []); // eslint-disable-line

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [state.reviews.success]); // eslint-disable-line

    return (
        <div className="mt-8 p-5 md:px-16 xl:px-24">
            {state.reviews.success === false && (
                <ErrorMessage errors={state.reviews.errors} />
            )}
            {state.reviews.success && (
                <SuccessMessage message="Đáng giá của bạn đã được gửi" />
            )}
            <h2 className="text-2xl font-semibold text-gray-800">
                Gửi đánh giá
            </h2>
            <form className="w-full" onSubmit={onSubmitHandler}>
                <textarea
                    rows="3"
                    className="w-full rounded-sm  border p-2 my-2 focus:outline-none focus:border-gray-700"
                    value={review.content}
                    onChange={(e) =>
                        setReview({ ...review, content: e.target.value })
                    }
                ></textarea>
                <div className="flex items-center">
                    <button className="bg-orange-500 hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded-sm mr-5">
                        Gửi
                    </button>
                    <select
                        className="py-2 px-4"
                        value={review.rating}
                        onChange={(e) =>
                            setReview({ ...review, rating: e.target.value })
                        }
                    >
                        <option value="10">10 Quá tuyệt vời</option>
                        <option value="9">9 Tuyệt vời</option>
                        <option value="8">8 Rất tốt</option>
                        <option value="7">7 Tốt</option>
                        <option value="6">6 Ổn</option>
                        <option value="5">5 Tạm ổn</option>
                        <option value="4">4 Tệ</option>
                        <option value="3">3 Quá tệ</option>
                        <option value="2">2 Tệ Hại</option>
                        <option value="1">1 Rất kinh khủng</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default ReviewForm;
