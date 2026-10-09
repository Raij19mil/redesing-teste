/* The Latvian — interações do site.
   Ajuste LATVIAN_CONFIG antes de publicar (ver README). */
const LATVIAN_CONFIG = {
  // Endpoint que recebe o formulário via POST (Formspree, Getform, n8n, API própria...).
  // Vazio = abre o e-mail do visitante com a mensagem pronta para o endereço abaixo.
  formEndpoint: "",
  email: "contato@latvian.com.br", // CONFIRMAR
  // Link da área do associado (login). Vazio = leva ao contato.
  memberAreaUrl: "",
};

document.documentElement.classList.add("js");

/* Área do associado ------------------------------------------------- */
if (LATVIAN_CONFIG.memberAreaUrl) {
  document.querySelectorAll("[data-member-link]").forEach((a) => {
    a.href = LATVIAN_CONFIG.memberAreaUrl;
  });
}

/* Cabeçalho --------------------------------------------------------- */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* Menu móvel -------------------------------------------------------- */
const menu = document.getElementById("mobile-menu");
const openBtn = document.querySelector("[data-menu-open]");
const closeBtn = document.querySelector("[data-menu-close]");
if (menu && openBtn && closeBtn) {
  const setOpen = (open) => {
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    openBtn.setAttribute("aria-expanded", String(open));
    (open ? closeBtn : openBtn).focus();
  };
  openBtn.addEventListener("click", () => setOpen(true));
  closeBtn.addEventListener("click", () => setOpen(false));
  menu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key !== "Tab") return;
    const items = menu.querySelectorAll("a, button");
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  window.matchMedia("(min-width: 981px)").addEventListener("change", (m) => { if (m.matches && !menu.hidden) setOpen(false); });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Cartão de associado: inclinação ----------------------------------- */
document.querySelectorAll(".member-card").forEach((card) => {
  if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
  const stage = card.parentElement;
  stage.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.classList.add("is-tilting");
    card.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    card.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
    card.style.setProperty("--gx", `${x * 100}%`);
    card.style.setProperty("--gy", `${y * 100}%`);
  });
  stage.addEventListener("pointerleave", () => {
    card.classList.remove("is-tilting");
    ["--rx", "--ry"].forEach((p) => card.style.setProperty(p, "0deg"));
    card.style.setProperty("--gx", "50%");
    card.style.setProperty("--gy", "50%");
  });
});

/* Revelação --------------------------------------------------------- */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

/* Um dia no clube: os abajures acendem com a leitura ---------------- */
const hours = [...document.querySelectorAll(".hour")];
if (hours.length) {
  const update = () => {
    const vh = window.innerHeight;
    hours.forEach((h) => h.classList.toggle("is-lit", h.getBoundingClientRect().top < vh * 0.7));
  };
  if (reduceMotion) hours.forEach((h) => h.classList.add("is-lit"));
  else { update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update); }
}

/* Hero: a luz do abajur segue o visitante --------------------------- */
const hero = document.querySelector(".hero");
const dark = document.querySelector(".hero__dark");
if (hero && dark && !reduceMotion) {
  let tx = 50, ty = 62, x = 50, y = 62, raf = 0, idle = 0;
  const loop = () => {
    x += (tx - x) * 0.08; y += (ty - y) * 0.08;
    dark.style.setProperty("--x", `${x.toFixed(2)}%`);
    dark.style.setProperty("--y", `${y.toFixed(2)}%`);
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(loop) : 0;
  };
  const aim = (nx, ny) => { tx = nx; ty = ny; if (!raf) raf = requestAnimationFrame(loop); };
  if (window.matchMedia("(hover: hover)").matches) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      aim(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
    });
    hero.addEventListener("pointerleave", () => aim(50, 62));
  } else {
    // Toque: a luz passeia devagar pela sala.
    const drift = (t) => { aim(50 + Math.sin(t / 3200) * 22, 58 + Math.cos(t / 4100) * 10); idle = requestAnimationFrame(drift); };
    idle = requestAnimationFrame(drift);
    new IntersectionObserver(([en]) => { if (!en.isIntersecting) cancelAnimationFrame(idle); else idle = requestAnimationFrame(drift); }).observe(hero);
  }
}

/* Formulário de convite / contato ----------------------------------- */
const form = document.querySelector("[data-invite-form]");
if (form) {
  const nameOut = document.querySelector("[data-card-name]");
  const companyOut = document.querySelector("[data-card-company]");
  const nameIn = form.elements.namedItem("nome");
  const companyIn = form.elements.namedItem("empresa");
  const status = form.querySelector(".form__status");
  const submit = form.querySelector("[type=submit]");

  // Assunto vindo do link (?assunto=evento)
  const subject = new URLSearchParams(location.search).get("assunto");
  const subjectSelect = form.elements.namedItem("assunto");
  if (subject && subjectSelect && [...subjectSelect.options].some((o) => o.value === subject)) subjectSelect.value = subject;

  // Gravação do nome no cartão
  let engraveTimer;
  const engrave = () => {
    if (!nameOut) return;
    const v = nameIn.value.trim();
    nameOut.textContent = v || nameOut.dataset.placeholder;
    clearTimeout(engraveTimer);
    engraveTimer = setTimeout(() => {
      nameOut.classList.remove("is-engraving");
      void nameOut.offsetWidth;
      nameOut.classList.add("is-engraving");
    }, 120);
  };
  if (nameIn && nameOut) { nameOut.dataset.placeholder = nameOut.textContent; nameIn.addEventListener("input", engrave); }
  if (companyIn && companyOut) {
    companyOut.dataset.placeholder = companyOut.textContent;
    companyIn.addEventListener("input", () => { companyOut.textContent = companyIn.value.trim() || companyOut.dataset.placeholder; });
  }

  // Máscara simples de telefone BR
  const phone = form.elements.namedItem("whatsapp");
  if (phone) phone.addEventListener("input", () => {
    const d = phone.value.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    phone.value = out;
  });

  const messages = {
    nome: "Diga como podemos chamar você.",
    email: "Informe um e-mail válido, como nome@empresa.com.br.",
    whatsapp: "Informe o WhatsApp com DDD, como (71) 99999-9999.",
    assunto: "Escolha o assunto da mensagem.",
  };
  const validate = (el) => {
    const field = el.closest(".field");
    if (!field) return true;
    const err = field.querySelector(".field__error");
    let msg = "";
    if (el.name === "whatsapp" && el.value && el.value.replace(/\D/g, "").length < 10) msg = messages.whatsapp;
    else if (!el.checkValidity()) msg = messages[el.name] || "Preencha este campo.";
    if (msg) { field.setAttribute("data-invalid", ""); el.setAttribute("aria-invalid", "true"); }
    else { field.removeAttribute("data-invalid"); el.removeAttribute("aria-invalid"); }
    if (err) err.textContent = msg;
    return !msg;
  };
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.addEventListener("blur", (e) => {
      // Indo direto ao botão de envio, a validação do submit cuida disso (evita o botão "fugir" do clique).
      if (e.relatedTarget && e.relatedTarget.type === "submit") return;
      if (el.value) validate(el);
    });
    el.addEventListener("input", () => { if (el.closest("[data-invalid]")) validate(el); });
  });

  const show = (tone, title, text) => {
    status.hidden = false;
    status.dataset.tone = tone;
    status.innerHTML = "";
    const s = document.createElement("strong"); s.textContent = title;
    status.append(s, document.createTextNode(text));
    status.focus();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("input:not([type=radio]), select, textarea")];
    const invalid = fields.filter((el) => !validate(el));
    if (invalid.length) {
      show("error", "Faltam alguns dados.", " Revise os campos destacados e envie novamente.");
      invalid[0].focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const first = (data.nome || "").split(" ")[0];

    if (!LATVIAN_CONFIG.formEndpoint) {
      const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
      const subj = form.dataset.subject || "Solicitação de convite — The Latvian";
      location.href = `mailto:${LATVIAN_CONFIG.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
      show("ok", "Quase lá.", ` Abrimos seu aplicativo de e-mail com a mensagem pronta. Se ele não abrir, escreva para ${LATVIAN_CONFIG.email}.`);
      return;
    }

    submit.setAttribute("aria-busy", "true");
    submit.disabled = true;
    const label = submit.querySelector("span");
    const original = label.textContent;
    label.textContent = "Enviando…";
    try {
      const res = await fetch(LATVIAN_CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      if (nameOut) nameOut.textContent = first ? `${first}, bem-vindo` : nameOut.dataset.placeholder;
      show("ok", `Recebemos sua solicitação${first ? `, ${first}` : ""}.`, " Nossa equipe entra em contato em breve pelo WhatsApp ou e-mail informado.");
    } catch {
      show("error", "Não conseguimos enviar agora.", ` Seus dados continuam no formulário. Tente de novo em instantes ou escreva para ${LATVIAN_CONFIG.email}.`);
    } finally {
      submit.removeAttribute("aria-busy");
      submit.disabled = false;
      label.textContent = original;
    }
  });
}

/* Ano no rodapé */
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
