export const formatDateToBR = (dateString: string): string => {
  if (dateString == null) {
    return '';
  }

  const date = new Date(dateString);

  // Ajusta a data para UTC e corrige a diferença de fuso horário, se houver
  const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return utcDate.toLocaleDateString('pt-BR', options);
};


export const formatDateForInput = (dateString: string): string => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  // Adiciona 1 dia para corrigir a diferença
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};