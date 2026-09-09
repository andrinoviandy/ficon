export const formatCurrency = (value, dec = 0, useCurrency = true) => {
  if (value === null || value === undefined) {
    return value;
  }
  // Konfigurasi untuk format angka
  const options = {
    maximumFractionDigits: dec,
    minimumFractionDigits: dec,
    ...(useCurrency && { style: 'currency', currency: 'IDR' }) // Sertakan style dan currency hanya jika useCurrency true
  };

  // Menggunakan Intl.NumberFormat dengan opsi yang dinamis
  const formattedValue = new Intl.NumberFormat('id-ID', options).format(value);

  return formattedValue;
};

export const terbilangFull = (nilai) => {
  const angka = [
    "", "Satu", "Dua", "Tiga", "Empat", "Lima",
    "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"
  ];

  nilai = Math.floor(Number(nilai));

  if (isNaN(nilai)) return "";

  function konversi(n) {
    let hasil = "";

    if (n < 12) {
      hasil = angka[n];
    } else if (n < 20) {
      hasil = angka[n - 10] + " Belas";
    } else if (n < 100) {
      hasil = konversi(Math.floor(n / 10)) + " Puluh " + konversi(n % 10);
    } else if (n < 200) {
      hasil = "Seratus " + konversi(n - 100);
    } else if (n < 1000) {
      hasil = konversi(Math.floor(n / 100)) + " Ratus " + konversi(n % 100);
    } else if (n < 2000) {
      hasil = "Seribu " + konversi(n - 1000);
    } else if (n < 1000000) {
      hasil = konversi(Math.floor(n / 1000)) + " Ribu " + konversi(n % 1000);
    } else if (n < 1000000000) {
      hasil = konversi(Math.floor(n / 1000000)) + " Juta " + konversi(n % 1000000);
    } else if (n < 1000000000000) {
      hasil = konversi(Math.floor(n / 1000000000)) + " Miliar " + konversi(n % 1000000000);
    } else if (n < 1000000000000000) {
      hasil = konversi(Math.floor(n / 1000000000000)) + " Triliun " + konversi(n % 1000000000000);
    } else {
      return "Angka terlalu besar";
    }

    return hasil.trim();
  }

  const hasilAkhir = konversi(nilai);
  return hasilAkhir.charAt(0).toUpperCase() + hasilAkhir.slice(1) + " Rupiah";
}

export const capitalizeSentence = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}
