'use client'
import React, { useState } from 'react';
import { FaHome, FaEnvelope, FaBell, FaChartPie, FaCogs, FaQuestionCircle, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import HomeIcon from '@mui/icons-material/Home';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EmailIcon from '@mui/icons-material/Email';
import { IoIosSend } from "react-icons/io";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import BarChartIcon from '@mui/icons-material/BarChart';

const Sidebar = () => {
  const [selected, setSelected] = useState(null);

  const menuItems = [
    { id: 1, icon: <HomeIcon className='opacity-70' /> },
    { id: 2, icon: <PersonSearchIcon className='opacity-70' /> },
    { id: 3, icon: <EmailIcon className='opacity-70'/> },
    { id: 4, icon: <IoIosSend className='scale-150 ml-1 opacity-70' /> },
    { id: 5, icon: <FormatListBulletedIcon className='opacity-70' /> },
    { id: 6, icon: <UpcomingIcon className='opacity-70' /> },
    { id: 7, icon: <BarChartIcon className='opacity-70' /> },
  ];

  return (
    <div className="h-screen w-16 bg-[#101113] flex flex-col items-center justify-between py-4 border-[#2c3236] border-r">
      {/* Logo at the top */}
      <div className="text-white text-2xl mb-2">
        <img src='/assets/logo2.png' alt='logo2' className='h-8 w-9'/>
      </div>
      
      {/* Menu Options */}
      <div className="flex flex-col space-y-5">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`text-white p-2 rounded-lg cursor-pointer hover:bg-[#2f3030] hover:scale-110 transition duration-200 ${
              selected === item.id ? 'bg-[#2f3030]' : ''
            }`}
            onClick={() => setSelected(item.id)}
          >
            {item.icon}
          </div>
        ))}
      </div>
      
      {/* Account at the bottom */}
      <div className="text-white text-2xl mt-6">
        <FaUserCircle />
      </div>
    </div>
  );
};

export default Sidebar;