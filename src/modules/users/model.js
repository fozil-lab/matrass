const {fetch,fetchAll} = require('../../lib/postgres')
const path = require('path')

const insert = async (file,{firstName,lastName,username,password}) => {
    try {
        file.mv(path.join(process.cwd(),'src','uploads','images',file.name))
        let fileName = file.name

        await fetch(`insert into users 
         (first_name,username,password,last_name,user_img) 
         values ($1,$2,md5($3),$4,$5)`
            ,firstName,username,password,lastName,fileName
        )
        return true
    }catch (err) {
        return err
    }

}

const fetchUsers = async () => {
    let users = await fetchAll('select * from users')
    for (let user of users) {
        user.user_img = 'http://localhost:4500/' + user.user_img
    }
    return await users
}

const Login = async (username,password) => {

   try {
       let user = await fetch(`select * from users where username = $1 and password = md5($2)`,username,password)
       user.user_img = 'http://localhost:4500/' + user.user_img
       console.log(user)
       return user
   } catch (err) {
       return err
   }

}

module.exports = {
    insert,
    fetchUsers,
    Login
}