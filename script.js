const valores = {
  'Dobradinha M': 25,
  'Dobradinha G': 45,
};

function calcularTotal() {
  const dobradinha = document.getElementById('dobradinha').value;
  const total = valores[dobradinha] || 0;

  document.getElementById('total').innerText = "Total: R$ " + total.toFixed(2).replace('.', ',');
  return total;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('dobradinha').addEventListener('change', calcularTotal);
  document.getElementById('finalizar').addEventListener('click', finalizarPedido);
});

function finalizarPedido() {
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const dobradinha = document.getElementById('dobradinha').value;
  const total = calcularTotal();

  if (!dobradinha) {
    alert("Por favor, selecione pelo menos 1 item do cardápio.");
    return;
  }

  if (!nome || !telefone || !endereco || !numero) {
    alert("Por favor, preencha todos os dados.");
    return;
  }

  let mensagem = `*👨🏻‍🍳 Pedido - Culinária VAZ*%0A`;
  mensagem += `👤 *Nome:* ${nome}%0A`;
  mensagem += `📞 *Telefone:* ${telefone}%0A`;
  mensagem += `📍 *Endereço:* ${endereco}, ${numero}%0A%0A`;
  mensagem += `*🧾 Itens:*%0A- ${dobradinha}%0A`;
  mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2).replace('.', ',')}%0A`;

  const numeroWhatsApp = '5517988018700';
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  window.open(url, '_blank');
}
