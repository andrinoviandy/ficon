import { formatCurrency } from "global/helper/formatCurrency";
import React, { useEffect, useState } from "react";
import {
    FaUserAlt,
    FaMoneyBill,
    FaClipboardList,
    FaFileAlt,
    FaTasks,
    FaCheckCircle,
    FaInbox,
    FaBuilding,
    FaTags,
} from "react-icons/fa";
import BgModal from 'assets/bg_cito.jpeg';
import storeSchema from "global/store";
import { swal } from "global/helper/swal";
import ReactPaginate from "react-paginate";
import { formatDate } from "global/helper/formatDate";

const TaskAktif = ({ loginAccess }) => {
    const [activeTab, setActiveTab] = useState("semua");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState();

    const perPage = 4;

    const getTaskAktifMingguIni = async () => {
        try {
            // setLoadingMenungguPembayaran(true);

            const response = await storeSchema.actions.getTaskAktifMingguIni({ page: currentPage, limit: 4, status: activeTab });

            if (response.status) {
                setSummary(response?.data?.summary)
                setData(response.data?.list_data);
                setTotalPage(response?.data?.total_halaman || 0);
            }
        } catch (err) {
            console.error(err);
            swal.error("Gagal mengambil data dashboard");
        } finally {
            // setLoadingMenungguPembayaran(false);
        }
    };

    const changePage = (e) => {
        const newPage = e.selected + 1;
        setCurrentPage(newPage);
    };
    // const data = [
    //     {
    //         nama: "Budi Santoso",
    //         cabang: "Cabang Jakarta",
    //         jabatan: "Manager",
    //         jenis: "Kasbon",
    //         nominal: `${formatCurrency(1000000)}`,
    //         tanggal: "01/05/2026",
    //         status: "menunggu_approval",
    //     },
    //     {
    //         nama: "Rina Oktaviani",
    //         cabang: "Cabang Bandung",
    //         jabatan: "Supervisor",
    //         jenis: "ATK",
    //         nominal: `${formatCurrency(2000000)}`,
    //         tanggal: "02/05/2026",
    //         status: "diproses",
    //     },
    //     {
    //         nama: "Dewi Lestari",
    //         cabang: "Cabang Surabaya",
    //         jabatan: "Assistant Manager",
    //         jenis: "Door To Door",
    //         nominal: `${formatCurrency(3000000)}`,
    //         tanggal: "03/05/2026",
    //         status: "ditolak",
    //     },
    //     {
    //         nama: "Agus Pratama",
    //         cabang: "Cabang Medan",
    //         jabatan: "Manager",
    //         jenis: "Transport",
    //         nominal: `${formatCurrency(4000000)}`,
    //         tanggal: "04/05/2026",
    //         status: "diproses",
    //     },
    //     {
    //         nama: "Siti Aisyah",
    //         cabang: "Cabang Makassar",
    //         jabatan: "Staff",
    //         jenis: "Konsumsi",
    //         nominal: `${formatCurrency(5000000)}`,
    //         tanggal: "05/05/2026",
    //         status: "menunggu_approval",
    //     },
    //     {
    //         nama: "Ahmad Fauzi",
    //         cabang: "Cabang Semarang",
    //         jabatan: "Supervisor",
    //         jenis: "Perjalanan Dinas",
    //         nominal: `${formatCurrency(6000000)}`,
    //         tanggal: "06/05/2026",
    //         status: "diproses",
    //     },
    //     {
    //         nama: "Nanda Putri",
    //         cabang: "Cabang Palembang",
    //         jabatan: "Manager",
    //         jenis: "Kasbon",
    //         nominal: `${formatCurrency(7000000)}`,
    //         tanggal: "07/05/2026",
    //         status: "ditolak",
    //     },
    //     {
    //         nama: "Fajar Hidayat",
    //         cabang: "Cabang Pekanbaru",
    //         jabatan: "Assistant Manager",
    //         jenis: "Operasional",
    //         nominal: `${formatCurrency(8000000)}`,
    //         tanggal: "08/05/2026",
    //         status: "menunggu_approval",
    //     },
    // ];

    const tabs = [
        { key: "semua", label: "Semua" },
        {
            key: "menunggu_approval", label: "Menunggu Approval", dot: <div
                className={`
                                    w-4
                                    h-4
                                    rounded-full
                                    shadow-md
                                    bg-yellow-400
                                `}
            ></div>
        },
        {
            key: "diproses", label: "Diproses", dot: <div
                className={`
                                    w-4
                                    h-4
                                    rounded-full
                                    shadow-md
                                    bg-blue-500
                                `}
            ></div>
        },
        {
            key: "ditolak", label: "Ditolak", dot: <div
                className={`
                                    w-4
                                    h-4
                                    rounded-full
                                    shadow-md
                                    bg-red-500
                                `}
            ></div>
        },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "menunggu_approval":
                return {
                    badge: "bg-yellow-100 text-yellow-700",
                    border: "border-yellow-400",
                };
            case "diproses":
                return {
                    badge: "bg-blue-100 text-blue-700",
                    border: "border-blue-400",
                };
            case "ditolak":
                return {
                    badge: "bg-red-100 text-red-700",
                    border: "border-red-400",
                };
            default:
                return {
                    badge: "bg-gray-100 text-gray-600",
                    border: "border-gray-200",
                };
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case "menunggu_approval":
                return {
                    label: "Menunggu Approval",
                    badge: "bg-yellow-100 text-yellow-700",
                    border: "border-yellow-400",
                };
            case "diproses":
                return {
                    label: "Diproses",
                    badge: "bg-blue-100 text-blue-700",
                    border: "border-blue-500",
                };
            case "ditolak":
                return {
                    label: "Ditolak",
                    badge: "bg-red-100 text-red-700",
                    border: "border-red-500",
                };
            default:
                return {};
        }
    };

    const getColor = (status) => {
        switch (status) {
            case "menunggu_approval":
                return "bg-yellow-400";
            case "diproses":
                return "bg-blue-500";
            case "ditolak":
                return "bg-red-500";
            default:
                return "bg-gray-400";
        }
    };

    useEffect(() => {
        if (!['RL00', 'RL01'].includes(loginAccess?.role_id)) {
            getTaskAktifMingguIni()
        }
    }, [])

    useEffect(() => {
        if (!['RL00', 'RL01'].includes(loginAccess?.role_id)) {
            getTaskAktifMingguIni()
        }
        // eslint-disable-next-line
    }, [currentPage, activeTab]);

    return (
        <div className="p-5 bg-gray-50 rounded-xl">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-900 text-white p-2 rounded-lg shadow">
                        <FaTasks />
                    </div>
                    <div>
                        <div className="font-bold text-lg text-gray-800">
                            Task Aktif Minggu Ini
                        </div>
                        <div className="text-xs text-gray-500">
                            Monitoring pengajuan berjalan
                        </div>
                    </div>
                </div>

                <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    {summary?.menunggu_approval} Task
                </div>
            </div>

            {/* TAB */}
            <div className="flex gap-2 mb-5 flex-nowrap overflow-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => {
                            setActiveTab(tab.key);
                            setCurrentPage(1);
                        }}
                        className={`flex text-nowrap items-center gap-2 px-4 py-2 rounded-lg text-sm transition
              ${activeTab === tab.key
                                ? "bg-blue-900 text-white shadow"
                                : "bg-white text-gray-600 border hover:bg-gray-100"
                            }`}
                    >
                        {tab?.dot}
                        {tab.label}
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full font-semibold
                ${activeTab === tab.key
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {tab.key === 'semua' ? summary?.semua : (tab.key === 'menunggu_approval' ? summary?.menunggu_approval : (tab.key === 'diproses' ? summary?.diproses : summary?.ditolak))}
                        </span>
                    </button>
                ))}
            </div>

            {/* LIST */}
            {/* GRID LIST */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 pb-3">
                {data?.length > 0 ?
                    data?.map((item, index) => {
                        const s = getStatus(item.status);

                        return (
                            <div
                                key={index}
                                className="ml-4 relative border border-gray-300 rounded-xl shadow-lg hover:shadow-blue-500"
                            >

                                {/* DOT */}
                                <div
                                    className={`
                                    absolute
                                    -left-[12px]
                                    top-5
                                    w-4
                                    h-4
                                    rounded-full
                                    z-20
                                    shadow-md
                                    ${getColor(activeTab)}
                                `}
                                ></div>

                                {/* CARD */}
                                <div className="relative z-10 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">

                                    {/* TOP */}
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">{item.nama_pemohon}</div>
                                            <div className="text-xs text-gray-500">
                                                <div className='flex flex-wrap gap-5'>
                                                    <div className='flex flex-row gap-2 items-center'>
                                                        <FaBuilding />
                                                        {item.cabang}
                                                    </div>
                                                    <div className='flex flex-row gap-2 items-center'>
                                                        <FaTags />
                                                        {item.no_pengajuan}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-blue-900 font-bold">
                                                {formatCurrency(item.nominal_dpp)}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {formatDate(item.created_at)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* DETAIL */}
                                    <div className="flex gap-5 mt-3 text-xs text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <FaUserAlt /> {item.jabatan}
                                        </div>

                                        <div
                                            className={`flex items-center gap-1`}
                                        >
                                            <FaClipboardList /> {item.jenis_biaya}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })
                    :
                    <div className="col-span-full flex flex-col items-center justify-center py-6 text-center">
                        <div
                            className="
                                  flex h-24 w-24 items-center justify-center
                                  rounded-full
                                  bg-blue-50
                                  border border-blue-100
                                  shadow-sm
                                "
                        >
                            <FaInbox className="text-5xl text-blue-400" />
                        </div>

                        <h3 className="mt-6 text-lg font-semibold text-gray-700">
                            Tidak ada data
                        </h3>
                    </div>
                }
            </div>

            {/* PAGINATION */}
            {data?.length > 0 && (
                <div className="overflow-auto pb-2 justify-center flex mt-5">

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
    );
};

const cardStyle = {
    backgroundImage: `
        linear-gradient(
            rgba(255,255,255,0.75),
            rgba(255,255,255,0.75)
        ),
        url(${BgModal})
    `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

export default TaskAktif;