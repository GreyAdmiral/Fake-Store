export function downloadCSV(text: string, filename: string = 'file') {
   const link = document.createElement('a');
   link.download = `${filename}.csv`;
   link.href = URL.createObjectURL(new Blob(['\ufeff', text], { type: 'text/csv;charset=utf-8' }));

   link.click();
   URL.revokeObjectURL(link.href);
}
