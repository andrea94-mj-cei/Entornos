// importo la conexion a mysqlConfig
// import mysqldb from "../data/mysqldb.js"

const apiResponse = {
    message: "El controller funciona",
    status: "ok",
    data: null,
    success:"ok",
    query: "",
    cant: 0
}

// Metodo GET para obtener todos los correos
export const getAllCorreos = async (req, res, next) => {

    try {
        // Obtener la lista de correos y devolver al usuario su correo
        const query = 'SELECT * FROM correos';
        const [result] = await mysqldb.query(query);

        apiResponse.data = result;
        apiResponse.message = "correos obtenidos"
        apiResponse.cant = result.length
        apiResponse.success = "ok"
        apiResponse.query = query

        // return apiResponse;
        res.status(200).json(apiResponse)

    } catch (error) {
        next(error)
    }
}

// Metodo GET para obtener todos los correos con los usuarios
export const getAllCorreosWithUsers = async (req, res, next) => {

    try {
        // Obtener la lista de correos y devolver al usuario su correo
        const query = `SELECT correos.*, 
                r.nombre AS remitente_nombre, 
                r.email AS remitente_email,
                r.image AS image,
                d.nombre AS destinatario_nombre, 
                d.email AS destinatario_email
            FROM correos 
            JOIN usuarios AS r ON r.id = correos.remitente_id
            JOIN usuarios AS d ON d.id = correos.destinatario_id`;
        const [result] = await mysqldb.query(query);

        apiResponse.data = result;
        apiResponse.message = "Correos obtenidos de todos los usuarios"
        apiResponse.cant = result.length
        apiResponse.success = "ok"
        apiResponse.query = query

        // return apiResponse;
        res.status(200).json(apiResponse)
    } catch (error) {
        next(error)
    }
}

// Metodo POST para crear un correo
export const createCorreo = async (req, res, next) => {
    const {remitente_id, destinatario_id, asunto, contenido} = req.body;
    console.log(req.body)
    if (!remitente_id || !destinatario_id || !asunto || !contenido) {
        return res.status(400).json({msg: "Faltan datos obligatorios"})
    }
    
    const query = `INSERT INTO correos (remitente_id, destinatario_id, asunto, contenido) 
        VALUES (?, ?, ?, ?)`;

    const [result] = await mysqldb.query(query, [remitente_id, destinatario_id, asunto, contenido]);

    apiResponse.data = result;
    apiResponse.message = "correo insertado"
    apiResponse.success = "ok"
    apiResponse.query = query

    // return apiResponse;
    res.status(201).json(apiResponse)
}

// Metodo DELETE para borrar un correo
export const deleteCorreo = async (req, res) => {
    const {id_correo} = req.body;
    console.log(req.body)

    try {
        const query = `DELETE FROM correos WHERE correos.id = ?`;
        const [result] = await mysqldb.query(query, [id_correo]);

        apiResponse.data = result;
        apiResponse.message = "correo borrado"
        apiResponse.success = "ok"
        apiResponse.query = query

        // return apiResponse;
        res.status(201).json(apiResponse)
    } catch (error) {
        next(error)
    }
}

// Metodo GET para obtener un solo correo
export const getSingleCorreo = async (req, res) => {
    const {id} = req.params;
    const query = `SELECT * FROM correos WHERE id = ?`;
    const [result] = await mysqldb.query(query, [id]);

    if (result.length === 0) {
        const error = new Error("Correo no encontrado")
        error.statusCode = 404;
        throw (error)
    }

    res.status(200).json({
        msg: "Correo encontrado",
        success:"ok",
        query: query,
        data: result[0]
    })
}