import React, { useState, useEffect } from 'react'

import {
  FaArrowLeft,
  FaUserAlt,
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
  FaSave,
  FaCommentDots,
  FaListAlt,
  FaTag,
  FaPercent,
  FaPaperclip,
  FaFileAlt,
  FaTrash,
  FaFileInvoiceDollar,
  FaReceipt,
  FaHistory,
  FaFilePdf,
  FaDownload,
  FaFileWord,
  FaFileImage,
  FaFileExcel,
  FaTimesCircle,
  FaUserTie,
  FaCalendarAlt,
  FaRoute,
  FaPlus
} from 'react-icons/fa'

import { HiOutlineTicket } from 'react-icons/hi'

import { useLocation, useNavigate } from 'react-router-dom'

import { AsyncSelect, Label, Select } from 'components/atoms'

import { swal } from 'global/helper/swal'
import storeSchema from 'global/store'
import CurrencyInput from 'components/atoms/CurrencyInput'
import { decodeData } from 'global/helper/jwt'
import { getCookies } from 'global/helper/cookie'
import { FaBuildingCircleArrowRight, FaHashtag, FaTableList } from 'react-icons/fa6'
import { formatCurrency } from 'global/helper/formatCurrency'

const AddEditPengajuan = () => {

  const navigation = useNavigate()
  const location = useLocation()
  const [files, setFiles] = useState([])
  const isEditPengajuan = location?.state?.project === 'Edit Pengajuan'
  const [data, setData] = useState({})
  const [dataDokumen, setDataDokumen] = useState([])
  const [flowApproval, setFlowApproval] = useState([])
  const [loginAccess, setLoginAccess] = useState()
  const dummyCoa = {
    pengajuan_coa_id: null,
    coa_detail_id: '',
    ur_coa_detail_id: '',
    coa_id: '',
    ur_coa_id: '',
    nominal: '',
    anggaran_id: '',
    canEdit: true
  }
  const [coaRows, setCoaRows] = useState([]);
  const [paddingBottom, setPaddingBottom] = useState('')
  const [total, setTotal] = useState(0)
  const memoPattern = /^\d+\/[A-Z0-9]+\/\d{1,2}\/(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)\/\d{4}$/

  const isMemoFormatValid = (value) => memoPattern.test(String(value || '').trim())

  useEffect(() => {
    const get = async () => {
      const decoded = await decodeData(getCookies('accountAccess'))
      setLoginAccess(decoded)
    }
    get()
  }, [])

  const addRow = () => {
    setCoaRows([
      ...coaRows,
      dummyCoa,
    ]);
  };

  const removeRow = async (index) => {
    setCoaRows(coaRows.filter((_, i) => i !== index));
  };

  const handleDropdownOpen = () => {
    setPaddingBottom(`h-[250px]`)
  }

  const handleDropdownClose = () => {
    setPaddingBottom('')
  }

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
        cabang_id: loginAccess?.cabang_id
      });
      if (res?.status === true) {
        swal.close()
        if (res?.data && res?.data !== null) {
          values[i].sisa_anggaran = res?.data?.sisa_anggaran;
          values[i].anggaran_id = res?.data?.anggaran_id;
        } else {
          // values[i].sisa_anggaran = 0;
          await swal.custom('Anggaran Belum Tersedia !', 'Anggaran Pada Bulan Ini Belum Tersedia Pada Cabang Anda ! Silakan Hubungi Unit Anggaran !', 'warning')
          return
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
    if (Number(value) > Number(values[index]?.sisa_anggaran) && ['53a60ead-b029-45ce-84eb-112ab30449e5', '241072b4-60e4-4114-a1fe-21a62e325424']?.includes(values[index]?.coa_detail_id)) {
      swal.custom('Mohon Maaf !', 'Nominal Yang Diisi Tidak Dapat Melebihi Sisa Anggaran', 'warning')
      values[index][name] = '';
      setCoaRows(values);
    } else {
      values[index][name] = value;
      setCoaRows(values);
    }
  };

  const getDetailPengajuan = async () => {
    try {
      const res = await storeSchema.actions.getDetailPengajuan(location?.state?.data?.pengajuan_id)
      if (res?.status === true) {
        setData(res?.data)
        setDataDokumen(res?.data?.lampiran)
        if (res?.data?.jenis_biaya_id === 'KP11' && location?.state?.data?.child_id && res?.data?.coa?.length === 0) {
          const resChild = await storeSchema.actions.getDetailPengajuan(location?.state?.data?.child_id)
          if (resChild?.status === true) {
            setCoaRows(resChild?.data?.coa)
          }
        } else {
          setCoaRows(res?.data?.coa)
        }
        const resApproval = await storeSchema.actions.getDataMasterApproval({
          jenis_biaya_id: res?.data?.jenis_biaya_id,
          // unit_kerja_pemohon_id: loginAccess?.unit_kerja_id,
          jabatan_pemohon_id: loginAccess?.cabang_id !== '2000' ? loginAccess?.jabatan_id : data?.jabatan_id
        })
        if (resApproval?.status === true) {
          setFlowApproval(resApproval?.data?.detail_data)
        }
      } else {
        swal.error(res?.message || 'Gagal mendapatkan data pengajuan')
      }
    } catch (error) {
      swal.error('Terjadi kesalahan saat mendapatkan data pengajuan')
      console.error('Error fetching detail pengajuan:', error)
    }
  }

  useEffect(() => {
    if (isEditPengajuan) {
      getDetailPengajuan()
    }
    // eslint-disable-next-line
  }, [isEditPengajuan])

  useEffect(() => {
    if (!data?.kd_status) return;
    if (data && !['T', 'S2'].includes(data?.kd_status) && isEditPengajuan) {
      const checkData = async () => {
        await swal.custom('Akses Tidak Diijinkan', 'Karena Data Pengajuan Masih Dalam Proses Approval !', 'warning')
        navigation("/data-pengajuan", {
          state: {
            ...location.state,
          },
        })
      }
      checkData()
    }
  }, [data?.kd_status])

  // =========================
  // OPTIONS
  // =========================
  const [options, setOptions] = useState({
    jabatan: [],
    cabang: [],
    jenisBiaya: [],
    tipePPN: [
      {
        value: 'exclude',
        label: 'PPN WAPU'
      },
      {
        value: 'include',
        label: 'PPN Non-WAPU'
      }
    ],
    statusPKP: [
      {
        value: 'Y',
        label: 'PKP'
      },
      {
        value: 'T',
        label: 'Non PKP'
      }
    ],
    pemohon: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'no_memo') {
      setData({
        ...data,
        [name]: value.toUpperCase()
      })
    } else if (name === 'ppn') {
      setData({
        ...data,
        [name]: value,
        nominal_ppn: Math.round(
          Number(value) / 100 * Number(data.nominal_dpp)
        )
      })
    } else {
      setData({
        ...data,
        [name]: value
      })
    }

  }

  // useEffect(() => {
  //   if (data?.nominal_dpp && data?.ppn) {
  //     setData({
  //       ...data,
  //       nominal_ppn: Math.round(
  //         Number(data.ppn) / 100 * Number(data.nominal_dpp)
  //       )
  //     })
  //   }
  // }, [data.nominal_dpp, data.ppn])

  const handleChangeCurrency = (value, name) => {
    const values = { ...data };
    if (name === 'nominal_ppn' && data?.nominal_dpp) {
      // values['ppn'] = value / data?.nominal_dpp * 100
      values['ppn'] = Math.round(
        Number(value) / Number(data?.nominal_dpp) * 100
      )
    }
    values[name] = value;
    setData(values);
  };

  const handleSelect = async (name, e) => {
    if (name === 'pemohon_id') {
      setData({
        ...data,
        [name]: e.value,
        ['ur_' + name]: e.label,
        jabatan_id: e?.data?.jabatan_id,
        ur_jabatan_id: e?.data?.ur_jabatan_id,
        cabang_id: e?.data?.cabang_id,
        ur_cabang_id: e?.data?.ur_cabang_id,
      })
    } else if (name === 'vendor_id') {
      setData({
        ...data,
        [name]: e?.value,
        ['ur_' + name]: e.label,
        ['npwp_vendor']: e?.data?.npwp,
      })
    } else if (name === 'jenis_biaya_id') {
      setData({
        ...data,
        [name]: e.value,
        ['ur_' + name]: e.label,
      })
    } else {
      setData({
        ...data,
        [name]: e.value,
        ['ur_' + name]: e.label,
      })
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

  const handleDeleteFile = async (pengajuan_id) => {
    try {
      const confirm = await swal.confirmDelete();
      if (confirm === true) {
        const res = await storeSchema.actions.deleteDokumen(pengajuan_id);
        if (res?.status === true) {
          const resData = await storeSchema.actions.getDetailPengajuan(location?.state?.data?.pengajuan_id)
          if (resData?.status === true) {
            setDataDokumen(resData?.data?.lampiran)
          }
          swal.success('Dokumen Berhasil Dihapus')
        } else {
          swal.error('Dokumen Gagal Dihapus')
        }
      }
    } catch (error) {
      swal.error(error.message)
    }
  }

  const handleSave = async () => {
    swal.loading()
    try {
      const formData = new FormData();
      const { lampiran, flag_aktif, parent_id, created_by, created_at, updated_by, updated_at, ...result } = data;
      // if (['KC01', 'KC04'].includes(data?.jenis_biaya_id) && Number(data?.nominal_dpp) > 650000000) {
      //   return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Melebihi Sisa Anggaran', 'warning')
      // }
      // if (['KC02', 'KC05'].includes(data?.jenis_biaya_id) && Number(data?.nominal_dpp) > 87500000) {
      //   return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Melebihi Sisa Anggaran', 'warning')
      // }
      if (Number(data?.nominal_dpp) > 20000000 && data?.jenis_biaya_id === 'KC06') {
        return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Melebihi 20 Juta', 'warning')
      }
      if (Number(data?.nominal_dpp) < 20000000 && data?.jenis_biaya_id === 'KC03') {
        return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Kurang Dari 20 Juta', 'warning')
      }
      if (Number(data?.nominal_dpp) > 20000000 && data?.jenis_biaya_id === 'KC05') {
        return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Melebihi 20 Juta', 'warning')
      }
      if (Number(data?.nominal_dpp) < 20000000 && data?.jenis_biaya_id === 'KC02') {
        return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Kurang Dari 20 Juta', 'warning')
      }
      // if (Number(data?.nominal_dpp) > 500000000 && data?.jenis_biaya_id === 'KC04') {
      //   return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Melebihi 500 Juta', 'warning')
      // }
      // if (Number(data?.nominal_dpp) < 500000000 && data?.jenis_biaya_id === 'KC01') {
      //   return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Kurang Dari 500 Juta', 'warning')
      // }
      // if (Number(data?.nominal_dpp) > 500000000 && data?.jenis_biaya_id === 'KP09') {
      //   return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Melebihi 500 Juta', 'warning')
      // }
      // if (Number(data?.nominal_dpp) < 500000000 && data?.jenis_biaya_id === 'KP10') {
      //   return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Kurang Dari 500 Juta', 'warning')
      // }
      if (Number(data?.nominal_dpp) > 5000000 && data?.jenis_biaya_id === 'KP05') {
        return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Melebihi 5 Juta', 'warning')
      }
      if ((Number(data?.nominal_dpp) < 5000000 || Number(data?.nominal_dpp) > 50000000) && data?.jenis_biaya_id === 'KP06') {
        return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Kurang Dari 5 Juta dan Lebih Dari 50 Juta', 'warning')
      }
      if (Number(data?.nominal_dpp) < 50000000 && data?.jenis_biaya_id === 'KP07') {
        return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal DPP Tidak Boleh Kurang Dari 50 Juta', 'warning')
      }

      if (data?.no_memo) {
        const memoValue = String(data?.no_memo || '').trim()
        if (!memoValue && ['KC03', 'KC06', 'KC08', 'KC09'].includes(data?.jenis_biaya_id)) {
          return swal.custom('Tidak Dapat Dilanjutkan !', 'Nomor Memo Wajib Diisi', 'warning')
        }
        if (!isMemoFormatValid(memoValue) && ['KC03', 'KC06', 'KC08', 'KC09'].includes(data?.jenis_biaya_id)) {
          return swal.custom('Format Nomor Memo Salah', 'Contoh format yang benar: 001/LG002/27/VI/2026', 'warning')
        }
      }

      if (coaRows?.length === 0 && data?.jenis_biaya_id !== 'KP12') {
        return swal.custom('Tidak Dapat Dilanjutkan !', 'Account Mapping Wajib Diisi', 'warning')
      }
      if (data?.jenis_biaya_id !== 'KP12' && coaRows?.length > 0) {
        if ((coaRows?.filter(a => !a.nominal || a.nominal === '')?.length > 0) || (coaRows?.filter(a => !a.coa_detail_id || a.coa_detail_id === '')?.length > 0)) {
          return swal.custom('Tidak Dapat Dilanjutkan !', 'Nominal dan Coa Detail Pada Account Mapping Tidak Boleh Kosong', 'warning')
        }
      }
      const resultFix = { ...result, ...(data?.jenis_biaya_id !== 'KP12' ? { coa: coaRows.filter(a => a.coa_detail_id) } : { coa: [] }) }
      formData.append("payload", JSON.stringify(resultFix));
      files.forEach(file => {
        formData.append("lampiran", file);
      });

      const res = isEditPengajuan ? await storeSchema.actions.updatePengajuan(formData) : await storeSchema.actions.insertPengajuan(formData);
      if (res?.status === true) {
        await swal.custom('Data Berhasil Disimpan !', `Nomor Pengajuan Anda : ${isEditPengajuan ? data?.no_pengajuan : res?.data?.d_pengajuan?.pengajuan?.no_pengajuan}`, 'success')
        navigation("/data-pengajuan", {
          state: {
            ...location.state,
          },
        })

      } else {
        await swal.custom('Data Gagal Disimpan !', res?.data?.message, 'warning');
      };

    } catch (error) {
      swal.error(error.message)
    }
  }

  useEffect(() => {
    if (coaRows.length > 0) {
      const totall = coaRows.reduce((acc, item) => { return acc + Number(item?.nominal) }, 0)
      setTotal(totall)
      handleChangeCurrency(totall, 'nominal_dpp')
    }
  }, [coaRows])

  useEffect(() => {
    if (data?.pemohon_id && data?.jenis_biaya_id) {
      const getMasterApproval = async () => {
        const payload = {
          jenis_biaya_id: data?.jenis_biaya_id,
          // unit_kerja_pemohon_id: loginAccess?.unit_kerja_id,
          jabatan_pemohon_id: loginAccess?.cabang_id !== '2000' ? loginAccess?.jabatan_id : data?.jabatan_id
        }
        const res = await storeSchema.actions.getDataMasterApproval(payload)
        if (res?.status === true) {
          setFlowApproval(res?.data?.detail_data)
        }
      }
      getMasterApproval()
    }
  }, [data?.pemohon_id, data?.jenis_biaya_id])

  const renderFlow = (data) => (
    <div className="overflow-x-auto pb-3">
      <div className="flex items-center min-w-max px-2">

        {data.map((step, index) => (
          <React.Fragment key={step.flow_id}>

            <div className="flex flex-col items-center text-center min-w-[170px]">

              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-slate-200`}
              >
                <span>{index + 1}</span>
                <FaBuildingCircleArrowRight className='text-2xl' />
              </div>

              <p className="mt-2 font-semibold text-sm">
                {step.ur_role_id}
              </p>

              <p className="text-xs text-gray-500 px-2">
                {step.kegiatan}
              </p>

            </div>

            {index !== data.length - 1 && (
              <div className="flex-1 mx-2 flex items-center min-w-[80px]">
                <div className="w-full min-h-[3px] rounded bg-gray-300" />
              </div>
            )}

          </React.Fragment>
        ))}

      </div>
    </div>
  );

  useEffect(() => {
    const getReferensi = async () => {
      const refJabatan = await storeSchema.actions.getReferensiByJenis('jabatan_id')
      if (refJabatan?.status === true) {
        const data = refJabatan?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, jabatan: data }))
      }
      const refCabang = await storeSchema.actions.getReferensiByJenis('cabang_id')
      if (refCabang?.status === true) {
        const data = refCabang?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, cabang: data }))
      }
    }
    getReferensi()
    const getDataUser = async () => {
      const dataUser = await storeSchema.actions.getDataUser('1')
      if (dataUser?.status === true) {
        const data = dataUser?.data?.map((item) => {
          return {
            label: item?.nip + ' - ' + item?.nama,
            value: item?.user_id,
            data: item
          }
        })
        setOptions(prev => ({ ...prev, pemohon: data }))
      }
    }
    getDataUser()
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
        setOptions(prev => ({ ...prev, vendor: data }))
      }
    }
    getDataVendor()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (loginAccess?.cabang_id) {
      const get = async () => {
        const jnsSub = (Number(loginAccess?.cabang_id) === 2000 ? 'KP' : 'KC')
        const refJenisBiaya = await storeSchema.actions.getSubReferensiByJenis('jenis_biaya_id', loginAccess?.role_id === 'RL00' ? '' : jnsSub)
        if (refJenisBiaya?.status === true) {
          const data = refJenisBiaya?.data?.filter(a => a.kd_ref !== 'KP11')?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
            }
          })
          setOptions(prev => ({ ...prev, jenisBiaya: data }))
        }
      }
      get()
    }
  }, [loginAccess?.cabang_id])

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

            {
              isEditPengajuan
                ? data?.kd_status === 'T' ? 'Perbaikan Pengajuan Biaya' : 'Edit Pengajuan Biaya'
                : 'Form Pengajuan Biaya'
            }

          </div>

          <div className="text-sm font-light text-gray-500">

            Lengkapi data anda dengan benar.

          </div>

        </div>

      </div>

      {data?.kd_status === 'T' && (
        <div
          className="
        bg-red-50
        border-l-4
        border-red-500
        rounded-xl
        p-5
        mb-6
        shadow-sm
      "
        >

          <div className="flex items-center gap-3 mb-4">

            <FaTimesCircle className="text-red-600 text-2xl" />

            <div>
              <h5 className="font-semibold text-red-700">
                Pengajuan Ditolak
              </h5>

              <p className="text-sm text-red-500">
                Pengajuan memerlukan perbaikan sebelum diajukan kembali.
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
                {data?.ur_role_id}
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
                {data?.date_status || '-'}
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
              {data?.notes || ''}
            </p>

          </div>

        </div>
      )}
      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NOMOR */}
          <div>

            <Label
              icon={<FaTag className="text-blue-500" />}
              label="Nomor Pengajuan"

              children={
                <input
                  value={isEditPengajuan ? data?.no_pengajuan : ''}
                  className="
                    input input-bordered
                    bg-white
                    w-full
                    rounded-full
                  "
                  placeholder='Auto Generate'
                  disabled
                />
              }
            />

          </div>

          {/* NAMA */}
          <div>

            <Label
              icon={<FaUserAlt className="text-green-500" />}
              label="Nama"

              children={
                // <input
                //   name="nama_pemohon"
                //   value={data.nama_pemohon}
                //   onChange={handleChange}
                //   className="
                //     input input-bordered
                //     bg-white
                //     w-full
                //     rounded-full
                //   "
                // />
                <Select
                  options={options?.pemohon}
                  value={{ value: data?.pemohon_id, label: data?.ur_pemohon_id }}
                  onChange={(val) =>
                    handleSelect('pemohon_id', val)
                  }
                />
              }
            />

          </div>

          {/* JABATAN */}
          <div>

            <Label
              icon={<FaBriefcase className="text-purple-500" />}
              label="Jabatan"

              children={
                <Select
                  options={options.jabatan}
                  value={{ value: data?.jabatan_id, label: data?.ur_jabatan_id }}
                  onChange={(e) =>
                    handleSelect('jabatan_id', e)
                  }
                  isDisabled={true}
                />
              }
            />

          </div>

          {/* CABANG */}
          <div>

            <Label
              icon={<FaBuilding className="text-orange-500" />}
              label="Profit Center"

              children={
                <Select
                  options={options?.cabang}
                  value={{ value: data?.cabang_id, label: data?.ur_cabang_id }}
                  onChange={(val) =>
                    handleSelect('cabang_id', val)
                  }
                  isDisabled={true}
                />
              }
            />

          </div>

          {/* JENIS BIAYA */}
          <div>

            <Label
              icon={<FaListAlt className="text-cyan-500" />}
              label="Jenis Biaya"
              star={true}
              children={
                <Select
                  options={options.jenisBiaya}
                  value={{ value: data?.jenis_biaya_id, label: data?.ur_jenis_biaya_id }}
                  onChange={(val) =>
                    handleSelect(
                      'jenis_biaya_id',
                      val
                    )
                  }
                />
              }
            />

          </div>

          {data?.jenis_biaya_id && (
            <>
              {/* SISA ANGGARAN */}
              {/* {
                [
                  'KC01',
                  'KC02',
                  'KC05',
                  'KC04'
                ].includes(data?.jenis_biaya_id) && (
                  <div>
                    <Label
                      icon={
                        <FaMoneyBillWave className="text-emerald-500" />
                      }
                      label="Sisa Anggaran"
                      children={
                        <input
                          value={
                            ['KC01', 'KC04'].includes(data?.jenis_biaya_id)
                              ? 'Rp 650.000.000'
                              : 'Rp 550.000.000'
                          }

                          disabled

                          className="
                        input
                        input-bordered
                        bg-gray-100
                        text-emerald-700
                        font-bold
                        w-full
                        rounded-full
                      "
                        />
                      }
                    />

                  </div>

                )
              } */}

              {/* KASBON */}
              {
                ['KP05', 'KP06', 'KP07'].includes(data?.jenis_biaya_id) && (

                  <div>

                    <Label
                      icon={
                        <HiOutlineTicket className="text-green-500" />
                      }

                      label="Nomor Kasbon SAP"

                      children={
                        <input
                          name="no_kasbon_sap"
                          value={data?.no_kasbon_sap}
                          onChange={handleChange}
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

                )
              }

              {/* TIPE PPN */}
              {!['KP05', 'KP06', 'KP07', 'KC07'].includes(data?.jenis_biaya_id) && data?.jenis_biaya_id !== 'KP08' && data?.jenis_biaya_id !== 'KP03' && (
                <div>

                  <Label
                    icon={<FaPercent className="text-pink-500" />}
                    label="Jenis PPN"

                    children={
                      <Select
                        options={options.tipePPN}
                        value={{ value: data?.tipe_ppn, label: data?.ur_tipe_ppn }}
                        onChange={(val) =>
                          handleSelect('tipe_ppn', val)
                        }
                      />
                    }
                  />

                </div>
              )}

              {/* NOMINAL DPP */}
              <div>

                <Label
                  icon={
                    <FaMoneyBillWave className="text-yellow-500" />
                  }

                  label="Nominal DPP"

                  children={
                    <CurrencyInput
                      name='nominal_dpp'
                      size=''
                      onChange={(value, name) => handleChangeCurrency(value, name)}
                      value={data?.nominal_dpp}
                    />
                  }
                />

              </div>

              {/* NOMINAL PPN */}
              {
                data?.tipe_ppn && data?.jenis_biaya_id !== 'KP08' && data?.jenis_biaya_id !== 'KP03' && (
                  <>
                    <div>
                      <Label
                        icon={<FaPercent className="text-yellow-500" />}
                        label="PPN"

                        children={
                          <input
                            name='ppn'
                            type='number'
                            className="
                              input
                              input-bordered
                              bg-white
                              w-full
                              rounded-full
                            "
                            onChange={handleChange}
                            disabled={!data?.nominal_dpp}
                            value={data?.ppn}
                          />
                        }
                      />
                    </div>
                    <div>
                      <Label
                        icon={<FaMoneyBillWave className="text-yellow-500" />}
                        label="Nominal PPN"

                        children={
                          <CurrencyInput
                            name='nominal_ppn'
                            size=''
                            onChange={(value, name) => handleChangeCurrency(value, name)}
                            // disabled={true}
                            disabled={!data?.nominal_dpp}
                            value={data?.nominal_ppn}
                          />
                        }
                      />
                    </div>
                  </>

                )
              }

              {/* NAMA VENDOR */}
              {
                ['include', 'exclude'].includes(data?.tipe_ppn) && data?.jenis_biaya?.value !== 'biaya_listrik' && data?.jenis_biaya?.value !== 'swakelola' && (
                  <>
                    <div>
                      <Label
                        icon={<FaBuilding className="text-indigo-500" />}
                        label="Nama Vendor"
                        children={
                          <Select
                            options={options?.vendor}
                            value={{ value: data?.vendor_id, label: data?.ur_vendor_id }}
                            onChange={(val) =>
                              handleSelect('vendor_id', val)
                            }
                          />
                          // <input
                          //   name="nama_vendor"
                          //   value={data?.nama_vendor}
                          //   onChange={handleChange}
                          //   className="
                          //     input
                          //     input-bordered
                          //     bg-white
                          //     w-full
                          //     rounded-full
                          //   "
                          //   placeholder="Masukkan nama vendor"
                          // />
                        }
                      />
                    </div>
                    <div>
                      <Label
                        icon={<FaTag className="text-blue-500" />}
                        label="NPWP Vendor"
                        children={
                          <input
                            name="npwp_vendor"
                            value={data?.npwp_vendor}
                            disabled
                            className="
                              input
                              input-bordered
                              bg-white
                              w-full
                              rounded-full
                            "
                          />
                        }
                      />
                    </div>
                  </>
                )
              }

              {/* NOMOR INVOICE */}
              {!['KC07'].includes(data?.jenis_biaya_id) && (
                <div>

                  <Label
                    icon={<FaFileInvoiceDollar className="text-sky-500" />}
                    label="Nomor Invoice"

                    children={
                      <input
                        name="no_invoice"
                        value={data?.no_invoice}
                        onChange={handleChange}
                        placeholder="Masukkan nomor invoice"
                        className="
                    input
                    input-bordered
                    bg-white
                    w-full
                    rounded-full
                  "
                      />
                    }
                  />

                </div>
              )}

              {/* STATUS PKP */}
              {!['KP03', 'KP05', 'KP06', 'KP07', 'KP08', 'KC07'].includes(data?.jenis_biaya_id) && (
                <div>

                  <Label
                    icon={<FaBuilding className="text-emerald-500" />}
                    label="Status PKP"

                    children={
                      <Select
                        options={options.statusPKP}
                        value={{ value: data?.status_pkp, label: data?.status_pkp === 'Y' ? 'PKP' : data?.status_pkp === 'T' ? 'Non PKP' : '' }}
                        onChange={(val) =>
                          handleSelect(
                            'status_pkp',
                            val
                          )
                        }
                      />
                    }
                  />

                </div>
              )}

              {/* NOMOR FAKTUR PAJAK */}
              {
                data?.status_pkp === 'Y' && data?.jenis_biaya_id !== 'KP08' && data?.jenis_biaya_id !== 'KP03' && (

                  <div>

                    <Label
                      icon={<FaReceipt className="text-rose-500" />}
                      label="Nomor Faktur Pajak"

                      children={
                        <input
                          name="no_faktur_pajak"
                          value={data?.no_faktur_pajak}
                          onChange={handleChange}
                          placeholder="Masukkan nomor faktur pajak"
                          className="
                        input
                        input-bordered
                        bg-white
                        w-full
                        rounded-full
                      "
                        />
                      }
                    />

                  </div>

                )
              }

              {['KC03', 'KC06', 'KC08', 'KC09'].includes(data?.jenis_biaya_id) && (
                <div>
                  <Label
                    icon={
                      <FaHashtag className="text-blue-500" />
                    }
                    star={true}
                    label="Nomor Memo (Contoh: 001/LG003/27/VII/2026)"
                    children={
                      <input
                        name="no_memo"
                        value={data?.no_memo || ''}
                        onChange={handleChange}
                        placeholder="001/LG002/27/VI/2026"
                        className={`
                        input input-bordered
                        bg-white
                        w-full
                        rounded-full
                        ${data?.no_memo && !isMemoFormatValid(data?.no_memo) ? 'border-red-500' : ''}
                      `}
                      />
                    }
                  />

                </div>
              )}

              {/* NPWP */}
              {/* {
                ['Y', 'T'].includes(data?.status_pkp) && data?.ur_jenis_biaya_id !== 'Biaya Listrik' && data?.ur_jenis_biaya_id !== 'Swakelola' && (

                  <div>

                    <Label
                      icon={<FaTag className="text-blue-500" />}
                      label="NPWP/NIK"

                      children={
                        <input
                          name="npwp_nik"
                          value={data?.npwp_nik}
                          onChange={handleChange}
                          placeholder="Masukkan NPWP atau NIK"
                          className="
                        input
                        input-bordered
                        bg-white
                        w-full
                        rounded-full
                      "
                        />
                      }
                    />

                  </div>

                )
              } */}
            </>
          )}

          {/* KETERANGAN */}
          <div className="md:col-span-2">

            <Label
              icon={<FaCommentDots className="text-blue-500" />}
              label="Keterangan Pengajuan"

              children={
                <textarea
                  name="keterangan"
                  value={data.keterangan}
                  onChange={handleChange}
                  className="
                    textarea
                    bg-white
                    textarea-bordered
                    w-full
                    rounded-2xl
                    h-28
                  "
                />
              }
            />

          </div>

          {/* LAMPIRAN */}
          <div className="md:col-span-2">

            <Label
              icon={<FaPaperclip className="text-rose-500" />}
              label="Lampiran"

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
                    files.length > 0 && (

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
                                      (
                                        file.size /
                                        1024 /
                                        1024
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

                  {
                    isEditPengajuan && dataDokumen?.length > 0 && (
                      <div className="mt-6">

                        <div className="flex items-center gap-2 mb-3">
                          <FaHistory className="text-indigo-500" />
                          <h5 className="font-semibold text-gray-700">
                            Riwayat Lampiran
                          </h5>
                        </div>

                        <div className="space-y-3">

                          {dataDokumen?.map((file) => (

                            <div
                              key={file.dokumen_id}
                              className="
                              bg-white
                              border
                              border-gray-200
                              rounded-xl
                              p-4
                              hover:shadow-md
                              transition-all
                            "
                            >

                              <div className="flex justify-between items-center">

                                <div className="flex items-center gap-3">

                                  <div
                                    className="
                                      w-12 h-12
                                      rounded-full
                                      bg-indigo-100
                                      flex
                                      items-center
                                      justify-center
                                    "
                                  >
                                    {['pdf'].includes(file?.nama_dokumen.split(".")[((file?.nama_dokumen.split(".").length) - 1)]) && (
                                      <FaFilePdf className="text-red-500 text-lg" />
                                    )}
                                    {['doc', 'docx', 'rtf'].includes(file?.nama_dokumen.split(".")[((file?.nama_dokumen.split(".").length) - 1)]) && (
                                      <FaFileWord className="text-blue-500 text-lg" />
                                    )}
                                    {['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'].includes(file?.nama_dokumen.split(".")[((file?.nama_dokumen.split(".").length) - 1)]) && (
                                      <FaFileImage className="text-blue-500 text-lg" />
                                    )}
                                    {['xls', 'xlsx'].includes(file?.nama_dokumen.split(".")[((file?.nama_dokumen.split(".").length) - 1)]) && (
                                      <FaFileExcel className="text-green-500 text-lg" />
                                    )}
                                  </div>

                                  <div>

                                    <div className="font-medium text-sm text-gray-800">
                                      {file.nama_dokumen}
                                    </div>

                                    <div className="flex gap-2 mt-1">

                                      <span
                                        className="
                        px-2 py-1
                        text-xs
                        rounded-full
                        bg-green-100
                        text-green-700
                      "
                                      >
                                        {file.created_at}
                                      </span>

                                      {/* <span className="text-xs text-gray-500">
                                        {(file.file_size / 1024 / 1024).toFixed(2)} MB
                                      </span> */}

                                    </div>

                                  </div>

                                </div>

                                <div className="flex gap-2">

                                  <button
                                    type="button"
                                    onClick={() => window.open(file?.url_file, '_blank')}
                                    className="
                    w-10 h-10
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    hover:bg-blue-200
                    transition flex justify-center items-center
                  "
                                  >
                                    <FaDownload />
                                  </button>

                                  {data?.candelete === 'Y' && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteFile(file?.dokumen_id)}
                                      className="
                                        w-10 h-10
                                        rounded-full
                                        bg-red-100
                                        text-red-600
                                        hover:bg-red-200
                                        transition 
                                        flex 
                                        justify-center 
                                        items-center
                                      "
                                    >
                                      <FaTrash />
                                    </button>
                                  )}

                                </div>

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>
                    )
                  }

                </div>
              }
            />

          </div>

        </div>

        {data?.jenis_biaya_id !== 'KP12' && (
          <div className={`border border-gray-200 rounded-lg mt-5`}>
            <div className="card">
              <div className="card-body">

                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold flex flex-row gap-2 items-center">
                    <FaTableList className='text-blue-500' /> Account Mapping
                    <span className="text-red-500">*</span>
                  </h3>
                  <button
                    type="button"
                    className="btn btn-primary rounded-full btn-sm bg-blue-900 text-white w-32 flex"
                    // disabled={coaRows?.filter(a => a.canEdit === true).length > 0}
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
                        {(loginAccess?.unit_kerja_id === 'UK054' || loginAccess?.cabang_id !== '2000') && (
                          <th>Sisa Anggaran</th>
                        )}
                        {/* <th>Sisa Anggaran</th> */}
                        <th>Nominal</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {coaRows.length > 0 && (
                        <>
                          {coaRows?.map((row, index) => (
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
                              {(loginAccess?.unit_kerja_id === 'UK054' || loginAccess?.cabang_id !== '2000') && (
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
                                  disabled={((row?.canEdit && row?.coa_detail_id && row?.anggaran_id) || (row?.canEdit && row.coa_detail_id && ['53a60ead-b029-45ce-84eb-112ab30449e5', '241072b4-60e4-4114-a1fe-21a62e325424']?.includes(row?.coa_detail_id))) ? false : true}
                                />
                              </td>

                              <td>
                                <div className="flex items-center gap-2">
                                  {row?.canEdit ? (
                                    <>
                                      <button
                                        type="button"
                                        className="btn bg-red-500 btn-sm text-white h-[40px] rounded-full"
                                        onClick={() => removeRow(index)}
                                      >
                                        <FaTrash />
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn bg-red-500 btn-sm text-white h-[40px] rounded-full"
                                      onClick={() => removeRow(index)}
                                    >
                                      <FaTrash />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={4} align='right' className='font-bold'>TOTAL</td>
                            <td>
                              <CurrencyInput
                                name='total'
                                height={"h-[40px]"}
                                value={total}
                                disabled={true}
                              />
                            </td>
                            <td></td>
                          </tr>
                        </>
                      )}

                      {coaRows.length === 0 && (
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
          </div>
        )}

        <div className='border border-gray-200 rounded-lg mt-5 p-5'>
          <div className='font-semibold flex flex-row gap-2 mb-5'>
            <div className='p-3 bg-blue-200 rounded-lg text-blue-900'>
              <FaRoute className='text-xl' />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-blue-900'>
                Flow Approval Pengajuan Anda
              </span>
              <span className='text-xs text-red-500'>
                Pastikan Flow Pengajuan Anda Muncul, Karena Data Tidak Dapat Disimpan Jika Flow Tidak Ada
              </span>
            </div>
          </div>
          {flowApproval?.length > 0 && data?.jenis_biaya_id ? (
            renderFlow(flowApproval)
          ) : !data?.jenis_biaya_id ? (
            <div className='font-semibold w-full text-center p-3 bg-gray-200 rounded-lg'>
              Anda Belum Memilih Jenis Biaya
            </div>
          ) : (
            <div className='font-semibold w-full text-center p-3 bg-gray-200 rounded-lg'>
              Flow Approval Dengan Jabatan Pemohon dan Jenis Biaya Yang Anda Pilih Tidak Memiliki Flow Approval , Agar Hubungi Admin Untuk Memasukan Data Flow Approval Anda
            </div>
          )}
        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            className="
              px-6 py-2 rounded-full
              bg-gray-100 hover:bg-gray-200
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
            disabled={flowApproval?.length > 0 ? false : true}
          >

            <FaSave />

            {
              isEditPengajuan
                ? data?.kd_status === 'T' ? 'Simpan Perbaikan' : 'Simpan Perubahan'
                : 'Simpan'
            }

          </button>

        </div>

      </div>

    </div>
  )
}

export default AddEditPengajuan