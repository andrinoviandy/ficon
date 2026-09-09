import React, {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";

import SidebarSubmenu from "./SidebarSubmenu";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  getCookies,
} from "global/helper/cookie";

import {
  decodeData,
} from "global/helper/jwt";

import {
  dummyMenu,
} from "./dummyMenu";

import {
  setToggleSidebar,
} from "../../../redux/n2n/global";


// =====================================================
// NORMALIZE PATH
// =====================================================

const normalizePath = (path) => {

  if (!path) {
    return "/";
  }

  const cleaned = path.trim();

  if (
    !cleaned ||
    cleaned === "/"
  ) {
    return "/";
  }

  return cleaned.replace(
    /\/+$/,
    ""
  );

};


// =====================================================
// COMPONENT
// =====================================================

const Sidebar = () => {

  const location = useLocation();

  const dispatch = useDispatch();


  const {
    toggleSidebar,
  } = useSelector(
    (state) => state.global
  );


  const [
    loginAccess,
    setLoginAccess,
  ] = useState();


  // ===================================================
  // WINDOW SIZE
  // ===================================================

  const [
    windowSize,
    setWindowSize,
  ] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


  const isMobile =
    windowSize.width < 768;


  // ===================================================
  // LOGIN ACCESS
  // ===================================================

  useEffect(() => {

    const getLoginAccess = async () => {

      try {

        const decoded =
          await decodeData(
            getCookies(
              "accountAccess"
            )
          );

        setLoginAccess(
          decoded
        );

      } catch (error) {

        console.error(
          "Gagal mendapatkan login access:",
          error
        );

      }

    };


    getLoginAccess();

  }, []);


  // ===================================================
  // WINDOW RESIZE
  // ===================================================

  useEffect(() => {

    const handleResize = () => {

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    };


    window.addEventListener(
      "resize",
      handleResize
    );


    handleResize();


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, []);


  // ===================================================
  // CLOSE MOBILE SIDEBAR
  // ===================================================

  const closeMobileSidebar = () => {

    if (!isMobile) {
      return;
    }


    dispatch(
      setToggleSidebar(false)
    );

  };


  // ===================================================
  // ACTIVE PATH
  // ===================================================

  const isPathActive =
    (path) => {

      if (!path) {
        return false;
      }


      const current =
        normalizePath(
          location.pathname
        );


      const target =
        normalizePath(
          path
        );


      if (
        target === "/"
      ) {

        return current === "/";

      }


      return (
        current === target ||
        current.startsWith(
          `${target}/`
        )
      );

    };


  // ===================================================
  // MENU FILTER
  // ===================================================

  const menuList =
    dummyMenu

      .map(
        (menu) => {

          if (
            menu.submenu?.length > 0
          ) {

            const submenu =
              menu.submenu.filter(
                (sub) =>
                  !sub.roles ||
                  sub.roles.includes(
                    loginAccess?.role_id
                  ) ||
                  sub.roles.includes(
                    loginAccess?.nip
                  )
              );


            return {
              ...menu,
              submenu,
            };

          }


          return menu;

        }
      )

      .filter(
        (menu) => {

          if (
            menu.submenu?.length > 0
          ) {

            return (
              menu.submenu.length >
              0
            );

          }


          if (!menu.roles) {
            return true;
          }


          return menu.roles.includes(
            loginAccess?.role_id
          );

        }
      );


  // ===================================================
  // SIDEBAR BACKGROUND
  // ===================================================

  const sidebarBackground = {

    background: `
      radial-gradient(
        circle at 100% 0%,
        rgba(255, 145, 0, 0.10),
        transparent 35%
      ),
      radial-gradient(
        circle at 0% 100%,
        rgba(0, 70, 160, 0.08),
        transparent 35%
      ),
      #ffffff
    `,

    boxShadow:
      "4px 0 25px rgba(15, 23, 42, 0.06)",

    position:
      "relative",

  };


  // ===================================================
  // SIDEBAR CONTENT
  // ===================================================

  const renderSidebarContent = () => (

    <div
      className="
        h-full
        w-full
      "
    >

      <div
        className="
          relative
          h-full
          w-full
          border-r
          border-gray-100
        "
        style={
          sidebarBackground
        }
      >

        {/* ================================================= */}
        {/* TOP LINE */}
        {/* ================================================= */}

        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-[4px]
            bg-gradient-to-r
            from-orange-400
            via-orange-500
            to-blue-600
            z-10
          "
        />


        {/* ================================================= */}
        {/* SCROLL AREA */}
        {/* ================================================= */}

        <div
          className="
            h-screen
            overflow-y-auto
            overflow-x-hidden
            scrollsidebar
            pt-3
            pb-5
          "
        >

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <div
            className="
              mb-5
              mt-2
              px-2
            "
          >

            <Link
              to="/dashboard"
              onClick={
                closeMobileSidebar
              }
              className="
                flex
                flex-col
                items-center
                justify-center
                hover:bg-transparent
                active:bg-transparent
                focus:bg-transparent
                p-2
              "
            >

              {/* LOGO DESKTOP */}

              {/* {!isMobile &&
                toggleSidebar ? ( */}

                <>

                  <div
                    className="
                      text-[30px]
                      font-extrabold
                      tracking-wide
                      leading-none
                      select-none
                    "
                  >

                    <span
                      className="
                        text-orange-500
                      "
                    >
                      KF
                    </span>

                    <span
                      className="
                        text-primary
                      "
                    >
                      COLLS
                    </span>

                  </div>


                  <div
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      text-gray-400
                      mt-1
                    "
                  >
                    Collection System
                  </div>


                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      mt-3
                    "
                  >

                    <div
                      className="
                        h-[3px]
                        w-8
                        rounded-full
                        bg-orange-400
                      "
                    />

                    <div
                      className="
                        h-[3px]
                        w-12
                        rounded-full
                        bg-blue-600
                      "
                    />

                    <div
                      className="
                        h-[3px]
                        w-3
                        rounded-full
                        bg-orange-400
                      "
                    />

                  </div>

                </>

              {/* ) : (

                <div
                  className="
                    h-8
                  "
                />

              )} */}

            </Link>

          </div>


          {/* ================================================= */}
          {/* SECTION */}
          {/* ================================================= */}

          {/* {!isMobile &&
            toggleSidebar && ( */}

              <div
                className="
                px-4
                mb-3
                flex
                items-center
                gap-2
              "
              >

                <div
                  className="
                  w-1
                  h-4
                  rounded-full
                  bg-orange-400
                "
                />

                <span
                  className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-widest
                  text-gray-400
                "
                >
                  Navigasi
                </span>

              </div>

            {/* )} */}


          {/* ================================================= */}
          {/* MENU */}
          {/* ================================================= */}

          <div
            className="
    flex
    flex-col
    gap-1
  "
          >
            {menuList?.map(
              (
                route,
                index
              ) => {

                const Icon = route.icon;

                return (
                  <li
                    key={route.id || index}
                    className="
            mt-1
            px-2
            list-none
          "
                  >

                    {route.submenu?.length > 0 ? (

                      <SidebarSubmenu
                        {...route}
                      />

                    ) : (

                      <NavLink
                        to={route.path}
                        end={route.path === "/"}

                        onClick={(e) => {

                          if (
                            route.path === "/manual-book"
                          ) {

                            e.preventDefault();

                            window.open(
                              `${process.env.REACT_APP_BASE_URL_LOCAL}/files/MANUAL_BOOK.pdf`,
                              "_blank",
                              "noopener,noreferrer"
                            );

                            closeMobileSidebar();

                            return;
                          }

                          closeMobileSidebar();

                        }}

                        className={({ isActive }) => {

                          const active =
                            isActive ||
                            isPathActive(route.path);

                          return `
                  group
                  flex
                  items-center
                  rounded-xl
                  px-3
                  py-2.5
                  transition-all
                  duration-200

                  ${active
                              ? `
                        bg-blue-50
                        text-primary
                        font-semibold
                        border-l-4
                        border-orange-400
                        shadow-sm
                      `
                              : `
                        text-gray-600
                        hover:bg-orange-50
                        hover:text-blue-500
                      `
                            }
                `;

                        }}

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

                        <div
                          className="
                  flex
                  items-center
                  gap-3
                  w-full
                "
                        >

                          {Icon && (
                            <div
                              className="
                      w-8
                      h-8
                      shrink-0
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      bg-blue-50
                      group-hover:bg-orange-100
                      transition-all
                      duration-200
                    "
                            >
                              <Icon
                                size={17}
                                className="
                        text-blue-600
                        group-hover:text-orange-500
                        transition-colors
                        duration-200
                      "
                              />
                            </div>
                          )}

                          <span
                            className="
                    text-sm
                    truncate
                  "
                          >
                            {route.name}
                          </span>

                        </div>

                      </NavLink>

                    )}

                  </li>
                );

              }
            )}
          </div>


          {/* ================================================= */}
          {/* BOTTOM */}
          {/* ================================================= */}

          {!isMobile &&
            toggleSidebar && (

              <div
                className="
                px-4
                mt-8
                mb-5
              "
              >

                <div
                  className="
                  h-px
                  w-full
                  bg-gradient-to-r
                  from-orange-200
                  via-blue-200
                  to-transparent
                "
                />


                <div
                  className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  mt-4
                "
                >

                  <span
                    className="
                    text-[9px]
                    text-gray-300
                  "
                  >
                    KFCOLLS
                  </span>

                  <span
                    className="
                    text-[9px]
                    text-gray-300
                  "
                  >
                    •
                  </span>

                  <span
                    className="
                    text-[9px]
                    text-gray-300
                  "
                  >
                    Collection System
                  </span>

                </div>

              </div>

            )}

        </div>

      </div>

    </div>

  );


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <>

      {/* ================================================= */}
      {/* MOBILE */}
      {/* ================================================= */}

      {isMobile ? (

        <>

          {/* OVERLAY */}

          <div
            className={`
              fixed
              inset-0
              z-[110]
              bg-black/40
              backdrop-blur-[1px]
              transition-opacity
              duration-300

              ${toggleSidebar
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
              }
            `}
            onClick={
              closeMobileSidebar
            }
          />


          {/* SIDEBAR */}

          <aside
            className={`
              fixed
              top-0
              left-0
              bottom-0
              z-[120]
              w-60
              h-screen
              bg-white
              shadow-2xl
              transition-transform
              duration-300
              ease-in-out

              ${toggleSidebar
                ? "translate-x-0"
                : "-translate-x-full"
              }
            `}
          >

            {renderSidebarContent()}

          </aside>

        </>

      ) : (

        /* ================================================= */
        /* DESKTOP */
        /* ================================================= */

        <aside
          className={`
            sticky
            top-0
            h-screen
            shrink-0
            bg-white
            overflow-hidden
            transition-[width]
            duration-300
            ease-in-out
            z-[90]

            ${toggleSidebar
              ? "w-60"
              : "w-0"
            }
          `}
        >

          {toggleSidebar && (

            <div
              className="
                w-60
                h-screen
              "
            >

              {renderSidebarContent()}

            </div>

          )}

        </aside>

      )}

    </>

  );

};


export default Sidebar;