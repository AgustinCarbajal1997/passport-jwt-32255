const Route = require("./router");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserDao = require("../dao/user");
const user = new UserDao();
class UserRouter extends Route {
  init() {
    this.post("/user/login", ["PUBLIC"], async (req, res) => {
      try {
        const { email, password } = req.body;

        const data = await user.findOne(email);

        const match = await bcrypt.compare(password, data.password);
        if (!match) return res.sendUserError("Contraseña incorrecta");

        let token = jwt.sign({ email, role: data.role }, "secreto");
        res.sendSuccess({ token });
      } catch (error) {
        res.sendServerError("Ocurrio un error en el servidor");
      }
    });

    this.post("/user/register", ["PUBLIC"], async (req, res) => {
      try {
        let newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          age: req.body.age,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        };
        const data = await user.insertOne(newUser);
        console.log("data", data);
        res.sendSuccess("User created");
      } catch (error) {
        res.sendServerError("Ocurrio un error en el servidor");
      }
    });

    //crear tres rutas, una para publico en general, otra para usuarios de la app, otra para administradores
    this.get("/user/public", ["PUBLIC"], (req, res) => {
      res.sendSuccess("Hola desde public, no hace falta token");
    });
    this.get("/user/privateUser", ["USER"], (req, res) => {
      res.sendSuccess(`Hola desde private user, ${req.user.email}`);
    });
    this.get("/user/privateAdmin", ["ADMIN"], (req, res) => {
      res.sendSuccess(`Hola desde admin, ${req.user.email}`);
    });
  }
}

module.exports = UserRouter;
