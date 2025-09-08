const valores = {
  'Dobradinha M': 25,
  'Dobradinha G': 45,
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('itensContainer');

  container.addEventListener('change', calcularTotal);
  container.addEventListener('input', calcularTotal);

  document.getElementById('adicionarItem').addEventListener('click', () => {
    const novoItem = document.createElement('div');
    novoItem.classList.add('item');
    novoItem.innerHTML = `
      <select class="dobradinha">
        <option value="">Selecione</option>
        <option value="Dobradinha M">M - R$25,00</option>
        <option value="Dobradinha G">G - R$45,00</option>
      </select>
      <input type="number" class="quantidade" min="1" value="1" />
      <button type="button" class="removerItem">❌</button>
    `;
    container.appendChild(novoItem);
  });

  container.addEventListener('click', (e) => {
    if(e.target.classList.contains('removerItem')){
      e.target.parentElement.remove();
      calcularTotal();
    }
  });

  document.getElementById('finalizar').addEventListener('click', finalizarPedido);
});

function calcularTotal() {
  const items = document.querySelectorAll('#itensContainer .item');
  let total = 0;
  items.forEach(item => {
    const dobradinha = item.querySelector('.dobradinha').value;
    const quantidade = parseInt(item.querySelector('.quantidade').value) || 0;
    if(dobradinha) total += (valores[dobradinha] || 0) * quantidade;
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

  if(!nome || !telefone || !endereco || !numero){
    alert("Por favor, preencha todos os dados.");
    return;
  }
  if(!pagamento){
    alert("Por favor, selecione a forma de pagamento.");
    return;
  }

  const items = document.querySelectorAll('#itensContainer .item');
  let listaItens = '';
  items.forEach(item => {
    const dobradinha = item.querySelector('.dobradinha').value;
    const quantidade = parseInt(item.querySelector('.quantidade').value) || 0;
    if(dobradinha && quantidade > 0) listaItens += `- ${dobradinha} x${quantidade}%0A`;
  });

  if(!listaItens){
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

  if(pagamento === "Pix"){
    const chavePix = "17988018700";
    const pixURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pix%3A${chavePix}%3Famount%3D${total.toFixed(2)}%26name%3DCulinariaVAZ`;
    mensagem += `%0A🔑 *Chave Pix (Copia e Cola):* ${chavePix}%0A`;
    mensagem += `%0A📷 *QR Code Pix:* ${pixURL}%0A`;
  }

  const numeroWhatsApp = '5517988018700';
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  window.open(url, '_blank');
}
