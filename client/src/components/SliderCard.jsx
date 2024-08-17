import React from "react";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import {useDispatch, useSelector} from "react-redux"
import {alertSuccess, alertNULL} from "../context/actions/alertActions"
import {setCartItems} from "../context/actions/cartAction"
import { addNewItemToCart, getAllCartItems } from "../api";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const sendToCart = () => {
    // send data to cart
    dispatch(alertSuccess("Added to the cart"));
    addNewItemToCart(user?.user_id,data).then((res) => {
      getAllCartItems(user?.user_id).then((items) => {
        console.log(items);
        dispatch(setCartItems(items));
      })
      setInterval(() => {
        dispatch(alertNULL());
      }, 3000);
    })
  }

  return (
    <div
      className="bg-lightoverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min2350
     gap-3"
    >
      <img
        src={data.imageURL}
        className="w40
         h-40 object-contain"
        alt=""
      />
      <div className="relative pt-12">
        <p
          className="textxl
         text-headingColor font-semibold"
        >
          {data.product_name}
        </p>
        <p className="text-lg font-semibold text-red-500 flex items-center justify-center gap-1">
          <HiCurrencyRupee className="text-red-500" />{" "}
          {parseFloat(data.product_price).toFixed(2)}
        </p>

        <motion.div
          {...buttonClick}
          onClick={sendToCart}
          className=" w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer "
        >
          <IoBasket className="text-2xl text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCard;
