import React, { useEffect, useState } from 'react'
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux'
import { CgNotes } from "react-icons/cg"
import { swal } from 'global/helper/swal'
import { setToggleModal } from '../../../../redux/n2n/global'
import { formatCurrency } from 'global/helper/formatCurrency'

// ICONS
import {
  FaCalculator,
  FaHashtag,
  FaUser,
  FaMoneyBillWave,
  FaBuilding,
  FaListAlt,
  FaFileAlt,
  FaPercent,
  FaSave,
  FaFilePdf,
  FaRegFileAlt,
  FaBriefcase
} from 'react-icons/fa'

import { HiOutlineTicket } from "react-icons/hi"
import storeSchema from 'global/store'
import { FaUserDoctor } from 'react-icons/fa6'

const ModalHitungPajak = ({ getListPengajuan }) => {
  const dispatch = useDispatch()
  const { toggleModal } = useSelector(
    state => state.global
  )
  const [bruto, setBruto] = useState("")

  // =========================
  // MASTER JENIS JASA
  // =========================
  const [jasaOptions, setJasaOptions] = useState([])

  // =========================
  // DEFAULT JASA
  // =========================
  const [selectedJasa, setSelectedJasa] =
    useState(0)

  const [data, setData] = useState()

  const [tarif, setTarif] =
    useState(0)

  // NPWP
  const [npwp, setNpwp] = useState()

  // NOMOR FAKTUR
  const [nomorFaktur, setNomorFaktur] =
    useState()

  // DATA FIX
  const [pph23, setPph23] = useState(0)

  const formatNumber = (value) =>
    new Intl.NumberFormat("id-ID").format(value)

  const parseNumber = (value) =>
    Number(value.replace(/\./g, ""))

  // FORMAT NPWP
  const formatNPWP = (value) => {

    const cleaned = value
      .replace(/\D/g, "")
      .slice(0, 15)

    let result = ""

    if (cleaned.length > 0)
      result += cleaned.substring(0, 2)

    if (cleaned.length >= 3)
      result += "." + cleaned.substring(2, 5)

    if (cleaned.length >= 6)
      result += "." + cleaned.substring(5, 8)

    if (cleaned.length >= 9)
      result += "." + cleaned.substring(8, 9)

    if (cleaned.length >= 10)
      result += "-" + cleaned.substring(9, 12)

    if (cleaned.length >= 13)
      result += "." + cleaned.substring(12, 15)

    return result
  }

  // =========================
  // HANDLE JASA
  // =========================
  const handleJasaChange = (e) => {

    const value = e.target.value

    setSelectedJasa(value)

    const selected =
      jasaOptions.find(
        item => item?.label === value
      )

    setTarif(selected?.tarif || 0)

  }

  // HITUNG PPH
  useEffect(() => {

    const brutoNumber =
      parseNumber(bruto || "0")

    const hasil =
      (brutoNumber * tarif) / 100

    setPph23(hasil)

  }, [bruto, tarif])

  const handleBrutoChange = (e) => {

    const value =
      e.target.value.replace(/\D/g, "")

    setBruto(formatNumber(value))

  }

  const getDetailPengajuan = async () => {
    try {
      swal.loading()
      const res = await storeSchema.actions.getDetailPengajuan(toggleModal?.pengajuan_id)
      const response = await storeSchema.actions.getListJenisPajak({
        page: 1,
        limit: 1000,
        keyword: '',
        sortBy: 'ASC',
      });
      if (res?.status === true && response?.status === true) {
        swal.close()
        setData(res?.data)
        const dataJenisJasa = response?.data?.list_data?.map(item => ({
          label: item?.jenis_jasa,
          tarif: item?.persen_tarif
        }))
        setJasaOptions(dataJenisJasa)
        setNpwp(res?.data?.npwp_vendor)
        setNomorFaktur(res?.data.no_faktur_pajak)
      } else {
        swal.error(res?.message || 'Gagal mendapatkan data pengajuan')
      }
    } catch (error) {
      swal.error('Terjadi kesalahan saat mendapatkan data pengajuan')
      console.error('Error fetching detail pengajuan:', error)
    }
  }

  const onSubmit = async () => {
    swal.loading()
    try {
      const updatePengajuan = {
        pengajuan_id: toggleModal?.pengajuan_id,
        no_faktur_pajak: nomorFaktur,
        ...(data?.vendor_id ? {
          vendor_id: data?.vendor_id,
          npwp_vendor: npwp,
        } : {}),
        pph: tarif !== 0 ? tarif : null,
        nominal_pph: pph23 !== 0 ? pph23 : null,
        total_dibayarkan: data?.nominal_dpp + data?.nominal_ppn - pph23
      }
      const formData = new FormData();
      formData.append("payload", JSON.stringify(updatePengajuan));
      const res = await storeSchema.actions.updatePengajuan(formData)
      if (res?.status === true) {
        swal.success('Data Berhasil Disimpan')
        getListPengajuan()
      } else {
        swal.error('Data Gagal Disimpan')
      }
    } catch (error) {
      console.log('error ', error);
      swal.error(error?.message)
    }
  }

  useEffect(() => {
    if (toggleModal?.pengajuan_id && toggleModal?.modal === 'modalHitungPajak') {
      getDetailPengajuan()
    }
  }, [toggleModal])

  return (

    <Modal
      title="Perhitungan Pajak"
      iconTitle={
        <FaCalculator className='text-blue-900 text-2xl' />
      }
      modal={"modalHitungPajak"}
      size={"w-11/12 max-w-6xl"}
      scroll={false}
      buttonFooter={
        <div className="flex justify-end gap-2">

          <button className="btn px-4 py-2 rounded-full bg-gray-200">
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="btn px-4 py-2 rounded-full text-white bg-blue-900"
          >
            <FaSave /> Simpan
          </button>

        </div>
      }
    >

      {/* ================= INFO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <Card
          icon={<FaHashtag />}
          color="blue"
          label="Nomor Pengajuan"
          value={data?.no_pengajuan}
        />

        <Card
          icon={<FaUser />}
          color="green"
          label="Nama Pemohon"
          value={data?.nama_pemohon}
        />

        <Card
          icon={<FaBriefcase />}
          color="purple"
          label="Jabatan"
          value={data?.ur_jabatan_id || '-'}
        />

        <Card
          icon={<FaBuilding />}
          color="orange"
          label="Cabang"
          value={data?.ur_cabang_id}
        />

        <Card
          icon={<FaListAlt />}
          color="cyan"
          label="Jenis Biaya"
          value={data?.ur_jenis_biaya_id}
        />

        <Card
          icon={<FaMoneyBillWave />}
          color="emerald"
          label="Nominal DPP"
          value={formatCurrency(data?.nominal_dpp)}
          strong
        />

        <Card
          icon={<FaPercent />}
          color="pink"
          label="PPN"
          value={formatCurrency(data?.nominal_ppn)}
          strong
        />

        <Card
          icon={<HiOutlineTicket />}
          color="indigo"
          label="Voucher SAP"
          value={data?.no_voucher_sap}
        />

        <Card
          icon={<FaFileAlt />}
          color="amber"
          label="Nomor Invoice"
          value={data?.no_invoice}
        />

        {/* ================= NOMOR FAKTUR PAJAK ================= */}
        <div className="
          rounded-2xl p-4
          shadow-sm border
          hover:shadow-md transition
          border-red-300 bg-red-50
        ">

          <div className="flex items-start gap-3">

            <div className="
              w-11 h-11 rounded-xl
              flex items-center justify-center
              bg-red-100
            ">

              <div className="text-red-700 text-lg">
                <FaFilePdf />
              </div>

            </div>

            <div className="flex-1">

              <div className="
                flex items-center
                justify-between gap-2
              ">

                <p className="
                  text-xs text-gray-500
                  uppercase tracking-wide
                ">
                  Nomor Faktur Pajak
                </p>

                <span className="
                  text-[10px]
                  px-2 py-1 rounded-full
                  bg-red-500 text-white
                  font-semibold
                ">
                  WAJIB
                </span>

              </div>

              <input
                type="text"
                value={nomorFaktur}
                onChange={(e) =>
                  setNomorFaktur(
                    e.target.value
                  )
                }
                className="
                  input input-bordered
                  w-full mt-2
                  bg-white rounded-xl
                  border-2 border-red-200
                  focus:border-red-400
                "
                placeholder="Masukkan nomor faktur pajak"
              />

              <div className="
                text-[11px]
                mt-2 font-medium
                text-red-600
              ">
                Wajib dikoreksi jika ada kesalahan
              </div>

            </div>

          </div>

        </div>

        <Card
          icon={<FaUserDoctor />}
          color="amber"
          label="Nama Vendor"
          value={data?.nama_vendor || '-'}
        />
        {/* ================= NPWP ================= */}
        <div className="
          rounded-2xl p-4
          shadow-sm border
          hover:shadow-md transition
          border-orange-300 bg-orange-50
        ">

          <div className="flex items-start gap-3">

            <div className="
              w-11 h-11 rounded-xl
              flex items-center justify-center
              bg-orange-100
            ">

              <div className="text-orange-700 text-lg">
                <FaRegFileAlt />
              </div>

            </div>

            <div className="flex-1">

              <div className="
                flex items-center
                justify-between gap-2
              ">

                <p className="
                  text-xs text-gray-500
                  uppercase tracking-wide
                ">
                  NPWP Vendor
                </p>

                <span className="
                  text-[10px]
                  px-2 py-1 rounded-full
                  bg-orange-500 text-white
                  font-semibold
                ">
                  WAJIB
                </span>

              </div>

              {data?.vendor_id ? (
                <input
                  type="text"
                  value={npwp}
                  onChange={(e) =>
                    setNpwp(
                      formatNPWP(
                        e.target.value
                      )
                    )
                  }
                  className="
      input input-bordered
      w-full mt-2
      bg-white rounded-xl
      border-2 border-orange-200
      focus:border-orange-400
    "
                  placeholder="Masukkan NPWP"
                />
              ) : "-"}

              <div className="
                text-[11px]
                mt-2 font-medium
                text-orange-600
              ">
                Pastikan NPWP sesuai
              </div>

            </div>

          </div>

        </div>

        <Card
          icon={<FaPercent />}
          color="violet"
          label="PPh"
          value={`${tarif}%`}
        />

        <Card
          icon={<FaMoneyBillWave />}
          color="red"
          label="Nilai PPh"
          value={formatCurrency(pph23)}
          strong
        />

      </div>

      {/* ================= KETERANGAN ================= */}
      <div className="mt-5 bg-white rounded-2xl border shadow-sm p-5">

        <div className="flex items-center gap-3 mb-3">

          <CgNotes className="text-sky-700 text-xl" />

          <div>
            <p className="text-xs text-gray-500 uppercase">
              Keterangan
            </p>

            <h3 className="font-semibold text-gray-800">
              Detail Pengajuan
            </h3>
          </div>

        </div>

        <div className="bg-gray-50 border rounded-2xl p-4 text-gray-700">
          Pengajuan biaya pengiriman barang operasional
          untuk kebutuhan distribusi antar cabang wilayah
          Jabodetabek periode Mei 2026.
        </div>

      </div>

      {/* ================= PPH 23 ================= */}
      <div className="mt-6">

        <h1 className="text-2xl font-bold text-indigo-900 mb-5">
          PPh
        </h1>

        <div className="grid gap-4">

          {/* ================= JENIS JASA ================= */}
          <Row label="Jenis Jasa">

            <select
              value={selectedJasa}
              onChange={handleJasaChange}
              className="
                select select-bordered
                rounded-full w-full
              "
            >

              {jasaOptions.map((item, index) => (
                <option
                  key={index}
                  value={item?.label}
                >
                  {item?.label} ({item?.tarif}%)
                </option>
              ))}

            </select>

          </Row>

          {/* BRUTO */}
          <Row label="Bruto">

            <input
              value={bruto}
              onChange={handleBrutoChange}
              className="input input-bordered rounded-full w-full text-right"
              placeholder="Masukkan bruto"
            />

          </Row>

          {/* TARIF */}
          <Row label="Tarif">

            <input
              value={`${tarif}%`}
              disabled
              className="input input-bordered rounded-full w-full bg-gray-100 text-right"
            />

          </Row>

          {/* PPH */}
          <Row label="Nilai PPh">

            <input
              value={formatNumber(pph23)}
              disabled
              className="input input-bordered rounded-full w-full bg-gray-100 text-right font-semibold"
            />

          </Row>

          {/* JUMLAH DIBAYARKAN */}
          <Row label="Jumlah Yang Dibayarkan">

            <input
              value={formatNumber(
                data?.nominal_dpp + data?.nominal_ppn - pph23
              )}
              disabled
              className="input input-bordered rounded-full w-full bg-emerald-50 text-right font-bold text-emerald-700 border-emerald-200"
            />

          </Row>

        </div>

      </div>

    </Modal>
  )
}

/* ================= CARD COMPONENT ================= */
const Card = ({
  icon,
  label,
  value,
  color = "blue",
  strong
}) => {

  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
    cyan: "bg-cyan-100 text-cyan-700",
    yellow: "bg-yellow-100 text-yellow-700",
    emerald: "bg-emerald-100 text-emerald-700",
    pink: "bg-pink-100 text-pink-700",
    indigo: "bg-indigo-100 text-indigo-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    violet: "bg-violet-100 text-violet-700",
    red: "bg-red-100 text-red-700",
    sky: "bg-sky-100 text-sky-700",
  }

  return (

    <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

      <div className="flex items-center gap-3">

        <div
          className={`
            w-11 h-11 rounded-xl
            flex items-center justify-center
            ${colors[color]}
          `}
        >
          {icon}
        </div>

        <div>

          <p className="text-xs text-gray-500 uppercase">
            {label}
          </p>

          <h3
            className={
              strong
                ? "font-bold text-lg text-gray-800"
                : "font-semibold text-gray-800"
            }
          >
            {value}
          </h3>

        </div>

      </div>

    </div>

  )
}

/* ================= ROW ================= */
const Row = ({ label, children }) => (

  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">

    <label className="text-sm text-gray-500 font-medium">
      {label}
    </label>

    <div className="md:col-span-2">
      {children}
    </div>

  </div>

)

export default ModalHitungPajak