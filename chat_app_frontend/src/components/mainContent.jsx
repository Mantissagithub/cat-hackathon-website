import React, { useState, useEffect } from "react";
import SideBar from "./sideBar";
import WorkArea from "./workArea";
import ConversationsItem from "./conversationsItem"; // Import ConversationsItem
import { motion } from 'framer-motion';
import gsap from 'gsap';

const images = [
  'https://media.istockphoto.com/id/480336296/photo/tracked-excavators.jpg?s=2048x2048&w=is&k=20&c=UKB4a0hylVCaKL_Qz29J8xZVuUVkF8b4u3n_w1OQOQs=',
  'https://plus.unsplash.com/premium_photo-1661951710685-a676c4190c19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1622645636770-11fbf0611463?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const MainContent = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [selectedGroup, setSelectedGroup] = useState(null); 

  // Function to cycle through the images using GSAP
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(".background-image", {
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          setCurrentImage((prevImage) => (prevImage + 1) % images.length);
          gsap.to(".background-image", { opacity: 1, duration: 1.5 });
        },
      });
    }, 5000);
    return () => clearInterval(interval); 
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedGroup(null);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
  };

  return (
    <motion.div 
      className="relative flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${images[currentImage]})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>

      {/* Main Content Container */}
      <motion.div 
        className="relative flex flex-col items-center justify-center container mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-2xl h-[calc(100vh-2rem)] max-w-7xl w-full rounded-2xl overflow-hidden m-4 z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Main Flex Container */}
        <motion.div 
          className="flex w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Left Section */}
          <motion.div 
            className="w-1/3 p-6 flex flex-col space-y-6 h-full"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Sidebar */}
            <div className="h-1/3 bg-blue-500 dark:bg-blue-700 p-4 shadow-lg rounded-xl hover:shadow-2xl transition-all">
              <SideBar />
            </div>

            {/* Conversations List */}
            <div className="h-2/3 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto shadow-md rounded-xl hover:shadow-2xl transition-all">
              <ConversationsItem 
                darkMode={darkMode} 
                onSelectUser={handleUserSelect} 
                onSelectGroup={handleGroupSelect} 
              />
            </div>
          </motion.div>

          {/* WorkArea Section */}
          <motion.div 
            className="w-2/3 p-6 flex flex-col space-y-6 bg-white dark:bg-gray-700 text-black dark:text-white h-full shadow-lg rounded-xl hover:shadow-2xl transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <WorkArea selectedUser={selectedUser} selectedGroup={selectedGroup} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MainContent;
