const prisma = require("../prisma");

async function listar(req, res) {
  const quartos = await prisma.quartos.findMany();
  res.json(quartos);
}

async function cadastrar(req, res) {
  const { numero, tipo } = req.body;
  const quarto = await prisma.quartos.create({
    data: { numero, tipo }
  });
  res.status(201).json(quarto);
}

async function excluir(req, res) {
  await prisma.quartos.delete({
    where: { id: Number(req.params.id) }
  });
  res.send();
}

module.exports = {
  listar,
  cadastrar,
  excluir
};
