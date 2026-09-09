import React, { useEffect, useState } from 'react'

import { AsyncSelect, Modal } from 'components/atoms'

import { useDispatch, useSelector } from 'react-redux'

import {
  FaBuilding,
  FaMoneyBillWave,
  FaHistory,
  FaCalendarAlt,
  FaWallet,
  FaReceipt,
  FaChartPie,
  FaTag,
  FaSave,
  FaTags
} from 'react-icons/fa'

import { IoTimeOutline } from 'react-icons/io5'

import { setToggleModal } from '../../../../redux/n2n/global'

import { formatCurrency } from 'global/helper/formatCurrency'
import { formatDateJam } from 'global/helper/formatDate'
import { swal } from 'global/helper/swal'
import storeSchema from 'global/store'

const ModalTransferAnggaran = ({ getListAnggaran }) => {

  const dispatch = useDispatch()
  const { toggleModal, dimensionScreenW, check } = useSelector((state) => state.global)
  const [nominalAnggaran, setNominalAnggaran] = useState('')
  const [keteranganAnggaran, setKeteranganAnggaran] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [dataAnggaran, setDataAnggaran] = useState({})

  // =========================
  // HEADER DATA
  // =========================
  const headerData = {
    cabang: toggleModal?.data?.cabang,
    gl_account: toggleModal?.data?.gl_account,
    account_desc: toggleModal?.data?.detail_coa,
    bulan: toggleModal?.data?.month,
  }

  // =========================
  // DUMMY HISTORY
  // =========================
  const historyAnggaran = Array.from(
    { length: 12 },
    (_, i) => {

      const nominal =
        5000000 + (i * 2500000)

      return {
        id: i + 1,

        tanggal: [
          '01 Januari 2026',
          '10 Januari 2026',
          '22 Januari 2026',
          '05 Februari 2026',
          '15 Februari 2026',
          '28 Februari 2026',
          '10 Maret 2026',
          '18 Maret 2026',
          '02 April 2026',
          '14 April 2026',
          '26 April 2026',
          '05 Mei 2026',
        ][i],

        nominal
      }

    }
  )

  // =========================
  // TOTAL ANGGARAN
  // =========================
  const totalAnggaran =
    historyAnggaran.reduce(
      (acc, item) =>
        acc + item.nominal,
      0
    )

  const handleNominalChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '')
    setNominalAnggaran(rawValue)
  }

  const handleChangeCoa = async (value) => {
    setDataAnggaran(value?.target)
  };

  const handleSave = async () => {
    if (!dataAnggaran) {
      await swal.warning('Gl Account / Account Desc. Wajib Diisi !')
      return
    }
    if (!nominalAnggaran || Number(nominalAnggaran) <= 0) {
      await swal.warning('Nominal anggaran wajib diisi dan harus lebih dari 0')
      return
    }

    setIsSaving(true)
    try {
      swal.loading()

      const payload = {
        anggaran_id: toggleModal?.data?.anggaran_id,
        from_anggaran_id: dataAnggaran?.data?.anggaran_id,
        besar_budget: Number(nominalAnggaran),
        keterangan: keteranganAnggaran
      }
      const res = await storeSchema.actions.addAnggaran(payload)
      if (res?.status === true) {
        const payloadPem = {
          to_anggaran_id: toggleModal?.data?.anggaran_id,
          anggaran_id: dataAnggaran?.data?.anggaran_id,
          nominal: Number(nominalAnggaran),
          keterangan: keteranganAnggaran
        }
        await storeSchema.actions.minusAnggaran(payloadPem)
        await swal.success('Data Berhasil Disimpan!')
        getListAnggaran()
        dispatch(setToggleModal({ isOpen: false, modal: '' }))
        setNominalAnggaran('')
        setKeteranganAnggaran('')
      } else {
        await swal.error('Data Gagal Disimpan!')
      }
    } catch (error) {
      await swal.error(error?.message || 'Gagal menyimpan anggaran')
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    if (toggleModal?.isOpen && toggleModal?.modal === 'modalTransferAnggaran') {
      setDataAnggaran({})
      setNominalAnggaran()
      setKeteranganAnggaran()
    }
  }, [toggleModal])

  return (

    <Modal
      title="Transfer Budget"

      iconTitle={
        <IoTimeOutline className='text-blue-500 text-3xl' />
      }

      modal={"modalTransferAnggaran"}

      size={"w-11/12 max-w-4xl"}

      scroll={false}

      buttonFooter={<>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FaSave />
          {isSaving ? 'Menyimpan...' : 'Submit'}
        </button>
      </>}
    >

      <div>

        {/* ================= HEADER INFORMATION ================= */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

          {/* CABANG */}
          <div
            className="
              bg-white border border-blue-100
              rounded-3xl p-5 shadow-sm
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-blue-100
                  flex items-center justify-center
                "
              >

                <FaBuilding className="text-blue-600 text-2xl" />

              </div>

              <div>

                <div className="text-sm text-gray-500">
                  Cabang
                </div>

                <div className="text-lg font-bold text-gray-700">
                  {headerData.cabang}
                </div>

              </div>

            </div>

          </div>

          {/* JENIS BIAYA */}
          <div
            className="
              bg-white border border-orange-100
              rounded-3xl p-5 shadow-sm
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-orange-100
                  flex items-center justify-center
                "
              >

                <FaReceipt className="text-orange-600 text-2xl" />

              </div>

              <div>

                <div className="text-sm text-gray-500">
                  GL Account
                </div>

                <div className="text-lg font-bold text-gray-700">
                  {headerData.gl_account}
                </div>

              </div>

            </div>

          </div>
          <div
            className="
              bg-white border border-orange-100
              rounded-3xl p-5 shadow-sm
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-green-100
                  flex items-center justify-center
                "
              >

                <FaTag className="text-green-600 text-2xl" />

              </div>

              <div>

                <div className="text-sm text-gray-500">
                  Account Desc.
                </div>

                <div className="text-lg font-bold text-gray-700">
                  {headerData.account_desc}
                </div>

              </div>

            </div>

          </div>
          <div
            className="
              bg-white border border-orange-100
              rounded-3xl p-5 shadow-sm
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-blue-100
                  flex items-center justify-center
                "
              >

                <FaCalendarAlt className="text-blue-600 text-2xl" />

              </div>

              <div>

                <div className="text-sm text-gray-500">
                  Bulan
                </div>

                <div className="text-lg font-bold text-gray-700">
                  {headerData.bulan}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= INPUT NOMINAL ANGGARAN ================= */}
        <div className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                  <FaWallet className="text-xl text-violet-600" />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-700">
                    Nominal Anggaran
                  </div>
                  <div className="text-sm text-slate-500">
                    Isi nominal anggaran untuk akun ini agar data dapat disimpan.
                  </div>
                </div>
              </div>

              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                {formatCurrency(Number(nominalAnggaran || 0))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-600">
                    Gl Account / Account Description
                  </span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaTags />
                    </span>
                    <AsyncSelect
                      name="anggaran_id"
                      classNamePrefix="react-select"
                      placeholder="Ketik kata kunci"
                      defaultOptions={false}
                      cacheOptions
                      // onMenuOpen={handleDropdownOpen}
                      // onMenuClose={handleDropdownClose}
                      // menuPortalTarget={document.body}
                      // isDisabled={row?.canEdit ? false : true}
                      value={dataAnggaran}
                      onChange={(selectedOption) => {
                        console.log(selectedOption, 'coa select');

                        handleChangeCoa(
                          { target: { name: 'anggaran_id', value: selectedOption?.value, label: selectedOption?.label, data: selectedOption?.data } }
                        )
                      }}
                      loadOptions={(value, callBack) => {
                        const get = async () => {
                          try {
                            const res = await storeSchema.actions.getListCoaDetailByCabang(toggleModal?.data?.cabang_id, value.toUpperCase());
                            const data = res?.data?.filter(a => a.anggaran_id !== toggleModal?.data?.anggaran_id)?.map((v) => {
                              return {
                                label: v?.month + ' - ' + v?.gl_account + ' - ' + v?.detail_coa + ' (Sisa Anggaran : ' + formatCurrency(v?.sisa_anggaran) + ')',
                                value: v?.anggaran_id,
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
                          minHeight: '50px',
                          minWidth: '200px',
                          borderRadius: '15px',
                          // backgroundColor: row?.canEdit ? 'white' : '#DFDFDF', // neutral-300
                          // borderColor: '#d1d5db',  input-bordered approximation
                          fontSize: '0.875rem',
                        }),
                      }}
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-600">
                    Nominal
                  </span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaMoneyBillWave />
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={nominalAnggaran}
                      onChange={handleNominalChange}
                      disabled={(!dataAnggaran?.data?.sisa_anggaran || Number(dataAnggaran?.data?.sisa_anggaran) <= 0)}
                      placeholder="Contoh: 15000000"
                      className={`w-full rounded-2xl border border-slate-200 ${(!dataAnggaran?.data?.sisa_anggaran || Number(dataAnggaran?.data?.sisa_anggaran) <= 0) ? 'bg-gray-300' : 'bg-white'} py-3 pl-11 pr-4 text-slate-700 shadow-sm outline-none transition focus:border-blue-400`}
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-600">
                    Keterangan
                  </span>
                  <textarea
                    rows={3}
                    value={keteranganAnggaran}
                    onChange={(e) => setKeteranganAnggaran(e.target.value)}
                    placeholder="Masukkan keterangan tambahan"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-blue-400"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

      </div>

    </Modal>

  )

}

export default ModalTransferAnggaran