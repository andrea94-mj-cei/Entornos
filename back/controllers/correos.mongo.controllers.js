import { connectDB } from "../data/mongoBD.js";
import { User, Email } from "../data/mongoBD.js";

// Me connecto a MongoDB ya que ejecuto la funcion..
connectDB();

// const responseApi = {

// }

export const getEmails = async (req, res, next) => {
    try {
        // find() trae todos los elementos. 
        //Polulate trae el documento vinciulado segun el schema 
        // el primer atributo es el nombre de la propiedad 
        // y el segundo trae los campos elejidos, en vez de traer todos los campos.
        const emails = await Email.find().populate('remitente destinatario', 'username email');
        res.status(200).json(emails)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getEmailById = async (req, res, next) => {
    try {
        const correoId = req.params.id;
        const email = await Email.findById(correoId).populate('remitente destinatario', 'username email');

        if(!email) return res.status(404).json({message: "Correo no encontrado, revisa el ID"})
        res.status(200).json(email);
    
        } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createEmail = async (req, res, next) => {
    try {
        const {remitente, destinatario, asunto, contenido} = req.body;

        const newEmail = new Email({remitente, 
                                    destinatario, 
                                    asunto, 
                                    contenido, 
                                    isImportant:true});
        await newEmail.save();  // Guuarda el nuevo documento en la base de datos. 
        res.status(201).json(newEmail)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteEmail = async (req, res, next) => {
    try {
        const correoId = req.params.id;
        const deletedEmail = await Email.findByIdAndDelete(correoId);
        if(!deletedEmail) return res.status(404).json({message: "Correo no encontrado"});
        res.json({message: "Correo eliminado correctamente"}); // Si no tiene status envia el mensaje. si le ponemos status(204) no envia mensaje
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Marcar correo como leido
export const updateEmail = async (req, res, next) => {
    try {
        const correoId = req.params.id;

        // Utilizamos el new: true para que nos devuelva el documento actualizado
        // Utilizamos {isLeido:true} para marcar el correo como leido
        const updatedemail = await Email.findByIdAndUpdate(
            correoId,
            {isLeido: true},
            {new: true}    
        )
        if(!updateEmail) return es.status(404).json({message: "Correo no encontrado"});
        res.status(200).json(updateEmail);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Rutas específicas
export const getEmailsByUserId = async (req, res, next) => {
    // El $or: se utiliz para buscar correos donde el usuario sea el destinatario o el remitente
    try {
        const userId= req.params.id;
        const email = await Email.find({$or: [{remitente:userId},
                                        {destinatario:userId}] })
                        .populate('remitente destinatario', 'username email')
                        .sort({crated_at: -1})
        res.status(200).json(email);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getEmailsByAsunto = async (req, res, next) => {
    try {
        const asunto= req.params.asunto;
        const email = await Email.find({asunto: {$regex:"Prueba", $options:'i'}})
                        .populate('remitente destinatario', 'username email')
                        .sort({crated_at: -1})

        //asunto: {$regex:"Prueba", $options:'i'}
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}