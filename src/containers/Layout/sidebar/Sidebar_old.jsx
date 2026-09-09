import React, { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';

import { ReactComponent as LogoPSD } from 'assets/PSD_LOGO.svg'
import LOGO_COST from 'assets/LOGO_SIDEBAR.png'
import BATIK_SIDEBAR from 'assets/BG_SIDEBAR.png'

// ICONS Fa / Io
import { FaTachometerAlt, FaFileAlt, FaChartBar, FaDatabase, FaBook, FaUserAlt, FaUserCheck, FaUsersCog, FaWallet, FaCalculator, FaFileInvoiceDollar, FaReceipt, FaSignInAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { getCookies } from 'global/helper/cookie';
import { Signature } from 'lucide-react';

const Sidebar = () => {
  const [loginAccess, setLoginAccess] = useState()
  useEffect(() => {
    const get = async () => {
      setLoginAccess(getCookies('accountAccess'))
    }
    get()
  }, [])
  const dummyMenu = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: FaTachometerAlt,
      submenu: [],
    },
    ...(['Sub Unit Pajak', 'Super Admin'].includes(loginAccess) ? [{
      id: 1,
      name: "Perhitungan Pajak",
      path: "/perhitungan-pajak",
      icon: FaCalculator,
      submenu: [],
    }] : []),
    {
      id: 2,
      name: "Pengajuan",
      icon: FaFileAlt,
      submenu: [
        ...(['Pemohon', 'Super Admin'].includes(loginAccess) ? [
          {
            name: "Data Pengajuan",
            path: "/data-pengajuan",
          },
        ] : []),
        ...(!['Pemohon'].includes(loginAccess) ? [
          {
            name: "Approval Pengajuan",
            path: "/approval-pengajuan",
          }
        ] : []),
        {
          name: "History Pengajuan",
          path: "/history-pengajuan",
        },
        {
          name: "Flow Approval",
          path: "/flow-approval",
        },
      ],
    },
    ...(['Super Admin', 'Sub Unit Financial Controller'].includes(loginAccess) ? [
      {
        id: 3,
        name: "Upload Penjualan",
        path: "/penjualan",
        icon: FaReceipt,
        submenu: [],
      },
      // {
      //   id: 4,
      //   name: "Approval",
      //   path: "/approval",
      //   icon: FaUserCheck,
      //   submenu: [],
      // }
    ] : []),
    ...(['Super Admin'].includes(loginAccess) ? [
      {
        id: 3,
        name: "User Management",
        path: "/user-management",
        icon: FaUsersCog,
        submenu: [],
      },
      {
        id: 4,
        name: "Penandatangan Dok.",
        path: "/penandatangan-dokumen",
        icon: Signature,
        submenu: [],
      }
    ] : []),
    ...(['Sub Unit Pajak', 'Super Admin'].includes(loginAccess) ? [
      {
        id: 5,
        name: "Jenis Pajak",
        path: "/jenis-pajak",
        icon: FaFileInvoiceDollar,
        submenu: [],
      },
    ] : []),
    ...(['Sub Unit Anggaran', 'Super Admin', 'Sub Unit Financial Controller'].includes(loginAccess) ? [
      {
        id: 5,
        name: ['Sub Unit Anggaran', 'Super Admin'].includes(loginAccess) ? "Manajemen Anggaran" : "Riwayat Anggaran",
        path: "/manajemen-anggaran",
        icon: FaWallet,
        submenu: [],
      },
    ] : []),
    {
      id: 6,
      name: "Reporting",
      path: "/reporting",
      icon: FaChartBar,
      submenu: [],
    },
    ...(['Super Admin'].includes(loginAccess) ? [
      {
        id: 7,
        name: "Master Data",
        path: "/master-data",
        icon: FaDatabase,
        submenu: [],
      }
    ] : []),
    {
      id: 8,
      name: "Manual Book",
      path: "/manual-book",
      icon: FaBook,
      submenu: [],
    },
  ];
  const location = useLocation();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const { toggleSidebar, menu } = useSelector(state => state.global)

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

  const backgroundStyle = {
    backgroundImage: `
    linear-gradient(
      to bottom right,
      rgba(10,25,80,0.95) 0%,
      rgba(10,25,80,0.95) 45%,
      rgba(255,140,0,0.9) 100%
    ),
    url(${BATIK_SIDEBAR})
  `,
    backgroundSize: 'cover, contain',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'center, right bottom',
  };

  return (
    <div className="drawer-side z-50">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>

      <ul
        className={`menu pt-2 ${windowSize.width <= 767 ? "w-56" : (toggleSidebar ? "w-56" : "w-0 p-0")} min-h-full text-base-content`}
        style={backgroundStyle}
      >
        {/* <div className='max-h-[480px] overflow-auto scrollsidebar'> */}
        <div className='h-full scrollsidebar overflow-y-auto'>

          {/* LOGO */}
          <li className="mb-4 font-semibold text-xl">
            <Link to="/dashboard">
              {/* <LogoPSD /> */}
              {toggleSidebar && windowSize.width >= 767 ? (
                <img src={LOGO_COST} alt="Logo" className="w-auto lg:h-24 sm:h-10" />
              ) : <div className='mb-10'></div>}
            </Link>
          </li>

          {/* MENU */}
          {dummyMenu.map((route, k) => {
            const Icon = route.icon;

            return (
              <li className="text-white mt-2" key={k}>
                {route.submenu?.length > 0 ? (
                  <SidebarSubmenu {...route} />
                ) : (
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `${isActive ? 'bg-white text-blue-900 font-semibold pl-3 rounded' : 'pl-3'}`
                    }
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
                    <div className="flex items-center gap-2">
                      {Icon && <Icon size={18} />}
                      {route.name}
                    </div>
                  </NavLink>
                )}
              </li>
            );
          })}

          {/* MANUAL BOOK */}
          {/* <li className="text-white mt-2">
            <NavLink
              to="/manual-book"
              className="pl-3 flex items-center gap-2"
            >
              <FaBook size={18} />
              Manual Book
            </NavLink>
          </li> */}

        </div>
      </ul>
    </div>
  );
};

export default Sidebar;