import React, {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  FaChevronDown,
  FaFileAlt,
} from "react-icons/fa";


// =====================================================
// NORMALIZE PATH
// =====================================================

const normalizePath = (path) => {

  if (!path) {
    return "/";
  }

  const cleaned =
    path.trim();

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

const SidebarSubmenu = ({
  id,
  name,
  path,
  parent,
  submenu = [],
  icon: Icon,
}) => {

  const location =
    useLocation();


  // ===================================================
  // ACTIVE PATH
  // ===================================================

  const isPathActive = (
    targetPath
  ) => {

    if (!targetPath) {
      return false;
    }


    const current =
      normalizePath(
        location.pathname
      );

    const target =
      normalizePath(
        targetPath
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
  // CHECK SUBMENU ACTIVE
  // ===================================================

  const isSubmenuActive =
    submenu?.some(
      (item) =>
        isPathActive(
          item?.path
        )
    );


  // ===================================================
  // OPEN STATE
  // ===================================================

  const [
    isOpen,
    setIsOpen,
  ] = useState(
    isSubmenuActive
  );


  // ===================================================
  // AUTO OPEN WHEN ROUTE CHANGES
  // ===================================================

  useEffect(() => {

    if (
      isSubmenuActive
    ) {

      setIsOpen(true);

    }

  }, [
    location.pathname,
    isSubmenuActive,
  ]);


  // ===================================================
  // TOGGLE
  // ===================================================

  const handleToggle = (
    e
  ) => {

    e.preventDefault();

    setIsOpen(
      (prev) => !prev
    );

  };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div className="w-full">


      {/* ================================================= */}
      {/* PARENT MENU */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={
          handleToggle
        }
        className={`
          group
          w-full
          flex
          items-center
          justify-between
          rounded-xl
          px-3
          py-2.5
          transition-all
          duration-200
          ease-out

          ${
            isSubmenuActive
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
                hover:text-primary
              `
          }
        `}
      >

        {/* LEFT */}

        <div
          className="
            flex
            items-center
            gap-3
            min-w-0
          "
        >

          {/* ICON */}

          <div
            className={`
              w-8
              h-8
              shrink-0
              rounded-lg
              flex
              items-center
              justify-center
              transition-all
              duration-200

              ${
                isSubmenuActive
                  ? `
                    bg-orange-100
                    text-orange-500
                  `
                  : `
                    bg-blue-50
                    text-blue-600
                    group-hover:bg-orange-100
                    group-hover:text-orange-500
                  `
              }
            `}
          >

            {Icon ? (

              <Icon
                size={17}
              />

            ) : (

              <FaFileAlt
                size={17}
              />

            )}

          </div>


          {/* NAME */}

          <span
            className="
              text-sm
              truncate
              text-left
            "
          >
            {name}
          </span>

        </div>


        {/* ARROW */}

        <FaChevronDown
          className={`
            shrink-0
            ml-3
            text-xs
            transition-transform
            duration-200
            ease-out

            ${
              isOpen
                ? "rotate-180 text-orange-500"
                : "text-gray-400"
            }
          `}
        />

      </button>


      {/* ================================================= */}
      {/* SUBMENU */}
      {/* ================================================= */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-200
          ease-out

          ${
            isOpen
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >

        <ul
          className="
            mt-1
            ml-4
            pl-3
            border-l-2
            border-orange-100
          "
        >

          {submenu?.map(
            (
              item,
              index
            ) => {

              const active =
                isPathActive(
                  item?.path
                );


              return (

                <li
                  key={
                    item?.id ||
                    item?.path ||
                    index
                  }
                  className="
                    mt-1
                  "
                >

                  <NavLink
                    to={
                      item.path
                    }

                    className={`
                      group
                      flex
                      items-center
                      rounded-lg
                      px-3
                      py-2
                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            bg-blue-50
                            text-primary
                            font-semibold
                            border-l-2
                            border-orange-400
                          `
                          : `
                            text-gray-500
                            hover:bg-orange-50
                            hover:text-primary
                          `
                      }
                    `}

                    state={{
                      menu: {

                        id:
                          id,

                        name:
                          item?.name,

                        path:
                          item?.path,

                        parent:
                          name,

                        submenu:
                          item,

                      },
                    }}
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        min-w-0
                      "
                    >

                      {/* BULLET */}

                      <span
                        className={`
                          w-1.5
                          h-1.5
                          shrink-0
                          rounded-full
                          transition-all
                          duration-200

                          ${
                            active
                              ? `
                                bg-orange-500
                                scale-125
                              `
                              : `
                                bg-blue-300
                                group-hover:bg-orange-400
                              `
                          }
                        `}
                      />


                      {/* NAME */}

                      <span
                        className="
                          text-sm
                          truncate
                        "
                      >
                        {item?.name}
                      </span>

                    </div>

                  </NavLink>

                </li>

              );

            }
          )}

        </ul>

      </div>

    </div>

  );

};


export default SidebarSubmenu;