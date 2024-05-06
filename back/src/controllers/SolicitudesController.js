import Solicitudes from '../models/Solicitudes.js';
import Simulation from '../models/Simulation.js';
import sequelize from '../database.js';

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

    async createSolicitudes(req, res) {
        const transaction = await sequelize.transaction();
        try {
            //Recibo un id_simulacion en el req, el cual me servirá para rescatar la informacion de la simulacion, borrarla, y crear una solicitud
            const id_simulacion = req.body.id_simulacion;
            const simulacion = await Simulation.findByPk(id_simulacion);
            if (!simulacion) {
                res.status(404).json({ error: 'Simulación no encontrada' });
                return;
            } else {
                console.log(simulacion);
            }
            await Solicitudes.create({
                id_ejecutivo: simulacion.userId,
                userRut: simulacion.userRut,
                totalAmount: simulacion.totalAmount,
                startDate: simulacion.startDate,
                endDate: simulacion.endDate,
                interestRate: simulacion.interestRate,
                ufValueAtCreation: simulacion.ufValueAtCreation,
                estado: "pendiente"
            }, { transaction });
            await Simulation.destroy({
                where: {
                    id: id_simulacion
                },
                transaction
            });
            await transaction.commit();
            res.send({"message": "Solicitud creada exitosamente"});
        } catch (error) {
            console.error(error);
            await transaction.rollback();
            res.status(500).json({ error: 'Error al crear la solicitud' });
        }
    }
}