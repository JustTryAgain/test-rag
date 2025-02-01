document.querySelector('.send-btn')
  .addEventListener('click', async function () {
    const inputField = document.getElementById('user-input');
    const query = inputField.value.trim();
    if (!query) return;
    inputField.value = '';
    appendMessage('user', query);
    await fetchLLMResponse(query);
  });

function appendMessage(role, text, sources = []) {
  const chatBox = document.querySelector('.chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', role);

  if (role === 'bot') {
    chatBox.appendChild(messageDiv);
    streamText(messageDiv, text);
  } else {
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
  }

  if (sources.length > 0) {
    const sourcesDiv = document.createElement('div');
    sourcesDiv.classList.add('source-block');
    sourcesDiv.textContent = 'Sources: ';

    sources.forEach(source => {
      const link = document.createElement('a');
      link.href = source.url;
      link.target = '_blank';
      link.textContent = source.title;
      link.classList.add('source-block-link');
      sourcesDiv.appendChild(link);
    });
    chatBox.appendChild(sourcesDiv);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

function streamText(element, text) {
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

async function fetchLLMResponse(query) {
  appendMessage('bot', 'Thinking...');
  // const response = await fetch("/agent", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ query })
  // });
  // const data = await response.json();
  document.querySelector('.bot:last-child').remove();
  appendMessage('bot', 'LOng answer text etc', [
    {
      'title': 'BBC',
      'url': 'https://www.example.com/news-article',
      'date': '2025-01-21T13:17:36Z'
    },
    {
      'title': 'CBD',
      'url': 'https://www.example.com/news-article',
      'date': '2025-01-21T13:17:36Z'
    }
  ]);
}