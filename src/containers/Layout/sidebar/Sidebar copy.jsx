import React, { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SidebarSubmenu from './SidebarSubmenu';
import { ReactComponent as LogoPSD } from 'assets/PSD_LOGO.svg'
import BATIK_SIDEBAR from 'assets/BATIK_SIDEBAR.png'

const Sidebar = () => {
  const location = useLocation();
  const { toggleSidebar, menu } = useSelector(state => state.global)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [toggleSidebar]);

  return (
    <>
      <div className="drawer-side z-50">
        <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
        <ul className={`menu pt-2 ${windowSize.width <= 767 ? "w-56" : (toggleSidebar ? "w-56" : "w-0 p-0")} bg-primary min-h-full text-base-content`} style={backgroundStyle}>
          <div className='max-h-[480px] overflow-auto scrollsidebar'>
            <li className="mb-2 font-semibold text-xl">
              <Link to={menu[0]?.path} state={{
                menu: {
                  id: menu[0]?.id,
                  name: menu[0]?.name,
                  path: menu[0]?.path,
                  parent: menu[0]?.parent,
                  submenu: menu[0]?.submenu,
                }
              }}>
                <LogoPSD />
              </Link>
            </li>
            {
              menu?.map((route, k) => {
                return (
                  <li className="text-white" key={k}>
                    {
                      route?.submenu?.length !== 0 ? (
                        <SidebarSubmenu {...route} />
                      ) : (
                        <NavLink
                          to={route?.path}
                          className={({ isActive }) => `${isActive && (route.name === location?.state?.menu?.name) ? 'bg-white font-semibold text-black rounded-br-none pl-3' : 'font-normal rounded-l-none pl-3'}`}
                          state={{
                            menu: {
                              id: route?.id,
                              name: route?.name,
                              path: route?.path,
                              parent: route?.parent,
                              submenu: route?.submenu,
                              actions: route?.actions,
                            },
                          }}
                        >
                          <div className='flex gap-2 items-center'>
                            {route?.name}
                          </div>
                        </NavLink>
                      )
                    }
                  </li>
                )
              })
            }
            <li className="text-white">
              <NavLink
                to={`${process.env.REACT_APP_BASE_URL}/files/User_Manual.pdf`}
                className={'font-normal rounded-l-none pl-3'}
                // target='_blank'
              >
                <div className='flex gap-2 items-center'>
                  Manual Book
                </div>
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </>
  )
}

const backgroundStyle = {
  backgroundImage: `url(${BATIK_SIDEBAR})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right bottom'
};

export default Sidebar