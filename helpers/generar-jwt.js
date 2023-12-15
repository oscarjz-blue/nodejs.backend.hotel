const jwt = require("jsonwebtoken");


const generarJWT= (uid) =>{
 return new Promise((resolve, reject) => {
    const payload = {uid};
    jwt.sign (
        payload,
        process.env.SECRETORPRIVATEKEY,
        {expiresIn: "4h"},
    (err,token)=>{
        if(err) {
          console.log(err);
          reject("No se genero el token");  
        }else{
            //console.log("token generado=",token)
           resolve(token); 
        }
    }

    );
 });


};
module.exports={
    generarJWT,
}