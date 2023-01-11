import {checkToken} from "./helpers";
const Roles = require('../../models/user/role')

class AuthHelper {
    decodedToken: any=null

    constructor() {
        // this.decodedToken=null
    }

    validateRefreshToken(token: string) {
        new AuthHelper()
        if (!token) return {
            isError: true,
            data: {data: null, msg: 'authentication token not exist'},
            status: 401,
            msg: 'authentication failed'
        }
        const {payload, isPass} = checkToken(token)
        this.decodedToken = payload
        if (!isPass) return {
            isError: true,
            data: {data: null, msg: payload},
            status: 401,
            msg: 'authentication failed'
        }
        return {
            isError: false,
        }
    }
    checkRole(){
        if(!this.decodedToken) return {
            isError:true,
            data:null,
            status:401,
            msg:'authorization failed'
        }
        return {
            isError:false,
        }
    }
    async checkPermission(validRole:string){
        const role = await Roles.findById(this.decodedToken.role)
        if(role.value!==validRole){
            return {
                isError:true,
                data:{
                    data:null,
                    msg:'user not access'
                },
                status:401,
                msg:'authorization failed'
            }
        }
        return {
            isError:false
        }
    }

}



module.exports = new AuthHelper()