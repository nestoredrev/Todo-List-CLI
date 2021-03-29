const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const tareaSchema = new Schema({
    descripcion: {
        type: String,
        trim: true,
        required: [true, 'El campo es obligatorio']
    },
    creadaEn: {
        type: Date,
        default: Date.now()
    },
    completadaEn: {
        type: Date,
        default: null
    }
}); 


tareaSchema.set('toObject', {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  })

module.exports = mongoose.model('Tarea', tareaSchema);