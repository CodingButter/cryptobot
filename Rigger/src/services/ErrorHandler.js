export default ({error})=>{
    var level = "warning"
    var message = "There was an error"
    var type = "generic"
    if(error.login){
        type = "Login"
        level = "warning"
        message = error.login
    }
    if(error.email){
        type = "Email"
        level = "warning"
        message = error.email
    }
    if(error.password){
        type = "Password"
        level = "warning"
        message = error.password
    }

    return {error:{level,message,type}}
}
