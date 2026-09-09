import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import storeSchema from 'global/store'
import { ReactComponent as POTTER_LOGO } from 'assets/POTTER_LOGO.svg'
import { ReactComponent as LOGO_KFTD } from 'assets/logo_kftd_warna.svg'
import BATIK from 'assets/BATIK_SIDEBAR.png'
import LOGO_LOGIN from 'assets/logo_kfcolls.png'
import BG_LOGIN from 'assets/BG_NEW.png'
import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import KFTD_WARNA from 'assets/logo_kftd_warna.svg'
import KFTD_PUTIH from 'assets/LOGO_PUTIH_FIX.png'
import { decodeData, encodeData } from 'global/helper/jwt'
import { getCookies, setCookies } from 'global/helper/cookie'
import { Label, Modal } from 'components/atoms'
import { setToggleModal } from '../../redux/n2n/global';
import { swal } from 'global/helper/swal';
import { FaArrowRight, FaFileInvoice, FaFileInvoiceDollar, FaInfoCircle, FaKey, FaReceipt, FaUser, FaUserAlt, FaUserCircle } from "react-icons/fa";
import LOGO_MAINTENANCE from 'assets/logo_maintenance.png';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Login = () => {
  document.title = 'KFCOLLS | Login';

  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const loginRef = useRef();

  const [isMaintenance, setIsMaintenance] = useState(false);
  // null = loading | true = maintenance | false = normal

  const [dataLogin, setDataLogin] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  // const [role, setRole] = useState({});
  const [role, setRole] = useState();
  const [access, setAccess] = useState([]);

  const [form, setForm] = useState({
    user_name: "",
    user_password: "",
  });

  const getLoginData = getCookies('loginData');
  const getAccountAccess = getCookies('accountAccess');

  // ===============================
  // CHECK MAINTENANCE ON PAGE LOAD
  // ===============================
  // useEffect(() => {
  //   const checkMaintenance = async () => {
  //     try {
  //       const res = await storeSchema.actions.CheckMaintenance();
  //       setIsMaintenance(res?.maintenance === true);
  //     } catch (error) {
  //       // FAIL SAFE
  //       setIsMaintenance(true);
  //     }
  //   };

  //   checkMaintenance();
  // }, []);

  // ===============================
  // GET LOGIN DATA (ROLE MODAL)
  // ===============================
  useEffect(() => {
    const get = async () => {
      const decode = await decodeData(getLoginData);
      setDataLogin(decode);
    };

    if (getLoginData) get();
  }, [getLoginData]);

  useEffect(() => {
    if (getLoginData && getAccountAccess) {
      window.location.href = '/';
      return
    }
  }, [getAccountAccess, getLoginData]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ===============================
  // LOGIN (NO MAINTENANCE CHECK HERE)
  // ===============================
  const handleLogin = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      if (getLoginData && getAccountAccess) {
        window.location.href = '/';
        return
      }
      const dataEncode = await encodeData(form);
      const res = await storeSchema.actions.login(dataEncode);
      swal.close();
      // setAccess([
      //   {
      //     label: "Pemohon",
      //     value: "Pemohon"
      //   },
      //   {
      //     label: "Atasan Pemohon",
      //     value: "Atasan Pemohon"
      //   },
      //   {
      //     label: "Sub Unit SDM & Umum",
      //     value: "Sub Unit SDM & Umum"
      //   },
      //   {
      //     label: "Sub Unit Logistik",
      //     value: "Sub Unit Logistik"
      //   },
      //   {
      //     label: "Sub Unit Pajak",
      //     value: "Sub Unit Pajak"
      //   },
      //   {
      //     label: "Sub Unit Financial Controller",
      //     value: "Sub Unit Financial Controller"
      //   },
      //   {
      //     label: "Sub Unit Akuntansi Kantor Pusat",
      //     value: "Sub Unit Akuntansi Kantor Pusat"
      //   },
      //   {
      //     label: "Sub Unit Anggaran",
      //     value: "Sub Unit Anggaran"
      //   },
      //   {
      //     label: "Manager Keuangan",
      //     value: "Manager Keuangan"
      //   },
      //   {
      //     label: "Direktur Keuangan, Manrisk & Sdm",
      //     value: "Direktur Keuangan, Direktur Keuangan, Manrisk & Sdm"
      //   },
      //   {
      //     label: "Sub Unit Keuangan Treasury",
      //     value: "Sub Unit Keuangan Treasury"
      //   },
      //   {
      //     label: "Super Admin",
      //     value: "Super Admin"
      //   },
      // ]); // ini harus dihapus nanti

      if (res?.status === true) {
        // setCookies('accountAccess', res?.data);
        // setCookies('loginData', dataEncode);
        window.location.href = '/';
        // dispatch(setToggleModal({ isOpen: true, modal: "selectRole" }));
      } else {
        swal.error(res?.data?.data || 'Login gagal');
      }
    } catch (error) {
      swal.close();
      swal.error('Terjadi kesalahan sistem');
    }
    // try {
    //   const dataEncode = await encodeData(form);
    //   const res = await storeSchema.actions.login(dataEncode);
    //   swal.close();

    //   if (res?.status === true) {
    //     if (res?.flag === true) {
    //       setAccess(res?.access);
    //       setCookies('listAccess', res?.access);
    //     } else {
    //       setCookies('accountAccess', JSON.stringify(res?.access[0]));
    //       window.location.href = '/';
    //     }

    //     setCookies('loginData', res?.data);
    //     dispatch(setToggleModal({ isOpen: true, modal: "selectRole" }));
    //   } else {
    //     swal.error(res?.data?.data || 'Login gagal');
    //   }
    // } catch (error) {
    //   swal.close();
    //   swal.error('Terjadi kesalahan sistem');
    // }
  };

  const handleRole = (e) => {
    // setRole(JSON.parse(e.target.value));
    setRole(e.target.value);
  };

  const backgroundStyle = {
    backgroundImage: `
    url(${KFTD_PUTIH}),
    linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(${BG_LOGIN})
  `,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `
    20px 20px,              /* kiri atas */
    right calc(100% + 0px),
    center,
    center
  `,
    backgroundSize: window.innerWidth <= 768
      ? '100px, cover, cover'
      : '100px, cover, cover',
  };

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

  // ===============================
  // RENDER
  // ===============================

  return (
    <>
      {/* ================= LOADING ================= */}
      {isMaintenance === null && (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}


      {/* ================= LOGIN FORM ================= */}
      {/* {isMaintenance === false && ( */}
      <div
        ref={loginRef}
        className="
    min-h-screen
    bg-white
    relative
    overflow-hidden
    flex
    items-center
    justify-center
    px-6
  "
      >

        {/* ========================================================= */}
        {/* BACKGROUND DECORATION */}
        {/* ========================================================= */}

        {/* Orange glow kiri atas */}
        <div
          className="
      absolute
      -top-40
      -left-40
      w-[500px]
      h-[500px]
      rounded-full
      bg-[#F58220]/10
      blur-3xl
      pointer-events-none
    "
        />

        {/* Orange glow kanan bawah */}
        <div
          className="
      absolute
      -bottom-48
      -right-40
      w-[550px]
      h-[550px]
      rounded-full
      bg-[#F58220]/10
      blur-3xl
      pointer-events-none
    "
        />

        {/* Blue glow */}
        <div
          className="
      absolute
      top-[30%]
      right-[35%]
      w-[250px]
      h-[250px]
      rounded-full
      bg-[#0066B3]/5
      blur-3xl
      pointer-events-none
    "
        />

        {/* Pattern titik kanan atas */}
        <div
          className="
      absolute
      top-0
      right-0
      w-[300px]
      h-[300px]
      opacity-[0.10]
      pointer-events-none
    "
          style={{
            backgroundImage: `
        radial-gradient(#F58220 1px, transparent 1px)
      `,
            backgroundSize: "18px 18px",
          }}
        />

        {/* Pattern titik kiri bawah */}
        <div
          className="
      absolute
      bottom-0
      left-0
      w-[220px]
      h-[220px]
      opacity-[0.06]
      pointer-events-none
    "
          style={{
            backgroundImage: `
        radial-gradient(#0066B3 1px, transparent 1px)
      `,
            backgroundSize: "16px 16px",
          }}
        />

        {/* ========================================================= */}
        {/* MAIN CONTENT */}
        {/* ========================================================= */}

        <div
          className="
      relative
      z-10
      w-full
      max-w-6xl
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-12
      items-center
    "
        >

          {/* ======================================================= */}
          {/* LEFT SIDE - ILLUSTRATION */}
          {/* ======================================================= */}

          <div
            className="
        hidden
        lg:flex
        flex-col
        items-center
        justify-center
      "
          >

            {/* Illustration */}
            <div className="relative w-[420px] h-[350px]">

              {/* Background Circle */}
              <div
                className="
            absolute
            inset-10
            rounded-full
            bg-[#EAF4FB]
            opacity-80
          "
              />

              {/* Orange decorative circle */}
              <div
                className="
            absolute
            top-5
            left-10
            w-8
            h-8
            rounded-full
            bg-[#F58220]/20
          "
              />

              <div
                className="
            absolute
            bottom-8
            right-5
            w-12
            h-12
            rounded-full
            bg-[#F58220]/15
          "
              />

              {/* =================================================== */}
              {/* INVOICE CARD */}
              {/* =================================================== */}

              <div
                className="
            absolute
            top-8
            left-16
            w-48
            h-60
            bg-white
            rounded-2xl
            shadow-lg
            border
            border-gray-100
            rotate-[-8deg]
            p-6
          "
              >

                {/* Invoice Header */}
                <div className="flex items-center gap-3 mb-6">

                  <div
                    className="
                w-10
                h-10
                rounded-xl
                bg-[#FFF3E8]
                flex
                items-center
                justify-center
              "
                  >
                    <FaFileInvoiceDollar
                      className="
                  text-[#F58220]
                  text-xl
                "
                    />
                  </div>

                  <div>
                    <div className="text-xs text-gray-400">
                      Invoice
                    </div>

                    <div className="font-semibold text-gray-700">
                      INV-001
                    </div>
                  </div>

                </div>

                {/* Invoice Lines */}
                <div className="space-y-3">

                  <div
                    className="
                h-2
                bg-gray-100
                rounded-full
                w-full
              "
                  />

                  <div
                    className="
                h-2
                bg-gray-100
                rounded-full
                w-4/5
              "
                  />

                  <div
                    className="
                h-2
                bg-gray-100
                rounded-full
                w-3/5
              "
                  />

                </div>

                {/* Total */}
                <div className="mt-8">

                  <div className="text-xs text-gray-400">
                    Total
                  </div>

                  <div
                    className="
                font-bold
                text-[#0066B3]
              "
                  >
                    Rp 12.500.000
                  </div>

                </div>

              </div>


              {/* =================================================== */}
              {/* BLUE COLLECTION CARD */}
              {/* =================================================== */}

              <div
                className="
            absolute
            bottom-6
            right-12
            w-48
            h-60
            bg-[#0066B3]
            rounded-2xl
            shadow-xl
            rotate-[8deg]
            p-6
            overflow-hidden
          "
              >

                {/* Icon */}
                <div className="flex justify-center mt-5">

                  <div
                    className="
                w-16
                h-16
                rounded-full
                bg-white/15
                border
                border-white/20
                flex
                items-center
                justify-center
              "
                  >
                    <FaReceipt
                      className="
                  text-white
                  text-3xl
                "
                    />
                  </div>

                </div>

                {/* Text */}
                <div className="text-center mt-6">

                  <div
                    className="
                text-white/70
                text-xs
                tracking-widest
              "
                  >
                    COLLECTION
                  </div>

                  <div
                    className="
                text-white
                font-bold
                text-lg
              "
                  >
                    FAKTUR
                  </div>

                </div>

                {/* Orange Accent */}
                <div
                  className="
              absolute
              bottom-0
              left-0
              right-0
              h-2
              bg-[#F58220]
              rounded-b-2xl
            "
                />

              </div>


              {/* =================================================== */}
              {/* FLOATING INVOICE ICON */}
              {/* =================================================== */}

              <div
                className="
            absolute
            top-0
            right-16
            w-12
            h-12
            bg-white
            shadow-lg
            rounded-xl
            border
            border-[#FFF3E8]
            flex
            items-center
            justify-center
          "
              >
                <FaFileInvoice
                  className="
              text-[#F58220]
              text-xl
            "
                />
              </div>


              {/* =================================================== */}
              {/* FLOATING RECEIPT ICON */}
              {/* =================================================== */}

              <div
                className="
            absolute
            bottom-12
            left-4
            w-12
            h-12
            bg-white
            shadow-lg
            rounded-xl
            border
            border-[#EAF4FB]
            flex
            items-center
            justify-center
          "
              >
                <FaReceipt
                  className="
              text-[#0066B3]
              text-xl
            "
                />
              </div>


              {/* Small Orange Dot */}
              <div
                className="
            absolute
            top-20
            right-5
            w-3
            h-3
            rounded-full
            bg-[#F58220]
          "
              />

            </div>


            {/* =================================================== */}
            {/* BRAND */}
            {/* =================================================== */}

            <div className="text-center mt-4">

              <h1
                className="
            text-4xl
            font-bold
            tracking-wide
            drop-shadow-sm
          "
              >
                <span className="text-[#F58220]">
                  KF
                </span>

                <span className="text-[#0066B3]">
                  COLLS
                </span>
              </h1>

              <p
                className="
            text-gray-600
            mt-2
            text-lg
            font-medium
          "
              >
                Collection Faktur
              </p>

              <p
                className="
            text-gray-400
            text-sm
            mt-2
            max-w-md
          "
              >
                Sistem pengelolaan dan monitoring
                proses collection faktur secara terintegrasi.
              </p>

            </div>

          </div>


          {/* ======================================================= */}
          {/* RIGHT SIDE - LOGIN */}
          {/* ======================================================= */}

          <div
            className="
        flex
        justify-center
        lg:justify-end
      "
          >

            <div className="w-full max-w-md">

              {/* ================================================= */}
              {/* MOBILE LOGO */}
              {/* ================================================= */}

              <div
                className="
            lg:hidden
            text-center
            mb-8
          "
              >

                <div className="flex justify-center mb-3">

                  <div
                    className="
                w-16
                h-16
                rounded-2xl
                bg-[#0066B3]
                flex
                items-center
                justify-center
                shadow-lg
                shadow-[#0066B3]/20
                relative
                overflow-hidden
              "
                  >

                    <FaFileInvoiceDollar
                      className="
                  text-white
                  text-3xl
                "
                    />

                    {/* Orange bottom line */}
                    <div
                      className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-1
                  bg-[#F58220]
                "
                    />

                  </div>

                </div>


                <h1
                  className="
              text-3xl
              font-bold
            "
                >
                  <span className="text-[#F58220]">
                    KF
                  </span>

                  <span className="text-[#0066B3]">
                    COLLS
                  </span>
                </h1>


                <p className="text-gray-500 mt-1">
                  Collection Faktur
                </p>

              </div>


              {/* ================================================= */}
              {/* LOGIN CARD */}
              {/* ================================================= */}

              <div
                className="
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-[0_20px_60px_rgba(0,102,179,0.10)]
            p-8
            sm:p-10
          "
              >

                {/* Header */}
                <div className="mb-8">

                  <div
                    className="
        w-10
        h-1
        rounded-full
        bg-[#F58220]
        mb-4
      "
                  />

                  <div className="flex items-center justify-between gap-5">

                    {/* Welcome Text */}
                    <div>
                      <h2
                        className="
            text-2xl
            font-bold
            text-gray-800
          "
                      >
                        Selamat Datang
                      </h2>

                      <p
                        className="
            text-gray-500
            mt-2
          "
                      >
                        Silakan login untuk melanjutkan
                      </p>
                    </div>

                    {/* Logo */}
                    <div
                      className="
          shrink-0
          flex
          items-center
          justify-center
          w-24
          h-16
        "
                    >
                      <img
                        src={LOGO_LOGIN}
                        alt="KF COLLS"
                        className="
            max-w-full
            max-h-full
            object-contain
          "
                      />
                    </div>

                  </div>

                </div>


                {/* ================================================= */}
                {/* FORM */}
                {/* ================================================= */}

                <form onSubmit={handleLogin}>

                  {/* ================================================= */}
                  {/* USERNAME */}
                  {/* ================================================= */}

                  <div className="mb-5">

                    <label
                      className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-2
                "
                    >
                      Username
                    </label>

                    <div className="relative">

                      <FaUser
                        className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                      />

                      <input
                        type="text"
                        name="user_name"
                        value={form.user_name}
                        onChange={handleChange}
                        placeholder="Masukkan username"
                        className="
                    input
                    input-bordered
                    w-full
                    pl-11
                    rounded-xl
                    bg-white
                    border-gray-200
                    focus:outline-none
                    focus:border-[#0066B3]
                    focus:ring-2
                    focus:ring-[#0066B3]/10
                    transition-all
                    duration-200
                  "
                      />

                    </div>

                  </div>


                  {/* ================================================= */}
                  {/* PASSWORD */}
                  {/* ================================================= */}

                  <div className="mb-7">

                    <label
                      className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-2
                "
                    >
                      Password
                    </label>

                    <div className="relative">

                      <FaKey
                        className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="user_password"
                        value={form.user_password}
                        onChange={handleChange}
                        placeholder="Masukkan password"
                        className="
                    input
                    input-bordered
                    w-full
                    pl-11
                    pr-12
                    rounded-xl
                    bg-white
                    border-gray-200
                    focus:outline-none
                    focus:border-[#0066B3]
                    focus:ring-2
                    focus:ring-[#0066B3]/10
                    transition-all
                    duration-200
                  "
                      />


                      {/* Show Password */}
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-[#0066B3]
                    transition-colors
                    duration-200
                  "
                      >

                        {showPassword
                          ? <HiEyeOff size={20} />
                          : <HiEye size={20} />
                        }

                      </button>

                    </div>

                  </div>


                  {/* ================================================= */}
                  {/* LOGIN BUTTON */}
                  {/* ================================================= */}

                  <button
                    type="submit"
                    className="
                w-full
                h-12
                rounded-xl
                bg-[#0066B3]
                hover:bg-[#005A9C]
                hover:scale-[1.02]
                active:scale-[0.98]
                text-white
                font-semibold
                transition-all
                duration-200
                shadow-lg
                shadow-[#0066B3]/20
              "
                  >
                    LOGIN
                  </button>

                </form>


                {/* ================================================= */}
                {/* FOOTER */}
                {/* ================================================= */}

                <div className="text-center mt-7">

                  <p className="text-xs text-gray-400">
                    <span className="text-[#F58220] font-medium">
                      KF
                    </span>

                    <span className="text-[#0066B3] font-medium">
                      COLLS
                    </span>

                    {" "}— Collection Faktur
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ========================================================= */}
        {/* BOTTOM ORANGE LINE */}
        {/* ========================================================= */}

        <div
          className="
      absolute
      bottom-0
      left-0
      w-full
      h-[3px]
      bg-[#F58220]
    "
        />

      </div>
      {/* )} */}
    </>
  );
};

export default Login;
