let quartos = [];
let reservas = [];

let selectedRoom = null;
let deleteType = null;
let deleteIndex = null;

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');

  if (page === 'quartos') renderQuartos();
}

function adicionarQuarto() {
  const numeroInput = document.getElementById('numeroQuarto');
  const tipoInput = document.getElementById('tipoQuarto');

  if (!numeroInput.value || !tipoInput.value) return alert("Preencha tudo");

  quartos.push({ numero: numeroInput.value, tipo: tipoInput.value });
  
  numeroInput.value = '';
  tipoInput.value = '';

  showPage('quartos');
}

function renderQuartos() {
  const tbody = document.getElementById('listaQuartos');
  tbody.innerHTML = '';

  quartos.forEach((q, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${q.numero}</td>
        <td>${q.tipo}</td>
        <td>
          <div class="acoes-btns">
            <button onclick="verReservas(${i})" class="primary">👁 Ver Reservas</button>
            <button onclick="openDelete('quarto', ${i})" class="danger">🗑 Excluir</button>
          </div>
        </td>
      </tr>
    `;
  });
}

function verReservas(index) {
  selectedRoom = index;
  showPage('reservas');

  const div = document.getElementById('listaReservas');
  div.innerHTML = `
    <h3>Reservas do Quarto ${quartos[index].numero}</h3>
    <p>Tipo: ${quartos[index].tipo}</p>
    <button onclick="showPage('cadastroReserva')" class="primary">+ Nova Reserva</button>
    <br/><br/>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Hóspede</th>
          <th>Entrada</th>
          <th>Saída</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody id="tbodyReservas"></tbody>
    </table>
    <button class="sec" onclick="showPage('quartos')">Voltar</button>
  `;

  const tbody = document.getElementById('tbodyReservas');
  tbody.innerHTML = '';
  
  let contadorLocal = 1; 

  reservas.forEach((res, globalIndex) => {
    if (res.quarto == quartos[index].numero) {
      tbody.innerHTML += `
        <tr>
          <td>${contadorLocal++}</td>
          <td>${res.nome}</td>
          <td>${res.entrada}</td>
          <td>${res.saida}</td>
          <td><button class="danger" onclick="openDelete('reserva', ${globalIndex})">Excluir</button></td>
        </tr>
      `;
    }
  });
}

function listarTodasReservas() {
  selectedRoom = null; 
  showPage('reservas');
  
  const div = document.getElementById('listaReservas');

  if (reservas.length === 0) {
    div.innerHTML = `
      <h3>Todas as Reservas</h3>
      <br/>
      <p>Nenhuma reserva cadastrada no sistema até o momento.</p>
    `;
    return;
  }

  div.innerHTML = `
    <h3>Todas as Reservas do Hotel</h3>
    <br/>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Quarto</th>
          <th>Hóspede</th>
          <th>Entrada</th>
          <th>Saída</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody id="tbodyReservasGeral"></tbody>
    </table>
  `;

  const tbody = document.getElementById('tbodyReservasGeral');
  tbody.innerHTML = '';
  
  reservas.forEach((res, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>Nº ${res.quarto}</td>
        <td>${res.nome}</td>
        <td>${res.entrada}</td>
        <td>${res.saida}</td>
        <td>
          <button class="danger" onclick="openDelete('reserva', ${i})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function adicionarReserva() {
  const nomeInput = document.getElementById('nomeHospede');
  const entradaInput = document.getElementById('dataEntrada');
  const saidaInput = document.getElementById('dataSaida');

  if (!nomeInput.value || !entradaInput.value || !saidaInput.value) {
    return alert("Preencha todos os campos!");
  }

  if (selectedRoom === null) {
    return alert("Por favor, selecione um quarto na aba 'Quartos' antes de criar uma reserva.");
  }

  reservas.push({
    quarto: quartos[selectedRoom].numero,
    nome: nomeInput.value,
    entrada: AdvancedDateFormater(entradaInput.value), // Corrigido: Agora formata a entrada também
    saida: AdvancedDateFormater(saidaInput.value)
  });

  nomeInput.value = '';
  entradaInput.value = '';
  saidaInput.value = '';

  verReservas(selectedRoom);
}

function openDelete(type, index) {
  deleteType = type;
  deleteIndex = index;

  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modalText');

  modal.style.display = 'flex';
  modalText.innerText =
    type === 'quarto'
      ? `Deseja realmente excluir o quarto ${quartos[index].numero}?`
      : `Deseja realmente excluir esta reserva?`;
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function confirmDelete() {
  if (deleteType === 'quarto') {
    const numeroQuartoDeletado = quartos[deleteIndex].numero;
    reservas = reservas.filter(res => res.quarto !== numeroQuartoDeletado);
    
    quartos.splice(deleteIndex, 1);
    renderQuartos();
  }

  if (deleteType === 'reserva') {
    reservas.splice(deleteIndex, 1);
    
    if (selectedRoom !== null) {
      verReservas(selectedRoom);
    } else {
      listarTodasReservas();
    }
  }

  closeModal();
}

function AdvancedDateFormater(dateString) {
  if(!dateString) return "";
  const [ano, mes, dia] = dateString.split('-');
  return `${dia}/${mes}/${ano}`;
}
