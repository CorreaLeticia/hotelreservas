const router =
require("express")
.Router();

const controller =
require(
"../controllers/reservas.controller"
);

router.get(
"/:id",
controller.listar
);

router.post(
"/",
controller.cadastrar
);

router.delete(
"/:id",
controller.excluir
);

module.exports=
router;