const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRol } = require("../middlewares/validar-role");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  getUserById,
} = require("../controllers/usuarios");

const router = Router();

router.get(
  "/",
  [
    validarJWT,
    //validar si es administrador
    tieneRol("ADMIN_ROLE", "GERENTE"),
  ],
  usuariosGet
);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un Id válido").isMongoId(),
    // check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  getUserById
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("dni", "El dni es obligatorio").notEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(emailExiste),
    // check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuarioPost
);
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un Id válido").isMongoId(),
    // check("id").custom(existeUsuarioPorId),
    // check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuarioPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    //validar si es administrador
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuarioDelete
);

module.exports = router;