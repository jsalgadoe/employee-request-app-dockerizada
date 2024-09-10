import { generarJwt } from "../../../helpers/jwt.js";
import { UserModel } from "../../../models/user.js";
import bcrypt from "bcryptjs";
import { userLoginSchema, userSchema } from "../../../schemas/userSchema.js";

export class AuthController {
  static login = async (req, res) => {
    try {
      const validDataLogin = await userLoginSchema.validate(req.body, {
        abortEarly: false,
      });
      const { name: username, password } = validDataLogin;

      const user = await UserModel.findByUserName(username);

      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario no existe",
        });
      }

      /** vallidar si esta activo */
      if (!user.status) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario no este activo contacte con el administrador",
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Password invalid",
        });
      }

      const token = await generarJwt(user.id, user.name, user.is_admin);
      res.json({
        ok: true,
        user: {
          id: user.id,
          name: user.name,
          is_admin: user.is_admin,
        },
        token: token,
      });
    } catch (error) {
      console.log(error.errors);
      res.status(500).json({
        ok: false,
        msg: `Por favor hable con el administrador`,
      });
    }
  };

  static register = async (req, res) => {
    try {
      const validDataRegister = await userSchema.validate(req.body, {
        abortEarly: false,
      });

      const { name } = validDataRegister;

      let user = await UserModel.findByUserName(name);

      if (user) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario ya existe",
        });
      }

      user = await UserModel.registerUser({
        ...validDataRegister,
        is_admin: false,
        status: false,
      });

      const token = await generarJwt(user.id, user.name, user.is_admin);

      res.status(201).json({
        ok: true,
        user: {
          id: user.id,
          name: user.name,
          is_admin: user.is_admin,
          status: user.status,
        },
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  };

  static validateToken = async (req, res) => {
    const id = req.id;
    const name = req.name;
    const is_admin = req.is_admin;
    //

    const user = await UserModel.findByUserId(id);

    const token = await generarJwt(user.id, user.name, user.is_admin);

    res.json({
      ok: true,
      user,
      token: token,
    });
  };

  static CreateAdmin = async (req, res) => {
    try {
      const name = "admin";
      let user = await UserModel.findByUserName(name);

      if (user) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario ya existe",
        });
      }

      user = await UserModel.registerUserAdmin({
        name: name,
        password: "123456",
        is_admin: true,
        status: true,
      });

      const token = await generarJwt(user.id, user.name, user.is_admin);

      res.status(201).json({
        ok: true,
        user: {
          id: user.id,
          name: user.name,
          is_admin: user.is_admin,
          status: user.status,
        },
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  };

  static ListarUsuarios = async (req, res) => {
    const { search_term = "", page_number = 1, page_size = 10 } = req.query;
    try {
      const pagination = await UserModel.findAll(
        search_term,
        page_number,
        page_size
      );
      if (!pagination) {
        return res.status(403).json({
          message: "error",
        });
      }
      return res.status(200).json({
        ok: true,
        pagination,
      });
    } catch (err) {
      res.status(400).json({ errors: err.errors });
    }
  };

  static UpdateUsuario = async (req, res) => {
    const user = await UserModel.findByUserId(req.params.id);

    const { is_admin: new_is_admin, status: new_is_status } = req.body;
    if (!user) {
      return res.status(200).json({
        ok: false,
        msg: "El usuario no existe, no puede actualizarlo",
      });
    }
    const { id, is_admin, status } = user;

    const updateUser = await UserModel.updateUser({
      id,
      is_admin: new_is_admin,
      status: new_is_status,
    });
    return res.status(200).json({
      ok: true,
      user: updateUser,
    });
  };
}
