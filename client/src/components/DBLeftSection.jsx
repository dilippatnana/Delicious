import React from 'react'
import { NavLink } from 'react-router-dom';
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";


const DBLeftSection = () => {
  return (
    <div className='h-full py-12 flex flex-col bg-cardOverlay backdrop-blur-md shadow-md  min-w-210 w-300 gap-3'>
        <NavLink to={"/"} className="flex items-center justify-center">
        <div className="flex items-center justify-start gap-4 w-full px-6">
          <h1 className="text-orange-600 font-bold text-4xl">Delicious</h1>
        </div>
      </NavLink>

      <hr/>

      <ul className='flex flex-col gap-2'>
      <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles
            }
            to={"/dashboard/home"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles
            }
            to={"/dashboard/orders"}
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles
            }
            to={"/dashboard/items"}
          >
            Items
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles
            }
            to={"/dashboard/addnewitems"}
          >
            Add New Item
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles
            }
            to={"/dashboard/users"}
          >
            Users
          </NavLink>
      </ul>
    </div>
  )
}

export default DBLeftSection