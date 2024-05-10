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

    async getAllSolicitudesByUserId(req, res) {
        try {
            const { userId } = req.body;
            const solicitudes = await Solicitudes.findAll({
                attributes: ['id', 'userRut', 'totalAmount', 'startDate', 'endDate', 'estado'],
                where: {
                    id_ejecutivo: userId
                }
            });
            //En esta parte, formateo las fechas desde timestamp with timezone a solo date
            let formateadas = [];
            solicitudes.forEach(solicitud => {
                let startDate = new Date(solicitud.startDate).toISOString().slice(0, 10);
                let endDate = new Date(solicitud.endDate).toISOString().slice(0, 10);
                formateadas.push({ id: solicitud.id, userRut: solicitud.userRut, totalAmount: solicitud.totalAmount, startDate: startDate, endDate: endDate , estado: solicitud.estado});
            });
            res.send(formateadas);
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
                estado: "Pendiente"
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

    //Función para obtener id,id_ejecutivo, rut, monto solicitado, fecha inicio, fecha termino. de las solicitudes
    async infoSupervisor(req, res) {
        try {
            const solicitudes = await Solicitudes.findAll({
                attributes: ['id', 'id_ejecutivo', 'userRut', 'totalAmount', 'startDate', 'endDate'],
                where: {
                    estado: 'Pendiente'
                }
            });
            //En esta parte, formateo las fechas desde timestamp with timezone a solo date
            let formateadas = [];
            solicitudes.forEach(solicitud => {
                let startDate = new Date(solicitud.startDate).toISOString().slice(0, 10);
                let endDate = new Date(solicitud.endDate).toISOString().slice(0, 10);
                formateadas.push({ id: solicitud.id, id_ejecutivo: solicitud.id_ejecutivo, userRut: solicitud.userRut, totalAmount: solicitud.totalAmount, startDate: startDate, endDate: endDate });
            });
            res.send(formateadas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las solicitudes' });
        }
    }
}