import React, { useEffect, useState } from "react";
import BGLEAF from "assets/panduan-cost-tracking.jpg";
import PROFILE_DEFAULT from "assets/profile-default.jpg";

import {
  IoPerson,
  IoBriefcase,
  IoSendSharp,
  IoCall,
  IoMail,
  IoLink,
  IoGrid,
  IoPersonCircle,
  IoPeopleCircle,
  IoShieldCheckmark,
  IoTimeOutline,
} from "react-icons/io5";

import { getCookies } from "global/helper/cookie";
import { decodeData } from "global/helper/jwt";
import { formatDate } from "global/helper/formatDate";
import ResetPassword from "./ResetPassword";
import { FaTag } from "react-icons/fa";

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300">

      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-500">
          {label}
        </p>

        <p className="font-semibold text-gray-800 break-words">
          {value || "-"}
        </p>
      </div>

    </div>
  );
};

const UbahPassword = () => {
  const [activeMenu, setActiveMenu] = useState("profile");
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const loginData = getCookies("accountAccess");
      const decode = await decodeData(loginData);
      setDataUser(decode);
    };

    getUserData();
  }, []);

  const activities = [
    {
      description: "Create a new project for client",
      subDescription: "Darren Schmitt II",
      iconColor: "bg-green-500",
      timestamp: "2025-04-18T14:30:00",
    },
    {
      description: "Public Meeting",
      subDescription: "",
      iconColor: "bg-orange-500",
      timestamp: "2024-09-30T08:00:00",
    },
    {
      description: "Order #37745 from September",
      subDescription: "",
      iconColor: "bg-yellow-500",
      timestamp: "2025-01-10T09:00:00",
    },
    {
      description: "8 Invoices have been paid",
      subDescription: "",
      iconColor: "bg-red-500",
      timestamp: "2025-02-12T10:00:00",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div
        className="relative h-[320px] bg-cover bg-center"
        style={{ backgroundImage: `url(${BGLEAF})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between h-full px-6 lg:px-10 pb-8">

          {/* LEFT */}
          <div className="flex flex-col lg:flex-row items-center gap-5 mt-10 lg:mt-0">

            <div className="relative">
              <img
                src={PROFILE_DEFAULT}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
              />

              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-2 border-white"></div>
            </div>

            <div className="text-white text-center lg:text-left">
              <h1 className="text-3xl font-bold">
                {dataUser?.NAMA}
              </h1>

              <p className="text-gray-200 mt-1">
                {dataUser?.NAMA_SUB}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">

                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm">
                  {dataUser?.HAKAKSES_DESC}
                </div>

                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm">
                  {dataUser?.NAMA_CABANG}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MENU */}
      <div className="px-4 lg:px-10 -mt-8 relative z-20">

        <div className="bg-white rounded-3xl shadow-xl p-3 flex flex-wrap gap-3">

          <button
            onClick={() => setActiveMenu("profile")}
            className={`px-5 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${activeMenu === "profile"
              ? "bg-blue-900 text-white shadow-lg"
              : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            <IoPersonCircle className="text-xl" />
            Profil dan Ubah Password
          </button>

          {/* <button
            onClick={() => setActiveMenu("activity")}
            className={`px-5 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
              activeMenu === "activity"
                ? "bg-primary text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <IoGrid className="text-xl" />
            Activity
          </button>

          <button
            onClick={() => setActiveMenu("connections")}
            className={`px-5 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
              activeMenu === "connections"
                ? "bg-primary text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <IoLink className="text-xl" />
            Connections
          </button> */}

        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 px-4 lg:px-10 py-8">

        {/* SIDEBAR */}
        <div className="xl:col-span-4">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <IoShieldCheckmark className="text-primary text-2xl" />
              </div>

              <div>
                <h2 className="font-bold text-xl text-gray-800">
                  Tentang User
                </h2>

                <p className="text-sm text-gray-500">
                  Informasi Personal
                </p>
              </div>
            </div>

            <div className="space-y-5">

              <InfoItem
                icon={<FaTag />}
                label="NIP"
                value={dataUser?.nip}
              />

              <InfoItem
                icon={<IoPerson />}
                label="Nama Lengkap"
                value={dataUser?.nama}
              />

              <InfoItem
                icon={<IoBriefcase />}
                label="Profit Center"
                value={dataUser?.cabang}
              />

              <InfoItem
                icon={<IoMail />}
                label="Email"
                value={dataUser?.email}
              />

              <InfoItem
                icon={<IoSendSharp />}
                label="Role"
                value={dataUser?.role}
              />

            </div>

          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="xl:col-span-8">

          {/* PROFILE */}
          {activeMenu === "profile" && (
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="mt-5"></div>
              <ResetPassword dataUser={dataUser} />

            </div>
          )}

          {/* ACTIVITY */}
          {activeMenu === "activity" && (
            <div className="bg-white rounded-3xl shadow-lg p-6">

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Activity
                </h2>

                <p className="text-gray-500 mt-1">
                  Your latest system activities
                </p>
              </div>

              <div className="relative border-l-2 border-gray-200 ml-4">

                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="mb-10 ml-8 relative"
                  >

                    <div
                      className={`absolute -left-[42px] top-1 w-5 h-5 rounded-full border-4 border-white shadow ${activity.iconColor}`}
                    />

                    <div className="bg-gray-50 rounded-2xl p-5 hover:shadow-lg duration-300">

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                        <div>
                          <h3 className="font-bold text-gray-800">
                            {activity.description}
                          </h3>

                          {activity.subDescription && (
                            <p className="text-sm text-gray-500 mt-1">
                              Client : {activity.subDescription}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <IoTimeOutline />
                          {formatDate(activity.timestamp)}
                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* CONNECTIONS */}
          {activeMenu === "connections" && (
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

              <IoPeopleCircle className="text-7xl text-primary mx-auto mb-4" />

              <h2 className="text-2xl font-bold text-gray-800">
                Connections
              </h2>

              <p className="text-gray-500 mt-2">
                Feature is under development
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default UbahPassword;