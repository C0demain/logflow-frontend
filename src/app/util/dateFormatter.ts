export const formatDateToBR = (dateString: string): string => {
  if (dateString == null) { return '' }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export const formatDateForInput = (dateString: string): string => {
  if (dateString == null) { return '' }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
