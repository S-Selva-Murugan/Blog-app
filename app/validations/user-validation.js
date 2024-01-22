const User = require ('../model/user-model')

const userRegisterValidationSchema = {
    username:{
        notEmpty:{
            errorMessage:'Username required'
        },
        isLength:{
            options:{min:3,max:64},
            errorMessage:'length should be bw 3 - 64 chars'
        },
        custom:{
            options: async(value) =>{
                const user = await User.findOne({username:value});
                if(user){
                    throw new Error('username already exists')
                } else {
                    return true
                }
            },
        },
    },
    email:{
        notEmpty:{
            errorMessage:'Email required'
        },
        isEmail:{
            errorMessage:'Wrong format'
        },
        custom:{
            options:async(value) =>{
                const user = await User.findOne({email:value});
                if(user){
                    throw new Error('Email already exist')
                } else {
                    return true
                }
            },
        },
    },
    passwordHash:{
        notEmpty:{
            errorMessage:'Password required'
        },
        isLength:{
            options:{min:8,max:64},
            errorMessage:'password must contain chars bw 8-128'
        },
    },
}

const userLoginValidationSchema = {
    email:{
        isEmail:{
            errorMessage:'Wrong email format'
        },
        notEmpty:{
            errorMessage:'Email required'
        }
    },
    passwordHash:{
        isLength:{
            options:{min:8,max:64},
            errorMessage:'password should be bw 8-64 chars'
        },
        notEmpty:{
            errorMessage:'password required'
        }
    }
}
module.exports = { registerSchema: userRegisterValidationSchema,
                   loginSchema: userLoginValidationSchema }