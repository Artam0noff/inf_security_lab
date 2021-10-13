

function makeFile(){
    require("pidcrypt/seedrandom")
  
    var pidCrypt = require("pidcrypt")
    require("pidcrypt/aes_cbc")

    var aes = new pidCrypt.AES.CBC();
    var xl = require('excel4node');
    const key = 'password';
    var wb = new xl.Workbook();
    
    // Add Worksheets to the workbook
    var ws = wb.addWorksheet('Лист1');
    var ws2 = wb.addWorksheet('Лист2');

    ws.cell(1,1).string(aes.encryptText(String('login'), key));
    ws.cell(2,1).string(aes.encryptText(String('ADMIN'), key));
    ws.cell(1,2).string(aes.encryptText(String('pass'), key));
    ws.cell(2,2).string(aes.encryptText(String(''), key));
    ws.cell(1,3).string(aes.encryptText(String('passLimit'), key));
    ws.cell(2,3).string(aes.encryptText(String('1'), key))
    ws.cell(1,4).string(aes.encryptText(String('blocked'), key));
    ws.cell(2,4).string(aes.encryptText(String('false'), key));

    ws2.cell(1,1).string(aes.encryptText(String('key'), key));
    ws2.cell(2,1).string(aes.encryptText(String('password'), key));
    wb.write('model/data.xlsx');
}

module.exports = makeFile;