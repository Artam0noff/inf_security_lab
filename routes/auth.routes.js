const {Router} = require('express');
const getUsers = require('../model/getData');
const saveData = require('../model/saveUser');
const getKey = require('../model/getKey');

const router = Router();



// /api/auth/login
router.post('/login',  (req,res) => {
    try{

        console.log('Body',req.body);
        const {login,pass,key} = req.body;
        const users = getUsers(key);

        const user = users.find(user => user.login === login);

        if(!user){
            res.status(400).json({message:'Пользователь не найден'});
        }

        const isMatch = String(user.pass) === pass;
        if(!isMatch){
            return res.status(400).json({message:'Неверный пароль'});
        }

        const isBlocked = user.blocked === 'false'?false:true;
        
        if(isBlocked){
            res.status(400).json({message:'Пользователь заблокирован!'})
        }
        // Вообще тут ниже ваши проверки на ограничения
        const isValid = pass.length >= (+user.passLimit);
        //до сюда
        res.json({userLogin:user.login,isValidPass:isValid,key:key})



    } catch (e) {
        res.status(500).json({message:'Something Wrong'});
    }

})

// /api/auth/changePass

router.post('/changePass', async (req,res) => {
    try{
        const {login,pass,newPass,key} = req.body;
        console.log(req.body)

        let users = getUsers(key);
        const user = users.find(user => user.login === login);

        const isMatch = String(user.pass) === pass;
        if(!isMatch){
            return res.status(400).json({message:'Неверный пароль'});
        }
        // тут Ваши проверки на ограничения 
        const isValid = newPass.length >= (+user.passLimit);
        if(!isValid){
            return res.status(400).json({message:'Новый пароль не удовлетворяет ограничениям'})
        }
        // до сюда
        users = users.map((user) => {
            if(user.login === login){
                user.pass = newPass;
            }
            return user;
        })
        console.log(users);
        saveData(users,key);

        res.json({isValidPass:isValid,message:'Пароль изменен'});

    } catch(e){
        console.log(e)
        res.status(500).json({message:'Something Wrong'});
    }
})

// /api/auth/key

router.post('/key', async (req,res) => {
    try {
        const key = req.body.key

        const isCorrect = key === getKey(key);
        if( !isCorrect) { return res.status(400).json({message:'Неверный ключ'})};

        res.json({key:key});

    } catch (error) {
        console.log(e)
        res.status(500).json({message:'Something Wrong'});
    }
})



module.exports = router;