import UserController from './UserController.js';
import SimulationController from './SimulationController.js';
import LoginController from './LoginController.js';
import SolicitudesController from './SolicitudesController.js';

export default (app) => {
	const userController = new UserController();
	const simulationController = new SimulationController();
	const loginController = new LoginController();
	const solicitudesController = new SolicitudesController();

	app.get('/users', userController.getAll);
	app.post('/users', userController.create);
	app.get('/users/:userId', userController.get);
	app.put('/users/:userId', userController.update);
	app.delete('/users/:userId', userController.delete);

  	app.get('/simulations', simulationController.getAllSimulations);
	app.put('/simulations/all', simulationController.getSimulationsByUserId);
  	app.post('/simulations', simulationController.createSimulation);
  	app.get('/simulations/:id', simulationController.getSimulationById);
  	app.put('/simulations/:id', simulationController.updateSimulation);
  	app.delete('/simulations/:id', simulationController.deleteSimulation);

	app.get('/solicitudes', solicitudesController.getAllSolicitudes);

	app.get('/uf', simulationController.ufValue);

	app.put('/login',loginController.login);
	app.get('/login',loginController.get);
};