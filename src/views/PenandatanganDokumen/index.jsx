import React, { useEffect, useState } from 'react'
import storeSchema from 'global/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoFilterOutline, IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { swal } from 'global/helper/swal';
import { Modal } from 'components/atoms';
import { setToggleModal } from '../../redux/n2n/global';
import { ReactComponent as ProjectID } from 'assets/icons/rdProjectId.svg';
import { ReactComponent as ProjectName } from 'assets/icons/rdProjectName.svg';
import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
import { formatCurrency } from 'global/helper/formatCurrency';
import { Label, Select } from 'components/atoms'
import { FaPlusCircle, FaUsersCog, FaWallet } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import TableManajemenAnggaran from './components/TableManajemenAnggaran';
import ModalUpload from './components/Modal/ModalUpload';
import { getCookies } from 'global/helper/cookie';
import ModalRiwayatAnggaran from './components/Modal/ModalRiwayatAnggaran';
import { Signature } from 'lucide-react';

const PenandatanganDokumen = () => {
  const [loginAccess, setLoginAccess] = useState()
  useEffect(() => {
    const get = async () => {
      setLoginAccess(getCookies('accountAccess'))
    }
    get()
  }, [])
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { toggleModal, dimensionScreenW, check } = useSelector((state) => state.global)

  const headerTableModal = ["No", "Role", "Kualifikasi", "Qty", "UoM", "Qty", "UoM"];

  const [tableDataModal, setTableDataModal] = useState([]);
  const [dataTable, setDataTable] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");

  const getListTable = async (keyword) => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getListProject({
        page: 1,
        limit: 10,
        order: sortBy === 'Latest' ? 'DESC' : 'ASC',
        keyword,
        project_type_id: 1,
      });
      if (res.message === 'Success') {
        setDataTable(res.data);
      } else {
        setDataTable([]);
      };
      setTimeout(() => {
        swal.close();
      }, 1000);
    } catch (error) {
      console.error(error);
    };
  };

  // const handleSearch = e => setKeyword(e.target.value);
  const handleSearch = (e) => {
    e.preventDefault();
    getListTable(keyword)
  };

  // useEffect(() => {
  //   if (keyword !== null) {
  //     const getData = setTimeout(() => {
  //       getListTable(keyword);
  //     }, 1000);

  //     return () => clearTimeout(getData)
  //   }
  //   // eslint-disable-next-line
  // }, [keyword]);

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "modalUpload" }));
  };

  return (
    <>
      <ModalUpload />
      <ModalRiwayatAnggaran />
      <div className='bg-white px-6 pt-10 h-full  '>
        <div className='flex lg:flex-row flex-col gap-5'>
          <div className='flex gap-3 w-full items-center'>
            <div className='rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 p-1 w-12 h-12 flex items-center justify-center'>
              <Signature className='text-3xl text-white' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xl font-bold text-blue-900'>Penandatangan Dokumen</div>
              <div className='text-sm font-light'>
                Lihat Data Penandatangan Disini.
              </div>
            </div>
          </div>
          <div className='flex sm:w-full justify-end'>
            {/* <button className='btn btn-ghost rounded-[25px] border-[#ccc] mr-4 px-5'
                                          onClick={downloadReportExcel}
                                          disabled={!hasPermission("EXPORT")}
                                        >Download Report</button> */}
            {
              // (['4416', '8002', '5099', '8003'].includes(accountAccess?.kode) === false) && (
              // (hasPermission("CREATE")) && (
              <button className='btn bg-blue-900 text-white rounded-[25px] px-5 hover:scale-105' onClick={() => navigation('/add-penandatangan-dokumen', { state: { ...location.state, project: 'Add Penandatangan Dokumen' } })}><FaPlusCircle className='' /> Tambah Penandatangan</button>
              // )
            }
          </div>
          {['Super Admin'].includes(loginAccess) && (
            <div className='flex sm:w-full justify-end gap-3'>
              {
                // (['4416', '8002', '5099', '8003'].includes(accountAccess?.kode) === false) && (
                // (hasPermission("CREATE")) && (
                <button className='btn bg-blue-900 text-white rounded-[25px] px-5 hover:scale-105' onClick={() => navigation('/add-penandatangan-dokumen', { state: { ...location.state, project: 'Add Anggaran' } })}><FaPlusCircle className='' /> Tambah Data</button>
                // )
              }
            </div>
          )}
        </div>
        <hr className='border-t-2 my-6' />
        {/* TABLE */}
        <div className='flex flex-col gap-5'>
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

            <div className='flex flex-col gap-5  lg:justify-end  sm:w-full sm:flex-row sm:items-center'>
              <div className='flex gap-3 justify-between'>
                <div className='btn btn-sm rounded-[25px]'>
                  <IoFilterOutline /> Filter
                </div>
                <div className='flex items-center'>
                  <span className='mr-2 text-sm font-light'>Sort by: </span>
                  <div className={`dropdown dropdown-hover dropdown-end z-20 ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
                    <div tabIndex={0} role="button" className="btn btn-sm rounded-[25px] bg-white">{sortBy} <IoIosArrowDown /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-28">
                      <li onClick={() => setSortBy('Latest')}><div>Latest</div></li>
                      <li onClick={() => setSortBy('Oldest')}><div>Oldest</div></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
            <TableManajemenAnggaran navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy}
              dimensionScreenW={dimensionScreenW} check={check} loginAccess={loginAccess} dispatch={dispatch} setToggleModal={setToggleModal} toggleModal={toggleModal} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PenandatanganDokumen