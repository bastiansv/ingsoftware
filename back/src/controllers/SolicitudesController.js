import Solicitudes from '../models/Solicitudes.js';

export default class SolicitudesController {
    async getAllSolicitudes(req, res) {
        try {
            const solicitudes = await Solicitudes.findAll();
            res.send(solicitudes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las solicitudes' });
        }
    }
}