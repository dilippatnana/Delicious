import React, { useEffect, useState } from "react";
import { LoginBg } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate} from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import {app} from "../config/firebase.config";
import { validateUserJWTToken } from "../api";

import { useDispatch, useSelector } from "react-redux";
import  {setUserDetails} from "../context/actions/userActions";
import { alertWarning, alertInfo, alertDanger, alertSuccess, alertNULL } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector( (state)=> state.alert );

  useEffect(() => {
    if(user)
    {
      navigate("/",{replace:true});
    }
  }, [user]);
  

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
        firebaseAuth.onAuthStateChanged(cred => {
          if(cred)
          {
            cred.getIdToken().then(token => {
              validateUserJWTToken(token).then(data => {
                console.log(data);
                dispatch(setUserDetails(data))
              })
              navigate("/", { replace: true});
            }); 
          }
        });
    });
  }; 

  const signUpWithEmailAndPass = async () => {
    if((userEmail === "" || password === "" || confirm_password === ""))
    {
      // alert message
      // console.log(`userEmail: ${userEmail} password ${password} confirme_password ${confirm_password}`)
      dispatch(alertInfo("Please fill all the fields!"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
    else  
    {
      if(password === confirm_password)
      {
        try{
          await createUserWithEmailAndPassword(firebaseAuth,userEmail, password).then((userCred) => {
            firebaseAuth.onAuthStateChanged(cred => {
              if(cred)
              {
                cred.getIdToken().then(token => {
                  validateUserJWTToken(token).then(data => {
                    console.log(data);
                    dispatch(setUserDetails(data));
                  })
                  navigate("/", { replace: true});
                }); 
              }
            });
        });
        }catch(err){dispatch(alertDanger(err.message))};
        // console.log("Logined successfully")
        dispatch(alertSuccess("Signed In successfully"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      }
      else{
        // console.log("not match");
        // alert('Please make sure your passwords match');
        dispatch(alertWarning('Please make sure your passwords match'))
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      }
    }
  }

  const signInWithEmailAndPass = async ()=>{
    if(userEmail === "" || password === "")
    {
      // alert message;
      // console.log("Empty")
      // alert('All fields are required!')
      dispatch(alertInfo("Please fill all the fields!"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
    else
    {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password)
      .then((userCred)=>{
        firebaseAuth.onAuthStateChanged((cred) => {
          if(cred)
          {
            cred.getIdToken().then((token) =>
            {
              validateUserJWTToken(token).then((data) =>
              {
                console.log(data);
                dispatch(setUserDetails(data));
              });
            });
            navigate("/",{replace:true})
          }
          dispatch(alertSuccess("Signed In successfully"));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
        })
      })
    }
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden flex items-center justify-center">
      {/* login background image */}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absoulute top-0 left-0"
        alt="BackGround"
      />

      {/* context box */}
      <motion.div layout className="flex flex-col absolute items-center bg-cardOverlay w-[100%] h-[100%] md:w-508 md:h-min z-10 backdrop-blur-md p-4 px-4 py-12 ">
        <div className="flex items-center justify-center gap-4 w-full">
          <h1 className="text-orange-600 font-bold text-4xl">Delicious</h1>
        </div>
        {/* welcome text */}
        <p className="text-headingcolor text-2xl font-semibold">Welcome!</p>
        <p className="text-textcolor">
          {isSignup ? "Get started on Delicious today!!" : "Log in to your account"}  
        </p>
        {/* input section */}
        <div className="w-full flex flex-col items-center justify-center gap-8 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Your Email"}
            icon={<FaEnvelope className="text-xl text-textcolor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignup}
          />
          <LoginInput
            placeHolder={"Password"}
            icon={<FaLock className="text-xl text-textcolor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignup}
          />
          {isSignup && (
            <LoginInput
              placeHolder={"Confirm Password"}
              icon={<FaLock className="text-xl text-textcolor" />}
              inputState={confirm_password}
              inputStateFunc={setConfirm_password}
              type="password"
              isSignUp={isSignup}
            />
          )}

          <p>
            {!isSignup ? "Don't have an account? " : "Already have an account? "}
              <motion.button
                {...buttonClick}
                className=" text-red-500 underline cursor-pointor bg-transparent "
                onClick={() => (isSignup)?setIsSignup(false):setIsSignup(true)}
              >
                {!isSignup ? "Create One" : "Log In"}
              </motion.button>
            </p>

          {/* button section */}
          {isSignup ? (
            <motion.button
            {...buttonClick}
            className="w-full bg-red-500 rounded-md text-xl text-white py-4 px-2 capitalize hover:bg-red-600 transition-all duration-75 "
            onClick={signUpWithEmailAndPass}
          >
            Sign-Up
          </motion.button>
          ) : (
            <motion.button
            {...buttonClick}
            className="w-full bg-red-500 rounded-md text-xl text-white py-4 px-2 capitalize hover:bg-red-600 transition-all duration-75 "
            onClick={signInWithEmailAndPass}
          >
            Sign-In 
          </motion.button>
          )}
        </div>
        {/* separating line */}
        <div style={{alignItems:"center"}} className="flex item-center justify-between gap-16 ">
          <div className="w-24 h-[1px] bg-white rounded-md "></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] bg-white rounded-md "></div>
        </div>
        {/* Google login button */}
        <motion.div {...buttonClick} className="flex items-center justify-center mt-3 px-20 py-2 cursor-pointer bg-cardOverlay backdrop-blur-md rounded-full gap-4" onClick={loginWithGoogle}>
          < FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">Sign In with Google</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
