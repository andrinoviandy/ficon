import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const SidebarSubmenu = ({ name, icon: Icon, submenu }) => {
  return (
    <div>
      <div className="flex items-center gap-2 px-3 py-2 text-white font-semibold">
        {Icon && <Icon size={18} />}
        {name}
      </div>

      <ul className="pl-6">
        {submenu.map((item, idx) => {
          const SubIcon = item.icon;

          return (
            <li key={idx}>
              <NavLink
                to={item.path}
                className="flex items-center gap-2 text-sm text-white hover:text-gray-300 py-1"
              >
                {SubIcon && <SubIcon size={16} />}
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarSubmenu;