const valores = {
  'Dobradinha M': 25,
  'Dobradinha G': 45,
};

const chavePix = "17988018700";
const nomeEmpresa = "CulinariaVAZ";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('itensContainer');

  // Atualiza total ao mudar dropdown ou quantidade
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

    // Garante animação fadeIn
    setTimeout(() => {
      itemTemplate.style.opacity = '1';
      itemTemplate.style.transform = 'translateY(0)';
    }, 10);
  });

  // Remover item com animação
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('removerItem')) {
      const item = e.target.parentElement;
      item.classList.add('removing');
      item.addEventListener('animationend', () => {
        item.remove();
        calcularTotal();
      });
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
    const quantidade = parseInt(item.querySelector('.quantidade').value) || 0;
    if (dobradinha && quantidade > 0) listaItens += `- ${dobradinha} x${quantidade}%0A`;
  });

  if (!listaItens) {
    alert("Por favor, selecione pelo menos 1 item do cardápio.");
    return;
  }

  let mensagem = `*👨🏻‍🍳 Pedido - Culinária VAZ*%0A`;
  mensagem += `👤 *Nome:* ${nome}%0A`;
  mensagem += `📞 *Telefone:* ${telefone}%0A`;
  mensagem += `📍 *Endereço:* ${endereco}, ${numero}%0A%0A`;
  mensagem += `*🧾 Itens:*%0A${listaItens}`;
  mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2).replace('.', ',')}%0A`;
  mensagem += `💳 *Pagamento:* ${pagamento}%0A`;

  // Adiciona QR Pix se pagamento for Pix
  if (pagamento === "Pix") {
    const valorPix = total.toFixed(2);
    const pixURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pix%3A${chavePix}%3Famount%3D${valorPix}%26name%3D${encodeURIComponent(nomeEmpresa)}`;
    mensagem += `%0A🔑 *Chave Pix (Copia e Cola):* ${chavePix}%0A`;
    mensagem += `%0A📷 *QR Code Pix:* ${pixURL}%0A`;
  }

  const numeroWhatsApp = '5517988018700';
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  window.open(url, '_blank');
}
