// Requiring the module
const reader = require('xlsx')


function getUsers(key){

        try{
        require("pidcrypt/seedrandom")
  
        var pidCrypt = require("pidcrypt")
        require("pidcrypt/aes_cbc")

        var aes = new pidCrypt.AES.CBC();
        console.log('GET_DATA')
        // Reading our test file
        const file = reader.readFile('./model/data.xlsx')

        
        let data = []
        
        const sheets = file.SheetNames
        
        const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[0]])

        temp.forEach((res) => {
            data.push(res)
        })

        const names = Object.keys(data[0]);

        const header = {
                login:aes.decryptText(pidCryptUtil.stripLineFeeds(names[0]),key),
                pass: aes.decryptText(pidCryptUtil.stripLineFeeds(names[1]),key),
                passLimit:aes.decryptText(pidCryptUtil.stripLineFeeds(names[2]),key),
                blocked:aes.decryptText(pidCryptUtil.stripLineFeeds(names[3]),key)
        }



        data = data.map(user => {
        return {
                [header.login]: aes.decryptText(pidCryptUtil.stripLineFeeds(user[names[0]]),key),

                [header.pass]: aes.decryptText(pidCryptUtil.stripLineFeeds(user[names[1]]),key),

                [header.passLimit]: aes.decryptText(pidCryptUtil.stripLineFeeds(user[names[2]]),key) ,
                [header.blocked]: aes.decryptText(pidCryptUtil.stripLineFeeds(user[names[3]]),key),
                }
        })

        
        return data;
        } catch(e){
                console.log(e);
        }
}

module.exports = getUsers;