import { parse, parseISO, format, isValid } from 'date-fns';

export const formatDate = (rawDate) => {
  if (!rawDate || rawDate === null) {
    return '-';
  }

  // Misalkan format asli tanggal adalah 'yyyy-MM-dd'
  const parsedDate = parse(rawDate.substring(0, 10), 'yyyy-MM-dd', new Date());

  if (!isValid(parsedDate)) {
    return '-';
  }

  return format(parsedDate, 'dd/MM/yyyy');
}

export const formatDateDash = (rawDate) => {
  if (!rawDate || rawDate === null) {
    return '-';
  }

  // Misalkan format asli tanggal adalah 'yyyy-MM-dd'
  const parsedDate = parse(rawDate.substring(0, 10), 'yyyy-MM-dd', new Date());

  if (!isValid(parsedDate)) {
    return '-';
  }

  return format(parsedDate, 'dd-MM-yyyy');
}

export function formatDateUS(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(date));
}

export function formatTanggalIndonesia(isoString) {
  if (!isoString) return '-';

  const dateObj = new Date(isoString);

  return dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatDate2(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // bulan dari 0-11
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const formatDateJam = (rawDate) => {
  if (!rawDate) {
    return '-';
  }

  // parse ISO string, misalnya "2025-09-01T14:37:00"
  const parsedDate = parseISO(rawDate);

  if (!isValid(parsedDate)) {
    return '-';
  }

  // format jadi dd/MM/yyyy HH:mm:ss
  return format(parsedDate, 'dd/MM/yyyy HH:mm:ss');
};