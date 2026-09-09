import { formatDate, formatDate2 } from 'global/helper/formatDate';
import React from 'react';
import { FaEye, FaFileExcel, FaFileImage, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { IoDocumentAttachOutline, IoCloudDownloadOutline, IoEyeOutline, IoTrashOutline, IoFileTrayFullOutline } from "react-icons/io5";

const AttachmentList = ({ data }) => {
  // Data Dummy untuk Lampiran
  const attachments = data?.map((v, i) => {
    return {
      id: i,
      nama_dokumen: v?.nama_dokumen,
      created_at: v?.created_at,
      type: v?.url_file?.split(".")[1].toString(),
      url_file: v?.url_file
    }
  })

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return 'text-red-500 bg-red-50';
      case 'excel': return 'text-green-600 bg-green-50';
      case 'image': return 'text-blue-500 bg-blue-50';
      default: return 'text-purple-500 bg-purple-50';
    }
  };

  return (
    <div className="w-full border-2 rounded-[15px] p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <IoDocumentAttachOutline className="text-blue-600 text-xl" />
          LAMPIRAN DOKUMEN
        </h3>
      </div>

      {/* Grid Lampiran */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {attachments && attachments.length > 0 && attachments?.map((v, i) => (
          <div className="flex items-center justify-between border rounded-xl px-3 py-2  hover:bg-gray-100 transition min-w-fit bg-gray-200">

            <div className="flex items-center gap-3 w-full">

              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                {['pdf'].includes(v?.url_file.split(".")[((v?.url_file.split(".").length) - 1)]) && (
                  <FaFilePdf className="text-red-500 text-lg" />
                )}
                {['doc', 'docx', 'rtf'].includes(v?.url_file.split(".")[((v?.url_file.split(".").length) - 1)]) && (
                  <FaFileWord className="text-blue-500 text-lg" />
                )}
                {['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'].includes(v?.url_file.split(".")[((v?.url_file.split(".").length) - 1)]) && (
                  <FaFileImage className="text-blue-500 text-lg" />
                )}
                {['xls', 'xlsx'].includes(v?.url_file.split(".")[((v?.url_file.split(".").length) - 1)]) && (
                  <FaFileExcel className="text-green-500 text-lg" />
                )}
              </div>

              <div className="w-full">
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
        ))}

      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
        <p className="text-[10px] text-gray-400 italic">
          * Pastikan dokumen yang diunggah dalam format PDF atau XLSX dengan ukuran maksimal 5MB per file.
        </p>
      </div>
    </div>
  );
};

export default AttachmentList;