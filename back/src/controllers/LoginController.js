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
          //Mando el id del usuario y el rol
          res.send({ id: user.id  , role: "ejecutivo" });
        } else if (user.email.includes("@analista.cl")) {
          res.send({ id: user.id, role: "analista" });
        } else if (user.email.includes("@gerente.cl")) {
          res.send({ id: user.id, role: "gerente" });
        } 
      } else {
        res.status(401).send({ message: "Usuario o contraseña incorrectos" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error de servidor" });
    }
  }

  async get(req, res) {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  }
}
