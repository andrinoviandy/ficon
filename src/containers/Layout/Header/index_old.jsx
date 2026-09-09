import React, { useEffect, useRef, useState } from "react";
import {
  setDimensionHeight,
  setToggleModal,
  setToggleSidebar,
} from "../../../redux/n2n/global";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as LogoPSD } from "assets/PSD_LOGO_BLUE.svg";
import LOGO_COST from "assets/LOGO_LOGIN.png";
import { ReactComponent as BtnDropdown } from "assets/btn_dropdown.svg";
import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { decodeData } from "global/helper/jwt";
import { getCookies, removeCookies, setCookies } from "global/helper/cookie";
import { IoPersonSharp, IoPersonCircleSharp, IoReader, IoNotifications, IoCalendarOutline, IoCheckmarkDone, IoCheckmarkDoneOutline, IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import storeSchema from "global/store";
import { swal } from "global/helper/swal";
import { useLocation, useNavigate } from "react-router-dom";
import { Label, Modal } from "components/atoms";
import { FaArrowRight, FaFileAlt, FaUser, FaUserAlt, FaUserSlash } from "react-icons/fa";

const Header = (props) => {
  // const { listNotif } = props
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const navigation = useNavigate();
  const location = useLocation();
  const contentRef = useRef(null);
  const { dimensionComponent, dimensionScreenW, toggleSidebar, check } =
    useSelector((state) => state.global);
  const [loginData, setLoginData] = useState({});
  const [listNotif, setListNotif] = useState([]);
  const [role, setRole] = useState({});
  const [access, setAccess] = useState([]);
  const accountAccess = getCookies("accountAccess");
  const listAccess = getCookies("listAccess");

  const getListNotification = async () => {
    try {
      const res = await storeSchema.actions.getListNotification()
      if (res.status) {
        setListNotif(res?.data);
      } else {
        setListNotif([])
      }
    } catch (error) {
      console.log('ERROR', error);
      setListNotif([])
    }
  }

  console.log(loginData, 'loginData');

  useEffect(() => {
    const get = async () => {
      // const decode = await decodeData(localStorage.getItem('loginData'));
      // const decode = await decodeData(getCookies("loginData"));
      const decode = getCookies("loginData");
      setLoginData(decode);
    };
    get();
    // if (accountAccess?.kode !== '8001') {
    //   getListNotification()
    // }
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      function handleResize() {
        dispatch(setDimensionHeight(contentRef.current.offsetHeight));
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [dispatch, toggleSidebar]);
  useEffect(() => {
    if (loginData) {
      // setAccess(loginData?.dataHakases);
      setAccess(getCookies('accountAccess'));
    }
  }, [loginData])

  const handleLogout = async () => {
    try {
      swal.loading()
      // const res = await storeSchema.actions.logout(loginData);
      // if (res?.status) {
      swal.close()
      removeCookies("loginData");
      removeCookies("accountAccess");
      removeCookies("listAccess");
      window.location.href = "/login";
      // } else {
      //   swal.error("Gagal Logout !");
      // }
    } catch (error) {
      swal.error(error);
    }
  };

  const handleRole = (e) => {
    setRole(JSON.parse(e.target.value))
  };

  const handleFlag = async (status_id, project_id, navigate_to) => {
    const payload = {
      notification_status_id: status_id,
      is_read: 'T'
    }
    const res = await storeSchema.actions.updateNotification(payload)
    if (res?.status) {
      getListNotification()
      const header = navigate_to === '/faktur-pajak' ? 'Faktur Pajak' : navigate_to === '/billing-collections-index' ? 'Billing Collections' : 'Project Profile'
      navigation(navigate_to ? navigate_to : '/project-profile', {
        state: {
          ...location.state,
          project: header,
          ...(navigate_to === '/billing-collections-index' ? {
            billing_id: project_id,
          } : {
            data: {
              project_id: project_id,
            }
          })
          ,
        },
      });
    }
  }

  useEffect(() => {
    // let interval;
    // if (accountAccess?.kode && accountAccess?.kode !== '8001') {
    //   interval = setInterval(() => {
    //     getListNotification()
    //   }, 60000);
    // }

    // return () => {
    //   if (interval) {
    //     clearInterval(interval);
    //   }
    // };
  }, [accountAccess]);

  const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (
      words[0][0] + words[words.length - 1][0]
    ).toUpperCase();
  };

  const dummyNotif = [
    {
      NOTIFICATION_STATUS_ID: 1,
      PROJECT_ID: "PRJ001",
      NAVIGATE_TO: "/pengajuan",
      IS_READ: "F",
      NO_PENGAJUAN: "PJN-00123",
      NAMA: "Andi Saputra",
      NOMINAL: 15000000,
      KETERANGAN: "Pengajuan biaya operasional kantor pusat bulan Juli",
      CREATED_AT: "10:20",
      STATUS: 'APPROVE'
    },
    {
      NOTIFICATION_STATUS_ID: 2,
      PROJECT_ID: "PRJ002",
      NAVIGATE_TO: "/pengajuan",
      IS_READ: "T",
      NO_PENGAJUAN: "PJN-00124",
      NAMA: "Budi Santoso",
      NOMINAL: 8750000,
      KETERANGAN: "Reimbursement perjalanan dinas luar kota",
      CREATED_AT: "09:10",
      STATUS: 'REJECT'
    },
    {
      NOTIFICATION_STATUS_ID: 3,
      PROJECT_ID: "PRJ003",
      NAVIGATE_TO: "/pengajuan",
      IS_READ: "F",
      NO_PENGAJUAN: "PJN-00125",
      NAMA: "Citra Dewi",
      NOMINAL: 22000000,
      KETERANGAN: "Pembelian alat kesehatan cabang",
      CREATED_AT: "15:45",
      STATUS: 'APPROVE'
    },
  ];

  return (
    <div className="z-50">
      <Modal
        title={"Pilih Unit Anda"}
        modal={"selectRole"}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
              onClick={() => {
                // setCookies('accountAccess', JSON.stringify(role));
                setCookies('accountAccess', role);
                dispatch(setToggleModal({ isOpen: false, modal: "" }))
                window.location.reload();
              }}
              disabled={!role?.kode}
            >
              Done <FaArrowRight />
            </button>
          </>
        }
      >
        <div className='relative'>
          {/* <BgModal width={'-webkit-fill-available'} />
          <div className='absolute top-3 left-5 border-l-2 pl-5'>
            <h3 className="font-bold text-lg text-white">{loginData?.NAMA}</h3>
            <div className='flex gap-3 text-white items-center'>
              <p className="text-sm">{loginData?.USERNAME}</p>
              <span className="">|</span>
              <p className="text-sm">{loginData?.NAMA_SUB}</p>
            </div>
          </div> */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-6 text-white">

            {/* SVG Background */}
            <BgModal className="absolute inset-0 w-full h-full object-cover opacity-80" />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-5">

              {/* Avatar */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-300 text-2xl font-bold text-black">
                {/* {getInitials(loginData?.NAMA)} */}
                {getInitials(loginData?.user_name)}
              </div>

              {/* Info */}
              <div>
                {/* <p className="text-xl font-semibold">{loginData?.NAMA}</p>
                <p className="text-sm opacity-80 mt-1">
                  {loginData?.USERNAME} <span className="mx-2">|</span> {loginData?.NAMA_SUB}
                </p> */}
                <p className="text-xl font-semibold">{loginData?.user_name}</p>
                <p className="text-sm opacity-80 mt-1">
                  {loginData?.user_name} <span className="mx-2">|</span> {loginData?.user_password}
                </p>
              </div>

            </div>
          </div>
          <div className="flex items-start gap-4 mt-3">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
              <FaUser className="text-primary text-lg" />
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <p className="text-gray-600 font-semibold">
                Choose Your Roles
              </p>
              <p className="text-sm text-gray-500">
                Silakan pilih role yang sesuai dengan pekerjaan Anda.
              </p>
            </div>
          </div>
          <div className='mt-1'>
            <Label
              label=''
              children={
                <select
                  className='select select-sm w-full input-bordered rounded-[15px] border border-primary bg-white'
                  onChange={handleRole}
                >
                  <option value={JSON.stringify({ kode: '', uraian: '' })}></option>
                  {listAccess?.map(data => {
                    return (
                      <option value={JSON.stringify(data)}>{data?.uraian}</option>
                    )
                  })}
                </select>
              }
            />
          </div>
        </div>
      </Modal>
      <div
        ref={contentRef}
        className={`${dimensionScreenW < 768 && check ? "bringToBack" : "z-20"
          } fixed py-2 px-6 bg-base-100 shadow-lg`}
        style={{ width: dimensionComponent.width }}
      >
        <div className="flex flex-row justify-between">
          <div className="flex gap-5">
            <label
              htmlFor="left-sidebar-drawer"
              className="btn drawer-button"
              onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
            >
              <div>
                <div className="burger-icon"></div>
                <div className="burger-icon"></div>
                <div className="burger-icon"></div>
              </div>
            </label>
            {(!toggleSidebar || dimensionScreenW <= 767) && (
              <div className="flex items-center">
                {/* <LogoPSD /> */}
                <img src={LOGO_COST} alt="Logo" className="w-auto h-12" />
              </div>
            )}
          </div>
          {/* <h1 className="text-2xl font-semibold ml-2">{"pageTitle"}</h1> */}

          <div className="flex gap-4 items-center">

            {/* notification */}
            {accountAccess?.kode !== '8001' && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1 relative">
                  <IoNotifications className="text-3xl text-blue-900" />
                  {dummyNotif && dummyNotif.length > 0 && dummyNotif.filter(a => a.IS_READ === 'F').length > 0 && (
                    <span className="bg-red-500 w-4 h-4 text-white rounded-full absolute left-0 top-0 text-[8px] text-center animate-bounce">
                      {dummyNotif.filter(a => a.IS_READ === 'F').length > 99 ? '99+' : dummyNotif.filter(a => a.IS_READ === 'F').length}
                    </span>
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[290px] lg:w-[350px] shadow-sm divide-y-2 divide-base-200/70 shadow-blue-700 border overflow-x-auto"
                >
                  <div className="flex justify-between">
                    <span className="text-lg font-bold mx-3 py-3 items-center gap-2 flex text-blue-900 flex-row">
                      <div className="bg-blue-200 rounded-full p-1">
                        <IoNotificationsSharp />
                      </div>
                      Notifikasi
                    </span>
                    <div className="flex items-center">
                      <div className="bg-blue-900 text-white px-4 font-semibold text-xs py-1 rounded-full">
                        2 Baru
                      </div>
                    </div>
                  </div>
                  <div className="border-t-4 w-full"></div>
                  <div className="overflow-y-auto h-[400px]">
                    {dummyNotif && dummyNotif.length > 0 && dummyNotif.map((item, index) => (
                      <React.Fragment key={index}>
                        <li className="text-sm relative">
                          <a onClick={() => handleFlag(item?.NOTIFICATION_STATUS_ID, item?.PROJECT_ID, item?.NAVIGATE_TO)}>

                            {/* STATUS READ / UNREAD */}
                            {item?.IS_READ === 'F' ? (
                              <div className="absolute top-1 right-1">
                                <span className="relative flex size-3">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                                </span>
                              </div>
                            ) : (
                              <div className="absolute top-1 right-1">
                                <IoCheckmarkDoneOutline className="text-gray-500 text-lg" />
                              </div>
                            )}

                            <div className="flex flex-col w-full">

                              {/* HEADER */}
                              <div className="flex flex-wrap text-wrap font-bold gap-3 items-center">

                                <div className="text-blue-900 flex items-center gap-1">
                                  <FaFileAlt />
                                  {item?.PROJECT_ID}
                                </div>

                                <div className="text-orange-600 flex items-center gap-1">
                                  <FaUserAlt />
                                  {item?.NAMA}
                                </div>

                                {/* 🔥 STATUS APPROVAL */}
                                {item?.STATUS === 'APPROVE' && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    APPROVED
                                  </span>
                                )}

                                {item?.STATUS === 'REJECT' && (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                    REJECTED
                                  </span>
                                )}

                                {!item?.STATUS && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    PENDING
                                  </span>
                                )}

                              </div>

                              {/* KETERANGAN */}
                              <div className="flex w-full">
                                <div className="relative group inline-block w-max">
                                  <div className="truncate">
                                    {item?.KETERANGAN?.substring(0, 37) + '...' || '-'}
                                  </div>

                                  <div className="absolute left-0 top-full mt-2 bg-gray-800 text-white text-sm px-3 py-2 rounded shadow-md hidden group-hover:block z-50 w-70 whitespace-normal text-justify">
                                    {item?.KETERANGAN || '-'}
                                  </div>
                                </div>
                              </div>

                              {/* TANGGAL */}
                              <div className="flex w-[220px] lg:w-[300px] items-center justify-end gap-1 text-xs text-gray-500">
                                <IoCalendarOutline className="p-0 m-0" />
                                {item?.CREATED_AT}
                              </div>

                            </div>
                          </a>
                        </li>

                        <div className="border-t-2 w-full"></div>
                      </React.Fragment>
                    ))}
                  </div>
                </ul>
              </div>
            )}

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex gap-3">
                <div className="">
                  <div className="rounded-full items-center flex justify-center">
                    <IoPersonCircleSharp className="text-5xl text-blue-900" />
                    {/* <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                  </div>
                </div>
                {dimensionScreenW > 767 && (
                  <div className="items-center flex gap-3">
                    <div>
                      {/* <p className="font-semibold">{loginData?.NAMA}</p> */}
                      <p className="font-semibold">{loginData?.user_name}</p>
                      <p className="text-xs font-medium">
                        {/* {loginData?.NAMA_SUB} */}
                        {access}
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <BtnDropdown />
                    </div>
                  </div>
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {/* USER INFO CARD */}
                {dimensionScreenW <= 767 && (
                  <li className="mb-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200">

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold uppercase">
                        {loginData?.user_name?.charAt(0) || "U"}
                      </div>

                      {/* Info */}
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm leading-tight">
                          {loginData?.user_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {access}
                        </p>
                      </div>
                    </div>
                  </li>
                )}

                <li onClick={() => navigation('/profile')}>
                  <p className="justify-between">
                    Ubah Password
                    <span className="badge badge-primary badge-sm">New</span>
                  </p>
                </li>

                {/* {listAccess?.length > 1 && (
                  <li>
                    <p
                      onClick={() => {
                        dispatch(setToggleModal({
                          isOpen: !toggleModal.isOpen,
                          modal: "selectRole"
                        }))
                      }}
                    >
                      Change Roles
                    </p>
                  </li>
                )} */}

                <li>
                  <p onClick={handleLogout} className="text-error">
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
