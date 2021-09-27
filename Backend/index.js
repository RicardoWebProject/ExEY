import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
//Rutas
import router from './routes';

//Conexión a la BD mongo
mongoose.Promise = global.Promise;

const dbUrl = 'mongodb://localhost:27017/dbEY';
mongoose.connect(dbUrl, {
    
    useNewUrlParser: true
})
.then(mongoose => console.log('Conectando a la BD en el puerto 27017.'))
.catch(err => console.log(err))
//----------------------------------------------------------------------------------------------------------------------------

const app = express();
app.use(morgan('dev'));
app.use(cors());

//Para recibir posts desde cliente
app.use(express.json());
app.use(express.urlencoded(
    {extended:true}
));
app.use(express.static(path.join(__dirname, 'public')));

//Uso de las rutas
app.use('/api', router);
//----------------------------------------------------------------------------------------------------------------------------

//Puerto asignado o Puerto 3000
app.set('port', process.env.PORT || 3000);
//----------------------------------------------------------------------------------------------------------------------------

//Dónde escucha la aplicación principalmente
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto: ' + app.get('port'));
});
//----------------------------------------------------------------------------------------------------------------------------