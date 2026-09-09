import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  setDimensionHeight,
  setToggleSidebar,
} from "../../../redux/n2n/global";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  decodeData,
} from "global/helper/jwt";

import {
  getCookies,
  removeCookies,
} from "global/helper/cookie";

import {
  IoNotificationsSharp,
  IoCalendarOutline,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";

import {
  FaBell,
  FaCheckDouble,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaCogs,
  FaInbox,
  FaTags,
  FaUser,
  FaTruck,
  FaMoneyBillWave,
} from "react-icons/fa";

import storeSchema from "global/store";

import {
  swal,
} from "global/helper/swal";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  formatDateJam,
} from "global/helper/formatDate";


// =====================================================
// COMPONENT
// =====================================================

const Header = () => {

  const dispatch =
    useDispatch();

  const navigation =
    useNavigate();

  const location =
    useLocation();


  // ===================================================
  // REDUX
  // ===================================================

  const {
    dimensionScreenW,
    toggleSidebar,
    check,
  } = useSelector(
    (state) => state.global
  );


  // ===================================================
  // REFS
  // ===================================================

  const contentRef =
    useRef(null);

  const notificationListRef =
    useRef(null);


  // ===================================================
  // STATE
  // ===================================================

  const [
    access,
    setAccess,
  ] = useState({});


  const [
    loginAccess,
    setLoginAccess,
  ] = useState();


  const [
    listNotif,
    setListNotif,
  ] = useState([]);


  const [
    showNotification,
    setShowNotification,
  ] = useState(false);


  const [
    showProfile,
    setShowProfile,
  ] = useState(false);


  const [
    page,
    setPage,
  ] = useState(1);


  const [
    hasMore,
    setHasMore,
  ] = useState(true);


  const [
    loadingMore,
    setLoadingMore,
  ] = useState(false);


  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  // ===================================================
  // WINDOW
  // ===================================================

  const isMobile =
    dimensionScreenW < 768;


  // ===================================================
  // DUMMY NOTIFICATION
  // ===================================================

  const dummyListNotif = [

    {
      notifikasi_push_id:
        "NTF001",

      no_pengajuan:
        "280000992",

      title:
        "Faktur berhasil diantar",

      body:
        "Faktur 280000992 berhasil diantarkan ke Dinkes Kota Medan.",

      created_at:
        "2026-08-16T09:31:00",

      is_read:
        "T",
    },

    {
      notifikasi_push_id:
        "NTF002",

      no_pengajuan:
        "280009812",

      title:
        "Faktur berhasil diantar",

      body:
        "Faktur 280009812 berhasil diantarkan ke Apotek Madju Djaya.",

      created_at:
        "2026-08-16T09:35:00",

      is_read:
        "T",
    },

    {
      notifikasi_push_id:
        "NTF003",

      no_pengajuan:
        "28000912",

      title:
        "Pembayaran tunai berhasil diterima",

      body:
        "Rp140.000.000 berhasil diterima untuk pembayaran tunai faktur 28000912 oleh Apotek Rusli.",

      created_at:
        "2026-08-16T09:20:00",

      is_read:
        "F",
    },

    {
      notifikasi_push_id:
        "NTF004",

      no_pengajuan:
        "2800091281",

      title:
        "Pembayaran transfer berhasil diterima",

      body:
        "Rp140.000.000 berhasil diterima untuk pembayaran transfer faktur 2800091281 oleh RSUD Pasuruan.",

      created_at:
        "2026-08-16T09:15:00",

      is_read:
        "F",
    },

    {
      notifikasi_push_id:
        "NTF005",

      no_pengajuan:
        "280009134",

      title:
        "Faktur berhasil diantar",

      body:
        "Faktur 280009134 berhasil diantarkan ke Klinik Sehat Medika.",

      created_at:
        "2026-08-16T08:55:00",

      is_read:
        "T",
    },

    {
      notifikasi_push_id:
        "NTF006",

      no_pengajuan:
        "280009155",

      title:
        "Faktur berhasil diantar",

      body:
        "Faktur 280009155 berhasil diantarkan ke Rumah Sakit Harapan Bunda.",

      created_at:
        "2026-08-16T08:40:00",

      is_read:
        "F",
    },

    {
      notifikasi_push_id:
        "NTF007",

      no_pengajuan:
        "280009167",

      title:
        "Pembayaran tunai berhasil diterima",

      body:
        "Rp85.500.000 berhasil diterima untuk pembayaran tunai faktur 280009167 oleh Apotek Sejahtera.",

      created_at:
        "2026-08-16T08:25:00",

      is_read:
        "F",
    },

    {
      notifikasi_push_id:
        "NTF008",

      no_pengajuan:
        "280009188",

      title:
        "Pembayaran transfer berhasil diterima",

      body:
        "Rp215.000.000 berhasil diterima untuk pembayaran transfer faktur 280009188 oleh RSUD Dr. Soetomo.",

      created_at:
        "2026-08-16T08:10:00",

      is_read:
        "T",
    },

  ];


  // ===================================================
  // GET ACCESS
  // ===================================================

  useEffect(() => {

    const getAccess =
      async () => {

        try {

          const decoded =
            await decodeData(
              getCookies(
                "accountAccess"
              )
            );

          setAccess(
            decoded
          );

          setLoginAccess(
            decoded
          );

        } catch (error) {

          console.error(
            error
          );

        }

      };


    getAccess();

  }, []);


  // ===================================================
  // INITIAL NOTIFICATION
  // ===================================================

  useEffect(() => {

    setListNotif(
      dummyListNotif
    );

  }, []);


  // ===================================================
  // DIMENSION
  // ===================================================

  useEffect(() => {

    const handleResize =
      () => {

        if (
          contentRef.current
        ) {

          dispatch(
            setDimensionHeight(
              contentRef.current.offsetHeight
            )
          );

        }

      };


    handleResize();


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, [
    dispatch,
    toggleSidebar,
  ]);


  // ===================================================
  // TOGGLE SIDEBAR
  // ===================================================

  const handleToggleSidebar =
    () => {

      dispatch(
        setToggleSidebar(
          !toggleSidebar
        )
      );

    };


  // ===================================================
  // CLOSE POPUP
  // ===================================================

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          !event.target.closest(
            ".header-notification"
          ) &&
          !event.target.closest(
            ".header-profile"
          )
        ) {

          setShowNotification(
            false
          );

          setShowProfile(
            false
          );

        }

      };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // ===================================================
  // REFRESH
  // ===================================================

  const refreshNotifications =
    async () => {

      /*
       * Dummy sementara.
       *
       * Nanti tinggal ganti dengan:
       *
       * storeSchema.actions.getListNotification(...)
       */

      setRefreshing(true);

      try {

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              200
            )
        );

        setListNotif(
          dummyListNotif
        );

      } finally {

        setRefreshing(
          false
        );

      }

    };


  // ===================================================
  // HANDLE SCROLL
  // ===================================================

  const handleScroll =
    (e) => {

      const container =
        notificationListRef.current ||
        e.currentTarget;


      if (
        !container
      ) {
        return;
      }


      const isBottomReached =
        container.scrollTop +
        container.clientHeight >=
        container.scrollHeight - 5;


      if (
        !isBottomReached ||
        !hasMore ||
        loadingMore ||
        refreshing
      ) {
        return;
      }


      setPage(
        (prev) =>
          prev + 1
      );

    };


  // ===================================================
  // HANDLE FLAG
  // ===================================================

  const handleFlag =
    async (
      status_id,
      no_pengajuan
    ) => {

      const payload = {

        notifikasi_push_id:
          status_id,

        is_read:
          "Y",

      };


      try {

        /*
         * Kalau API sudah siap:
         *
         * await storeSchema.actions.updateNotifikasiPush(payload)
         */

        setListNotif(
          (prev) =>
            prev.map(
              (item) =>
                item.notifikasi_push_id ===
                  status_id
                  ? {
                    ...item,
                    is_read:
                      "F",
                  }
                  : item
            )
        );


        setShowNotification(
          false
        );


        navigation(
          loginAccess?.role_id ===
            "RL01"
            ? "/data-pengajuan"
            : "/approval-pengajuan",
          {
            state: {

              ...location.state,

              project:
                loginAccess?.role_id ===
                  "RL01"
                  ? "Data Pengajuan"
                  : "Approval Pengajuan",

              no_pengajuan:
                no_pengajuan,

            },
          }
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };


  // ===================================================
  // READ ALL
  // ===================================================

  const handleReadAll =
    async () => {

      /*
       * API nanti:
       *
       * await storeSchema.actions.readAllNotification()
       */

      setListNotif(
        (prev) =>
          prev.map(
            (item) => ({
              ...item,
              is_read: "F",
            })
          )
      );

    };


  // ===================================================
  // LOGOUT
  // ===================================================

  const handleLogout =
    async () => {

      try {

        swal.loading();

        const res =
          await storeSchema.actions.logout(
            getCookies(
              "loginData"
            )
          );


        if (
          res?.status
        ) {

          swal.close();

          removeCookies(
            "loginData"
          );

          removeCookies(
            "accountAccess"
          );

          window.location.href =
            "/login";

        } else {

          swal.error(
            "Gagal Logout !"
          );

        }

      } catch (
      error
      ) {

        swal.error(
          error
        );

      }

    };


  // ===================================================
  // UNREAD COUNT
  // ===================================================

  const unreadCount =
    listNotif.filter(
      (item) =>
        item.is_read === "T"
    ).length;


  // ===================================================
  // USER DATA
  // ===================================================

  const getUserName =
    () => {

      return (
        access?.username ||
        access?.nama ||
        "User"
      );

    };


  const getUserRole =
    () => {

      return (
        access?.role ||
        access?.jenis_user ||
        access?.jabatan ||
        "User"
      );

    };


  // ===================================================
  // HEADER LEFT POSITION
  // ===================================================

  const desktopSidebarWidth =
    !isMobile &&
      toggleSidebar
      ? 240
      : 0;


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <header
      ref={contentRef}
      className={`
        fixed
        top-0
        right-0
        z-[100]
        h-[80px]
        bg-white
        border-b
        border-gray-100
        shadow-primary
        shadow-sm
        transition-all
        duration-300
        ease-in-out
        ${dimensionScreenW < 768 &&
          check
          ? "bringToBack"
          : ""
        }
      `}
      style={{
        left:
          isMobile
            ? 0
            : desktopSidebarWidth,
      }}
    >

      <div
        className="
          h-full
          w-full
          px-4
          md:px-6
          flex
          items-center
          justify-between
        "
      >


        {/* ================================================= */}
        {/* LEFT */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            gap-4
            min-w-0
          "
        >

          {/* TOGGLE */}

          <button
            type="button"
            onClick={
              handleToggleSidebar
            }
            className="
              w-12
              h-12
              rounded-xl
              bg-blue-50
              text-primary
              flex
              items-center
              justify-center
              shadow-sm
              hover:bg-blue-100
              hover:text-orange-500
              hover:scale-105
              transition-all
              duration-200
              shrink-0
            "
            title={
              toggleSidebar
                ? "Tutup Sidebar"
                : "Buka Sidebar"
            }
          >

            {isMobile ? (

              toggleSidebar ? (
                <FaChevronLeft
                  className="
                    text-lg
                  "
                />
              ) : (
                <FaChevronRight
                  className="
                    text-lg
                  "
                />
              )

            ) : (

              toggleSidebar ? (
                <FaChevronLeft
                  className="
                    text-lg
                  "
                />
              ) : (
                <FaChevronRight
                  className="
                    text-lg
                  "
                />
              )

            )}

          </button>


          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          {(!toggleSidebar || isMobile) && (

            <div
              className="
      text-[28px]
      md:text-[30px]
      font-extrabold
      tracking-wide
      leading-none
      select-none
      whitespace-nowrap
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

          )}

        </div>


        {/* ================================================= */}
        {/* RIGHT */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            md:gap-3
            ml-auto
          "
        >

          {/* ================================================= */}
          {/* NOTIFICATION */}
          {/* ================================================= */}

          {access?.role_id !==
            "RL00" && (

              <div
                className="
                relative
                header-notification
              "
              >

                <button
                  type="button"
                  onClick={() => {

                    setShowNotification(
                      (prev) =>
                        !prev
                    );

                    setShowProfile(
                      false
                    );

                  }}
                  className="
                  relative
                  w-11
                  h-11
                  rounded-full
                  bg-blue-50
                  text-primary
                  flex
                  items-center
                  justify-center
                  hover:bg-blue-100
                  hover:text-orange-500
                  transition-all
                  duration-200
                "
                >

                  <FaBell
                    className="
                    text-xl
                  "
                  />


                  {unreadCount >
                    0 && (

                      <span
                        className="
                      absolute
                      -top-1
                      -right-1
                      min-w-[18px]
                      h-[18px]
                      px-1
                      flex
                      items-center
                      justify-center
                      bg-orange-500
                      text-white
                      rounded-full
                      text-[9px]
                      font-bold
                      border-2
                      border-white
                    "
                      >

                        {
                          unreadCount >
                            99
                            ? "99+"
                            : unreadCount
                        }

                      </span>

                    )}

                </button>


                {/* NOTIFICATION POPUP */}

                {showNotification && (

                  <div
                    className="
                    absolute
                    right-0
                    top-[56px]
                    w-[300px]
                    md:w-[360px]
                    bg-white
                    border
                    border-gray-100
                    rounded-2xl
                    shadow-2xl
                    overflow-hidden
                  "
                  >

                    {/* HEADER */}

                    <div
                      className="
                      px-4
                      py-3
                      border-b
                      flex
                      items-center
                      justify-between
                    "
                    >

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                      "
                      >

                        <div
                          className="
                          w-9
                          h-9
                          rounded-full
                          bg-blue-100
                          text-primary
                          flex
                          items-center
                          justify-center
                        "
                        >

                          <IoNotificationsSharp />

                        </div>

                        <div>

                          <p
                            className="
                            font-bold
                            text-gray-800
                          "
                          >
                            Notifikasi
                          </p>

                          <p
                            className="
                            text-[11px]
                            text-gray-400
                          "
                          >
                            {
                              unreadCount
                            }{" "}
                            belum terbaca
                          </p>

                        </div>

                      </div>


                      <button
                        type="button"
                        onClick={
                          handleReadAll
                        }
                        className="
                        flex
                        items-center
                        gap-1
                        px-2
                        py-1
                        rounded-full
                        bg-primary
                        text-white
                        text-[10px]
                        font-semibold
                        hover:bg-blue-800
                      "
                      >

                        <FaCheckDouble />

                        Semua Terbaca

                      </button>

                    </div>


                    {/* LIST */}

                    <div
                      ref={
                        notificationListRef
                      }
                      className="
                      max-h-[320px]
                      overflow-y-auto
                    "
                      onScroll={
                        handleScroll
                      }
                    >

                      {listNotif.length >
                        0 ? (

                        listNotif.map(
                          (
                            item,
                            index
                          ) => (

                            <div
                              key={
                                index
                              }
                              className="
                              border-b
                              border-gray-100
                            "
                            >

                              <button
                                type="button"
                                onClick={() =>
                                  handleFlag(
                                    item.notifikasi_push_id,
                                    item.no_pengajuan
                                  )
                                }
                                className={`
                                w-full
                                text-left
                                px-4
                                py-3
                                hover:bg-blue-50
                                transition
                                ${item.is_read ===
                                    "T"
                                    ? "bg-orange-50/40"
                                    : "bg-white"
                                  }
                              `}
                              >

                                <div
                                  className="
                                  flex
                                  items-start
                                  gap-3
                                "
                                >

                                  {/* ICON */}

                                  <div
                                    className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-orange-100
                                    text-orange-500
                                    flex
                                    items-center
                                    justify-center
                                    shrink-0
                                  "
                                  >

                                    {item.title
                                      ?.toLowerCase()
                                      .includes(
                                        "pembayaran"
                                      ) ? (
                                      <FaMoneyBillWave />
                                    ) : (
                                      <FaTruck />
                                    )}

                                  </div>


                                  {/* CONTENT */}

                                  <div
                                    className="
                                    min-w-0
                                    flex-1
                                  "
                                  >

                                    <div
                                      className="
                                      flex
                                      justify-between
                                      items-start
                                      gap-2
                                    "
                                    >

                                      <p
                                        className="
                                        text-sm
                                        font-bold
                                        text-gray-800
                                      "
                                      >
                                        {
                                          item.title
                                        }
                                      </p>


                                      {item.is_read ===
                                        "T" ? (

                                        <span
                                          className="
                                          relative
                                          flex
                                          size-2.5
                                        "
                                        >

                                          <span
                                            className="
                                            absolute
                                            inline-flex
                                            h-full
                                            w-full
                                            animate-ping
                                            rounded-full
                                            bg-red-400
                                            opacity-75
                                          "
                                          />

                                          <span
                                            className="
                                            relative
                                            inline-flex
                                            size-2.5
                                            rounded-full
                                            bg-red-500
                                          "
                                          />

                                        </span>

                                      ) : (

                                        <IoCheckmarkDoneOutline
                                          className="
                                          text-gray-400
                                          text-lg
                                          shrink-0
                                        "
                                        />

                                      )}

                                    </div>


                                    <div
                                      className="
                                      flex
                                      items-center
                                      gap-1
                                      text-xs
                                      font-semibold
                                      text-orange-500
                                      mt-1
                                    "
                                    >

                                      <FaTags />

                                      {
                                        item.no_pengajuan
                                      }

                                    </div>


                                    <p
                                      className="
                                      text-xs
                                      text-gray-600
                                      mt-1
                                      line-clamp-2
                                    "
                                    >
                                      {
                                        item.body
                                      }
                                    </p>


                                    <div
                                      className="
                                      flex
                                      items-center
                                      gap-1
                                      text-[10px]
                                      text-gray-400
                                      mt-2
                                    "
                                    >

                                      <IoCalendarOutline />

                                      {
                                        formatDateJam(
                                          item.created_at
                                        )
                                      }

                                    </div>

                                  </div>

                                </div>

                              </button>

                            </div>

                          )
                        )

                      ) : (

                        <div
                          className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          py-10
                          text-center
                        "
                        >

                          <div
                            className="
                            w-16
                            h-16
                            rounded-full
                            bg-blue-50
                            text-blue-400
                            flex
                            items-center
                            justify-center
                          "
                          >

                            <FaInbox
                              className="
                              text-2xl
                            "
                            />

                          </div>


                          <p
                            className="
                            mt-3
                            text-sm
                            font-semibold
                            text-gray-600
                          "
                          >
                            Tidak ada notifikasi
                          </p>

                        </div>

                      )}

                    </div>

                  </div>

                )}

              </div>

            )}


          {/* ================================================= */}
          {/* PROFILE */}
          {/* ================================================= */}

          <div
            className="
              relative
              header-profile
            "
          >

            <button
              type="button"
              onClick={() => {

                setShowProfile(
                  (prev) =>
                    !prev
                );

                setShowNotification(
                  false
                );

              }}
              className="
                flex
                items-center
                gap-2
                rounded-full
                hover:bg-gray-50
                transition
                p-1
              "
            >

              {/* AVATAR */}

              <div
                className="
                  relative
                  w-11
                  h-11
                  rounded-full
                  bg-primary
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-sm
                  border-2
                  border-blue-100
                "
              >

                <FaUser
                  className="
                    text-lg
                  "
                />


                {/* ONLINE */}

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-3
                    h-3
                    rounded-full
                    bg-green-500
                    border-2
                    border-white
                  "
                />

              </div>


              {/* INFO DESKTOP */}

              {!isMobile && (

                <div
                  className="
                    hidden
                    lg:flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      text-left
                    "
                  >

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-800
                      "
                    >

                      {
                        access?.cabang_id !==
                          "2000"
                          ? access?.cabang
                          : access?.unit_kerja ??
                          access?.nama
                      }

                    </p>


                    <p
                      className="
                        text-[11px]
                        text-gray-500
                      "
                    >

                      {
                        access?.cabang_id !==
                          "2000"
                          ? access?.jabatan
                          : access?.role_id ===
                            "RL17"
                            ? access?.jabatan
                            : (
                              access?.jenis_user ??
                              (
                                access?.role_id ===
                                  "RL16"
                                  ? access?.role
                                  : "Pemohon"
                              )
                            )
                      }

                    </p>

                  </div>


                  <div
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-gray-100
                      flex
                      items-center
                      justify-center
                      text-primary
                    "
                  >

                    <FaChevronDown
                      className={`
                        text-xs
                        transition-transform
                        duration-200
                        ${showProfile
                          ? "rotate-180"
                          : ""
                        }
                      `}
                    />

                  </div>

                </div>

              )}

            </button>


            {/* PROFILE DROPDOWN */}

            {showProfile && (

              <div
                className="
                  absolute
                  right-0
                  top-[56px]
                  w-[250px]
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  shadow-2xl
                  overflow-hidden
                "
              >

                {/* USER INFO */}

                <div
                  className="
                    px-4
                    py-4
                    bg-blue-50
                    border-b
                    border-blue-100
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-primary
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                    >

                      {
                        access?.username
                          ?.charAt(
                            0
                          )
                          ?.toUpperCase() ||
                        "U"
                      }

                    </div>


                    <div
                      className="
                        min-w-0
                      "
                    >

                      <p
                        className="
                          text-sm
                          font-bold
                          text-gray-800
                          truncate
                        "
                      >
                        {
                          getUserName()
                        }
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-500
                          truncate
                        "
                      >
                        {
                          getUserRole()
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* MENU */}

                <div
                  className="
                    p-2
                  "
                >

                  <button
                    type="button"
                    onClick={() => {

                      setShowProfile(
                        false
                      );

                      navigation(
                        "/ubah-password"
                      );

                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-xl
                      text-sm
                      text-gray-600
                      hover:bg-blue-50
                      hover:text-primary
                      transition
                    "
                  >

                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-blue-50
                        text-primary
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaCogs />

                    </div>

                    Ubah Password

                  </button>


                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-xl
                      text-sm
                      text-red-500
                      hover:bg-red-50
                      transition
                    "
                  >

                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-red-50
                        text-red-500
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaUser />

                    </div>

                    Logout

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>

  );

};


export default Header;