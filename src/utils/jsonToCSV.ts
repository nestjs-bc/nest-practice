export async function jsonToCSV(json_data) {
  const jsonArray = json_data;
  let csv_string = '';
  const titles = Object.keys(jsonArray[0]);
  titles.forEach((title, index) => {
    csv_string += index !== titles.length - 1 ? `${title},` : `${title}\r\n`;
  });

  jsonArray.forEach((content, index) => {
    let row = '';
    for (const title in content) {
      row += row === '' ? `${content[title]}` : `,${content[title]}`;
    }
    csv_string += index !== jsonArray.length - 1 ? `${row}\r\n` : `${row}`;
  });
  return csv_string;
}
