

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getUsuarios, createUsuarios, updateUsario, deleteUsuario } = require('../controllers/usuarios.controller');

const { validarJWT } = require('../middleware/validar-jwt')

const router = Router();

router.get('/',
    validarJWT,
    getUsuarios);

router.post('/',
    [
        check('nombre', 'es obligatorio').not().isEmpty(),
        check('password', 'es requerido').not().isEmpty(),
        check('email', 'es requerido').not().isEmpty(),
        validarCampos
    ],
    createUsuarios);
router.delete('/:id', deleteUsuario);


module.exports = router;