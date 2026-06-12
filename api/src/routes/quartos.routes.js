const router =
require("express")
.Router();

const controller =
require(
"../controllers/quartos.controller"
);

router.get(
"/",
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