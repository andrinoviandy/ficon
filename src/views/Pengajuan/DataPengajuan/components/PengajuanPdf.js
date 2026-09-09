import React from "react";

const PengajuanPdf = React.forwardRef((props, ref) => {
  const { data } = props;

  return (
    <div
      ref={ref}
      style={{
        width: "794px",
        background: "#fff",
        color: "#000",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1>Dokumen Pengajuan</h1>

      <p>
        Ringkasan Data Pengajuan dan Detail Transaksi
      </p>

      <hr />

      <table
        style={{
          width: "100%",
          marginTop: 20
        }}
      >
        <tbody>
          <tr>
            <td width="200">
              <b>No Pengajuan</b>
            </td>
            <td>
              : {data?.no_pengajuan}
            </td>
          </tr>

          <tr>
            <td>
              <b>Pemohon</b>
            </td>
            <td>
              : {data?.nama_pemohon}
            </td>
          </tr>

          <tr>
            <td>
              <b>Jenis Biaya</b>
            </td>
            <td>
              : {data?.jenis_biaya}
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #000"
              }}
            >
              No
            </th>

            <th
              style={{
                border: "1px solid #000"
              }}
            >
              Deskripsi
            </th>

            <th
              style={{
                border: "1px solid #000"
              }}
            >
              Nominal
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.detail?.map((item, idx) => (
            <tr key={idx}>
              <td
                style={{
                  border: "1px solid #000",
                  textAlign: "center"
                }}
              >
                {idx + 1}
              </td>

              <td
                style={{
                  border: "1px solid #000"
                }}
              >
                {item.deskripsi}
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  textAlign: "right"
                }}
              >
                {item.nominal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PengajuanPdf;