/* ============================================================
   EasyHub — comportamento da página
   ============================================================ */

/* Contatos opcionais: preencha para o card aparecer na seção Contatos.
   Deixe "" para esconder.
   - email: "nome@dominio.com"
   - whatsapp: só números, com DDI e DDD (ex.: "5581999999999") */
const CONTATOS = {
  email: "",
  whatsapp: "",
};

(() => {
  const header = document.querySelector(".site-header");
  const toast = document.querySelector(".toast");

  // Cabeçalho ganha sombra ao rolar
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Aviso rápido
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  // ---------- Filtro dos cards ----------
  const chips = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".card[data-status]");
  const empty = document.querySelector(".filter-empty");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      let visible = 0;
      cards.forEach((card) => {
        const status = card.dataset.status;
        // O card "Próximo projeto" (status "all") só aparece em "Todos"
        const show = filter === "all" || status === filter;
        card.hidden = !show;
        if (show && status !== "all") visible++;
      });
      empty.hidden = visible > 0;
    });
  });

  // ---------- Janelas de detalhes ----------
  document.querySelectorAll("[data-open]").forEach((btn) => {
    const dialog = document.getElementById(btn.dataset.open);
    if (!dialog) return;
    btn.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  });

  document.querySelectorAll("dialog.details").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      // Fecha ao clicar no X ou fora da janela
      if (e.target.closest("[data-close]") || e.target === dialog) dialog.close();
    });
  });

  // ---------- Contatos opcionais ----------
  const email = CONTATOS.email.trim();
  if (email) {
    const item = document.querySelector('[data-contact="email"]');
    item.querySelector(".ci-link").href = `mailto:${email}`;
    item.querySelector("[data-contact-label]").textContent = email;
    item.querySelector("[data-copy]").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        showToast("E-mail copiado");
      } catch {
        showToast(email);
      }
    });
    item.hidden = false;
  }

  const whatsapp = CONTATOS.whatsapp.replace(/\D/g, "");
  if (whatsapp) {
    const item = document.querySelector('[data-contact="whatsapp"]');
    item.querySelector("a").href = `https://wa.me/${whatsapp}`;
    // Mostra no formato +55 (81) 99999-9999 quando possível
    const m = whatsapp.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/);
    item.querySelector("[data-contact-label]").textContent = m ? `+${m[1]} (${m[2]}) ${m[3]}-${m[4]}` : `+${whatsapp}`;
    item.hidden = false;
  }

  // Ano no rodapé
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
