/* ============================================================
   EasyHub — Tema claro/escuro

   Carregue no <head>, ANTES das folhas de estilo e sem `defer`,
   para aplicar o tema antes da primeira pintura (evita o "flash" branco).

   - Preferência salva em localStorage ("easyhub-theme"): light | dark | system
   - "system" segue o sistema operacional (prefers-color-scheme)
   - Qualquer elemento com [data-theme-toggle] alterna o tema ao ser clicado
   ============================================================ */

(() => {
  const STORAGE_KEY = "easyhub-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function readPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "system";
    } catch {
      return "system";
    }
  }

  function resolve(preference) {
    if (preference === "light" || preference === "dark") return preference;
    return media.matches ? "dark" : "light";
  }

  function apply(preference) {
    const theme = resolve(preference);
    root.dataset.theme = theme;
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      // Interruptor (role="switch"): ligado = tema escuro
      btn.setAttribute("aria-checked", String(theme === "dark"));
      btn.setAttribute("title", `Ativar tema ${theme === "dark" ? "claro" : "escuro"}`);
    });
  }

  function save(preference) {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      /* navegação privada: o tema vale só para esta página */
    }
  }

  apply(readPreference());

  media.addEventListener("change", () => {
    if (readPreference() === "system") apply("system");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-theme-toggle]")) return;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    save(next);
    apply(next);
  });

  // Atualiza os interruptores quando o HTML terminar de carregar
  document.addEventListener("DOMContentLoaded", () => apply(readPreference()));
})();
