import { Router } from "express";
import { check, param } from "express-validator";

import { AuthController } from "../controllers/v1/auth/auth.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { verificarAdmin } from "../middlewares/verificar_admin.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("El usuario es obligatorio")
      .isString()
      .withMessage("El usuario debe ser una cadena")
      .isLength({ min: 4 })
      .withMessage("El usuario debe tener al menos 4 caracteres"),

    check("password")
      .trim()
      .escape()
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    validarCampos,
  ],
  AuthController.login
);
authRouter.post(
  "/register",
  [
    check("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("El usuario es obligatorio")
      .isString()
      .withMessage("El usuario debe ser una cadena")
      .isLength({ min: 4 })
      .withMessage("El usuario debe tener al menos 4 caracteres"),

    check("password")
      .trim()
      .escape()
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),

    validarCampos,
  ],
  AuthController.register
);
authRouter.get("/renew", validarJWT, AuthController.validateToken);

authRouter.get("/create-admin", AuthController.CreateAdmin);

authRouter.get("/listar-usuarios", AuthController.ListarUsuarios);

authRouter.put(
  "/edit/:id",
  [
    param("id")
      .trim()
      .escape()
      .isInt({ min: 1 })
      .withMessage("El identificador del usuario debe ser un entero positivo"),
    check("is_admin")
      .isBoolean()
      .withMessage("El campo is_admin debe ser un booleano")
      .toBoolean(),
    check("status")
      .isBoolean()
      .withMessage("El campo status debe ser un booleano")
      .toBoolean(),
    validarCampos,
    validarJWT,
    verificarAdmin,
  ],
  AuthController.UpdateUsuario
);
