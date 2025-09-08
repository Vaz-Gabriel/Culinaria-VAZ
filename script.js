const valores = {
  'Dobradinha M': 25,
  'Dobradinha G': 45,
};

const chavePix = "17988018700";
const nomeEmpresa = "CulinariaVAZ";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('itensContainer');

  // Calcular total ao mudar qualquer dropdown ou quantidade
  container.addEventListener('change', calcularTotal);
  container.addEventListener('input', calcularTotal);

  // Adicionar novo item
  document.getElementById('adicionarItem').addEventListener('click', () => {
    const itemTemplate = document.createElement('div');
    itemTemplate.classList.add('item');
    itemTemplate.innerHTML = `
      <label>DOBRADINHA:</label>
      <select class="dobradinha">
        <option value="">Selecione</option>
        <option value="Dobradinha M">M - R$25,00</option>
        <option value="Dobradinha G">G - R$45,00</option>
      </select>
      <input type="number" class="quantidade" min="1" value="1" />
      <button type="button" class="removerItem">❌</button>
    `;
    container.appendChild(itemTemplate);
  });

  // Remover item
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('removerItem')) {
      e.target.parentElement.remove();
      calcularTotal();
    }
  });

  // Finalizar pedido
  document.getElementById('finalizar').addEventListener('click', finalizarPedido);
});

function calcularTotal() {
  const items = document.querySelectorAll('#itensContainer .item');
  let total = 0;

  items.forEach(item => {
    const dobradinha = item.querySelector('.dobradinha').value;
    const quantidade = parseInt(item.querySelector('.quantidade').value) || 0;
    if (dobradinha) {
      total += (valores[dobradinha] || 0) * quantidade;
    }
  });

  document.getElementById('total').innerText = "Total: R$ " + total.toFixed(2).replace('.', ',');
  return total;
}

function finalizarPedido() {
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const pagamento = document.getElementById('pagamento').value;
  const total = calcularTotal();

  if (!nome || !telefone || !endereco || !numero) {
    alert("Por favor, preencha todos os dados.");
    return;
  }

  if (!pagamento) {
    alert("Por favor, selecione a forma de pagamento.");
    return;
  }

  const items = document.querySelectorAll('#itensContainer .item');
  let listaItens = '';
  items.forEach(item => {
    const dobradinha = item.querySelector('.dobradinha').value;
    const quantidade = parseInt(item
