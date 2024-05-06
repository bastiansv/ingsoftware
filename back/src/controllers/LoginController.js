import User from '../models/User.js';

export default class {
  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        },
      });

      if (user) {
        //Aqui verifico si el usuario es @ejecutivo.cl, @analista.cl o @gerente.cl
        if (user.email.includes("@ejecutivo.cl")) {
          res.send({ user, role: "ejecutivo" });
        } else if (user.email.includes("@analista.cl")) {
          res.send({ user: user, role: "analista" });
        } else if (user.email.includes("@gerente.cl")) {
          res.send({ user: user, role: "gerente" });
        } 
      } else {
        res.status(401).send({ error: "Usuario o contraseña incorrectos" });
      }
    } catch (error) {
      res.status(500).send({ error: "Error de servidor" });
    }
  }

  async get(req, res) {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  }
}
