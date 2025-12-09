document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');

  let history = [];

  function appendMessage(role, text) {
    const el = document.createElement('div');
    el.className = role === 'user' ? 'chat-msg user' : 'chat-msg bot';
    el.textContent = text;
    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    appendMessage('user', message);
    input.value = '';
    history.push({role: 'user', content: message});

    const res = await fetch('/chatbot', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message: message, history: history})
    });
    const data = await res.json();
    appendMessage('bot', data.response);
    history.push({role: 'assistant', content: data.response});
  });
});
