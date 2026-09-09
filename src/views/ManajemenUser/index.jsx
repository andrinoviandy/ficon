import React, {
  useEffect,
  useState,
} from "react";

import {
  FaUsersCog,
  FaPlusCircle,
} from "react-icons/fa";

import {
  useSelector,
} from "react-redux";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  decodeData,
} from "global/helper/jwt";

import {
  getCookies,
} from "global/helper/cookie";

import TableManajemenUser
  from "./components/TableManajemenUser";


// =====================================================
// COMPONENT
// =====================================================

const ManajemenUser = () => {

  const navigation =
    useNavigate();

  const location =
    useLocation();


  const {
    dimensionScreenW,
    check,
  } = useSelector(
    (state) =>
      state.global
  );


  const [
    loginAccess,
    setLoginAccess,
  ] = useState();


  // ===================================================
  // LOGIN ACCESS
  // ===================================================

  useEffect(() => {

    const getLoginAccess =
      async () => {

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

        } catch (
          error
        ) {

          console.error(
            "Gagal mendapatkan login access:",
            error
          );

        }

      };


    getLoginAccess();

  }, []);


  // ===================================================
  // ADD USER
  // ===================================================

  const handleAddUser =
    () => {

      navigation(
        "/add-manajemen-user",
        {
          state: {
            ...location.state,
            project:
              "Tambah User",
          },
        }
      );

    };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div
      className="
        bg-white
        px-6
        pt-10
        pb-5
        min-h-full
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex
          lg:flex-row
          flex-col
          justify-between
          gap-5
        "
      >

        {/* TITLE */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-blue-100
              flex
              items-center
              justify-center
              text-primary
              shadow-md
            "
          >

            <FaUsersCog />

          </div>


          <div
            className="
              flex
              flex-col
              gap-0
            "
          >

            <h1
              className="
                text-xl
                font-bold
                text-gray-800
              "
            >
              Manajemen User
            </h1>


            <p
              className="
                text-xs
                text-gray-400
              "
            >
              Kelola user, role, cabang, dan status akses sistem
            </p>

          </div>

        </div>


        {/* ACTION */}

        <div
          className="
            flex
            justify-end
          "
        >

          <button
            type="button"
            onClick={handleAddUser}
            className="
              btn
              bg-primary
              text-white
              rounded-full
              px-5
              hover:opacity-90
              gap-2
              shadow-md
            "
          >

            <FaPlusCircle />

            Tambah User

          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* DIVIDER */}
      {/* ================================================= */}

      <hr
        className="
          my-5
        "
      />


      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <TableManajemenUser
        check={check}
        dimensionScreenW={
          dimensionScreenW
        }
        loginAccess={
          loginAccess
        }
        navigation={
          navigation
        }
        location={
          location
        }
      />

    </div>

  );

};


export default ManajemenUser;