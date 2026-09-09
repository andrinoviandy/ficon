import { parse, parseISO, format, isValid } from 'date-fns';

export const terbilangRupiah = (angka) => {
	const satuan = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

	function terbilang(n) {
		n = Math.floor(n);
		if (n < 12) return satuan[n];
		else if (n < 20) return terbilang(n - 10) + " Belas";
		else if (n < 100) return terbilang(Math.floor(n / 10)) + " Puluh " + terbilang(n % 10);
		else if (n < 200) return "Seratus " + terbilang(n - 100);
		else if (n < 1000) return terbilang(Math.floor(n / 100)) + " Ratus " + terbilang(n % 100);
		else if (n < 2000) return "Seribu " + terbilang(n - 1000);
		else if (n < 1000000) return terbilang(Math.floor(n / 1000)) + " Ribu " + terbilang(n % 1000);
		else if (n < 1000000000) return terbilang(Math.floor(n / 1000000)) + " Juta " + terbilang(n % 1000000);
		else if (n < 1000000000000) return terbilang(Math.floor(n / 1000000000)) + " Miliar " + terbilang(n % 1000000000);
		else if (n < 1000000000000000) return terbilang(Math.floor(n / 1000000000000)) + " Triliun " + terbilang(n % 1000000000000);
		else return "Angka terlalu besar";
	}

	const hasil = terbilang(angka).replace(/\s+/g, ' ').trim();
	return hasil + " Rupiah";
}
export const terbilang = (angka) => {
	const satuan = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

	function terbilang(n) {
		n = Math.floor(n);
		if (n < 12) return satuan[n];
		else if (n < 20) return terbilang(n - 10) + " Belas";
		else if (n < 100) return terbilang(Math.floor(n / 10)) + " Puluh " + terbilang(n % 10);
		else if (n < 200) return "Seratus " + terbilang(n - 100);
		else if (n < 1000) return terbilang(Math.floor(n / 100)) + " Ratus " + terbilang(n % 100);
		else if (n < 2000) return "Seribu " + terbilang(n - 1000);
		else if (n < 1000000) return terbilang(Math.floor(n / 1000)) + " Ribu " + terbilang(n % 1000);
		else if (n < 1000000000) return terbilang(Math.floor(n / 1000000)) + " Juta " + terbilang(n % 1000000);
		else if (n < 1000000000000) return terbilang(Math.floor(n / 1000000000)) + " Miliar " + terbilang(n % 1000000000);
		else if (n < 1000000000000000) return terbilang(Math.floor(n / 1000000000000)) + " Triliun " + terbilang(n % 1000000000000);
		else return "Angka terlalu besar";
	}

	const hasil = terbilang(angka).replace(/\s+/g, ' ').trim();
	return hasil;
}

export const getMonthName = (monthStr) => {
    try {
        const date = new Date(2024, parseInt(monthStr) - 1, 1);
        return new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    } catch (error) {
        console.log(error)
        return null;
    }
};