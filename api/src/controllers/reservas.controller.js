const prisma = require("../prisma");

async function listar(req, res) {
  const reservas = await prisma.reservas.findMany({
    where: { quartoId: Number(req.params.id) }
  });
  res.json(reservas);
}

async function cadastrar(req, res) {
  const { hospede, data_entrada, data_saida, quartoId } = req.body;
  const reserva = await prisma.reservas.create({
    data: {
      hospede,
      data_entrada: new Date(data_entrada),
      data_saida: new Date(data_saida),
      quartoId
    }
  });
  res.status(201).json(reserva);
}

async function excluir(req, res) {
  const id = Number(req.params.id);
  const reserva = await prisma.reservas.findUnique({
    where: { id }
  });

  if (!reserva) {
    return res.status(404).json({ erro: "Reserva não encontrada" });
  }

  await prisma.reservas.delete({
    where: { id }
  });

  res.json({ mensagem: "Reserva excluída" });
}

module.exports = {
  listar,
  cadastrar,
  excluir
};
