import { formatCurrency } from 'global/helper/formatCurrency';
import { formatDate, formatDate2 } from 'global/helper/formatDate';
import React from 'react';
import { FaBalanceScale, FaEye, FaFileExcel, FaFileImage, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { IoDocumentAttachOutline, IoCloudDownloadOutline, IoEyeOutline, IoTrashOutline, IoFileTrayFullOutline } from "react-icons/io5";

const CoaList = ({ data }) => {

  return (
    <div className="w-full border-2 rounded-[15px] p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <FaBalanceScale className="text-blue-600 text-xl" />
          Deskripsi Coa Pengajuan
        </h3>
      </div>

      <div className={`overflow-x-auto transition`}>
        <table className="table table-row-bordered table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>No</th>
              <th>COA Header</th>
              <th>GL Account</th>
              <th>COA Detail</th>
              <th>Nominal</th>
            </tr>
          </thead>

          <tbody className='text-xs'>
            {data?.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {row?.ur_coa_id}
                </td>
                <td>
                  {row?.gl_account}
                </td>
                <td>
                  {row?.ur_coa_detail_id}
                </td>
                <td>
                  {formatCurrency(row?.nominal)}
                </td>
              </tr>
            ))}

            {data.length === 0 && (
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
  );
};

export default CoaList;