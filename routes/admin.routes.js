const {Router, request} = require('express');
const getUsers = require('../model/getData');
const saveData = require('../model/saveUser');
const setKey = require('../model/setKey');
const getKey = require('../model/getKey')

const router = Router();

//  /api/adminPanel/getUsersInfo

router.post('/getUsersInfo', async (req,res) => {
    try{

        const {key} = req.body;

        let users = getUsers(key);

        users = users.map( user => {
            return {
                login: user.login,
                passLimit: user.passLimit || '1',
                blocked: user.blocked || 'false',
            }
        })
        users.shift();

        res.json({users});

    } catch (e) {
        res.status(500).json({message:'Something Wrong'});
    }
})

// /api/adminPanel/saveChanges 

router.post('/saveChanges', async (req,res) => {
    try {
        const key = req.body.key;
        let users = getUsers(key);
        let newUsers = [];
        let _updateUsers = req.body.users;
        
        console.log(_updateUsers);
        updateUsers = _updateUsers.reduce((prev, user) => {
            let _user = {
                passLimit: user.passLimit,
                blocked: user.blocked,
            }
            return {...prev, [user.login]:_user }
        },{});

        users = users.map((user) => {
                if( user.login === 'ADMIN') return user;
                return {
                    login: user.login,
                    pass: user.pass,
                    passLimit:updateUsers[user.login].passLimit,
                    blocked:updateUsers[user.login].blocked
                }
        })

        const currUsers = users.reduce( (prev, user) => {
            return {...prev,[user.login]:''}
        }, {})

        _updateUsers.forEach(user => {
            if(!currUsers.hasOwnProperty(user.login)){
                newUsers.push({
                    login:user.login,
                    pass:'',
                    passLimit:user.passLimit,
                    blocked:user.blocked
                })
            }
        });

        users = [...users, ...newUsers];

        saveData(users,key);
        res.json({message:'Изменения сохранены'});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something Wrong'});
    }
})

// /api/adminPanel/reset

router.post('/reset', async (req ,res) => {
    try {
        const key = req.body.key;

        const isCorrect = oldKey === getKey(oldKey);
        if( !isCorrect) { return res.status(400).json({message:'Неверный ключ'})};

        users = [];
        users.push({
            login:'ADMIN',
            pass: '',
            passLimit: '1',
            blocked: 'false',
        })

        saveData(users,key);
        setKey(key,'password');
        res.json({isDone:'true',message:'База данных пользователей сброшена'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something Wrong'});
    }
})


// /api/adminPanel/changeKey

router.post('/changeKey', async (req,res) => {
    try {
        const {oldKey, newKey} = req.body;
        console.log(oldKey, ' // ', getKey(oldKey))
        const isCorrect = oldKey === getKey(oldKey);
        if( !isCorrect) { return res.status(400).json({message:'Неверный ключ'})};
        setKey(oldKey,newKey);

        res.json({message:'Ключ изменен'})
    } catch (error) {
        res.status(500).json({message:'Something Wrong'});
    }
})



module.exports = router;