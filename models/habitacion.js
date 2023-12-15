const{Schema,model}= require("mongoose");

const HabitacionSchema=Schema({

    numroom:{
        type: Number,
        required:[ true, "El número de la habitación es obligatorio"],
        unique: true,      
    },
    
    typeroom:{
        type: String,
        enum:["SIMPLE","DOBLE","BUNGALOW_FAMILIAR"],
        default: "SIMPLE",  
    },

    photo:{
        type:String, 
    },

    description:{
        type : String,
        required :[ true, "La descripción es obligatoria"],
    },

    price:{
        type:Number,
        required:[ true, "El precio por noche es obligatorio"],
        default: 0,
    },

    available: {
        type: Boolean,
        default: true,
      }, 

    state:{ 
        type: Boolean,
        default: true, 
    },
    
    usuario: {
        type:Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
      },
})


module.exports=model("Habitacion",HabitacionSchema);
