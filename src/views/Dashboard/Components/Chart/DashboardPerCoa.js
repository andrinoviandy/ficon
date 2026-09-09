import { AsyncSelect, Select } from "components/atoms";
import storeSchema from "global/store";
import React, { useEffect, useState } from "react";
import { FaBuilding, FaBullseye, FaChartLine, FaChartPie, FaCoins, FaFilter, FaFolderOpen, FaInbox, FaMoneyBillWave, FaPercent, FaPercentage, FaRegFileAlt, FaTruck, FaUndo, FaWallet } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setToggleModal } from '../../../../redux/n2n/global';

const DashboardPerCOA = ({ dataFilterOmset, summaryOmset, loginAccess }) => {
    const dispatch = useDispatch();
    const { toggleModal } = useSelector(state => state.global);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [filter, setFilter] = useState({
        cabang: "",
        coa_detail: ""
    });

    const [data, setData] = useState([])
    const [penjualan, setPenjualan] = useState({})

    const formatCurrency = (value) =>
        Number(value).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        });

    // const getListCoaDetailDashboard = async (datax) => {
    //     const res = await storeSchema.actions.getListCoaDetailDashboard({
    //         cabang_id: dataFilterOmset?.cabang ? dataFilterOmset?.cabang : [{ label: '', value: loginAccess?.cabang_id }],
    //     periode: dataFilterOmset?.periode ? dataFilterOmset?.periode : `${new Date().getFullYear()}-${String(
    //       new Date().getMonth() + 1
    //     ).padStart(2, '0')}`
    //     })
    //     if (res?.status === true) {
    //         setData(res?.data?.list_data)
    //         setPenjualan(res?.data?.penjualan)
    //         // setTotalPage(res?.data?.total_halaman || 0)
    //     }
    // }

    const handleFilter = async () => {
        // await getListCoaDetailDashboard(filter)
        dispatch(
            setToggleModal({
                isOpen: !toggleModal.isOpen,
                modal: "ModalFilterOmset"
            })
        );
    }

    const summaryInfo = [
        {
            title: "Total Revenue",
            value: formatCurrency(summaryOmset?.penjualan?.realisasi_omset || 0) || '-',
            icon: <FaWallet />,
            cardColor: "bg-blue-50 border-blue-100",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-700"
        },
        {
            title: "Target Revenue",
            value: formatCurrency(summaryOmset?.penjualan?.target_omset || 0) || '-',
            icon: <FaMoneyBillWave />,
            cardColor: "bg-green-50 border-green-100",
            iconBg: "bg-green-100",
            iconColor: "text-green-700"
        },
        {
            title: "To Rev",
            value: (summaryOmset?.penjualan?.realisasi_omset && summaryOmset?.penjualan?.target_omset ? (summaryOmset?.penjualan?.realisasi_omset / summaryOmset?.penjualan?.target_omset * 100)?.toFixed(2) + "%" : '-'),
            icon: <FaPercent />,
            cardColor: "bg-cyan-50 border-cyan-100",
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-700"
        },
        {
            title: "Total Biaya",
            value: formatCurrency(summaryOmset?.list_data?.reduce((sum, item) => sum + Number(item.total_pemakaian || 0), 0)) || '-',
            icon: <FaCoins />,
            cardColor: "bg-yellow-50 border-yellow-100",
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-700"
        },
        {
            title: "Biaya To Rev",
            value: summaryOmset?.list_data?.reduce((sum, item) => sum + Number(item.total_pemakaian || 0), 0) && summaryOmset?.penjualan?.realisasi_omset ? ((summaryOmset?.list_data?.reduce((sum, item) => sum + Number(item.total_pemakaian || 0), 0) / summaryOmset?.penjualan?.realisasi_omset * 100)?.toFixed(2) + "%") : '-',
            icon: <FaPercent />,
            cardColor: "bg-rose-50 border-rose-100",
            iconBg: "bg-rose-100",
            iconColor: "text-rose-700"
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg border">

            {/* HEADER */}

            <div className="flex justify-between items-center p-6">

                <div>

                    <h2 className="text-xl font-bold text-blue-900">
                        Informasi Omset & Rasio Biaya
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Monitoring informasi omset & rasio biaya
                    </p>

                </div>

                {/* FILTER */}

                <div className="flex items-center gap-3">

                    <button className="btn btn-sm py-2 rounded-full items-center gap-2 bg-blue-900 text-white font-semibold"
                        onClick={handleFilter}
                    >

                        <FaFilter />

                        Filter

                    </button>

                </div>

            </div>

            {/* <div
                className="
    bg-gradient-to-r
    from-emerald-500
    to-green-600
    rounded-3xl
    shadow-lg
    p-5
    mx-5
    text-white
    flex
    items-center
    justify-between
  "
            >

                <div>

                    <div className="text-sm text-green-100 font-medium">
                        Total Penjualan
                    </div>

                    <div className="text-xl font-bold mt-1">
                        {formatCurrency(penjualan?.realisasi_omset || 0)}
                    </div>

                </div>

                <div
                    className="
      w-12
      h-12
      rounded-lg
      bg-white/20
      flex
      items-center
      justify-center
    "
                >

                    <FaChartLine className="text-2xl" />

                </div>

            </div> */}
            <div className="px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {summaryInfo?.map((item, index) => (

                        <div
                            key={index}
                            className={`
        relative
        overflow-hidden
        rounded-2xl
        border
        p-3
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all duration-300
        ${item.cardColor}
      `}
                        >

                            {/* Watermark */}
                            <div className="absolute -right-3 -bottom-3 opacity-10 text-7xl">
                                {item.icon}
                            </div>

                            <div className="relative flex items-start gap-4">

                                <div
                                    className={`
            w-12 h-12 rounded-xl
            flex items-center justify-center
            ${item.iconBg}
          `}
                                >
                                    <div className={`text-xl ${item.iconColor}`}>
                                        {item.icon}
                                    </div>
                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        {item.title}
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {item.value}
                                    </h3>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            </div>

            {/* TABLE */}

            <div className="overflow-auto m-5 h-[500px] rounded-xl">

                <table className="table w-full">

                    <thead className="bg-blue-900 text-white">

                        <tr>
                            <th>COA Header</th>

                            <th>Realisasi</th>

                            <th>% To Rev</th>

                            {/* <th className="text-right">
                                Sisa Anggaran
                            </th> */}

                        </tr>

                    </thead>

                    <tbody>
                        {summaryOmset?.list_data?.length === 0 ? (
                            <tr>
                                <td colSpan={3}>
                                    <div className="col-span-full flex flex-col items-center justify-center py-6 text-center w-full">
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
                                </td>
                            </tr>
                        ) : (
                            summaryOmset?.list_data?.map((item, index) => (
                                <React.Fragment key={index}>
                                    <tr
                                        key={index}
                                        className="
                                        bg-gradient-to-r
                                        from-orange-100
                                        to-amber-50
                                        font-bold
                                        border-y
                                        border-orange-300
                                        "
                                    >
                                        <td className="font-semibold">
                                            <div className="flex items-center gap-3">

                                                <div className="
            w-9
            h-9
            rounded-xl
            bg-orange-500
            text-white
            flex
            items-center
            justify-center
        ">
                                                    <FaFolderOpen />
                                                </div>

                                                <div>

                                                    <div className="font-bold">
                                                        {item.nama_klasifikasi}
                                                    </div>

                                                    <div className="text-xs text-gray-500">
                                                        {item.coa?.length} COA
                                                    </div>

                                                </div>

                                            </div>
                                        </td>

                                        <td >

                                            <span
                                                className="
            inline-flex
            items-center
            gap-2
            font-bold
            text-blue-900
            "
                                            >

                                                {/* <FaMoneyBillWave /> */}

                                                {formatCurrency(item?.total_pemakaian)}

                                            </span>

                                        </td>
                                        <td>

                                            <span className="
inline-flex
rounded-full
bg-emerald-100
text-emerald-700
px-3
py-1
font-semibold
">

                                                {/* <FaMoneyBillWave /> */}

                                                {(item?.total_pemakaian && summaryOmset?.penjualan?.realisasi_omset ? (item?.total_pemakaian / summaryOmset?.penjualan?.realisasi_omset * 100)?.toFixed(2) : 0) + '%'}

                                            </span>

                                        </td>

                                    </tr>
                                    {item?.coa?.sort((a, b) => b.total_pemakaian - a.total_pemakaian)?.map((v, i) => (
                                        <tr
                                            key={i}
                                            className=""
                                        >
                                            <td className="font-semibold">
                                                <div className="flex items-center gap-2 ml-8">

                                                    <FaRegFileAlt className="text-blue-500" />

                                                    {v.header_coa}

                                                    {/* <div className="w-32">

                                                        <progress
                                                            className="progress progress-success h-2"
                                                            value={(v?.total_pemakaian / penjualan?.realisasi_omset * 100)}
                                                            max="100"
                                                        />

                                                    </div> */}

                                                </div>
                                            </td>

                                            <td >

                                                <span
                                                    className="
            inline-flex
            items-center
            gap-2
            font-bold
            text-blue-900
            "
                                                >

                                                    {/* <FaMoneyBillWave /> */}

                                                    {formatCurrency(v?.total_pemakaian)}

                                                </span>

                                            </td>
                                            <td>

                                                {/* <span
                                                    className="
            inline-flex
            items-center
            gap-2
            font-bold
            text-blue-900
            "
                                                >


                                                    {(v?.total_pemakaian / penjualan?.realisasi_omset * 100)?.toFixed(2) + '%'}

                                                </span> */}
                                                <span className="
inline-flex
rounded-full
bg-emerald-100
text-emerald-700
px-3
py-1
font-semibold
">
                                                    {(v?.total_pemakaian && summaryOmset?.penjualan?.realisasi_omset ? (v?.total_pemakaian / summaryOmset?.penjualan?.realisasi_omset * 100)?.toFixed(2) : 0) + '%'}
                                                </span>

                                            </td>

                                        </tr>
                                    ))}
                                </React.Fragment>

                            ))
                        )}

                    </tbody>

                </table>

            </div>

            {/* PAGINATION */}
            {/* {data?.length > 0 && (
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
            )} */}
        </div>
    );
};

export default DashboardPerCOA;