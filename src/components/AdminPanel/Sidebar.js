// import React, { useState, useEffect, } from "react";
// import "./sidebar.css";
// import Dashboard from "./pages/Dashboard";
// import Tracker from "./pages/Tracker";

// import { FaBars } from "react-icons/fa";
// import { NavLink } from "react-router-dom";



// const Sidebar = ({ handleTabChange,activeTab}) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const toggle = () => setIsOpen(!isOpen);
  
//   const menuItem = [
//     {
//       tab: "Dashboard",
//     },
//     {
//       tab: "Tracker",
//     },
//     {
//       tab: "Conductivity",
//     },

//     {
//       tab: "Nitrate",
//     },
//     {
//       tab: "Temperature",
//     },
//     {
//       tab: "Turbidity",
//     },
//   ];

//   return (
//     <div className="container" id="side">
//       <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//         <div className="top_section">
//           <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
//             Admin
//           </h1>
//           <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
//             <FaBars onClick={toggle} />
//           </div>
//         </div>
//         {menuItem.map(({tab}, index) => (

//           <div className="menu" onClick={()=>{handleTabChange(tab)}}
//             key={index}
//             style={{backgroundColor: activeTab === tab && "#fff" }}
//           >
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className="link_text "
//             >
//               {tab}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from "react";
import "./sidebar.css";
import Dashboard from "./pages/Dashboard";
import WQI from "./pages/Tracker";
import { FaBars, FaTachometerAlt, FaChartLine, FaFlask, FaThermometerHalf, } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { GiElectric } from "react-icons/gi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaGlassWater } from "react-icons/fa6";

const Sidebar = ({ handleTabChange, activeTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      tab: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      tab: "Conductivity",
      icon: <GiElectric />,
    },
    {
      tab: "Nitrate",
      icon: <FaThermometerHalf />,
    },
    {
      tab: "Temperature",
      icon: <TbTemperatureCelsius />,
    },
    {
      tab: "Turbidity",
      icon: <FaGlassWater />,
    },
    {
      tab: "WQI",
      icon: <FaChartLine />,
    }
  ];

  return (
    <div className="container" id="side">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Admin
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map(({ tab, icon }, index) => (
          <div
            className="menu"
            onClick={() => {
              handleTabChange(tab);
            }}
            key={index}
            style={{ backgroundColor: activeTab === tab && "#fff" }}
          >
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
            <span className="icon">{icon}</span>
              <span >{tab}</span>
            </div>
            <div style={{ display: !isOpen ? "block" : "none" }} className="link_icon">
              <span>{icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
