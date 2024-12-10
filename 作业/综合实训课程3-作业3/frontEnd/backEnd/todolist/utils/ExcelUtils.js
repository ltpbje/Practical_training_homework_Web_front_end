const xlsx = require('node-xlsx');

const path = require('path');
const fs = require('fs');

class ExcelUtils {
    static resultsToExcel(results) {
        if (results.length > 0) {
            let headRow = Object.keys(results[0]);
            let dataRows = results.map(item => Object.values(item));
            dataRows.unshift(headRow);
            let excelObj = {
                name: 'sheet1',
                data: dataRows
            };
            let savePath = path.join(__dirname, "../excelDir", `${Date.now()}-${parseInt(Math.random() * 1000)}.xlsx`);
            let excelBuffer = xlsx.build([excelObj]);
            fs.writeFileSync(savePath, excelBuffer);
            return savePath;
        } else {
            return '';
        }
    }
}

module.exports = ExcelUtils;
