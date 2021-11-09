const parseCSV = data => {
  // create empty array
  const csvData = [];

  // this will return each line as an individual String
  const lines = data.split(/\n|\r/g).filter(e => e !== "");

  // loop through the lines and return an array of individual
  // Strings within the line that are separated by a comma

  for (let i = 0; i < lines.length; i++) {
    csvData[i] = lines[i].split(",");
  }
  // return an array of arrays 2D array
  // e.g [ [1,2,3], [3,4,5], [6,7,8] ]
  return csvData;
};

function download_csv_file(csvFileData) {
  // define the heading for each row of the data
  // let csv = "Name,Profession\n";
  // let csv = `${csvFileData.join(",")}\n`;
  let csv = "";
  // merge the data with CSV
  csvFileData.forEach(function(row) {
    csv += row.join(",");
    csv += "\n";
  });

  // display the created CSV data on the web browser
  // document.write(csv);

  const hiddenElement = document.createElement("a");
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
  hiddenElement.target = "_blank";

  // provide the name for the CSV file to be downloaded
  hiddenElement.download = "Famous Personalities.csv";
  hiddenElement.click();
}
const fetchPerformace = async () => {
  try {
    const response = await fetch("somecsvapi", { method: "GET" });
    const data = await response.text();
    const parsed = parseCSV(data);
    download_csv_file(parsed);
  } catch (error) {
    console.log(error.message);
  }
};