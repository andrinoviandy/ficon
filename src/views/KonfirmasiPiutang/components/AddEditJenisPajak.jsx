import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaSave,
  FaPercent,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaLayerGroup,
} from "react-icons/fa";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Label, Select } from "components/atoms";

import { swal } from "global/helper/swal";
import storeSchema from "global/store";

const AddEditJenisPajak = () => {

  const navigation = useNavigate();

  const location = useLocation();

  const isEditJenisPajak =
    location?.state?.project ===
    "Edit Jenis Pajak";

  const [jenisPphOptions, setJenisPphOptions] = useState([]);
  const [data, setData] = useState({});

  const getDetailData = async () => {
    try {
      const res = await storeSchema.actions.getDetailJenisPajak(location?.state?.data?.jenis_pajak_id)
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

    if (isEditJenisPajak) {
      getDetailData()
    } else {
      setData({})
    }

  }, [isEditJenisPajak]);

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
      const res = isEditJenisPajak ? await storeSchema.actions.updateJenisPajak(data) : await storeSchema.actions.insertJenisPajak(data);
      if (res?.status === true) {
        await swal.success('Data Berhasil Disimpan !')
        navigation("/jenis-pajak", {
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

  useEffect(() => {
    const getReferensi = async () => {
      const refJenisPph = await storeSchema.actions.getReferensiByJenis('jenis_pph_id')
      if (refJenisPph?.status === true) {
        const data = refJenisPph?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
            data: item
          }
        })
        setJenisPphOptions(data)
      }
    }
    getReferensi()
    // eslint-disable-next-line
  }, [])

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

            {isEditJenisPajak
              ? "Edit Jenis Pajak"
              : "Tambah Jenis Pajak"}

          </div>

          <div className="text-sm font-light text-gray-500">

            Lengkapi data jenis pajak dengan benar.

          </div>

        </div>

      </div>

      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* JENIS JASA */}
          <div>

            <Label
              icon={
                <FaLayerGroup className="text-blue-500" />
              }

              label="Jenis Jasa"

              children={
                <input
                  name="jenis_jasa"

                  value={data?.jenis_jasa}

                  onChange={handleChange}

                  placeholder="Contoh : Jasa Konsultan"

                  className="
                    input input-bordered
                    bg-white
                    w-full
                    rounded-full
                  "
                />
              }
            />

          </div>

          {/* KODE OBJEK */}
          <div>

            <Label
              icon={
                <FaFileInvoiceDollar className="text-green-500" />
              }

              label="Kode Objek"

              children={
                <input
                  name="kode_objek"

                  value={data?.kode_objek}

                  onChange={handleChange}

                  placeholder="Contoh : 21-100-01"

                  className="
                    input input-bordered
                    bg-white
                    w-full
                    rounded-full
                  "
                />
              }
            />

          </div>

          {/* JENIS PPH */}
          <div>

            <Label
              icon={
                <FaPercent className="text-orange-500" />
              }

              label="Jenis PPh"

              children={
                <Select
                  options={jenisPphOptions}
                  value={{ value: data?.jenis_pph_id, label: data?.ur_jenis_pph_id }}
                  onChange={(val) => handleSelect('jenis_pph_id', val)}
                />
              }
            />

          </div>

          {/* TARIF */}
          <div>

            <Label
              icon={
                <FaMoneyBillWave className="text-purple-500" />
              }

              label="Tarif (%)"

              children={
                <input
                  type="number"

                  name="persen_tarif"

                  value={data?.persen_tarif}

                  onChange={handleChange}

                  placeholder="Contoh : 2"

                  className="
                    input input-bordered
                    bg-white
                    w-full
                    rounded-full
                  "
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

            Preview Jenis Pajak

          </div>

          <div className="flex flex-wrap gap-3">

            {/* JENIS JASA */}
            <div
              className="
                px-4 py-2 rounded-xl
                bg-white border
                text-sm
              "
            >

              <span className="font-semibold text-gray-500">
                Jenis Jasa :
              </span>{" "}

              <span className="font-bold text-blue-900">

                {data?.jenis_jasa || "-"}

              </span>

            </div>

            {/* KODE OBJEK */}
            <div
              className="
                px-4 py-2 rounded-xl
                bg-white border
                text-sm
              "
            >

              <span className="font-semibold text-gray-500">
                Kode Objek :
              </span>{" "}

              <span className="font-bold text-green-700">

                {data?.kode_objek || "-"}

              </span>

            </div>

            {/* JENIS PPH */}
            <div
              className="
                px-4 py-2 rounded-xl
                bg-white border
                text-sm
              "
            >

              <span className="font-semibold text-gray-500">
                Jenis PPh :
              </span>{" "}

              <span className="font-bold text-orange-600">

                {data?.ur_jenis_pph_id || "-"}

              </span>

            </div>

            {/* TARIF */}
            <div
              className="
                px-4 py-2 rounded-xl
                bg-white border
                text-sm
              "
            >

              <span className="font-semibold text-gray-500">
                Tarif :
              </span>{" "}

              <span className="font-bold text-purple-600">

                {data?.persen_tarif || "-"}%

              </span>

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

            {isEditJenisPajak
              ? "Simpan Perubahan"
              : "Simpan"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default AddEditJenisPajak;