const Usuario= require ("../models/usuario");
const Habitacion = require ("../models/habitacion");
const Reserva = require ("../models/reserva");
const Role = require("../models/role");


  const esRoleValido= async(role="USER_ROLE")=>{
    const existeRole =await Role.findOne({role});
    if(!existeRole){
      throw new Error (`El rol ${role} no esta registrado en la BD`);
      }
    } 
 
    //Validar si el mail existe
   const emailExiste= async(email)=>{
    const existeEmail= await Usuario.findOne({email})
    if (existeEmail){
      throw new Error (`El correo ${email} ya esta registrado en la BD`); 
}
}
   const existeUsuarioPorId= async(id)=>{
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario){
      throw new Error (`El id ${id} NO existe `); 
    }
      //si el usuario existe certifico su estado
    if (!existeUsuario.state) {
      throw new Error (`El usuario ${existeUsuario.name} está inactivo`);  
    }
   }; 

     //validar si numero habitación ya existe
  const roomExiste = async (numroom)=>{
    const existeRoom = await Habitacion.findOne({numroom})
    if (existeRoom){
      throw new Error(`La habitación ${numroom} ya existe en la BD.`)
    }
  }

  //validar si habitación ya existe
  const existeRoomPorId = async (id)=>{
    const existeRoom = await Habitacion.findById(id)
    if (!existeRoom
      ){
      throw new Error(`El id de Habitacion No existe en la BD.`)
    }
  }

  //validar si reserva ya existe
  const existeReservaPorId = async (id)=>{
    const existe = await Reserva.findById(id)
    if (!existe) {
      throw new Error(`El id de Reserva No existe en la BD.`)
    }
  }
  
  //validar si numero reserva ya existe
  const reservaExiste = async (numreserva)=>{
    const existe = await Reserva.findOne({numreserva})
    if (existe) {
      throw new Error(`La reserva ${numreserva} ya existe en la BD.`)
    }
  }    
    module.exports={
        esRoleValido, 
        emailExiste, 
        existeUsuarioPorId,
        roomExiste,
        existeRoomPorId,
        existeReservaPorId, 
        reservaExiste,       
    }
  