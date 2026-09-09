import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import storeSchema from 'global/store'
import { ReactComponent as POTTER_LOGO } from 'assets/POTTER_LOGO.svg'
import { ReactComponent as LOGO_KFTD } from 'assets/logo_kftd_warna.svg'
import BATIK from 'assets/BATIK_SIDEBAR.png'
import LOGO_LOGIN from 'assets/LOGO_LOGIN.png'
import BG_LOGIN from 'assets/BG_NEW.png'
import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import KFTD_WARNA from 'assets/logo_kftd_warna.svg'
import KFTD_PUTIH from 'assets/LOGO_PUTIH_FIX.png'
import { decodeData, encodeData } from 'global/helper/jwt'
import { getCookies, setCookies } from 'global/helper/cookie'
import { Label, Modal } from 'components/atoms'
import { setToggleModal } from '../../redux/n2n/global';
import { swal } from 'global/helper/swal';
import { FaArrowRight, FaInfoCircle, FaKey, FaUser, FaUserAlt, FaUserCircle } from "react-icons/fa";
import LOGO_MAINTENANCE from 'assets/logo_maintenance.png';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Login = () => {
  document.title = 'COSTRACK | Login';

  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const loginRef = useRef();

  const [isMaintenance, setIsMaintenance] = useState(null);
  // null = loading | true = maintenance | false = normal

  const [dataLogin, setDataLogin] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  // const [role, setRole] = useState({});
  const [role, setRole] = useState();
  const [access, setAccess] = useState([]);

  const [form, setForm] = useState({
    application_id: '6018',
    user_name: "",
    user_password: "",
  });

  const getLoginData = getCookies('loginData');

  // ===============================
  // CHECK MAINTENANCE ON PAGE LOAD
  // ===============================
  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const res = await storeSchema.actions.CheckMaintenance();
        setIsMaintenance(res?.maintenance === true);
      } catch (error) {
        // FAIL SAFE
        setIsMaintenance(true);
      }
    };

    checkMaintenance();
  }, []);

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
      // const dataEncode = await encodeData(form);
      // const res = await storeSchema.actions.login(dataEncode);
      swal.close();
      setAccess([
        {
          label: "Pemohon",
          value: "Pemohon"
        },
        {
          label: "Atasan Pemohon",
          value: "Atasan Pemohon"
        },
        {
          label: "Sub Unit SDM & Umum",
          value: "Sub Unit SDM & Umum"
        },
        {
          label: "Sub Unit Logistik",
          value: "Sub Unit Logistik"
        },
        {
          label: "Sub Unit Pajak",
          value: "Sub Unit Pajak"
        },
        {
          label: "Sub Unit Financial Controller",
          value: "Sub Unit Financial Controller"
        },
        {
          label: "Sub Unit Akuntansi Kantor Pusat",
          value: "Sub Unit Akuntansi Kantor Pusat"
        },
        {
          label: "Sub Unit Anggaran",
          value: "Sub Unit Anggaran"
        },
        {
          label: "Manager Keuangan",
          value: "Manager Keuangan"
        },
        {
          label: "Direktur Keuangan, Manrisk & Sdm",
          value: "Direktur Keuangan, Manrisk & Sdm"
        },
        {
          label: "Sub Unit Keuangan Treasury",
          value: "Sub Unit Keuangan Treasury"
        },
        {
          label: "Super Admin",
          value: "Super Admin"
        },
      ]); // ini harus dihapus nanti

      // if (res?.status === true) {
      // if (res?.flag === true) {
      //   setAccess(res?.access);
      //   setCookies('listAccess', res?.access);
      // } else {
      //   setCookies('accountAccess', JSON.stringify(res?.access[0]));
      //   window.location.href = '/';
      // }

      setCookies('loginData', form);
      dispatch(setToggleModal({ isOpen: true, modal: "selectRole" }));
      // } else {
      //   swal.error(res?.data?.data || 'Login gagal');
      // }
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
      {/* ================= MODAL ROLE ================= */}
      <Modal
        title="Pilih Unit Anda"
        modal="selectRole"
        buttonFooter={
          <button
            className="btn rounded-[25px] px-5 ml-3 text-white bg-blue-900 border-none"
            onClick={() => {
              // setCookies('accountAccess', JSON.stringify(role));
              setCookies('accountAccess', role);
              dispatch(setToggleModal({ isOpen: false, modal: "" }));
              window.location.href = '/';
            }}
            // disabled={!role?.kode}
            disabled={role === '' || !role}
          >
            Done <FaArrowRight />
          </button>
        }
      >
        <div className="relative">
          {/* <BgModal width="100%" />
          <div className="absolute top-3 left-5 border-l-2 pl-5">
            <h3 className="font-bold text-lg text-white">{dataLogin?.NAMA}</h3>
            <div className="flex gap-3 text-white text-sm">
              <p>{dataLogin?.USERNAME}</p>
              <span>|</span>
              <p>{dataLogin?.NAMA_SUB}</p>
            </div>
          </div> */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-6 text-white">

            {/* SVG Background */}
            <BgModal className="absolute inset-0 w-full h-full object-cover opacity-80" />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-5">

              {/* Avatar */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-300 text-2xl font-bold text-black">
                {/* {getInitials(dataLogin?.NAMA)} */}
                {getInitials(form?.user_name)}
              </div>

              {/* Info */}
              <div>
                {/* <p className="text-xl font-semibold">{dataLogin?.NAMA}</p>
                <p className="text-sm opacity-80 mt-1">
                  {dataLogin?.USERNAME} <span className="mx-2">|</span> {dataLogin?.NAMA_SUB}
                </p> */}
                <p className="text-xl font-semibold">{form?.user_name}</p>
                <p className="text-sm opacity-80 mt-1">
                  Development <span className="mx-2">|</span> {form?.user_password}
                </p>
              </div>

            </div>
          </div>
          <div className="flex items-start gap-4 mt-3">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
              <FaUser className="text-blue-900 text-lg" />
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
          <div className="mt-1">
            <Label
              label=""
              children={
                <select
                  className="select select-sm w-full input-bordered border border-blue-900 rounded-[15px]"
                  onChange={handleRole}
                >
                  {/* <option value={JSON.stringify({ kode: '', uraian: '' })}></option> */}
                  <option value=""></option>
                  {/* {access?.map(data => (
                    <option key={data.kode} value={JSON.stringify(data)}>
                      {data.uraian}
                    </option>
                  ))} */}
                  {access?.map((data, i) => (
                    <option key={i} value={data?.value}>
                      {data?.label}
                    </option>
                  ))}
                </select>
              }
            />
          </div>
        </div>
      </Modal>

      {/* ================= LOADING ================= */}
      {isMaintenance === null && (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* ================= MAINTENANCE PAGE ================= */}
      {/* {isMaintenance === true && (
        <div
          className="flex items-center justify-center min-h-screen px-4"
          style={backgroundStyle}
        >
          <div
            className="
              bg-base-100
              rounded-2xl
              shadow-2xl
              w-full
              max-w-3xl
              p-4
            "
          >
            <img
              src={LOGO_MAINTENANCE}
              alt="Maintenance"
              className="
                w-full
                max-h-[70vh]
                object-contain
                rounded-xl
              "
            />
          </div>
        </div>
      )} */}

      {/* ================= LOGIN FORM ================= */}
      {/* {isMaintenance === false && ( */}
      <div
        ref={loginRef}
        className="flex items-center justify-center min-h-screen px-4"
        style={backgroundStyle}
      >
        <div className="w-full md:max-w-md shadow-all bg-base-100 bg-opacity-40 rounded-xl p-6">
          <div className="flex justify-center mb-5">
            {/* <POTTER_LOGO /> */}
            <img src={LOGO_LOGIN} alt="Logo Cost" className="w-96 m-0 p-0" />
            {/* <img
                src={LOGO_MAINTENANCE}
                alt="Maintenance"
                className="
                w-full
                max-h-[70vh]
                object-contain
                rounded-xl
              "
              /> */}
          </div>
          {/* <div className='flex items-center text-2xl w-full justify-center mb-5 mt-1 gap-2'>
              <div className='font-bold text-white'>
                Cost Tracking System
              </div>
              <div className='font-bold text-orange-500'>
                KFTD
              </div>
            </div> */}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-3">
              {/* <p className="text-2xl font-bold text-center">Sign In</p>

                <p className="text-sm text-center">
                  Welcome back, Please login to your account.
                  <span className="ml-1 tooltip tooltip-primary" data-tip="Gunakan akun portalsi">
                    <FaInfoCircle />
                  </span>
                </p> */}

              <div className="flex w-full items-center rounded-2xl px-3 py-2 border-white border font-semibold">
                <FaUserAlt className="mr-2 text-white text-2xl" />
                <div className='flex-1'>
                  <input
                    name="user_name"
                    placeholder="Username"
                    className="input input-bordered rounded-full w-full"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex w-full items-center rounded-2xl px-3 py-2 border-white border font-semibold">
                <FaKey className="mr-2 text-white text-2xl" />
                <div className='flex-1'>
                  <div className="relative">
                    <input
                      name="user_password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="input input-bordered rounded-full pr-10 w-full"
                      onChange={handleChange}
                    />
                    <div
                      className="absolute right-3 top-2.5 cursor-pointer text-blue-900"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <HiEyeOff className='text-2xl' /> : <HiEye className='text-2xl' />}
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex w-full justify-end'>
                <button className="btn bg-blue-900 rounded-full mt-2 text-white border-none">
                  <FaArrowRight /> Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Login;
