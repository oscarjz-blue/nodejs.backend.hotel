const {
    Schema,
    model
} = require( "mongoose");

const ReservaSchema = Schema({

    dateFrom: {
        type: Date,
        required: [true, "La fecha de ingreso es obligatoria"],
    },
    dateTo: {
        type: Date,
        required: [true, "La fecha de egreso es obligatoria"],
    },
    amountPeople: {
        type: Number,
        required: [true, "La cantidad de personas es obligatoria"],
    },
    state: {
        type: Boolean,
    default:
        true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    habitacion: {
        type: Schema.Types.ObjectId,
        ref: "Habitacion",
        required: true,
    },
})

module.exports = model( "Reserva", ReservaSchema);
