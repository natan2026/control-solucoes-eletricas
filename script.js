const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const closeMenu = () => { nav?.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); toggle?.setAttribute('aria-label', 'Abrir menu'); };
toggle?.addEventListener('click', () => {
 const open = nav.classList.toggle('open');
 toggle.setAttribute('aria-expanded', String(open));
 toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
// Links anteriores de orçamento continuam chegando ao contato.
if (new URLSearchParams(location.search).has('orcamento') || location.hash === '#orcamento') {
 location.replace('index.html#contato');
}

// O formulário apenas prepara a conversa; o usuário revisa e envia no WhatsApp.
document.querySelector('#contact-form')?.addEventListener('submit', event => {
 event.preventDefault();
 const fields = new FormData(event.currentTarget);
 const name = String(fields.get('name') || '').trim();
 const company = String(fields.get('company') || '').trim();
 const email = String(fields.get('email') || '').trim();
 const message = String(fields.get('message') || '').trim();
 if (!name || !message || !event.currentTarget.reportValidity()) return;
 const text = `Olá, CONTROL Soluções Elétricas! Meu nome é ${name}.${email ? `\nE-mail: ${email}` : ''}${company ? `\nEmpresa: ${company}` : ''}\n\n${message}`;
 const url = 'https://wa.me/5512997146470?text=' + encodeURIComponent(text);
 const status = document.querySelector('.c-form-status');
 if (status) {
  status.replaceChildren();
  const fallback = document.createElement('a');
  fallback.href = url;
  fallback.target = '_blank';
  fallback.rel = 'noopener noreferrer';
  fallback.textContent = 'Se o WhatsApp não abrir, toque aqui para continuar.';
  status.append(fallback);
 }
 window.open(url, '_blank', 'noopener,noreferrer');
});
