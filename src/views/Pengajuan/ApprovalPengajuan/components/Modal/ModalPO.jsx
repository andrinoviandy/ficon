import React, { useState } from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal, ModalPO as Modall } from 'components/atoms'
import { useSelector } from 'react-redux';
import { IoCalendarOutline, IoFileTrayFullOutline, IoPersonOutline, IoReceiptOutline, IoDocumentsOutline, IoSearch } from 'react-icons/io5';
import { formatCurrency } from 'global/helper/formatCurrency';
import { AiOutlineDollar } from 'react-icons/ai';
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { RiCoinsLine } from "react-icons/ri";
import { GrNotes, GrTask } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import format from 'date-fns/format';
import { formatDate } from 'global/helper/formatDate';
import ReactPaginate from 'react-paginate';
import { swal } from 'global/helper/swal';

const ModalPO = ({ dataPO, handleSelectPO, setDataPO, keyword, setKeyword, perPage, setPerPage, totalPage, setTotalPage, currentPage, setCurrentPage, getDataPO }) => {
  const headerTable = ["Nomor PO", "Nomor PR", "Nama Pekerjaan"];

  const handleSearch = async (e) => {
    e.preventDefault();
    swal.loading()
    try {
      const result = await getDataPO()
      if (result?.status) {
        swal.close()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ChangePerPage = (e) => {
    setCurrentPage(0);
    setPerPage(e.target.value);
  };

  const changePage = async (e) => {
    const newPage = e.selected;
    setCurrentPage(newPage);
  };

  return (
    <Modall
      title="Select PO Number Nih"
      modal={"modalPO"}
      // size={"w-11/12 max-w-2xl"}
      size={"w-11/12 max-w-4xl"}
      buttonFooter={null}
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row justify-between items-center gap-2 mb-2'>
          <div className='text-sm text-red-500'>
            * Klik Pada Row/Baris Tabel Untuk Memilih Nomor PO yang ingin digunakan
          </div>
          <div>
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
        </div>
        <div className='overflow-x-auto rounded-box border border-base-content/5 shadow-md'>
          <table className='table'>
            <thead className='bg-base-100'>
              <tr>
                {headerTable?.map((header, i) => {
                  return (
                    <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                      {header}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {dataPO?.length > 0 ? dataPO?.map((v, i) => {
                return (
                  <>
                    <tr key={i} className="hover:bg-sky-200 cursor-pointer" onClick={() => handleSelectPO(i)}>
                      <td>{v.nomor_po || '-'}</td>
                      <td>{v.nomor_pr || '-'}</td>
                      <td>{v.nama_pekerjaan || '-'}</td>
                    </tr>
                  </>
                )
              }) : (
                <tr>
                  <td colSpan={headerTable?.length}>
                    <div className='flex justify-center items-center'>
                      No Data to Display
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center items-center mt-2 mb-6 gap-4'>
          <div className="pagination">
            <ReactPaginate
              breakLabel={"..."}
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={totalPage}
              onPageChange={changePage}
              forcePage={currentPage}
              className={"flex gap-1 items-center"}
              activeClassName={'active-pagination'}
              containerClassName="flex gap-2 justify-center mt-4"
              pageClassName="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:bg-gray-200"
              pageLinkClassName="w-full h-full flex items-center justify-center"
              previousLinkClassName={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white shadow hover:bg-gray-200 `}
              nextLinkClassName="flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white shadow hover:bg-gray-200"
              disabledLinkClassName="disabled"
              disabledClassName="disabled"
            />
          </div>
          <div className="perpage flex items-center gap-2 text-xs">
            <select className="select select-bordered select-sm w-full max-w-[100px]" onChange={ChangePerPage}>
              <option value="5" selected={perPage === 5 ? true : false}>5/Page</option>
              <option value="10" selected={perPage === 10 ? true : false}>10/Page</option>
              <option value="25" selected={perPage === 25 ? true : false}>25/Page</option>
            </select>
          </div>
        </div>
      </div>
    </Modall>
  )
}

export default ModalPO