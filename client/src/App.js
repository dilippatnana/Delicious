import React, { useState,useEffect } from 'react';
import{Route, Routes} from "react-router-dom";
import {Main, Login, Dashboard} from "./containers";
import {getAuth} from "firebase/auth" ;
import {app} from "./config/firebase.config";
import { validateUserJWTToken } from './api';
import {useDispatch, useSelector} from  "react-redux";
import  {setUserDetails} from "./context/actions/userActions";
import { motion } from 'framer-motion';
import { Alert, MainLoader } from './components';


const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const alert = useSelector(state=> state.alert);
  

  useEffect(() => {
    setIsLoading(true);
  
    firebaseAuth.onAuthStateChanged(cred => {
      if(cred)
      {
        cred.getIdToken().then(token => {
          validateUserJWTToken(token).then(data => {
            dispatch(setUserDetails(data));
          })
        }); 
      }
    });

    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, [])
    

  return (
    <div className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>
      {isLoading && (
        <motion.div 
          initial={
            {opacity: 1}
          }
          animate={{opacity: 0}}
          className = "fixed z-50 inset-0 bg-cardOverlay backdrop-blur-md flex items-center justify-center w-full "
        >
          <MainLoader/>
        </motion.div>
      )}
      <Routes>
        <Route path='/*' element = {<Main />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/dashboard/*' element = {<Dashboard />}/>
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message}/>}
    </div>
  )
}

export default App;