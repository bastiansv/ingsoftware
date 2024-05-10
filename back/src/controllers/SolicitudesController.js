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

    //Función para obtener el monto total de créditos con estado "aprobado" en cierto periodo de tiempo (entre ciertas fechas), como tambien
    //mostrando los intereses asociados a estos créditos
    async informeCreditosOtorgados(req, res) {
        try {
            //startDate y endDate son fechas en formato "YYYY-MM-DD"
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const interesesCreditos = await sequelize.query(
                `SELECT "id","interestRate" FROM "Solicitudes" WHERE "estado" = 'Aprobado' AND "startDate" >= '${startDate}' AND "startDate" <= '${endDate}'`,
                { type: sequelize.QueryTypes.SELECT }
            );
            //Aqui calculo el monto total de los creditos otorgados en el periodo de tiempo, con una query
            const totalOtorgados = await sequelize.query(`SELECT SUM("totalAmount") FROM "Solicitudes" WHERE "estado" = 'Aprobado' AND "startDate" >= '${startDate}' AND "startDate" <= '${endDate}'`,)

            res.json({ total: totalOtorgados[0][0].sum , intereses: interesesCreditos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el informe de créditos otorgados' });
        }
    }
}