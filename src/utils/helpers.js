import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'dd MMMM yyyy', { locale: id });
  } catch (error) {
    return '-';
  }
};

export const formatDateTime = (date) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'dd MMMM yyyy HH:mm', { locale: id });
  } catch (error) {
    return '-';
  }
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('id-ID').format(value);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const truncateText = (text, length = 50) => {
  return text && text.length > length ? `${text.substring(0, length)}...` : text;
};

export const getInitials = (name) => {
  return name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '?';
};
