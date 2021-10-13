// Requiring the module
const reader = require('xlsx')


function getKey(key){

        try{
        require("pidcrypt/seedrandom")
  
        var pidCrypt = require("pidcrypt")
        require("pidcrypt/aes_cbc")

        var aes = new pidCrypt.AES.CBC();
        console.log('GET_KEY')
        // Reading our test file
        const file = reader.readFile('./model/data.xlsx')

        
        let data = []
        
        const sheets = file.SheetNames
        
        const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[1]])

        temp.forEach((res) => {
            data.push(res)
        })


        data = data.map( item => {
            const prop = Object.keys(item);
        return {
                 [aes.decryptText(pidCryptUtil.stripLineFeeds(prop[0]),key)]: 
                    aes.decryptText(pidCryptUtil.stripLineFeeds(item[prop[0]]),key),
                }
        })

        return data[0].key;
        } catch(e){
                console.log(e);
        }
}
console.log(getKey('password'));

module.exports = getKey;