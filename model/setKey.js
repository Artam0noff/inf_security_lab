
function setKey(oldKey,_key){
    try{

    

    require("pidcrypt/seedrandom")

    var pidCrypt = require("pidcrypt")
    require("pidcrypt/aes_cbc")


    var aes = new pidCrypt.AES.CBC();
    console.log('SET_kEY')
    const key = [{ [aes.encryptText(String('key'), _key)]: aes.encryptText(String(_key), _key)}];
    
    // Requiring module
    const reader = require('xlsx');
    // Reading our test file
    const file = reader.readFile('./model/data.xlsx');
    let data = []
    
    const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[0]])

    


    temp.forEach((res) => {
        data.push(res)
    })
    

    const names = Object.keys(data[0]);

    let _header = {
            login:aes.decryptText(pidCryptUtil.stripLineFeeds(names[0]),oldKey),
            pass: aes.decryptText(pidCryptUtil.stripLineFeeds(names[1]),oldKey),
            passLimit:aes.decryptText(pidCryptUtil.stripLineFeeds(names[2]),oldKey),
            blocked:aes.decryptText(pidCryptUtil.stripLineFeeds(names[3]),oldKey)
    }



    users = data.map(user => {
    return {
            [_header.login]: aes.decryptText(pidCryptUtil.stripLineFeeds(user[names[0]]),oldKey),

            [_header.pass]: aes.decryptText(pidCryptUtil.stripLineFeeds(user[names[1]]),oldKey) || '',

            [_header.passLimit]: aes.decryptText(pidCryptUtil.stripLineFeeds(user[names[2]]),oldKey) || '1',
            [_header.blocked]: aes.decryptText(pidCryptUtil.stripLineFeeds(user[names[3]]),oldKey) || 'false',
            }
    })

        _header = {
                login:aes.encryptText(String('login'), _key),
                pass:aes.encryptText(String('pass'), _key),
                passLimit:aes.encryptText(String('passLimit'), _key),
                blocked:aes.encryptText(String('blocked'), _key)
        }


        users = users.map(user => {
                return{
                        [_header.login]:aes.encryptText(String(user.login), _key),
                        [_header.pass]: aes.encryptText(String(user.pass), _key),
                        [_header.passLimit]:aes.encryptText(String(user.passLimit), _key),
                        [_header.blocked]:aes.encryptText(String(user.blocked), _key),
                }
        })

    

    const ws2 = reader.utils.json_to_sheet(key);
    const ws1 = reader.utils.json_to_sheet(users);




    file.Sheets['Лист1'] = ws1;
    file.Sheets['Лист2'] = ws2;
    // Writing to our file
    reader.writeFile(file,'./model/data.xlsx');
    console.log('end')
    } catch (e) {
            console.log(e);
    }
}

module.exports = setKey;