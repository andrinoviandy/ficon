import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaSave,
  FaPercent,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaLayerGroup,
  FaCreditCard,
} from "react-icons/fa";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Label, Select } from "components/atoms";

import { swal } from "global/helper/swal";
import storeSchema from "global/store";

const AddEditVendor = () => {

  const navigation = useNavigate();

  const location = useLocation();

  const isEditVendor =
    location?.state?.project ===
    "Edit Vendor";

  const [jenisPphOptions, setJenisPphOptions] = useState([]);
  const [data, setData] = useState({});

  const getDetailData = async () => {
    try {
      const res = await storeSchema.actions.getDetailVendor(location?.state?.data?.vendor_id)
      if (res?.status === true) {
        setData(res?.data)
      } else {
        swal.error(res?.message || 'Gagal mendapatkan data')
      }
    } catch (error) {
      swal.error('Terjadi kesalahan saat mendapatkan data')
      console.error('Error fetching detail:', error)
    }
  }

  // =========================
  // SET EDIT DATA
  // =========================
  useEffect(() => {

    if (isEditVendor) {
      getDetailData()
    } else {
      setData({})
    }

  }, [isEditVendor]);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    swal.loading()
    try {
      const res = isEditVendor ? await storeSchema.actions.updateVendor(data) : await storeSchema.actions.insertVendor(data);
      if (res?.status === true) {
        await swal.success('Data Berhasil Disimpan !')
        navigation("/master-vendor", {
          state: {
            ...location.state,
          },
        })

      } else {
        console.log('error nih', res?.data);
        await swal.custom('Tidak Dapat Disimpan !', res?.data?.data, 'warning');
      };

    } catch (error) {
      console.log('error nih', error);
      swal.error(error?.response?.data)
    }
  };

  const handleSelect = async (name, e) => {
    setData((prev) => ({
      ...prev,
      [name]: e?.value ?? '',
      ['ur_' + name]: e?.label ?? ''
    }))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">

        <button
          onClick={() => navigation(-1)}
          className="
            w-10 h-10 rounded-full
            bg-white shadow
            flex items-center justify-center
            hover:bg-gray-100 transition
          "
        >

          <FaArrowLeft />

        </button>

        <div>

          <div className="text-xl font-bold text-blue-900">

            {isEditVendor
              ? "Edit Vendor"
              : "Tambah Vendor"}

          </div>

          <div className="text-sm font-light text-gray-500">

            Lengkapi data Vendor dengan benar.

          </div>

        </div>

      </div>

      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        <Label
          label="Nama Vendor"
          icon={<FaLayerGroup className="text-blue-500" />}
          children={
            <input
              name="nama_vendor"
              value={data?.nama_vendor || ""}
              onChange={handleChange}
              placeholder="PT ABC Indonesia"
              className="input input-bordered bg-white w-full rounded-full"
            />
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

          <Label
            label="Nomor Rekening"
            icon={<FaCreditCard className="text-blue-500" />}
            children={
              <input
                name="no_rekening"
                value={data?.no_rekening || ""}
                onChange={handleChange}
                placeholder="524917374"
                className="input input-bordered bg-white w-full rounded-full"
              />
            }
          />

          <Label
            label="NPWP"
            icon={<FaFileInvoiceDollar className="text-green-500" />}
            children={
              <input
                name="npwp_vendor"
                value={data?.npwp_vendor || ""}
                onChange={handleChange}
                placeholder="01.234.567.8-999.000"
                className="input input-bordered bg-white w-full rounded-full"
              />
            }
          />

          <div className="md:col-span-2">

            <Label
              label="Alamat Vendor"
              icon={<FaMoneyBillWave className="text-purple-500" />}
              children={
                <textarea
                  rows={4}
                  name="alamat_vendor"
                  value={data?.alamat_vendor || ""}
                  onChange={handleChange}
                  placeholder="Masukkan alamat vendor"
                  className="textarea textarea-bordered bg-white w-full"
                />
              }
            />

          </div>

        </div>

        {/* PREVIEW */}
        <div
          className="
            mt-6
            bg-blue-50
            border border-blue-100
            rounded-2xl
            p-4
          "
        >

          <div className="text-sm text-gray-500 mb-2">
            Preview Vendor
          </div>

          <div className="flex flex-col gap-3">

            <div className="px-4 py-2 rounded-xl bg-white border">
              <span className="font-semibold">
                Nama Vendor :
              </span>{" "}
              {data?.nama_vendor || "-"}
            </div>

            <div className="px-4 py-2 rounded-xl bg-white border">
              <span className="font-semibold">
                NPWP :
              </span>{" "}
              {data?.npwp_vendor || "-"}
            </div>

            <div className="px-4 py-2 rounded-xl bg-white border">
              <span className="font-semibold">
                Alamat :
              </span>{" "}
              {data?.alamat_vendor || "-"}
            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-8">

          <button
            className="
              px-6 py-2 rounded-full
              bg-gray-100
              hover:bg-gray-200
              flex items-center gap-2
            "

            onClick={() => navigation(-1)}
          >

            <FaArrowLeft />

            Batal

          </button>

          <button
            className="
              px-6 py-2 rounded-full
              bg-blue-900 text-white
              btn flex items-center gap-2
              hover:scale-105 transition
            "

            onClick={handleSave}
          >

            <FaSave />

            {isEditVendor
              ? "Simpan Perubahan"
              : "Simpan"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default AddEditVendor;