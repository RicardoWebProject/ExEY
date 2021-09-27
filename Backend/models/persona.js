import mongoose, {Schema} from 'mongoose';

const personaSchema = new Schema({
    tipo_persona: {type: String, maxlength:20, required:true},
    nombre: {type: String, maxlength:50, required:true},
    num_documento: {type: Number, unique:true},
    telefono: {type: String, maxlength: 9},
    email: {type: String, maxlength:50, uninque:true},
    estado: {type: Number, default:1},
    createdAt: {type: Date, default: Date.now}
});

const Persona = mongoose.model('persona', personaSchema);

export default Persona;