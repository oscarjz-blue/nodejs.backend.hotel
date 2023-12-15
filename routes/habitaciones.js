const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-role");
const { existeRoomPorId, roomExiste  }= require("../helpers/db-validators")

const {
    habitacionPost,
    obtenerHabitaciones,
    obtenerHabitacion,
    actualizarHabitacion,
    borrarHabitacion,
  } = require("../controllers/habitaciones");
  
  const router = Router();
  
  router.get("/", obtenerHabitaciones);
  
  //Listar habitacion  por id
  router.get(
    "/:id",
    [
      check("id", "El id no es válido").isMongoId(),
      check("id").custom(existeRoomPorId),
      validarCampos,
    ],
    obtenerHabitacion
  );
  
  router.post(
    "/",
    [
      validarJWT,
      esAdminRole, 
      check("numroom", "El número de habitación es obligatorio").notEmpty(),
      check("available", "La disponibilidad es obligatoria").notEmpty(),
      check("typeroom", "La tipo de habitación es obligatoria").notEmpty(),
      check("description", "La descripción de la habitación es obligatoria").notEmpty(),
      //check("numroom").custom(roomExiste),
      validarCampos,
    ],
    habitacionPost
  );
  
  router.put(
    "/:id",
    [
      validarJWT,
      esAdminRole,
      check("id", "No es un Id válido").isMongoId(),
      check("id").custom(existeRoomPorId),
      validarCampos,
    ],
    actualizarHabitacion
  );
  
  router.delete(
    "/:id",
    [
      validarJWT,
      esAdminRole,
      check("id", "No es un Id válido").isMongoId(),
      check("id").custom(existeRoomPorId),
      validarCampos,
    ],
    borrarHabitacion
  );
  
  module.exports = router;