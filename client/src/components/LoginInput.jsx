import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div
      layout 
      key="modal"
      variants={fadeInOut}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? " shadow-md shadow-black " : " shadow-none "
      } `}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
