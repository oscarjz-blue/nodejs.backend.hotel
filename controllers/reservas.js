const {
  request,
  response
} = require("express");
const Reserva = require("../models/reserva");
//const Usuario= require ("../models/usuario")

const obtenerReservas = async(req = request, res = response) => {
  //const { limite = 5, desde = 0 } = req.query;
  const query = {
      state: true
  };

  const[total, reservas] = await Promise.all([
              Reserva.countDocuments(query),
              Reserva.find(query)
          ]);

  res.json({
      total,
      reservas
  });
};

// Obtener reserva por Id
const obtenerReserva = async(req = request, res = response) => {
  const {
      id
  } = req.params;

  const reserva = await Reserva.findById(id)

      res.json({
          reserva
      });
};

const reservaPost = async(req, res) => {
  const {
    dateFrom,
    dateTo,
    amountPeople
} = req.body;

  //Generar la data a guardar
  const data = {
      dateFrom,
      dateTo,
      amountPeople,
      state,
      usuario: req.usuario._id,
      habitacion: req.habitacion._id,
  };

  const reserva = new Habitacion(data);

  //grabar en la base de datos
  await reserva.save();

  res.status(201).json({
      msg: "Reserva creada",
      reserva,
  });
};

//actualizar Reserva

const actualizarReserva = async(req, res) => {
  const {
      id
  } = req.params;
  const dateFrom = req.body.dateFrom;
  const dateTo = req.body.dateTo;
  const amountPeople = req.body.amountPeople;
  const datos = {
      dateFrom,
      dateTo,
      amountPeople,
  };

  const reserva = await Reserva.findByIdAndUpdate(id, datos, {
      new: true
  })
      res.status(200).json({
          message: "Reserva actualizada",
          reserva
      });
};

//Borrar habitación
const borrarReserva = async(req, res) => {
  const {
      id
  } = req.params;

  const reservaBorrada = await Reserva.findByIdAndUpdate(
          id, {
          state: false
      }, {
          new: true
      });

  res.status(200).json({
      message: "Reserva Anulaa",
      reservaBorrada,
  });
};

module.exports = {
  reservaPost,
  obtenerReservas,
  obtenerReserva,
  actualizarReserva,
  borrarReserva,
};
