import Swal from "sweetalert2";

// swal helper functions
export const swal = {
  loading: (message = "Loading ...") => {
    Swal.fire({
      title: message,
      background: 'transparent',
      color: 'white',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      }
    })
  },
  success: async (message = "Success") => {
    await Swal.fire({
      title: message,
      type: "success",
      icon: "success",
      customClass: {
        confirmButton:
          "bg-primary text-white px-4 py-2 mx-3 rounded",
      },
      confirmButtonText: "Ok",
      buttonsStyling: false,
    });
  },
  error: (message, head = "Error") => {
    Swal.fire({
      title: head,
      text: message,
      type: "error",
      icon: "error",
      customClass: {
        confirmButton:
          "bg-primary text-white px-4 py-2 mx-3 rounded",
      },
      confirmButtonText: "Ok",
      buttonsStyling: false,
    }).then((res) => {
      if (res.isConfirmed) {
        swal.close()
      }
    });
  },
  warning: async (message) => {
    const result = await Swal.fire({
      title: message ? message : "warning",
      type: "warning",
      icon: "warning",
      customClass: {
        confirmButton:
          "bg-primary text-white px-4 py-2 mx-3 rounded",
      },
      confirmButtonText: "Ok",
      buttonsStyling: false,
    });
    if (result.isConfirmed) {
      return Promise.resolve();
    }
  },
  info: async () => {
    const result = await Swal.fire({
      title: "Apakah anda yakin?",
      type: "info",
      icon: "info",
      customClass: {
        confirmButton:
          "bg-primary text-white px-4 py-2 mx-3 rounded",
      },
      confirmButtonText: "Ok",
      showCancelButton: true,
      buttonsStyling: false,
    });
    if (result.isConfirmed) {
      return Promise.resolve();
    } else if (result.isDismissed) {
      return Promise.reject({ message: "Data batal disimpan" });
    }
  },
  confirmDelete: async () => {
    const result = await Swal.fire({
      title: "Konfirmasi !",
      text: "Yakin Akan Menghapus Data Ini",
      icon: "question",
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: "Batalkan",
      showCancelButton: true,
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white px-4 py-2 mx-3 rounded",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded",
      },
      buttonsStyling: false,
    });

    return result.isConfirmed;
  },
  custom: (title, message, icon, allowOutside = true) => {
    Swal.fire({
      title: title,
      text: message,
      type: icon,
      icon: icon,
      confirmButtonText: "Ok",
      allowOutsideClick: allowOutside,
      customClass: {
        confirmButton: "bg-primary hover:bg-blue-800 text-white px-4 py-2 mx-2 rounded",
        cancelButton: "bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 mx-2 rounded"
      },
      buttonsStyling: false
    }).then((res) => {
      if (res.isConfirmed) {
        swal.close()
      }
    });
  },
  confirm: async (title, message, allowOutside = true) => {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: "question",
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: "Batalkan",
      showCancelButton: true,
      customClass: {
        confirmButton:
          "bg-primary hover:bg-primary text-white px-4 py-2 mx-3 rounded",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded",
      },
      buttonsStyling: false,
    });

    return result.isConfirmed;
  },
  customHtml: (title, html, icon, allowOutside = true) => {
    Swal.fire({
      title: title,
      html: html,
      type: icon,
      icon: icon,
      confirmButtonText: "Ok",
      allowOutsideClick: allowOutside,
      customClass: {
        confirmButton: "bg-primary hover:bg-primary text-white px-4 py-2 mx-2 rounded",
        cancelButton: "bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 mx-2 rounded"
      },
      buttonsStyling: false
    }).then((res) => {
      if (res.isConfirmed) {
        swal.close()
      }
    });
  },
  close: async () => {
    Swal.close();
  },
};
