import React, { useEffect, useState } from "react";

import {
  FaChartBar,
  FaFileAlt,
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaMoneyBillWave,
  FaTags,
  FaClipboardList,
  FaInfoCircle,
  FaLayerGroup,
  FaReceipt,
  FaWallet,
  FaChartPie,
  FaDownload,
  FaClock,
  FaMemory,
  FaCheckCircle,
  FaPercentage,
  FaClipboard,
  FaStore,
} from "react-icons/fa";

import { formatDate } from "global/helper/formatDate";

import ReactPaginate from "react-paginate";

import { FaNoteSticky, FaTimeline } from "react-icons/fa6";
import storeSchema from "global/store";
import { decodeData } from "global/helper/jwt";
import { getCookies } from "global/helper/cookie";
import { swal } from "global/helper/swal";
import { formatCurrency } from "global/helper/formatCurrency";
import { exportToExcel } from "./components/exportToExcel";
import Select, { components } from "react-select";
import { IoSearch } from "react-icons/io5";

const Reporting = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0)
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loginAccess, setLoginAccess] = useState()
  const [allData, setAllData] = useState([])
  const [data, setData] = useState()
  const [summary, setSummary] = useState()
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([])
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const get = async () => {
      const decoded = await decodeData(getCookies('accountAccess'))
      setLoginAccess(decoded)
    }
    get()
  }, [])

  const getListAllPengajuan = async () => {
    swal.loading()
    try {
      setAllData([])
      setLoading(true);
      const response = await storeSchema.actions.getListAllPengajuan({
        page: currentPage,
        limit: perPage,
        keyword: keyword,
        download: {
          ...data,
          selectedCabang: selectedOptions
        }
        // keyword: keyword,
        // sortBy: sortBy === "Latest" ? "DESC" : "ASC"
      });

      if (response.status === true) {
        setAllData(response?.data?.list_data);
        setTotalData(response?.data?.total_data || 0);
        setTotalPage(response?.data?.total_halaman || 0);
        setSummary(response?.data?.summary)
        swal.close()
      } else {
        swal.error(response?.data)
      }
    } catch (error) {
      console.error("Error fetching pengajuan data:", error);
      swal.error("Gagal mengambil data pengajuan");
    } finally {
      setLoading(false);
    }
  };
  // ==========================
  // STATUS BADGE
  // ==========================
  const statusBadge = (status) => {
    switch (status) {
      case "S1":
        return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

      case "S2":
        return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

      case "T":
        return "bg-gradient-to-r from-red-500 to-rose-600 ring-red-200";

      case "P":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 ring-yellow-200";

      default:
        return "bg-gradient-to-r from-blue-500 to-indigo-600 ring-blue-200";
    }
  };

  // ==========================
  // SLA BADGE
  // ==========================
  const slaBadge = (sla) => {

    if (sla <= 2) {

      return "bg-green-100 text-green-700 border border-green-300";

    }

    if (sla <= 5) {

      return "bg-yellow-100 text-yellow-700 border border-yellow-300";

    }

    return "bg-red-100 text-red-700 border border-red-300";

  };

  // ==========================
  // HEADER TABLE
  // ==========================
  const headerTable = [

    { label: "Tanggal Pengajuan", icon: <FaCalendarAlt /> },

    { label: "No. Pengajuan", icon: <FaFileAlt /> },

    { label: "Nama Pemohon", icon: <FaUser /> },

    { label: "Cabang/Unit", icon: <FaBuilding /> },

    { label: "Jenis Biaya", icon: <FaTags /> },
    { label: "Vendor", icon: <FaStore /> },
    { label: "Jenis PPN", icon: <FaPercentage /> },

    // { label: "Account Description", icon: <FaNoteSticky /> },

    { label: "Nominal Dpp", icon: <FaMoneyBillWave /> },

    { label: "PPN", icon: <FaMoneyBillWave /> },

    { label: "Pph", icon: <FaMoneyBillWave /> },
    { label: "Keterangan", icon: <FaInfoCircle /> },

    { label: "Jumlah Yang Dibayarkan", icon: <FaMoneyBillWave /> },

    { label: "No Invoice", icon: <FaClipboardList /> },

    { label: "No Kasbon SAP", icon: <FaClipboardList /> },

    { label: "No Faktur Pajak", icon: <FaClipboardList /> },

    { label: "No Voucher SAP", icon: <FaClipboardList /> },

    { label: "No Memo", icon: <FaMemory /> },

    { label: "Tanggal Pembayaran", icon: <FaCalendarAlt /> },
    { label: "No Voucher Payment", icon: <FaReceipt /> },

    // { label: "Anggaran", icon: <FaMoneyBillWave /> },

    // { label: "Sisa Anggaran", icon: <FaMoneyBillWave /> },

    { label: "SLA Penyelesaian", icon: <FaClock /> },

    { label: "Status", icon: <FaInfoCircle /> },

  ];

  const changePage = (e) => {

    const newPage =
      e.selected + 1;

    setCurrentPage(newPage);

  };

  const ChangePerPage = (e) => {

    const newPerPage =
      parseInt(e.target.value);

    setPerPage(newPerPage);

    setCurrentPage(1);

  };

  const startIndex =
    allData?.length > 0
      ? (currentPage - 1) * perPage + 1
      : 0;

  const endIndex = Math.min(
    currentPage * perPage,
    totalData
  );

  // ==========================
  // CARD
  // ==========================
  const Card = ({
    title,
    value,
    icon,
    gradient
  }) => (

    <div
      className={`
        relative rounded-2xl
        px-3 py-5 text-white shadow-xl
        overflow-hidden
        ${gradient}
        hover:scale-105 transition
      `}
    >

      <div className="absolute -top-2 -right-2 text-white/20 text-5xl">

        {icon}

      </div>

      <div className="relative">

        <p className="text-xs font-semibold opacity-80">

          {title}

        </p>

        <p className="text-nowrap text-md font-bold mt-1">

          {formatCurrency(value) || 0}

        </p>

      </div>

    </div>

  );

  const handleSelect = (name, e) => {
    setData({
      ...data,
      [name]: e?.value,
      ['ur_' + name]: e?.label
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setData({
      ...data,
      [name]: value
    })
  }

  const [optionCabang, setOptionCabang] = useState([])

  useEffect(() => {
    getListAllPengajuan();
    // eslint-disable-next-line
  }, [currentPage, perPage]);

  useEffect(() => {
    const getReferensi = async () => {
      const refCabang = await storeSchema.actions.getReferensiByJenis('cabang_id')
      if (refCabang?.status === true) {
        if (loginAccess?.cabang_id !== '2000') {
          const data = refCabang?.data?.filter(a => Number(a.kd_ref) === Number(loginAccess?.cabang_id))?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
            }
          })
          setOptionCabang(data)
        } else {
          const data = refCabang?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
            }
          })
          setOptionCabang(data)
        }
      }
    }
    getReferensi()
  }, [loginAccess])

  const exportExcel = async () => {
    exportToExcel({
      data,
      selectedOptions,
      getDataFunction: storeSchema.actions.getListAllPengajuan,
      swal
    });
  };

  const handleCabangChange = (selected) => {
    if (!selected) {
      setSelectedOptions([]);
      return;
    }

    const hasAll = selected.some(item => item.value === "All");

    if (hasAll) {
      // Jika All dipilih, simpan hanya All
      setSelectedOptions([{ label: "All", value: "All" }]);
      return;
    }

    setSelectedOptions(selected);
  };

  const handleChangeCabang = (selected) => {
    // Tidak ada yang dipilih
    if (!selected || selected.length === 0) {
      setSelectedOptions([]);
      return;
    }

    const isAllSelected = selected.some(item => item.value === "All");

    if (isAllSelected) {
      // Pilih semua (termasuk All)
      setSelectedOptions(optionCabang);
    } else {
      setSelectedOptions(selected);
    }
  };

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          readOnly
          style={{ marginRight: 10 }}
        />
        <label>{props.label}</label>
      </components.Option>
    );
  };

  const ValueContainer = ({ children, ...props }) => {
    const count = props.getValue().length;

    return (
      <components.ValueContainer {...props}>
        {count > 0 ? (
          <span>{count} Cabang dipilih</span>
        ) : (
          children[0] // Placeholder
        )}
        {children[1]} {/* Input untuk search */}
      </components.ValueContainer>
    );
  };

  const MultiValue = () => null;

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 49,
      borderRadius: '0px 20px 20px 0px',
      border: 'none'
    }),

    indicatorsContainer: (base) => ({
      ...base,
      height: 49,
      display: "flex",
      alignItems: "center",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      padding: "0px 10px 0px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1)
    getListAllPengajuan()
  };

  const [disableBulan, setDisableBulan] = useState(true)
  useEffect(() => {
    if (data?.bulan && selectedOptions?.length > 0) {
      getListAllPengajuan()
    } else {
      if (selectedOptions?.length === 0) {
        setData({})
        getListAllPengajuan()
      }
    }

    if (selectedOptions?.length > 0) {
      setDisableBulan(false)
    } else {
      setDisableBulan(true)
    }
  }, [data?.bulan, selectedOptions])

  return (

    <div className="bg-white px-6 pt-10 mb-5">

      {/* HEADER */}
      <div className="flex justify-between items-center w-full gap-4 flex-wrap">

        <div className="flex gap-3 items-center w-1/4">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 flex items-center justify-center">

            <FaChartBar className="text-white text-2xl" />

          </div>

          <div>

            <div className="text-xl font-bold text-blue-900">
              Reporting
            </div>

            <div className="text-sm text-gray-500">
              Lihat report anda disini
            </div>

          </div>

        </div>

        {/* FILTER */}
        <div className="flex items-end gap-4 flex-wrap lg:flex-nowrap justify-end">

          <div className="flex flex-col w-72">
            <span className="mb-1 text-xs font-semibold text-gray-600">
              Cabang
            </span>

            {/* <Select
              options={[{ label: "All", value: "All" }, ...optionCabang]}
              isMulti
              value={selectedOptions}
              onChange={handleCabangChange}
              className="w-full"
              menuPortalTarget={document.body}
            /> */}
            <div className="flex flex-wrap gap-0 align-items-center border rounded-2xl">

              <div
                className="px-3 py-3 bg-gray-50 rounded-l-2xl border-r bg-light fw-bold"
                style={{ minWidth: 80, textAlign: "center" }}
              >
                {selectedOptions.length} Cabang
              </div>

              <div className="flex-1">
                <Select
                  isMulti
                  options={[{ label: "All", value: "All" }, ...optionCabang]}
                  value={selectedOptions}
                  onChange={handleChangeCabang}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  blurInputOnSelect={false}
                  components={{ Option, MultiValue }}
                  styles={customStyles}
                />
              </div>

            </div>
          </div>

          <div className="flex flex-col w-44">
            <span className="mb-1 text-xs font-semibold text-gray-600">
              By Month
            </span>

            <input
              type="month"
              name="bulan"
              onChange={handleChange}
              disabled={disableBulan}
              value={data?.bulan ?? ''}
              className="
        h-12
        rounded-[20px]
        border
        border-gray-300
        px-4
        text-sm
        focus:border-blue-700
        focus:outline-none
      "
            />
          </div>

          <button
            onClick={exportExcel}
            className="
      h-12
      px-6
      rounded-[20px]
      bg-blue-900
      hover:bg-blue-800
      text-white
      font-semibold
      flex
      items-center
      gap-2
      whitespace-nowrap
    "
          >
            <FaDownload />
            Download
          </button>

        </div>

      </div>

      <hr className="my-6" />

      {/* KPI CARD */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

        <Card
          title="Total Dpp"
          value={summary?.total_nominal_dpp}
          icon={<FaLayerGroup />}
          gradient="bg-gradient-to-r from-blue-500 to-indigo-600"
        />

        <Card
          title="Total PPN WAPU"
          value={summary?.total_nominal_ppn_wapu}
          icon={<FaReceipt />}
          gradient="bg-gradient-to-r from-pink-500 to-rose-500"
        />

        <Card
          title="Total PPN Non WAPU"
          value={summary?.total_nominal_ppn_nonwapu}
          icon={<FaReceipt />}
          gradient="bg-gradient-to-r from-pink-500 to-rose-500"
        />

        <Card
          title="Total PPh"
          value={summary?.total_nominal_pph}
          icon={<FaChartPie />}
          gradient="bg-gradient-to-r from-orange-400 to-yellow-500"
        />

        <Card
          title="Total Dibayarkan"
          value={summary?.total_dibayarkan}
          icon={<FaWallet />}
          gradient="bg-gradient-to-r from-emerald-500 to-green-600"
        />

        {/* <Card
          title="Total Anggaran"
          value={summary.totalAnggaran}
          icon={<FaWallet />}
          gradient="bg-gradient-to-r from-emerald-500 to-green-600"
        />

        <Card
          title="Sisa Anggaran"
          value={summary.sisaAnggaran}
          icon={<FaMoneyBillWave />}
          gradient="bg-gradient-to-r from-gray-700 to-black"
        /> */}

      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-3">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <span className="text-sm text-gray-600">
                Memuat data...
              </span>
            </div>
          </div>
        )}
        {/* TABLE */}
        <div className="flex flex-col gap-5">
          <div className='flex lg:flex-row flex-col gap-5'>
            <form onSubmit={handleSearch} className='input input-sm input-bordered flex items-center gap-2 bg-transparent rounded-[25px]'>
              <input
                type="text"
                placeholder='Search...'
                className='grow'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
              />
              <IoSearch onClick={handleSearch} className='cursor-pointer' />
            </form>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">

            <div className="overflow-auto rounded-2xl max-h-[72vh]">

              <table className="table w-full">

                <thead className="bg-blue-900 text-white sticky top-0 text-[14px]">

                  <tr>

                    {headerTable.map((h, i) => (

                      <th
                        key={i}
                        className="px-4 py-3 whitespace-nowrap"
                      >

                        <div className="flex items-center gap-2 font-semibold">

                          <span className="text-[15px]">

                            {h.icon}

                          </span>

                          {h.label}

                        </div>

                      </th>

                    ))}

                  </tr>

                </thead>

                <tbody className="bg-white">

                  {allData.map((v, i) => {

                    const jumlahDibayarkan =
                      v.DPP + v.PPN - v.PPH;

                    return (

                      <tr
                        key={i}
                        className="
                      hover:bg-sky-50
                      transition duration-200
                      border-b
                    "
                      >

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.tgl_pengajuan}

                        </td>

                        <td className="px-4 py-3 font-bold text-blue-900 whitespace-nowrap">

                          {v?.no_pengajuan}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.nama_pemohon}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.cabang}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.jenis_biaya}

                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.nama_vendor || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.tipe_ppn === 'include' ? 'Non WAPU' : v?.tipe_ppn === 'exclude' ? 'WAPU' : '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap font-semibold">

                          {formatCurrency(v?.nominal_dpp)}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {formatCurrency(v?.nominal_ppn) || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-red-600 font-semibold">

                          {formatCurrency(v?.nominal_pph) || '-'}

                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-semibold">

                          {v?.keterangan || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap font-bold text-emerald-700">

                          {formatCurrency(v?.total_dibayarkan) || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_invoice || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_kasbon_sap || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_faktur_pajak || ''}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_voucher_sap || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_memo || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.tgl_pembayaran_pengajuan || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_voucher_payment || '-'}

                        </td>

                        {/* <td className="px-4 py-3 whitespace-nowrap">

                        Rp {v.ANGGARAN}

                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">

                        Rp {v.SISA_ANGGARAN}

                      </td> */}

                        {/* ==========================
                        SLA PENYELESAIAN
                    ========================== */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-3">
                              <span
                                className={`
                                                                  inline-flex items-center gap-2
                                                                  px-3 py-1
                                                                  rounded-full
                                                                  text-xs font-semibold 
                                                                  ring-2
                                                                  shadow-sm 
                                                                  ${v?.status_selesai === '1' ? 'bg-green-300' : 'bg-yellow-300'}
                                                                  w-fit
                                                                  hover:scale-110 transition
                                                                `}
                              >
                                {v?.status_selesai === '1' ? 'Selesai' : 'Masih Proses'}
                              </span>
                            </div>
                            <div
                              className={`
                              inline-flex items-center
                              gap-2 px-3 py-1
                              rounded-full text-xs
                              font-semibold
                              ${slaBadge(v.cond_sla)}
                            `}
                            >

                              <FaClock />

                              {v.sla_pengajuan}

                            </div>
                          </div>

                        </td>

                        {/* STATUS */}
                        <td className="px-4 py-3 whitespace-nowrap flex flex-col gap-2">
                          <div className="flex flex-row gap-3">
                            <span
                              className={`
                                                                  inline-flex items-center gap-2
                                                                  px-3 py-1
                                                                  rounded-full
                                                                  text-xs font-semibold 
                                                                  ring-2
                                                                  shadow-sm 
                                                                  w-fit
                                                                  hover:scale-110 transition
                                                                `}
                            >
                              <FaBuilding /> {v?.status_unit_kerja ?? v?.status_unit}
                            </span>
                          </div>
                          <span
                            className={`
                                                          inline-flex items-center gap-2
                                                          px-3 py-1
                                                          rounded-full
                                                          text-xs font-semibold text-white
                                                          ring-2
                                                          shadow-sm 
                                                          w-fit
                                                          ${statusBadge(v?.kd_status ?? null)}
                                                          hover:scale-110 transition
                                                        `}
                          >
                            <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                            {v?.status_kegiatan}
                            <span className="
                                                        inline-flex items-center gap-2
                                                          px-3 py-1
                                                          rounded-full
                                                          text-xs font-semibold 
                                                          bg-white
                                                          text-black
                                                        ">
                              {v?.status_pengajuan ?? "Proses"}
                            </span>
                          </span>
                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

            {/* FOOTER */}
            <div className="border border-gray-100 shadow-xl bg-slate-50 py-4 mb-5 rounded-b-2xl lg:px-5 md:px-5 px-2">

              <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                {/* LEFT */}
                <div className="flex flex-row items-center gap-3 justify-between flex-wrap">

                  <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold">
                      {startIndex}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold">
                      {endIndex}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                      {totalData}
                    </span>{" "}
                    entries
                  </div>

                  <div className="flex items-center gap-2">

                    <span className="text-sm text-gray-600">
                      Rows :
                    </span>

                    <select
                      className="select select-bordered select-sm bg-white rounded-full"
                      onChange={ChangePerPage}
                      value={perPage}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>

                  </div>

                </div>

                {/* RIGHT PAGINATION */}
                {totalPage > 0 && (
                  <div className="overflow-auto pb-2 justify-center flex">

                    <ReactPaginate
                      breakLabel={"..."}
                      previousLabel={"←"}
                      nextLabel={"→"}
                      pageCount={totalPage}
                      onPageChange={changePage}
                      forcePage={currentPage - 1}
                      className={"flex items-center gap-2"}

                      activeClassName={
                        "!bg-blue-900 !text-white !border-blue-900"
                      }

                      pageClassName={
                        "min-w-9 h-9 border border-gray-500 rounded-full flex items-center justify-center bg-white hover:bg-sky-50 transition-all"
                      }

                      pageLinkClassName={
                        "w-full h-full flex items-center justify-center px-3"
                      }

                      previousClassName={
                        "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                      }

                      nextClassName={
                        "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                      }

                      previousLinkClassName={
                        "w-full h-full flex items-center justify-center px-3"
                      }

                      nextLinkClassName={
                        "w-full h-full flex items-center justify-center px-3"
                      }

                      breakClassName={
                        "px-2 text-gray-500"
                      }

                      disabledClassName={
                        "opacity-50 cursor-not-allowed"
                      }
                    />

                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      </div>

    </div>

  );

};

export default Reporting;