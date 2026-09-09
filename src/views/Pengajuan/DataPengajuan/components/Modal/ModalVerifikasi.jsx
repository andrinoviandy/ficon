import React, { useEffect, useState } from 'react'
import { AsyncSelect, Label, Modal, Select } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux'

import { swal } from 'global/helper/swal'
import { setToggleModal } from '../../../../../redux/n2n/global'

import { formatCurrency } from 'global/helper/formatCurrency'

// ICON
import {
  FaBuilding,
  FaCommentDots,
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
  FaTimesCircle,
  FaCalculator,
  FaSave,
  FaFileAlt,
  FaInfoCircle,
  FaEye,
  FaFileWord,
  FaFileUpload,
  FaPlus,
  FaTrash,
  FaUserAlt,
  FaPencilAlt,
  FaDraft2Digital,
  FaPercentage,
  FaChartLine,
  FaBullseye,
  FaTruck,
  FaChartPie,
  FaCalendarAlt,
  FaUserTie,
  FaReceipt,
  FaBalanceScale,
  FaPaperclip,
  FaMoneyBill
} from 'react-icons/fa'

import { MdVerified } from 'react-icons/md'
import { HiOutlineTicket } from 'react-icons/hi'
import storeSchema from 'global/store'
import CurrencyInput from 'components/atoms/CurrencyInput'
import { FaRegMessage } from 'react-icons/fa6'
import { formatDateJam } from 'global/helper/formatDate'
import Swal from 'sweetalert2'

const ModalVerifikasi = ({ loginAccess, getListPengajuan, getSummaryPengajuan }) => {
  const dispatch = useDispatch()
  const { toggleModal } = useSelector(
    state => state.global
  )
  const [catatan, setCatatan] = useState('')
  const [tarif, setTarif] = useState()
  const [bruto, setBruto] = useState()
  const [pph23, setPph23] = useState(0)
  const [npwp, setNpwp] = useState()
  const [nomorFaktur, setNomorFaktur] = useState()
  const [nomorInvoice, setNomorInvoice] = useState()
  const [noVoucherSAP, setNoVoucherSAP] = useState()
  const [dpp, setDpp] = useState()
  const [ppn, setPpn] = useState()
  const [data, setData] = useState([])
  const [paddingBottom, setPaddingBottom] = useState('')
  const [optCoaDetail, setOptCoaDetail] = useState([])
  const [selectedJasa, setSelectedJasa] = useState(0)
  const [jasaOptions, setJasaOptions] = useState([])
  const [editIndex, setEditIndex] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [optionsVendor, setOptionsVendor] = useState([])
  const [files, setFiles] = useState([])

  const confirmSave = async () => {
    const result = await Swal.fire({
      title: "Verifikasi Data Pengajuan ?",
      text: "Apakah Anda Yakin Ingin Melanjutkan ? Pastikan Data Yang Diverifikasi Sudah Sesuai",
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
          "mx-1 btn bg-blue-900 hover:bg-blue-700 border-none text-white rounded-full px-6",

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
      title: "Unverified Data Pengajuan ?",
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
            Ya, Unverified
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

  const handleJasaChange = (e) => {
    const value = e.value
    setSelectedJasa(e)
    // const selected =
    //   jasaOptions.find(
    //     item => item?.value === value
    //   )
    setData({
      ...data,
      jenis_pajak_id: e.value,
      pph: e.tarif
    })
    // setTarif(e.tarif || 0)
  }

  const handleDropdownOpen = () => {
    setPaddingBottom(`h-[250px]`)
  }

  const handleDropdownClose = () => {
    setPaddingBottom('')
  }

  const formatNumber = (value) =>
    new Intl.NumberFormat("id-ID")
      .format(value)

  const parseNumber = (value) =>
    Number(value?.replace(/\./g, ""))

  const formatNPWP = (value) => {

    const cleaned = value
      ?.replace(/\D/g, "")
      .slice(0, 15)

    let result = ""

    if (cleaned?.length > 0)
      result += cleaned.substring(0, 2)

    if (cleaned?.length >= 3)
      result += "." + cleaned.substring(2, 5)

    if (cleaned?.length >= 6)
      result += "." + cleaned.substring(5, 8)

    if (cleaned?.length >= 9)
      result += "." + cleaned.substring(8, 9)

    if (cleaned?.length >= 10)
      result += "-" + cleaned.substring(9, 12)

    if (cleaned?.length >= 13)
      result += "." + cleaned.substring(12, 15)

    return result
  }
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

  const handleChangeRow = (index, field, value) => {
    const updatedRows = [...coaRows];
    updatedRows[index][field] = value;
    setCoaRows(updatedRows);
  };

  const addRow = () => {
    setCoaRows([
      ...coaRows,
      dummyCoa,
    ]);
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

  // useEffect(() => {

  //   const brutoNumber =
  //     parseNumber(data?.nominal_dpp?.toString() || "0")

  //   const hasil =
  //     (brutoNumber * data?.pph) / 100

  //   // setPph23(hasil)

  //   setData({
  //     ...data,
  //     nominal_pph: data?.nominal_dpp * data?.pph / 100
  //   })
  //   console.log('woii', data?.pph);


  // }, [data?.nominal_dpp, data?.jenis_pajak_id])

  const handleBrutoChange = (e) => {

    const value =
      e?.target?.value?.replace(/\D/g, "")

    // setBruto(formatNumber(value))
    setData({
      ...data,
      nominal_dpp: formatNumber(value)
    })

  }

  const handleChangeCurrency = (value, name) => {
    const values = { ...data };
    values[name] = value;
    setData(values);
  };

  const onSubmit = async (e, status) => {
    e.preventDefault()
    let confirm;
    if (status === 'VERIFIED') {
      confirm = await confirmSave()
    } else {
      confirm = await confirmTolak()
    }

    if (confirm === true) {
      swal.loading()

      try {
        const payload = {
          status_id: data?.status_id,
          pengajuan_id: data?.pengajuan_id,
          no_pengajuan: data?.no_pengajuan,
          status_verifikasi: status === 'VERIFIED' ? 'Y' : 'T',
          kd_status: status === 'VERIFIED' ? 'VR' : 'UR',
          catatan: catatan,
        }
        const res = await storeSchema.actions.insertStatusPengajuan(payload)
        if (res?.status === true) {
          const updatePengajuan = {
            pengajuan_id: toggleModal?.pengajuan_id || data?.pengajuan_id,
            no_invoice: data?.no_invoice,
            no_faktur_pajak: data?.no_faktur_pajak,
            ...(data?.vendor_id ? {
              vendor_id: data?.vendor_id,
              npwp_vendor: npwp,
            } : {}),
            ...(data?.tipe_ppn ? {
              tipe_ppn: data?.tipe_ppn
            } : {}),
            no_voucher_sap: data?.no_voucher_sap,
            ...(loginAccess?.role_id === 'RL05' ? {
              jenis_pajak_id: data?.jenis_pajak_id,
              pph: data?.pph,
              nominal_pph: data?.nominal_pph,
              ppn: data?.ppn,
              nominal_ppn: data?.nominal_ppn,
              bruto: data?.bruto,
              total_dibayarkan: data?.total_dibayarkan
            } : {})
          }
          const formData = new FormData();
          formData.append("payload", JSON.stringify(updatePengajuan));
          files.forEach(file => {
            formData.append("lampiran", file);
          });
          await storeSchema.actions.updatePengajuan(formData)
          await swal.success('Data Berhasil Disimpan')
          await dispatch(
            setToggleModal({
              isOpen: false,
              modal: ""
            })
          )
          getListPengajuan()
          getSummaryPengajuan()

        } else {
          swal.error('Data Gagal Disimpan')
        }
      } catch (error) {
        console.log('error', error);
        swal.error(error.message)
      }
    }

    // await dispatch(
    //   setToggleModal({
    //     isOpen: false,
    //     modal: ""
    //   })
    // )

    // setTimeout(() => {

    //   swal.close()

    //   if (status === 'VERIFIED') {

    //     swal.custom(
    //       'Data Berhasil Diverifikasi',
    //       '',
    //       'success'
    //     )

    //   } else {

    //     swal.custom(
    //       'Data Dinyatakan Unverified',
    //       '',
    //       'warning'
    //     )

    //   }

    // }, 1000)

  }

  const onDraft = async () => {
    swal.loading()
    try {
      const updatePengajuan = {
        pengajuan_id: toggleModal?.pengajuan_id || data?.pengajuan_id,
        no_invoice: data?.no_invoice,
        no_faktur_pajak: data?.no_faktur_pajak,
        ...(data?.vendor_id ? {
          vendor_id: data?.vendor_id,
          npwp_vendor: npwp,
        } : {}),
        ...(data?.tipe_ppn ? {
          tipe_ppn: data?.tipe_ppn
        } : {}),
        no_voucher_sap: data?.no_voucher_sap,
        ...(loginAccess?.role_id === 'RL05' ? {
          jenis_pajak_id: data?.jenis_pajak_id,
          pph: data?.pph,
          nominal_pph: data?.nominal_pph,
          ppn: data?.ppn,
          nominal_ppn: data?.nominal_ppn,
          bruto: data?.bruto,
          // total_dibayarkan: data?.nominal_dpp + data?.nominal_ppn - pph23
          total_dibayarkan: data?.total_dibayarkan
        } : {})
      }
      const formData = new FormData();
      formData.append("payload", JSON.stringify(updatePengajuan));
      const res = await storeSchema.actions.updatePengajuan(formData)
      if (res?.status === true) {
        await swal.success('Data Berhasil Di-Draft')
        getListPengajuan()
        getSummaryPengajuan()
      } else {
        await swal.error('Data Gagal Di-Draft')
      }
    } catch (error) {
      console.log('error', error);
      swal.error(error.message)
    }

    // await dispatch(
    //   setToggleModal({
    //     isOpen: false,
    //     modal: ""
    //   })
    // )

    // setTimeout(() => {

    //   swal.close()

    //   if (status === 'VERIFIED') {

    //     swal.custom(
    //       'Data Berhasil Diverifikasi',
    //       '',
    //       'success'
    //     )

    //   } else {

    //     swal.custom(
    //       'Data Dinyatakan Unverified',
    //       '',
    //       'warning'
    //     )

    //   }

    // }, 1000)

  }

  const options = {
    account_description: [
      {
        value: "6101010101",
        label: "10020 - Gaji Komisaris",
      },
      {
        value: "6101010102",
        label: "10021 - Gaji Direksi",
      },
      {
        value: "6101010201",
        label: "10022 - Gaji Dasar I",
      },
      {
        value: "6101010202",
        label: "10023 - Gaji Dasar II",
      },
      {
        value: "6101010301",
        label: "10024 - Tunjangan Keagamaan",
      },
      {
        value: "6101010401",
        label: "10025 - Biaya Tunjangan Lembur",
      },
    ],

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
  }

  const [form, setForm] = useState({
    // account_description: null,
    // voucher_sap: '',
    vendor_id: null,
    ur_vendor_id: null,
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSelect = (name, e) => {
    if (name === 'vendor_id') {
      setData({
        ...data,
        vendor_id: e.value
      })
      setNpwp(e.data?.npwp || '')
    }
    if (name === 'tipe_ppn') {
      setData({
        ...data,
        tipe_ppn: e.value,
        // total_dibayarkan: e.value === 'include' ? (Number(data?.ppn) / 100 * Number(data?.nominal_dpp)) : data?.nominal_dpp
      })
    }
    setForm({
      ...form,
      [name]: e.value,
      [`ur_${name}`]: e.label
    })
  }

  const handleChangePPN = (field, value) => {
    if (loginAccess?.role_id !== 'RL05') return;

    const dpp = Number(data?.nominal_dpp || 0);

    if (field === 'ppn') {
      const persen = Number(value || 0);
      const nominalPpn = Math.round((dpp * persen) / 100);

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
        ? Math.round((nominalPpn / dpp) * 100)
        : 0;

      setData({
        ...data,
        nominal_ppn: nominalPpn,
        ppn: persen,
        // total_dibayarkan: data?.tipe_ppn === 'include' ? (nominalPpn + Number(data?.nominal_dpp)) : data?.nominal_dpp
      })
    }
  };

  useEffect(() => {
    if (data?.tipe_ppn !== undefined && data?.nominal_ppn !== undefined && data?.nominal_pph !== undefined && data?.nominal_dpp !== undefined && data?.jenis_pajak_id !== undefined && data?.bruto !== undefined) {
      setData({
        ...data,
        nominal_pph: Math.round(data?.bruto * data?.pph / 100),
        nominal_ppn: Math.round(data?.nominal_dpp * data?.ppn / 100),
        total_dibayarkan: data?.tipe_ppn === 'include' ? (Number(data?.nominal_ppn) + Number(data?.nominal_dpp) - Number(data?.nominal_pph)) : (Number(data?.nominal_dpp) - Number(data?.nominal_pph))
      })
    }
  }, [data?.tipe_ppn, data?.nominal_ppn, data?.nominal_pph, data?.nominal_dpp, data?.jenis_pajak_id, data?.pph, data?.bruto])

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
  // =========================
  // DETAIL DATA
  // =========================
  const detailData = [
    {
      label: "No Pengajuan",
      value: data?.no_pengajuan,
      icon: <FaHashtag />,
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      label: "Nama Pemohon",
      value: data?.nama_pemohon,
      icon: <FaUser />,
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      label: "Jabatan",
      value: data?.ur_jabatan_id,
      icon: <FaBriefcase />,
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    {
      label: "Cabang",
      value: data?.ur_cabang_id,
      icon: <FaBuilding />,
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
    {
      label: "Jenis Biaya",
      value: data?.ur_jenis_biaya_id,
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
    // {
    //   label: "Nominal DPP",
    //   value: formatCurrency(data?.nominal_dpp),
    //   icon: <FaMoneyBillWave />,
    //   bg: "bg-emerald-100",
    //   text: "text-emerald-700",
    // },
    {
      label: "Nominal DPP",
      value:
        (loginAccess?.role_id === "RL04" && loginAccess?.jenis_user_id !== '1') ? (
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
        /> : (data?.tipe_ppn === 'exclude' ? 'PPN WAPU' : data?.tipe_ppn === 'include' ? 'PPN Non-WAPU' : '-'),
      icon: <FaPercentage />,
      bg: "bg-rose-100",
      text: "text-rose-700",
    },
    // {
    //   label: "PPN",
    //   value: `${parseFloat(data?.ppn ?? 0)?.toFixed(1)}% (${formatCurrency(data?.nominal_ppn || 0)})`,
    //   icon: <FaPercent />,
    //   bg: "bg-rose-100",
    //   text: "text-rose-700",
    // },
    {
      label: "PPN",
      value: loginAccess?.role_id === 'RL05' && loginAccess?.jenis_user_id === '2' ?
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
      value: loginAccess?.role_id === 'RL05' && loginAccess?.jenis_user_id === '2' ? <CurrencyInput
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
      value: `${parseFloat(data?.pph ?? 0)?.toFixed(1)}% (${formatCurrency(data?.nominal_pph || 0)})`,
      icon: <FaPercent />,
      bg: "bg-red-100",
      text: "text-red-700",
    },
    {
      label: "Nominal Dibayarkan",
      value: formatCurrency(data?.total_dibayarkan || 0) || 0,
      icon: <FaMoneyBillWave />,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    {
      label: "Nomor Kasbon SAP",
      value: data?.no_kasbon_sap || '-',
      icon: <FaReceipt />,
      bg: "bg-red-100",
      text: "text-red-700",
    },
    // UNIT AKUNTANSI KANTOR PUSAT
    ...(loginAccess?.role_id ===
      'RL07'
      ? [
        {
          label: "Nomor Invoice",
          value: data?.no_invoice,
          isInput: true,
          placeholder:
            "Masukkan nomor invoice",
          icon: <FaFileInvoiceDollar />,
          bg: "bg-sky-100",
          text: "text-sky-700",
          card:
            "border-sky-300 bg-sky-50",
          note:
            "Wajib dikoreksi jika ada kesalahan",
        },
      ]
      : [
        {
          label: "Nomor Invoice",
          value: data?.no_invoice || '-',
          icon: <FaFileInvoiceDollar />,
          bg: "bg-sky-100",
          text: "text-sky-700",
        },
      ]),
    // KHUSUS SUB UNIT PAJAK
    ...(loginAccess?.role_id === 'RL05'
      ? [
        {
          label: "Nomor Faktur Pajak",
          value: data?.no_faktur_pajak,
          isInput: true,
          placeholder:
            "Masukkan nomor faktur pajak",
          icon: <FaFilePdf />,
          bg: "bg-red-100",
          text: "text-red-700",
          card:
            "border-red-300 bg-red-50",
          note:
            "Wajib dikoreksi jika ada kesalahan",
        },
        {
          label: "Nama Vendor",
          value: '-',
          isInput: true,
          placeholder:
            "",
          icon: <FaUserAlt />,
          bg: "bg-orange-100",
          text: "text-orange-700",
          card:
            "border-orange-300 bg-orange-50",
          note:
            "Pastikan Vendor sesuai",
        },
        {
          label: "NPWP",
          value: npwp || '-',
          isInput: true,
          placeholder:
            "Masukkan NPWP",
          icon: <FaRegFileAlt />,
          bg: "bg-orange-100",
          text: "text-orange-700",
          card:
            "border-orange-300 bg-orange-50",
          note:
            "Pastikan NPWP sesuai",
        },
      ]
      : [
        {
          label: "Nomor Faktur Pajak",
          value: data?.no_faktur_pajak || '-',
          icon: <FaFilePdf />,
          bg: "bg-red-100",
          text: "text-red-700",
        },
      ]),
  ]

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
        // setTarif(res?.data?.pph)
        setNpwp(res?.data?.npwp_vendor)
        // setNomorFaktur(res?.data.no_faktur_pajak)
        // setNomorInvoice(res?.data?.no_invoice)
        // setNoVoucherSAP(res?.data?.no_voucher_sap)
        // setDpp(res?.data?.nominal_dpp)
        // setPpn(res?.data?.nominal_ppn)
        // setForm({
        //   tipe_ppn: res?.data?.tipe_ppn || null,
        //   vendor_id: res?.data?.vendor_id || null,
        //   ur_vendor_id: res?.data?.ur_vendor_id || null,
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

  useEffect(() => {
    if (toggleModal?.pengajuan_id && toggleModal?.isOpen && toggleModal?.modal === 'modalVerifikasi') {
      getDetailPengajuan()
      const getDataVendor = async () => {
        const dataUser = await storeSchema.actions.getDataVendor()
        if (dataUser?.status === true) {
          const data = dataUser?.data?.map((item) => {
            return {
              label: item?.nama_vendor,
              value: item?.vendor_id,
              data: { npwp: item?.npwp_vendor }
            }
          })
          setOptionsVendor(data)
        }
      }
      getDataVendor()
      setCatatan('')
    }
  }, [toggleModal])

  return (

    <Modal
      title="Verifikasi Pengajuan"
      iconTitle={
        <MdVerified className='text-blue-900 text-3xl' />
      }
      modal={"modalVerifikasi"}
      size={"w-11/12 max-w-6xl"}
      scroll={false}
      buttonFooter={
        <div className="flex justify-end gap-3 flex-wrap">

          {/* TUTUP */}
          <button
            className="
              btn px-5 py-2 rounded-full
              bg-gray-200 hover:bg-gray-300
              text-gray-700 border-none
            "
          >
            Tutup
          </button>

          {/* UNVERIFIED */}
          <button
            onClick={(e) =>
              onSubmit(e, 'UNVERIFIED')
            }
            className="
              btn px-6 py-2 rounded-full
              text-white flex items-center gap-2
              bg-red-500 hover:bg-red-600
              border-none
            "
          >
            <FaTimesCircle />

            Unverified
          </button>

          {/* VERIFIED */}
          <button
            onClick={(e) =>
              onSubmit(e, 'VERIFIED')
            }
            className="
              btn px-6 py-2 rounded-full
              text-white flex items-center gap-2
              bg-blue-900 hover:bg-blue-950
              border-none
            "
          >
            <MdVerified />

            Verified
          </button>

          <button
            onClick={() =>
              onDraft()
            }
            className="
              btn px-6 py-2 rounded-full
              text-white flex items-center gap-2
              bg-yellow-500 hover:bg-yellow-600
              border-none
            "
          >
            <FaSave />

            Draft
          </button>

        </div>
      }
    >

      <div>

        {/* HEADER */}
        <div className="
          bg-gradient-to-r
          from-blue-900
          via-blue-800
          to-indigo-900
          rounded-3xl
          p-6
          text-white
          shadow-xl
        ">

          <div className="
            flex items-center justify-between
          ">

            <div>

              <h1 className="
                text-2xl font-bold tracking-wide
              ">
                Verifikasi Pengajuan
              </h1>

              <p className="
                text-sm text-blue-200 mt-1
              ">
                Pastikan seluruh dokumen dan
                data pengajuan sudah sesuai
                sebelum diverifikasi.
              </p>

            </div>

            <div className="
              w-14 h-14 rounded-2xl
              bg-white/10
              flex items-center justify-center
            ">

              <MdVerified className="
                text-4xl text-blue-100
              " />

            </div>

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

        {/* DETAIL DATA */}
        <div className="
          grid grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-4 mt-5
        ">

          {detailData.map((item, index) => (

            <div
              key={index}
              className={`
                rounded-2xl p-4
                shadow-sm border
                hover:shadow-md transition
                ${item.card ||
                'bg-white border-gray-200'}
              `}
            >

              <div className="
                flex items-start gap-3
              ">

                <div className={`
                  w-11 h-11 rounded-xl
                  flex items-center justify-center
                  ${item.bg}
                `}>

                  <div className={`
                    ${item.text} text-lg
                  `}>
                    {item.icon}
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
                      {item.label}
                    </p>

                    {item.note && (
                      <span className="
                        text-[10px]
                        px-2 py-1 rounded-full
                        bg-red-500 text-white
                        font-semibold
                      ">
                        WAJIB
                      </span>
                    )}

                  </div>

                  {item.isInput ? (
                    <>

                      {/* INPUT NOMOR INVOICE */}
                      {item.label ===
                        "Nomor Invoice" && (
                          <input
                            type="text"
                            value={data?.no_invoice}
                            onChange={(e) =>
                              // setNomorInvoice(
                              //   e.target.value
                              // )
                              setData({
                                ...data,
                                no_invoice: e.target.value
                              })
                            }
                            className="
                              input input-bordered
                              w-full mt-2
                              bg-white rounded-xl
                              border-2 border-sky-200
                              focus:border-sky-400
                            "
                          />
                        )}

                      {/* INPUT FAKTUR */}
                      {item.label ===
                        "Nomor Faktur Pajak" && (
                          <input
                            type="text"
                            value={data?.no_faktur_pajak}
                            onChange={(e) =>
                              // setNomorFaktur(
                              //   e.target.value
                              // )
                              setData({
                                ...data,
                                no_faktur_pajak: e.target.value
                              })
                            }
                            className="
                              input input-bordered
                              w-full mt-2
                              bg-white rounded-xl
                              border-2 border-red-200
                              focus:border-red-400
                            "
                          />
                        )}

                      {/* INPUT NPWP */}
                      {['Nama Vendor'].includes(item.label) && (
                        <Select
                          options={optionsVendor}
                          className="mt-2"
                          value={{ value: data?.vendor_id, label: optionsVendor?.find(a => a.value === data?.vendor_id)?.label }}
                          onChange={(val) =>
                            handleSelect('vendor_id', val)
                          }
                        />
                      )}
                      {['NPWP'].includes(item.label) && (
                        <input
                          type="text"
                          value={npwp}
                          onChange={(e) =>
                            setNpwp(
                              // formatNPWP(
                                e.target.value
                              // )
                            )
                          }
                          className="
                              input input-bordered
                              w-full mt-2
                              bg-white rounded-xl
                              border-2 border-orange-200
                              focus:border-orange-400
                            "
                        />
                      )}

                      <div className="
                        text-[11px]
                        mt-2 font-medium
                        text-red-600
                      ">
                        {item.note}
                      </div>

                    </>
                  ) : (
                    <h3 className="
                      font-semibold text-gray-800
                      text-sm mt-1
                    ">
                      {item.value}
                    </h3>
                  )}

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

        {/* FILE */}
        <div className="mt-5 bg-white rounded-2xl border shadow-sm p-5">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center">
              <FaFileUpload className="text-gray-700 text-lg" />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase">
                Lampiran File
              </p>

              <h3 className="font-semibold text-gray-800">
                Dokumen Pengajuan
              </h3>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-3 overflow-auto pt-3">
            {data?.lampiran && data?.lampiran.length > 0 && data?.lampiran?.map((v, i) => (
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
                      {['pdf'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".").length) - 1)]) && (
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

        {/* ================= PPH ================= */}
        {/* <div className="
          mt-6 bg-white rounded-2xl
          border shadow-sm p-5
        ">

          <div className="
            flex items-center gap-3 mb-5
          ">

            <div className="
              w-11 h-11 rounded-xl
              bg-indigo-100 text-indigo-700
              flex items-center justify-center
            ">
              <FaCalculator />
            </div>

            <div>

              <p className="
                text-xs text-gray-500 uppercase
              ">
                Perhitungan Pajak
              </p>

              <h3 className="
                font-semibold text-gray-800
              ">
                PPh 23
              </h3>

            </div>

          </div>

          <div className="grid gap-4">

            <Row label="Penghasilan Bruto">

              <input
                value={bruto}
                onChange={handleBrutoChange}
                className="
                  input input-bordered
                  rounded-full
                  w-full text-right
                "
              />

            </Row>

            <Row label="Tarif">

              <input
                value={`${tarif}%`}
                disabled
                className="
                  input input-bordered
                  rounded-full
                  w-full bg-gray-100
                  text-right
                "
              />

            </Row>

            <Row label="PPh 23">

              <input
                value={formatNumber(pph23)}
                disabled
                className="
                  input input-bordered
                  rounded-full
                  w-full bg-gray-100
                  text-right font-semibold
                "
              />

            </Row>

            <Row label="Jumlah Dibayarkan">

              <input
                value={formatNumber(
                  dpp + ppn - pph23
                )}
                disabled
                className="
                  input input-bordered
                  rounded-full
                  w-full
                  bg-emerald-50
                  border-emerald-200
                  text-right
                  font-bold
                  text-emerald-700
                "
              />

            </Row>

          </div>

        </div> */}

        {/* KARTU INPUT WAJIB */}
        {((['RL08'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KC') || (['RL07'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KP')) ? (
          <div className="md:col-span-2 my-5">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <FaInfoCircle className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h1 className="font-bold text-blue-900">
                    Informasi Wajib Diisi
                  </h1>

                  <p className="text-sm text-blue-600">
                    Field berikut wajib dilengkapi
                  </p>
                </div>

              </div>

              <div className={`grid grid-cols-1 gap-5`}>
                {(((['RL08'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KC') || (['RL07'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KP')) && data?.jenis_biaya_id !== 'KP12') ? (
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
                ) : (
                  <></>
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
                  {coaRows?.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>
                        <input
                          type='text'
                          name='coa_detail'
                          className='input h-[40px] bg-white rounded-[25px] w-full'
                          value={row?.ur_coa_detail_id}
                          disabled={row?.canEdit ? false : true}
                        />
                      </td>
                      <td>
                        <AsyncSelect
                          name="coa_id"
                          classNamePrefix="react-select"
                          placeholder="Ketik kata kunci"
                          defaultOptions={false}
                          cacheOptions
                          // onMenuOpen={handleDropdownOpen}
                          // onMenuClose={handleDropdownClose}
                          // menuPortalTarget={document.body}
                          isDisabled={row?.canEdit ? false : true}
                          value={row?.coa_id ? { label: row?.ur_coa_id, value: row?.coa_id } : null}
                          // onChange={(selectedOption) => handleChangeCoa(
                          //   { target: { name: 'coa_id', value: selectedOption?.value, label: selectedOption?.label, detail: selectedOption?.detail } },
                          //   index
                          // )}
                          loadOptions={(value, callBack) => {
                            const get = async () => {
                              try {
                                const res = await storeSchema.actions.getListCoa(value.toUpperCase());
                                const data = res?.data?.map((v) => {
                                  return {
                                    label: v?.header_coa,
                                    value: v?.coa_id,
                                    detail: v?.detail
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
                          disabled={row?.canEdit ? false : true}
                        />
                      </td>
                    </tr>
                  ))}

                  {coaRows.length === 0 && (
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
                  // value={data?.nominal_dpp}
                  value={data?.bruto}
                />

              </Row>

              {/* TARIF */}
              <Row label="Tarif">

                <input
                  value={`${data?.pph || 0}%`}
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
                    // data?.nominal_dpp + (form?.tipe_ppn === 'include' ? data?.nominal_ppn : 0) - pph23
                    data?.total_dibayarkan
                  )}
                  disabled
                  className="input input-bordered rounded-full w-full bg-emerald-50 text-right font-bold text-emerald-700 border-emerald-200"
                />

              </Row>

            </div>

          </div>
        )}

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

        {/* CATATAN */}
        <div className="mt-5">

          <label className="
            text-md font-semibold
            text-gray-700
            flex items-center gap-2
          ">

            <FaCommentDots className="
              text-blue-900
            " />

            Catatan Verifikasi

          </label>

          <textarea
            value={catatan}
            onChange={(e) =>
              setCatatan(e.target.value)
            }
            placeholder="
              Tambahkan catatan verifikasi
              jika diperlukan...
            "
            className="
              w-full mt-2 p-4 border
              rounded-2xl outline-none
              focus:ring-2 focus:ring-blue-900
              border-blue-200
              text-sm resize-none
            "
            maxLength={500}
            rows={4}
          />

          <div className="
            flex justify-between
            items-center mt-1
          ">

            <div className="
              text-xs text-gray-400
            ">
              Catatan bersifat opsional
            </div>

            <div className="
              text-xs text-gray-400
            ">
              {catatan?.length}/500
            </div>

          </div>

        </div>

      </div>

    </Modal >

  )
}

/* ================= FILE CARD ================= */
const FileCard = ({
  icon,
  title,
  desc,
  color
}) => (

  <div className="
    border border-gray-200
    rounded-xl p-3
    flex items-center gap-3
    bg-gray-50 hover:bg-blue-100
    transition cursor-pointer
  ">

    <div className={`${color} text-lg`}>
      {icon}
    </div>

    <div>

      <div className="
        font-medium text-sm text-gray-800
      ">
        {title}
      </div>

      <div className="
        text-xs text-gray-500
      ">
        {desc}
      </div>

    </div>

  </div>

)

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

export default ModalVerifikasi