import React, { useEffect, useState } from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { AsyncSelect, Label, Modal, Select } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';

import {
  IoCheckmarkCircleSharp
} from 'react-icons/io5';

import BgModal from 'assets/BgModal.svg';

import { swal } from 'global/helper/swal';

import { setToggleModal } from '../../../../../redux/n2n/global';

import {
  FaBuilding,
  FaCheckCircle,
  FaCommentDots,
  FaFileAlt,
  FaFileExcel,
  FaFileImage,
  FaFileInvoiceDollar,
  FaFilePdf,
  FaHashtag,
  FaListAlt,
  FaMoneyBillWave,
  FaPercent,
  FaRegFileAlt,
  FaUser,
  FaBriefcase,
  FaChartLine,
  FaBullseye,
  FaTruck,
  FaChartPie,
  FaTimesCircle,
  FaEye,
  FaFileWord,
  FaBalanceScale,
  FaTrash,
  FaDownload,
  FaPaperclip,
  FaMoneyBill,
  FaInfoCircle,
  FaPlus,
  FaSave,
  FaPencilAlt,
  FaPercentage,
  FaUserTie,
  FaCalendarAlt,
  FaReceipt,
} from 'react-icons/fa';

import { HiOutlineTicket } from 'react-icons/hi';

import { formatCurrency } from 'global/helper/formatCurrency';
import { getCookies } from 'global/helper/cookie';
import storeSchema from 'global/store';
import CurrencyInput from 'components/atoms/CurrencyInput';
import { FaMessage, FaRegMessage } from 'react-icons/fa6';
import { formatDateJam } from 'global/helper/formatDate';
import Swal from 'sweetalert2';

const ModalApprove = ({ loginAccess, getListPengajuan, getSummaryPengajuan }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const [tanggalPembayaran, setTanggalPembayaran] = useState('');
  const [catatan, setCatatan] = useState('');
  const [data, setData] = useState();
  const [dataDokumen, setDataDokumen] = useState([])
  const [files, setFiles] = useState([])
  const [nominalDpp, setNominalDpp] = useState(0);
  const [formData, setFormData] = useState({
    jenis_ppn: '',
    ppn: '',
    nominal_ppn: '',
  });
  const [selectedJasa, setSelectedJasa] = useState(0)
  const [tarif, setTarif] = useState()
  const [bruto, setBruto] = useState()
  const [pph23, setPph23] = useState(0)
  const [jasaOptions, setJasaOptions] = useState([])
  const [noVoucherSAP, setNoVoucherSAP] = useState()
  const [paddingBottom, setPaddingBottom] = useState('')
  const dummyCoa = {
    pengajuan_coa_id: null,
    coa_detail_id: '',
    ur_coa_detail_id: '',
    coa_id: '',
    ur_coa_id: '',
    nominal: '',
    canEdit: true
  }
  const [coaRows, setCoaRows] = useState([dummyCoa]);
  const [coaRowsOld, setCoaRowsOld] = useState([]);

  const confirmSave = async () => {
    const result = await Swal.fire({
      title: "Setujui Data Pengajuan ?",
      text: "Apakah Anda Yakin Ingin Melanjutkan ? Pastikan Data Yang Disetujui Sudah Sesuai",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Ya, Lanjutkan
        </span>
        `,

      cancelButtonText: `
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Batal
        </span>
        `,

      buttonsStyling: false,

      reverseButtons: true,

      customClass: {
        popup: "rounded-3xl",
        title: "text-xl font-bold text-gray-800",
        htmlContainer: "text-gray-500",

        confirmButton:
          "mx-1 btn bg-green-500 hover:bg-green-600 border-none text-white rounded-full px-6",

        cancelButton:
          "mx-1 btn bg-gray-200 hover:bg-gray-300 border-none text-gray-700 rounded-full px-6",
      },
    });
    if (result.isConfirmed) {
      return true;
    } else if (result.isDismissed) {
      return false;
    }
  }

  const confirmTolak = async () => {
    const result = await Swal.fire({
      title: "Tolak Data Pengajuan ?",
      text: "Apakah Anda Yakin Ingin Melanjutkan ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
          </svg>
          Ya, Tolak
        </span>
        `,

      cancelButtonText: `
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Batal
        </span>
        `,

      buttonsStyling: false,

      reverseButtons: true,

      customClass: {
        popup: "rounded-3xl",
        title: "text-xl font-bold text-gray-800",
        htmlContainer: "text-gray-500",

        confirmButton:
          "mx-1 btn bg-red-500 hover:bg-red-600 border-none text-white rounded-full px-6",

        cancelButton:
          "mx-1 btn bg-gray-200 hover:bg-gray-300 border-none text-gray-700 rounded-full px-6",
      },
    });
    if (result.isConfirmed) {
      return true;
    } else if (result.isDismissed) {
      return false;
    }
  }

  const handleDropdownOpen = () => {
    setPaddingBottom(`h-[250px]`)
  }

  const handleDropdownClose = () => {
    setPaddingBottom('')
  }

  const addRow = () => {
    setCoaRows([
      ...coaRows,
      dummyCoa,
    ]);
  };

  const handleChangeCoa = async (e, i) => {
    if (e.target.name === 'coa_detail_id') {
      const values = [...coaRows];

      if (coaRows?.length > 1 && coaRows?.filter(a => a.coa_detail_id === e.target.value && a.coa_detail_id !== '')?.length > 0) {
        await swal.error('Coa Sudah Dipilih Sebelumnya !')
        return
      }
      swal.loading()
      const res = await storeSchema.actions.getDetailAnggaranByCoa({
        coa_detail_id: e.target.value,
        cabang_id: data?.cabang_id
      });
      if (res?.status === true) {
        swal.close()
        if (res?.data && res?.data !== null) {
          const dataOld = coaRowsOld?.find(a => a.coa_detail_id === e.target.value)
          values[i].sisa_anggaran = dataOld ? Number(res?.data?.sisa_anggaran) + Number(dataOld?.nominal) : res?.data?.sisa_anggaran;
          values[i].anggaran_id = res?.data?.anggaran_id;
        } else {
          values[i].sisa_anggaran = 0;
        }
      } else {
        await swal.error('Data Anggaran Gagal Didapatkan !')
      }

      values[i].coa_detail_id = e.target.value;
      values[i].ur_coa_detail_id = e.target.label;
      values[i].gl_account = e?.target?.data?.gl_account;
      values[i].coa_id = e?.target?.data?.coa_id;
      values[i].ur_coa_id = e?.target?.data?.header_coa;
      setCoaRows(values);
    } else {
      const values = [...coaRows];
      values[i][e.target.name] = e.target.value;
      values[i]['ur_' + e.target.name] = e.target.label;
      setCoaRows(values);
    }
  };

  const handleChangeCurrencyCoa = (value, name, index) => {
    const values = [...coaRows];
    if (Number(value) > Number(values[index]?.sisa_anggaran) && values[index]?.coa_detail_id !== '53a60ead-b029-45ce-84eb-112ab30449e5') {
      swal.custom('Mohon Maaf !', 'Nominal Yang Diisi Tidak Dapat Melebihi Sisa Anggaran', 'warning')
      values[index][name] = '';
      setCoaRows(values);
    } else {
      values[index][name] = value;
      setCoaRows(values);
    }
  };

  const handleChangeCurrency = (value, name) => {
    const values = { ...data };
    values[name] = value;
    setData(values);
  };

  const saveRow = async (row, index) => {
    swal.loading()
    try {
      if (!row.coa_id) {
        return swal.error("COA Header wajib diisi");
      }

      if (!row.coa_detail_id) {
        return swal.error("COA Detail wajib diisi");
      }

      if (!row.nominal) {
        return swal.error("Nominal wajib diisi");
      }

      const payload = {
        ...(row?.pengajuan_coa_id ? { pengajuan_coa_id: row?.pengajuan_coa_id } : {}),
        pengajuan_id: data?.pengajuan_id,
        coa_id: row.coa_id,
        coa_detail_id: row.coa_detail_id,
        nominal: row.nominal,
        anggaran_id: row?.anggaran_id,
        cabang_id: data?.cabang_id
      };

      const res = await storeSchema.actions.insertCoaPengajuan(payload);
      if (res?.status === true) {
        await swal.success(`Data Berhasil Disimpan`);
        getDetailPengajuan()
      } else {
        swal.error(`Data Gagal Disimpan`);
      }

    } catch (err) {
      console.log('err', err);

      swal.error(err.response?.data?.message || "Gagal menyimpan data");
    }
  };

  const removeRow = async (index) => {
    const value = [...coaRows]
    if (!value[index].pengajuan_coa_id) {
      setCoaRows(coaRows.filter((_, i) => i !== index));
    } else {
      const confirm = await swal.confirmDelete();
      if (confirm === true) {
        swal.loading();
        const res = await storeSchema.actions.deleteCoaPengajuan(value[index].pengajuan_coa_id);
        if (res?.status === true) {
          await swal.success('Data Berhasil Dihapus');
          getDetailPengajuan();
        } else {
          await swal.error('Data Gagal Dihapus');
        };
      }
    }
  };

  const editRow = async (index) => {
    const value = [...coaRows]
    value[index].canEdit = true
    setCoaRows(value);
  };

  const cancelRow = async (index) => {
    const value = [...coaRows]
    value[index].canEdit = false
    setCoaRows(value);
  };

  const handleJasaChange = (e) => {
    const value = e.value
    setSelectedJasa(e)
    // const selected =
    //   jasaOptions.find(
    //     item => item?.value === value
    //   )
    // setTarif(e.tarif || 0)
    setData({
      ...data,
      jenis_pajak_id: e.value,
      pph: e.tarif
    })
  }

  const handleBrutoChange = (e) => {

    const value =
      e?.target?.value?.replace(/\D/g, "")

    // setBruto(formatNumber(value))
    setData({
      ...data,
      nominal_dpp: formatNumber(value)
    })

  }

  const formatNumber = (value) =>
    new Intl.NumberFormat("id-ID")
      .format(value)

  const parseNumber = (value) =>
    Number(value?.replace(/\./g, ""))

  // useEffect(() => {

  //   const brutoNumber =
  //     parseNumber(data?.nominal_dpp?.toString() ?? "0")

  //   const hasil =
  //     (brutoNumber * data?.pph) / 100

  //   // setPph23(hasil)
  //   setData({
  //     ...data,
  //     nominal_pph: hasil
  //   })


  // }, [data?.nominal_dpp, data?.pph])

  useEffect(() => {
    if (data?.tipe_ppn !== undefined && data?.nominal_ppn !== undefined && data?.nominal_pph !== undefined && data?.nominal_dpp !== undefined && data?.jenis_pajak_id !== undefined && data?.ppn !== undefined && data?.bruto !== undefined) {
      setData({
        ...data,
        nominal_pph: data?.bruto * data?.pph / 100,
        nominal_ppn: data?.nominal_dpp * data?.ppn / 100,
        total_dibayarkan: data?.tipe_ppn === 'include' ? (Number(data?.nominal_ppn) + Number(data?.nominal_dpp) - Number(data?.nominal_pph)) : (Number(data?.nominal_dpp) - Number(data?.nominal_pph))
      })
    }
  }, [data?.tipe_ppn, data?.nominal_ppn, data?.nominal_pph, data?.nominal_dpp, data?.jenis_pajak_id, data?.pph, data?.ppn, data?.bruto])

  const handleSelect = async (name, e) => {
    if (name === 'tipe_ppn') {
      setData({
        ...data,
        tipe_ppn: e.value,
        // total_dibayarkan: e.value === 'include' ? (Number(data?.ppn) / 100 * Number(data?.nominal_dpp)) : data?.nominal_dpp
      })
    }
    // setFormData(prev => ({
    //   ...prev,
    //   [name]: e?.value,
    // }));
  }

  const handleChangePPN = (field, value) => {
    if (loginAccess?.role_id !== 'RL05') return;

    const dpp = Number(data?.nominal_dpp || 0);

    if (field === 'tipe_ppn') {
      setData({
        ...data,
        tipe_ppn: value
      })
      // setFormData(prev => ({
      //   ...prev,
      //   jenis_ppn: value,
      // }));
    }
    if (field === 'ppn') {
      const persen = Number(value || 0);
      const nominalPpn = (dpp * persen) / 100;

      // setFormData(prev => ({
      //   ...prev,
      //   ppn: persen,
      //   nominal_ppn: nominalPpn,
      // }));
      setData({
        ...data,
        ppn: persen,
        nominal_ppn: nominalPpn,
        // total_dibayarkan: data?.tipe_ppn === 'include' ? (persen / 100 * Number(data?.nominal_dpp)) : data?.nominal_dpp
      })
    }

    if (field === 'nominal_ppn') {
      const nominalPpn = value;
      const persen = dpp > 0
        ? (nominalPpn / dpp) * 100
        : 0;

      setData({
        ...data,
        nominal_ppn: nominalPpn,
        ppn: persen,
        // total_dibayarkan: data?.tipe_ppn === 'include' ? (nominalPpn + Number(data?.nominal_dpp)) : data?.nominal_dpp
      })
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(
      e.target.files
    )

    selectedFiles?.forEach(item => {
      const maxFileSize = 1 * 1024 * 1024; // 25MB dalam byte
      if (item) {
        if (item.size > maxFileSize) {
          swal.custom("File Terlalu Besar", `Ukuran file ${item?.name} tidak boleh lebih dari 1 MB`, "warning");
          setFiles(files);
        } else {
          setFiles(prev => [...prev, item]);
        }
      }
    })
    // setFiles(prev => [...prev, ...selectedFiles])
  }

  const handleRemoveFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const onSubmit = async (e, status) => {
    e.preventDefault()
    let confirm;
    if (status === 'T') {
      confirm = await confirmTolak()
    } else {
      confirm = await confirmSave()
    }

    if (confirm === true) {
      swal.loading()
      try {
        // VALIDASI MANDATORY

        if (!data?.tgl_pembayaran && ['RL09', 'RL15'].includes(loginAccess?.role_id) && data?.approval_terakhir === 'Y' && data?.jenis_biaya_id !== 'KP11') {
          swal.error("Tanggal Pembayaran wajib diisi !");
          return;
        }
        if (!data?.no_voucher_payment && ['RL09', 'RL15'].includes(loginAccess?.role_id) && data?.approval_terakhir === 'Y' && data?.jenis_biaya_id !== 'KP11') {
          swal.error("Nomor Voucher Payment wajib diisi !");
          return;
        }
        if (status === 'T' && !catatan) {
          swal.custom('Wajib Isi Catatan !', 'Catatan Wajib Diisi Untuk Menolak Pengajuan', 'warning')
        }

        const payload = {
          status_id: data?.status_id,
          pengajuan_id: data?.pengajuan_id,
          no_pengajuan: data?.no_pengajuan,
          no_urut: data?.no_urut,
          kd_status: status,
          catatan: catatan,
          coa: data?.coa
        }
        const res = await storeSchema.actions.insertStatusPengajuan(payload)
        if (res?.status === true) {
          // if (files?.length > 0) {
          const formData = new FormData();
          formData.append("payload", JSON.stringify({
            pengajuan_id: data?.pengajuan_id,
            ...((loginAccess?.role_id === "RL04" && loginAccess?.jenis_user_id === '1')
              ? {
                nominal_dpp: data?.nominal_dpp,
                ppn: data?.ppn,
                nominal_ppn: data?.nominal_ppn
              }
              : {}),
            ...(['RL09', 'RL15'].includes(loginAccess?.role_id) && data?.approval_terakhir === 'Y' ? {
              tgl_pembayaran: data?.tgl_pembayaran,
              no_voucher_payment: data?.no_voucher_payment
            } : {}),
            ...(loginAccess?.role_id === 'RL05' ? {
              jenis_pajak_id: data?.jenis_pajak_id,
              pph: data?.pph,
              nominal_pph: data?.nominal_pph,
              ppn: data?.ppn,
              bruto: data?.bruto,
              nominal_ppn: data?.nominal_ppn,
              total_dibayarkan: data?.total_dibayarkan
            } : {})
          }));
          files.forEach(file => {
            formData.append("lampiran", file);
          });
          await storeSchema.actions.updatePengajuan(formData)
          // }
          swal.close()
          getListPengajuan()
          getSummaryPengajuan()
          dispatch(
            setToggleModal({
              isOpen: true,
              modal: status === 'S1' ? "modalAfterApprove" : "modalAfterReject",
              status: res?.data?.history_id
            })
          );
        } else {
          swal.error('Data Gagal Disimpan')
        }
      } catch (error) {
        swal.error(error?.message)
      }
    }

    // swal.loading();

    // await dispatch(
    //   setToggleModal({
    //     isOpen: false,
    //     modal: ""
    //   })
    // );

    // setTimeout(() => {

    //   swal.close();

    //   dispatch(
    //     setToggleModal({
    //       isOpen: true,
    //       modal: "modalAfterApprove"
    //     })
    //   );

    // }, 1000);

  };

  const [options, setOptions] = useState({
    tipePPN: [
      {
        value: 'exclude',
        label: 'PPN WAPU'
      },
      {
        value: 'include',
        label: 'PPN Non-WAPU'
      }
    ]
  })

  // ========================
  // DETAIL DATA
  // ========================
  const detailData = [
    {
      label: "No Pengajuan",
      value: data?.no_pengajuan || '-',
      icon: <FaHashtag />,
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      label: "Nama Pemohon",
      value: data?.nama_pemohon || '-',
      icon: <FaUser />,
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      label: "Jabatan",
      value: data?.ur_jabatan_id || '-',
      icon: <FaBriefcase />,
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    {
      label: "Profit Center",
      value: data?.ur_cabang_id || '-',
      icon: <FaBuilding />,
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
    {
      label: "Jenis Biaya",
      value: data?.ur_jenis_biaya_id || '-',
      icon: <FaListAlt />,
      bg: "bg-cyan-100",
      text: "text-cyan-700",
    },
    // {
    //   label: "Account Description",
    //   value: "10020 - Gaji Komisaris",
    //   icon: <FaRegFileAlt />,
    //   bg: "bg-yellow-100",
    //   text: "text-yellow-700",
    // },
    {
      label: "Nominal DPP",
      value:
        (loginAccess?.role_id === "RL04" && loginAccess?.jenis_user_id === '1') ? (
          <CurrencyInput
            value={data?.nominal_dpp}
            height="h-[38px] mt-2"
            onChange={(value) =>
              // setNominalDpp(value)
              setData({
                ...data,
                nominal_dpp: value
              })
            }
          />
        ) : (
          formatCurrency(data?.nominal_dpp)
        ),
      icon: <FaMoneyBillWave />,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    {
      label: "Jenis PPN",
      value: loginAccess?.role_id === 'RL05' ?
        <Select
          options={options.tipePPN}
          value={{ value: data?.tipe_ppn, label: options?.tipePPN?.filter(a => a.value === data?.tipe_ppn)[0]?.label }}
          onChange={(val) =>
            handleSelect('tipe_ppn', val)
          }
        /> : `${data?.tipe_ppn === 'exclude' ? 'PPN WAPU' : data?.tipe_ppn === 'include' ? 'PPN Non-WAPU' : '-'}`,
      icon: <FaPercentage />,
      bg: "bg-rose-100",
      text: "text-rose-700",
    },
    {
      label: "PPN",
      value: loginAccess?.role_id === 'RL05' && loginAccess?.jenis_user_id === '1' ?
        <input
          type='number'
          className='input input-md bg-white rounded-full border border-gray-400 mt-1'
          value={data?.ppn}
          onChange={(e) =>
            handleChangePPN('ppn', e?.target?.value)
          }
        /> : `${data?.ppn || 0}%`,
      icon: <FaPercent />,
      bg: "bg-rose-100",
      text: "text-rose-700",
    },
    {
      label: "Nominal PPN",
      value: loginAccess?.role_id === 'RL05' && loginAccess?.jenis_user_id === '1' ? <CurrencyInput
        value={data?.nominal_ppn}
        className='mt-1'
        onChange={(e) =>
          handleChangePPN('nominal_ppn', e?.target?.value)
        }
      /> : `${formatCurrency(data?.nominal_ppn || 0)}`,
      icon: <FaMoneyBill />,
      bg: "bg-rose-100",
      text: "text-rose-700",
    },
    {
      label: "PPh",
      value: `${data?.pph || 0}% (${formatCurrency(data?.nominal_pph || 0)})`,
      icon: <FaPercent />,
      bg: "bg-red-100",
      text: "text-red-700",
    },
    {
      label: "Nomor Kasbon SAP",
      value: data?.no_kasbon_sap || '-',
      icon: <FaReceipt />,
      bg: "bg-red-100",
      text: "text-red-700",
    },
    {
      label: "Nomor Invoice",
      value: data?.no_invoice || '-',
      icon: <FaFileInvoiceDollar />,
      bg: "bg-sky-100",
      text: "text-sky-700",
    },
    {
      label: "Nomor Faktur Pajak",
      value: data?.no_faktur_pajak || '-',
      icon: <FaFilePdf />,
      bg: "bg-red-100",
      text: "text-red-700",
    },
    {
      label: "Nominal Dibayarkan",
      value: formatCurrency(data?.total_dibayarkan) || '-',
      icon: <FaMoneyBillWave />,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
  ];

  // ========================
  // INFO SUMMARY
  // ========================
  const summaryInfo = [
    {
      title: "Omset Cabang (YTD)",
      value: formatCurrency(data?.summary_info?.omset) || '-',
      icon: <FaBuilding />,
      bg: "bg-blue-100",
      text: "text-blue-700",
      valueColor: "text-blue-700"
    },
    {
      title: "Persentase Omset Terhadap Target",
      value: data?.summary_info?.persentase_omset_terhadap_target ? data?.summary_info?.persentase_omset_terhadap_target + "%" : '-',
      icon: <FaChartLine />,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      valueColor: "text-emerald-700"
    },
    {
      title: "Target Omset (YTD)",
      value: formatCurrency(data?.summary_info?.target_omset) || '-',
      icon: <FaBullseye />,
      bg: "bg-indigo-100",
      text: "text-indigo-700",
      valueColor: "text-indigo-700"
    },
    {
      title: "Total Biaya",
      value: formatCurrency(data?.summary_info?.total_biaya) || '-',
      icon: <FaTruck />,
      bg: "bg-cyan-100",
      text: "text-cyan-700",
      valueColor: "text-cyan-700"
    },
    {
      title: "Rasio Biaya Terhadap Omset",
      value: data?.summary_info?.rasio_biaya ? data?.summary_info?.rasio_biaya + "%" : '-',
      icon: <FaChartPie />,
      bg: "bg-purple-100",
      text: "text-purple-700",
      valueColor: "text-purple-700"
    },
  ];

  const getDetailPengajuan = async () => {
    try {
      swal.loading()
      const res = await storeSchema.actions.getDetailPengajuan(toggleModal?.pengajuan_id)
      if (res?.status === true) {
        const response = await storeSchema.actions.getListJenisPajak({
          page: 1,
          limit: 1000,
          keyword: '',
          sortBy: 'ASC',
        });
        if (response?.status === true) {
          const dataJenisJasa = response?.data?.list_data?.map(item => ({
            label: item?.jenis_jasa,
            value: item?.jenis_pajak_id,
            tarif: item?.persen_tarif
          }))
          setJasaOptions(dataJenisJasa)
        }
        swal.close()
        setData(res?.data)
        // setNominalDpp(res?.data?.nominal_dpp || 0);
        // setNoVoucherSAP(res?.data?.no_voucher_sap)
        // setFormData({
        //   jenis_ppn: res?.data?.tipe_ppn,
        //   ppn: res?.data?.ppn || '',
        //   nominal_ppn: res?.data?.nominal_ppn || '',
        // })
        if (res?.data?.coa && res?.data?.coa?.length > 0) {
          const coaData = res?.data?.coa?.map(v => (
            {
              pengajuan_coa_id: v?.pengajuan_coa_id,
              coa_id: v?.coa_id,
              ur_coa_id: v?.ur_coa_id,
              coa_detail_id: v?.coa_detail_id,
              ur_coa_detail_id: v?.ur_coa_detail_id,
              nominal: v?.nominal,
              canEdit: false
            }
          ))
          setCoaRows(coaData)
          setCoaRowsOld(coaData)
        } else {
          setCoaRows([dummyCoa])
        }
      } else {
        swal.error(res?.message || 'Gagal mendapatkan data pengajuan')
      }
    } catch (error) {
      swal.error('Terjadi kesalahan saat mendapatkan data pengajuan')
      console.error('Error fetching detail pengajuan:', error)
    }
  }

  // useEffect(() => {
  //   if (data?.nominal_dpp) {
  //     setData({
  //       ...data,
  //       nominal_ppn: (Number(data?.ppn) / 100 * Number(data?.nominal_dpp))
  //     })
  //   }
  // }, [data?.nominal_dpp])

  useEffect(() => {
    if (toggleModal?.pengajuan_id && toggleModal?.isOpen && toggleModal?.modal === 'modalApprove') {
      setCatatan('')
      getDetailPengajuan()
    }
  }, [toggleModal])

  return (

    <Modal
      title="Setujui Pengajuan"
      iconTitle={
        <IoCheckmarkCircleSharp className='text-green-500 text-3xl' />
      }

      modal={"modalApprove"}

      size={"w-11/12 max-w-6xl"}

      scroll={false}

      buttonFooter={
        <>

          <div className="flex justify-end gap-2">

            <button className="btn px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 border-none">

              Batal

            </button>

            <button
              onClick={(e) => onSubmit(e, 'T')}
              className="btn px-5 py-2 rounded-full text-white flex items-center gap-2 bg-red-500 hover:bg-red-600 border-0"
            >
              <FaTimesCircle />
              Tolak
            </button>

            <button
              onClick={(e) => onSubmit(e, 'S1')}
              className="btn px-5 py-2 rounded-full text-white flex items-center gap-2 bg-green-500 hover:bg-green-600 border-none"
            >

              <FaCheckCircle />

              Ya, Setujui

            </button>

          </div>

        </>
      }
    >

      <div>

        {/* ================= HEADER INFO ================= */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-bold">
                Approval Pengajuan
              </h1>

              <p className="text-sm text-green-100 mt-1">
                Pastikan seluruh data pengajuan sudah sesuai sebelum menyetujui.
              </p>

            </div>

            <FaCheckCircle className="text-3xl" />

          </div>

        </div>

        {data?.history_penolakan?.length > 0 && (
          <div
            className="
                  bg-red-50
                  border-l-4
                  border-red-500
                  rounded-xl
                  p-5
                  m-5
                  shadow-sm
                "
          >

            <div className="flex items-center gap-3 mb-4">

              <FaTimesCircle className="text-red-600 text-2xl" />

              <div>
                <h5 className="font-semibold text-red-700">
                  Pengajuan Pernah Ditolak
                </h5>

                <p className="text-sm text-red-500">
                  Berikut Catatan Penolakan
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">

              <div
                className="
                      flex items-center
                      gap-2
                      text-sm
                      text-gray-700
                    "
              >
                <FaUserTie className="text-red-500" />
                <span>
                  <strong>Ditolak Oleh :</strong>{" "}
                  {data?.history_penolakan[0]?.ur_role_id}
                </span>
              </div>

              <div
                className="
                      flex items-center
                      gap-2
                      text-sm
                      text-gray-700
                    "
              >
                <FaCalendarAlt className="text-red-500" />
                <span>
                  <strong>Tanggal :</strong>{" "}
                  {formatDateJam(data?.history_penolakan[0]?.created_at) || '-'}
                </span>
              </div>

            </div>

            <div
              className="
                    bg-white
                    border
                    border-red-200
                    rounded-lg
                    p-4
                  "
            >

              <div
                className="
                      flex items-center
                      gap-2
                      mb-2
                      text-red-600
                      font-medium
                    "
              >
                <FaCommentDots />
                Catatan Penolakan
              </div>

              <p className="text-gray-700 whitespace-pre-line">
                {data?.history_penolakan[0]?.catatan || ''}
              </p>

            </div>

          </div>
        )}

        {/* ================= DETAIL GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">

          {detailData.map((item, index) => (

            <div
              key={index}
              className="bg-white border rounded-2xl p-4 shadow-sm"
            >

              <div className="flex items-start gap-3">

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg}`}>

                  <div className={`${item.text}`}>
                    {item.icon}
                  </div>

                </div>

                <div>

                  <p className="text-xs text-gray-500 uppercase">
                    {item.label}
                  </p>

                  <h3 className="font-semibold text-gray-800 text-sm">
                    {item.value}
                  </h3>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* KETERANGAN */}
        <div className="
                  mt-5 bg-white rounded-2xl
                  border shadow-sm p-5
                ">

          <div className="
                    flex items-center gap-3 mb-4
                  ">

            <div className="
                      w-11 h-11 rounded-xl
                      bg-sky-100
                      flex items-center justify-center
                    ">

              <FaCommentDots className="
                        text-sky-700 text-lg
                      " />

            </div>

            <div>

              <p className="
                        text-xs text-gray-500 uppercase
                      ">
                Keterangan Pengajuan
              </p>

              <h3 className="
                        font-semibold text-gray-800
                      ">
                Detail Keterangan
              </h3>

            </div>

          </div>

          <div className="
                    bg-gray-50 border rounded-2xl
                    p-4 text-gray-700
                  ">
            {data?.keterangan}
          </div>

        </div>

        {/* ================= FILE ================= */}
        <div className="mt-5 bg-white border rounded-2xl p-5 shadow-sm">

          <h3 className="font-semibold mb-3">
            Lampiran File
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-3 overflow-auto pt-3">
            {data?.lampiran && data?.lampiran?.length > 0 && data?.lampiran?.map((v, i) => (
              <div className="indicator">
                {v?.jenis_user === 'Pemohon' && (
                  <span className="text-white indicator-item badge badge-primary text-xs">
                    {v?.jenis_user}
                  </span>
                )}
                {v?.jenis_user === 'Approval' && (
                  <span className="text-white indicator-item badge badge-success text-xs">
                    Logistik
                  </span>
                )}
                <div className="flex items-center justify-between border rounded-xl px-3 py-2 bg-gray-50 hover:bg-gray-100 transition">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                      {['pdf'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".")?.length) - 1)]) && (
                        <FaFilePdf className="text-red-500 text-lg" />
                      )}
                      {['doc', 'docx', 'rtf'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".").length) - 1)]) && (
                        <FaFileWord className="text-blue-500 text-lg" />
                      )}
                      {['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".").length) - 1)]) && (
                        <FaFileImage className="text-blue-500 text-lg" />
                      )}
                      {['xls', 'xlsx'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".").length) - 1)]) && (
                        <FaFileExcel className="text-green-500 text-lg" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-sm text-gray-800 truncate">
                        {v?.nama_dokumen || '-'}
                      </p>

                      <p className="text-xs text-gray-500">
                        {v?.created_at || '-'}
                      </p>
                    </div>

                  </div>

                  <button className="ml-2 w-8 h-8 rounded-lg hover:bg-white hover:text-blue-700 flex items-center justify-center transition flex-shrink-0" onClick={() => window.open(v?.url_file, '_blank')}>
                    <FaEye className="text-gray-400 text-sm hover:text-blue-700" />
                  </button>

                </div>
              </div>
            ))}

          </div>

        </div>

        {((['RL08'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KC') || (['RL07'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KP')) ? (
          <div className="md:col-span-2 my-5">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <FaInfoCircle className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h1 className="font-bold text-blue-900">
                    Informasi Wajib Dikoreksi
                  </h1>

                  <p className="text-sm text-blue-600">
                    Field berikut wajib dilengkapi
                  </p>
                </div>

              </div>

              <div className={`grid grid-cols-1 gap-5`}>
                {((['RL08'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KC') || (['RL07'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KP')) && data?.jenis_biaya_id !== 'KP12' && (
                  <div className="card bg-base-100 shadow-lg ring-2">
                    <div className="card-body">

                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">
                          Account Mapping
                          <span className="text-red-500 ml-1">*</span>
                        </h3>
                        <button
                          type="button"
                          className="btn btn-primary rounded-full btn-sm bg-blue-900 text-white w-32 flex"
                          disabled={coaRows?.filter(a => a.canEdit === true)?.length > 0}
                          onClick={addRow}
                        >
                          <FaPlus className="" />
                          Tambah
                        </button>
                      </div>

                      <div className={`overflow-x-auto ${paddingBottom} transition`}>
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>No</th>
                              {/* <th>COA Header</th> */}
                              <th>COA Detail</th>
                              <th>COA Header</th>
                              {['RL07', 'RL08'].includes(loginAccess?.role_id) && coaRows?.filter(a => a.canEdit === true)?.length > 0 && (
                                <th>Sisa Anggaran</th>
                              )}
                              <th>Nominal</th>
                              <th>Aksi</th>
                            </tr>
                          </thead>

                          <tbody>
                            {coaRows.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                  <AsyncSelect
                                    name="coa_detail_id"
                                    classNamePrefix="react-select"
                                    placeholder="Ketik kata kunci"
                                    defaultOptions={false}
                                    cacheOptions
                                    onMenuOpen={handleDropdownOpen}
                                    onMenuClose={handleDropdownClose}
                                    // menuPortalTarget={document.body}
                                    isDisabled={row?.canEdit ? false : true}
                                    value={row?.coa_detail_id ? { label: row?.ur_coa_detail_id, value: row?.coa_detail_id } : null}
                                    onChange={(selectedOption) => {
                                      console.log(selectedOption, 'coa select');

                                      handleChangeCoa(
                                        { target: { name: 'coa_detail_id', value: selectedOption?.value, label: selectedOption?.label, data: selectedOption?.data } },
                                        index
                                      )
                                    }}
                                    loadOptions={(value, callBack) => {
                                      const get = async () => {
                                        try {
                                          const res = await storeSchema.actions.getListCoaDetail(value.toUpperCase());
                                          const data = res?.data?.map((v) => {
                                            return {
                                              label: v?.detail_coa,
                                              value: v?.coa_detail_id,
                                              data: v
                                              // detail: v?.detail
                                            };
                                          });
                                          callBack(data);
                                        } catch (err) {
                                          callBack([]);
                                        }
                                      };
                                      get();
                                    }}
                                    styles={{
                                      control: (provided, state) => ({
                                        ...provided,
                                        minHeight: '20px',
                                        minWidth: '200px',
                                        borderRadius: '25px',
                                        backgroundColor: row?.canEdit ? 'white' : '#DFDFDF', // neutral-300
                                        // borderColor: '#d1d5db',  input-bordered approximation
                                        fontSize: '0.875rem',
                                      }),
                                    }}
                                  />
                                </td>

                                {/* <td>
                                          <Select
                                            options={optCoaDetail}
                                            height={"20px"}
                                            isDisabled={row?.canEdit === true ? false : true}
                                            value={optCoaDetail.find((item) => item.value === row.coa_detail_id) || null}
                                            onChange={(val) => {
                                              const values = [...coaRows];
                                              values[index].coa_detail_id = val?.value || '';
                                              values[index].ur_coa_detail_id = val?.label || '';
                                              setCoaRows(values);
                                            }}
                                            onMenuOpen={handleDropdownOpen}
                                            onMenuClose={handleDropdownClose}
                                            placeholder="Pilih COA Detail"
                                            className={"min-w-[300px]"}
                                          />
                                        </td> */}

                                <td>
                                  <input
                                    name="ur_coa_id"
                                    value={row?.ur_coa_id}
                                    disabled={true}
                                    className="input input-sm input-bordered bg-white w-full rounded-full border-blue-200 focus:border-blue-500 h-[40px]"
                                  />
                                </td>
                                {['RL07', 'RL08'].includes(loginAccess?.role_id) && coaRows?.filter(a => a.canEdit === true)?.length > 0 && !row?.canEdit && (
                                  <td></td>
                                )}
                                {['RL07', 'RL08'].includes(loginAccess?.role_id) && row?.canEdit && (
                                  <td>
                                    <CurrencyInput
                                      name='sisa_anggaran'
                                      // size='-[20px]'
                                      height={"h-[40px]"}
                                      value={row?.sisa_anggaran}
                                      disabled={true}
                                    />
                                  </td>
                                )}
                                <td>
                                  <CurrencyInput
                                    name='nominal'
                                    // size='-[20px]'
                                    height={"h-[40px]"}
                                    onChange={(value, name) => {
                                      handleChangeCurrencyCoa(value, name, index)
                                    }}
                                    value={row?.nominal}
                                    disabled={((row?.canEdit && row.coa_detail_id && row?.anggaran_id) || (row?.canEdit && row.coa_detail_id && row?.coa_detail_id === '53a60ead-b029-45ce-84eb-112ab30449e5')) ? false : true}
                                  />
                                </td>

                                <td>
                                  <div className="flex items-center gap-2">
                                    {row?.canEdit ? (
                                      <>

                                        <button
                                          type="button"
                                          className="btn 
                                                  btn-success btn-sm h-[40px] text-white rounded-full"
                                          disabled={((row?.canEdit && row.coa_detail_id && row?.anggaran_id && row?.sisa_anggaran) || (row?.canEdit && row.coa_detail_id && row?.coa_detail_id === '53a60ead-b029-45ce-84eb-112ab30449e5')) ? false : true}
                                          onClick={() => saveRow(row, index)}
                                        >
                                          <FaSave />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn bg-red-500 btn-sm text-white h-[40px] rounded-full"
                                          onClick={() => cancelRow(index)}
                                        >
                                          <FaTimesCircle />
                                        </button>
                                        {/* <button
                                                  type="button"
                                                  className="btn bg-red-500 btn-sm text-white h-[40px] rounded-full"
                                                  onClick={() => removeRow(index)}
                                                >
                                                  <FaTrash />
                                                </button> */}
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          className="btn btn-warning btn-sm h-[40px] text-white rounded-full"
                                          onClick={() => editRow(index)}
                                        >
                                          <FaPencilAlt />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn bg-red-500 btn-sm text-white h-[40px] rounded-full"
                                          onClick={() => removeRow(index)}
                                        >
                                          <FaTrash />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}

                            {coaRows?.length === 0 && (
                              <tr>
                                <td colSpan={5} className="text-center py-4">
                                  Tidak ada data
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {['RL07'].includes(loginAccess?.role_id) && (
                  <div>
                    <Label
                      icon={<HiOutlineTicket className="text-blue-600" />}
                      label={
                        <div className='flex items-center gap-1'>
                          Nomor Voucher SAP
                          <span className='text-red-500'>*</span>
                        </div>
                      }
                      children={
                        <input
                          name="voucher_sap"
                          value={data?.no_voucher_sap}
                          onChange={(e) =>
                            // setNoVoucherSAP(
                            //   e.target.value
                            // )
                            setData({
                              ...data,
                              no_voucher_sap: e.target.value
                            })
                          }
                          className="input input-bordered bg-white w-full rounded-full border-blue-200 focus:border-blue-500"
                          placeholder="Masukkan nomor voucher SAP"
                        />
                      }
                    />

                  </div>
                )}

              </div>

            </div>

          </div>
        ) : (
          <div className="mt-5 bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center">
                <FaBalanceScale className="text-gray-700 text-lg" />
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">
                  Account Description
                </p>

                <h3 className="font-semibold text-gray-800">
                  Deskripsi Coa Pengajuan
                </h3>
              </div>

            </div>

            <div className={`overflow-x-auto transition`}>
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>COA Detail</th>
                    <th>COA Header</th>
                    {/* <th>Sisa Anggaran</th> */}
                    <th>Nominal</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.coa?.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type='text'
                          name='nominal'
                          className='input h-[40px] bg-white rounded-[25px] w-full'
                          value={row?.ur_coa_detail_id}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <input
                          name="coa_id"
                          className='input input-bordered rounded-[25px] w-full'
                          disabled={true}
                          value={row?.ur_coa_id}
                        />
                      </td>

                      {/* <td>
                      <CurrencyInput
                        name='sisa_anggaran'
                        // size='-[20px]'
                        height={"h-[40px]"}
                        // onChange={(value, name) => {
                        //   handleChangeCurrencyCoa(value, name, index)
                        // }}
                        value={row?.sisa_anggaran}
                        disabled={true}
                      />
                    </td> */}
                      <td>
                        <CurrencyInput
                          name='nominal'
                          // size='-[20px]'
                          height={"h-[40px]"}
                          // onChange={(value, name) => {
                          //   handleChangeCurrencyCoa(value, name, index)
                          // }}
                          value={row?.nominal}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  ))}

                  {data?.coa?.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {['RL05'].includes(loginAccess?.role_id) && (
          <div className="mt-6">

            <h1 className="text-2xl font-bold text-indigo-900 mb-5">
              PPh
            </h1>

            <div className="grid gap-4">

              {/* ================= JENIS JASA ================= */}
              <Row label="Jenis Jasa">
                <Select
                  // value={selectedJasa}
                  value={{ value: data?.jenis_pajak_id, label: jasaOptions?.find(a => a.value === data?.jenis_pajak_id)?.label }}
                  onChange={handleJasaChange}
                  className="mt-2 text-right"
                  options={jasaOptions}
                />
                {/* <select
                          value={selectedJasa}
                          onChange={handleJasaChange}
                          className="
                        select select-bordered
                        rounded-full w-full
                      "
                        >
                          <option value=""></option>
                          {jasaOptions.map((item, index) => (
                            <option
                              key={index}
                              value={item?.label}
                            >
                              {item?.label} ({item?.tarif}%)
                            </option>
                          ))}
        
                        </select> */}

              </Row>

              {/* BRUTO */}
              <Row label="Bruto">

                {/* <input
                  value={data?.nominal_dpp}
                  onChange={handleBrutoChange}
                  className="input input-bordered rounded-full w-full text-right"
                  placeholder="Masukkan bruto"
                /> */}

                <CurrencyInput
                  name='bruto'
                  size='-md text-right text-lg'
                  onChange={(value, name) => handleChangeCurrency(value, name)}
                  value={data?.bruto}
                />

              </Row>

              {/* TARIF */}
              <Row label="Tarif">

                <input
                  value={`${data?.pph}%`}
                  disabled
                  className="input input-bordered rounded-full w-full bg-gray-100 text-right"
                />

              </Row>

              {/* PPH */}
              <Row label="Nilai PPh">

                <input
                  value={formatNumber(data?.nominal_pph)}
                  disabled
                  className="input input-bordered rounded-full w-full bg-gray-100 text-right font-semibold"
                />

              </Row>

              {/* JUMLAH DIBAYARKAN */}
              <Row label="Jumlah Yang Dibayarkan">

                <input
                  value={formatNumber(
                    data?.nominal_dpp + (data?.tipe_ppn === 'include' ? data?.nominal_ppn : 0) - data?.nominal_pph
                  )}
                  disabled
                  className="input input-bordered rounded-full w-full bg-emerald-50 text-right font-bold text-emerald-700 border-emerald-200"
                />

              </Row>

            </div>

          </div>
        )}

        {/* ================= PAYMENT DATE ================= */}
        {
          ['RL09', 'RL15'].includes(loginAccess?.role_id) && data?.approval_terakhir === 'Y' && data?.jenis_biaya_id !== 'KP11' && (
            <>
              <div className="mt-5">

                <label className="text-md font-semibold text-gray-700">

                  Tanggal Pembayaran

                  <span className="text-red-500">*</span>

                </label>

                <input
                  type="date"
                  value={data?.tgl_pembayaran}
                  onChange={(e) =>
                    // setTanggalPembayaran(e.target.value)
                    setData({
                      ...data,
                      tgl_pembayaran: e.target.value
                    })
                  }

                  className="
                  w-full mt-2 p-3 border rounded-2xl
                  outline-none focus:ring-2
                  focus:ring-green-400 border-green-200 text-sm
                "
                />

                <div className="text-xs text-gray-400 mt-1">
                  Wajib diisi sebelum pengajuan disetujui
                </div>

              </div>
              <div className='mt-5'>
                <Label
                  icon={<HiOutlineTicket className="text-blue-600" />}
                  label={
                    <div className='flex items-center gap-1'>
                      Nomor Voucher Payment
                      <span className='text-red-500'>*</span>
                    </div>
                  }
                  children={
                    <input
                      name="no_voucher_payment"
                      value={data?.no_voucher_payment}
                      onChange={(e) =>
                        // setNoVoucherSAP(
                        //   e.target.value
                        // )
                        setData({
                          ...data,
                          no_voucher_payment: e.target.value
                        })
                      }
                      className="input input-bordered bg-white w-full rounded-full border-blue-200 focus:border-blue-500"
                      placeholder="Masukkan nomor voucher SAP"
                    />
                  }
                />

              </div>
            </>

          )
        }

        {/* ================= INFO SUMMARY ================= */}
        {['RL10', 'RL11', 'RL06'].includes(loginAccess?.role_id) && ['biaya'].includes(data?.kata1) && ['pengiriman'].includes(data?.kata2) && (
          <div className="mt-5">

            <div className="flex items-center gap-2 mb-3">

              <FaChartLine className="text-blue-700" />

              <h3 className="font-semibold text-gray-800">
                Informasi Omset & Rasio Biaya
              </h3>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

              {summaryInfo.map((item, index) => (

                <div
                  key={index}
                  className="
                  bg-white border rounded-2xl
                  p-4 shadow-sm hover:shadow-md
                  transition-all duration-300
                "
                >

                  <div className="flex items-start gap-3">

                    <div
                      className={`
                      w-11 h-11 rounded-xl
                      flex items-center justify-center
                      ${item.bg}
                    `}
                    >

                      <div className={`${item.text}`}>
                        {item.icon}
                      </div>

                    </div>

                    <div className="flex-1">

                      <p className="text-[11px] uppercase text-gray-500 leading-relaxed">
                        {item.title}
                      </p>

                      <h3 className={`font-bold text-lg mt-1 ${item.valueColor}`}>
                        {item.value}
                      </h3>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        <div className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mt-5">

          <div className="flex items-center gap-3 px-5 py-4 bg-blue-50 border-b border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <FaMessage size={20} className="text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Catatan Verifikator
              </h3>
              <p className="text-xs text-gray-500">
                Catatan dari pihak verifikator
              </p>
            </div>
          </div>

          <div className="p-5">
            <div className="border-l-4 border-blue-400 bg-gray-50 rounded-r-xl px-4 py-3">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data?.catatan_verifikator || (
                  <span className="italic text-gray-400">
                    Tidak ada catatan verifikator
                  </span>
                )}
              </p>
            </div>
          </div>

        </div>

        {/* Catatan Anda */}
        {data?.history_id && (
          <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mt-5">

            <div className="flex items-center gap-3 px-5 py-4 bg-amber-50 border-b border-amber-100">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <FaRegMessage size={20} className="text-amber-600" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Catatan Anda Sebelumnya
                </h3>
                <p className="text-xs text-gray-500">
                  Catatan yang pernah Anda berikan
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="border-l-4 border-amber-400 bg-gray-50 rounded-r-xl px-4 py-3">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {data?.catatan_anda_sebelumnya || (
                    <span className="italic text-gray-400">
                      Tidak ada catatan
                    </span>
                  )}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* {UPLOAD FILE} */}
        {['RL04'].includes(loginAccess?.role_id) && (
          <div className="md:col-span-2 mt-5">

            <Label
              icon={<FaPaperclip className="text-rose-500" />}
              label="Lampiran Approval"

              children={
                <div className="space-y-4">

                  {/* INPUT FILE */}
                  <label
                    className="
                                border-2 border-dashed
                                border-blue-200
                                rounded-2xl
                                p-6
                                flex flex-col
                                items-center
                                justify-center
                                gap-3
                                cursor-pointer
                                hover:border-blue-400
                                hover:bg-blue-50
                                transition
                              "
                  >

                    <FaPaperclip className="text-3xl text-blue-500" />

                    <div className="text-sm text-gray-600">

                      Klik untuk upload file

                    </div>

                    <div className="text-xs text-gray-400">

                      Hanya Boleh PDF dan XLSX

                    </div>

                    <input
                      type="file"
                      multiple
                      accept=".pdf,.xlsx,.xls"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                  </label>

                  {/* LIST FILE */}
                  {
                    files?.length > 0 && (
                      <div className="space-y-2">

                        {
                          files.map((file, index) => (

                            <div
                              key={index}
                              className="
                                          flex items-center
                                          justify-between
                                          bg-gray-50
                                          border
                                          rounded-xl
                                          px-4 py-3
                                        "
                            >

                              <div className="flex items-center gap-3">

                                <div
                                  className="
                                              w-10 h-10
                                              rounded-full
                                              bg-blue-100
                                              flex items-center
                                              justify-center
                                            "
                                >

                                  <FaFileAlt className="text-blue-600" />

                                </div>

                                <div>

                                  <div className="font-medium text-sm">

                                    {file.name}

                                  </div>

                                  <div className="text-xs text-gray-400">

                                    {
                                      parseFloat(
                                        (file.size /
                                        1024 /
                                        1024) ?? 0
                                      ).toFixed(2)
                                    } MB

                                  </div>

                                </div>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveFile(index)
                                }
                                className="
                                            w-9 h-9
                                            rounded-full
                                            bg-red-100
                                            text-red-500
                                            flex items-center
                                            justify-center
                                            hover:bg-red-200
                                            transition
                                          "
                              >

                                <FaTrash />

                              </button>

                            </div>

                          ))
                        }

                      </div>
                    )
                  }

                </div>
              }
            />

          </div>
        )}
        {/* ================= CATATAN ================= */}
        <div className="mt-5">

          <label className="text-md font-semibold text-gray-700">
            Catatan Anda (Optional)
          </label>

          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Tulis catatan..."
            className="
              w-full mt-2 p-4 border rounded-2xl
              outline-none focus:ring-2
              focus:ring-gray-400 border-green-200 text-sm
            "

            maxLength={500}
          />

        </div>

      </div>

    </Modal>

  );

};

/* ================= ROW ================= */
const Row = ({ label, children }) => (

  <div className="
    grid grid-cols-1
    md:grid-cols-3
    items-center gap-3
  ">

    <label className="
      text-sm text-gray-500 font-medium
    ">
      {label}
    </label>

    <div className="md:col-span-2">
      {children}
    </div>

  </div>

)

export default ModalApprove;