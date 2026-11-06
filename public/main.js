(function () {
  "use strict";

  const data = window.__BRAND__ || {};
  const $ = (s, sc) => (sc || document).querySelector(s);
  const $$ = (s, sc) => Array.from((sc || document).querySelectorAll(s));
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }
  const wa = (num, text) => "https://wa.me/" + num + "?text=" + encodeURIComponent(text);
  const open = text => window.open(wa(data.whatsapp, text), "_blank", "noopener");

  function initLinks() {
    $$("[data-maker]").forEach(a => { a.href = wa(data.makerWhatsapp, data.makerText); a.target = "_blank"; a.rel = "noopener"; });
    $$("[data-wa-contacto]").forEach(a => { a.href = wa(data.whatsapp, "¡Buenas! Quiero sacar un turno."); a.target = "_blank"; a.rel = "noopener"; });
    const club = $("[data-club]");
    if (club) club.addEventListener("click", e => { e.preventDefault(); open("¡Hola! Quiero sumarme al Filo Club. ¿Cómo hago?"); });
  }

  // Reemplaza "Hoy / Mañana / Esta semana" por los próximos 6 días hábiles (lun a sáb)
  function initDays() {
    const box = $("[data-days]");
    if (!box) return;
    const fmt = new Intl.DateTimeFormat("es-AR", { weekday: "short", day: "numeric" });
    const html = [];
    const d = new Date();
    while (html.length < 6) {
      if (d.getDay() !== 0) {
        const label = html.length === 0 && d.toDateString() === new Date().toDateString() ? "Hoy" : fmt.format(d).replace(".", "");
        const value = label === "Hoy" ? "hoy" : new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "numeric" }).format(d);
        html.push('<label class="opt"><input type="radio" name="dia" value="' + value + '"' + (html.length ? "" : " checked") + "><span>" + label + "</span></label>");
      }
      d.setDate(d.getDate() + 1);
    }
    box.innerHTML = html.join("");
  }

  function initTurno() {
    const form = $("[data-turno]");
    if (!form) return;
    const err = $("[data-form-error]", form);
    form.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      if (!nombre) { err.hidden = false; form.nombre.focus(); return; }
      err.hidden = true;
      const v = n => (form.querySelector("[name=" + n + "]:checked") || {}).value || "";
      const dia = v("dia");
      const cuando = /^(hoy|mañana|esta semana)$/.test(dia) ? dia : "el " + dia;  // "hoy", no "el hoy"
      open("¡Buenas! Soy " + nombre + ". Quiero turno para " + v("servicio").toLowerCase() + " con " + v("barbero") +
        ", " + cuando + " a las " + v("hora") + ". ¿Está disponible?");
    });
  }

  function boot() {
    document.documentElement.classList.remove("no-js");
    safe(initLinks, "initLinks");
    safe(initDays, "initDays");
    safe(initTurno, "initTurno");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
