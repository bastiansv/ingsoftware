import User from '../models/User.js';

export default class UserController {
	 async getAll(req, res) {
		const users = await User.findAll();
		res.send(users);
	}

	async getBynombre(req, res) {
		const users = await User.findAll({
			where: {
				name: req.params.name
			}
		});
		res.send(users);
	}

	async get(req, res) {
		const user = await User.findByPk(req.params.userId);
		res.send(user);
	}

	async create(req, res) {
		const user = await User.create({
			name: req.body.name,
			password: req.body.password,
		});
		res.send(user);
	}

	async update(req, res) {
		const user = await User.findByPk(req.params.userId);
		user.update({name: req.body.name, password: req.body.password});
		res.send(user);
	}

	async delete(req, res) {
		await User.destroy({where: {id: req.params.userId}});
		res.send({status: "ok"});
	}
};


