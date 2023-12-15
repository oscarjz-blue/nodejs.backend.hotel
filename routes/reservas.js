const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRol } = require("../middlewares/validar-role");
const { existeReservaPorId, reservaExiste  }= require("../helpers/db-validators")

const {
    reservaPost,
    obtenerReserva,
    obtenerReservas,
    actualizarReserva,
    borrarReserva,

  } = require("../controllers/reservas");
  
  const router = Router();
  
  router.get("/", obtenerReservas);
  
  //Listar Reservas  por id
  router.get(
    "/:id",
    [
      check("id", "El id no es válido").isMongoId(),
      check("id").custom(existeReservaPorId),
      validarCampos,
    ],
    obtenerReserva
  );
  
  // Crear una Reserva
  router.post(
    "/",
    [
      validarJWT,
      tieneRol, 
      check("dateFrom", "Fecha desde de reserva es obligatorio").notEmpty(),
      check("dateTo", "Fecha hasta de reserva es obligatoria").notEmpty(),
      check("amountPeople", "Cantidad de personas es obligatoria").notEmpty(),
      validarCampos,
    ],
    reservaPost
  );
  
  // Actualizar una Reserva
  router.put(
    "/:id",
    [
      validarJWT,
      tieneRol,
      check("id", "No es un Id válido").isMongoId(),
      check("id").custom(existeReservaPorId),
      validarCampos,
    ],
    actualizarReserva
  );
  
  // Borrar una Reserva
  router.delete(
    "/:id",
    [
      validarJWT,
      esAdminRole,
      check("id", "No es un Id válido").isMongoId(),
      check("id").custom(existeReservaPorId),
      validarCampos,
    ],
    borrarReserva
  );
  
  module.exports = router;