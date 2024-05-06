import Simulation from '../models/Simulation.js';
import axios from 'axios';

export default class SimulationController {
  async getAllSimulations(req, res) {
    try {
      const simulations = await Simulation.findAll();
      res.send(simulations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las simulaciones' });
    }
  }

  async getSimulationById(req, res) {
    try {
      const simulation = await Simulation.findByPk(req.params.id);
      if (!simulation) {
        res.status(404).json({ error: 'Simulación no encontrada' });
        return;
      }
      res.send(simulation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la simulación' });
    }
  }

  async getSimulationsByUserId(req, res) {
    try {
      
      const userId = req.body.userId;
      console.log(userId);
  
      // Buscar todas las simulaciones que coincidan con el userId
      const simulations = await Simulation.findAll({
        where: { userId: userId },
      });
  
      if (!simulations || simulations.length === 0) {
        res.status(404).json({ error: 'Simulaciones no encontradas para el usuario' });
        return;
      }
  
      res.send(simulations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las simulaciones' });
    }
  }  

  async ufValue(req, res) {
    try {
      // Obtener el valor de la UF desde la API externa
      const ufApiResponse = await axios.get('https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=40aed7af8daabc8bdcf30f283916c2413e4e6099&formato=json');
      let ufValue = ufApiResponse.data.UFs[0].Valor;
      res.send(ufValue);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el valor de la UF' });
    }
  }


  async createSimulation(req, res) {
    try {
      //El req tiene la siguiente estructura: {userId, userRut, totalAmount, startDate, endDate, interestRate}

      // Obtener el valor de la UF desde la API externa
      const ufApiResponse = await axios.get('https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=40aed7af8daabc8bdcf30f283916c2413e4e6099&formato=json');
      let ufValue = ufApiResponse.data.UFs[0].Valor;
  
      // Verificar si ufValue es un número y convertirlo a cadena si es necesario
      if (typeof ufValue === 'number') {
        ufValue = ufValue.toString();
      }
  
      // Realizar el reemplazo si ufValue es una cadena
      if (typeof ufValue === 'string') {
        ufValue = ufValue.replace('.', '');
        ufValue = ufValue.replace(',', '.');
        // Convertir la cadena resultante a un valor numérico
        ufValue = parseFloat(ufValue);
      }
  
      // Crear la simulación con el valor de la UF
      const simulation = await Simulation.create({
        ...req.body,
        ufValueAtCreation: ufValue, // Ajusta el nombre del campo según tu modelo
      });
  
      //Aqui seteo los datos en un json para que en el frontend se cree una tabla con las columnas: N°Cuota, Fecha de vencimiento, Monto en UF
      let cuotas = [];
      let totalAmount = simulation.totalAmount; //Esto es en pesos
      let startDate = new Date(simulation.startDate);
      let endDate = new Date(simulation.endDate);
      let interestRate = simulation.interestRate;
      let totalInterest = totalAmount * interestRate //Esto es en pesos
      let totalAmountWithInterest = totalAmount + totalInterest;
      totalAmountWithInterest = parseFloat(totalAmountWithInterest);
      let totalCuotas = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
      let cuota = totalAmountWithInterest / totalCuotas;
      let cuotaUF = cuota / ufValue;
      cuotaUF = cuotaUF.toFixed(2);
      let fecha = startDate;

      let i = 1;
      while (fecha < endDate) {
        // Crear una nueva variable para la fecha formateada
        let fechaFormateada = new Date(fecha).toISOString().slice(0, 10);
        cuotas.push({ nCuota: i, fechaVencimiento: fechaFormateada, montoUF: cuotaUF });
        fecha.setMonth(fecha.getMonth() + 1);
        i++;
      }
      res.send({cuotas });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la simulación' });
    }
  }
  

  async updateSimulation(req, res) {
    try {
      const simulation = await Simulation.findByPk(req.params.id);
      if (!simulation) {
        res.status(404).json({ error: 'Simulación no encontrada' });
        return;
      }
      await simulation.update(req.body);
      res.send(simulation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la simulación' });
    }
  }

  async deleteSimulation(req, res) {
    try {
      const simulation = await Simulation.findByPk(req.params.id);
      if (!simulation) {
        res.status(404).json({ error: 'Simulación no encontrada' });
        return;
      }
      await simulation.destroy();
      res.send({ status: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la simulación' });
    }
  }
}


