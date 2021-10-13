
function saveData(users,key){
        try{

        

        require("pidcrypt/seedrandom");
  
        var pidCrypt = require("pidcrypt");
        require("pidcrypt/aes_cbc");


        var aes = new pidCrypt.AES.CBC();
        console.log('SAVE_DATA')
        const header = {
                login:aes.encryptText(String('login'), key),
                pass:aes.encryptText(String('pass'), key),
                passLimit:aes.encryptText(String('passLimit'), key),
                blocked:aes.encryptText(String('blocked'), key)
        }


        users = users.map(user => {
                return{
                        [header.login]:aes.encryptText(String(user.login), key),
                        [header.pass]: aes.encryptText(String(user.pass), key),
                        [header.passLimit]:aes.encryptText(String(user.passLimit), key),
                        [header.blocked]:aes.encryptText(String(user.blocked), key),
                }
        })

        console.log(users);
        // Requiring module
        const reader = require('xlsx');
        // Reading our test file
        const file = reader.readFile('./model/data.xlsx');
        
        
        const ws = reader.utils.json_to_sheet(users);
        

        file.Sheets['Лист1'] = ws;        
        // Writing to our file
        reader.writeFile(file,'./model/data.xlsx');
        } catch (e) {
                console.log(e);
        }
}

module.exports = saveData;