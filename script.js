/**
 * ------------------------------------------------------------------
 * CONFIGURAÇÃO DO CLIENTE
 * Tudo que muda de profissional para profissional está aqui.
 * ------------------------------------------------------------------
 */

var WHATSAPP_NUMBER = "5569999999999"; // DDI + DDD + número (somente dígitos)
var WHATSAPP_MESSAGE = "Oi! Vim pelo link da bio e gostaria de agendar um horário 💅";

var site = {
  name: "Letícia Nails",
  links: {
    whatsapp: "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE),
    instagram: "https://instagram.com/leticianails",
    location: "https://maps.google.com/?q=Cacoal+RO",
    allServices: "", // URL externa opcional; vazio abre o modal
  },
  services: [
    {
      name: "Alongamento de unhas",
      description: "Fibra ou gel com formato personalizado e acabamento natural.",
      price: "A partir de R$ 120",
      featured: true,
    },
    {
      name: "Banho de gel",
      description: "Fortalece a unha natural e garante brilho por semanas.",
      price: "A partir de R$ 90",
    },
    {
      name: "Manutenção",
      description: "Reequilíbrio, troca de cor e cuidado das cutículas.",
      price: "A partir de R$ 80",
    },
    {
      name: "Nail Art",
      description: "Desenhos, cromados e detalhes feitos à mão para você.",
      price: "A partir de R$ 25",
    },
  ],
  extraServices: [
    { name: "Blindagem de unhas", description: "Proteção e brilho duradouro.", price: "A partir de R$ 70" },
    { name: "Esmaltação em gel", description: "Cor uniforme com longa duração.", price: "A partir de R$ 60" },
    { name: "Spa dos pés", description: "Esfoliação, hidratação e massagem.", price: "A partir de R$ 85" },
    { name: "Remoção de alongamento", description: "Retirada segura, sem danificar a unha.", price: "A partir de R$ 40" },
  ],
  gallery: [
    { src: "images/work-1.jpg", alt: "Alongamento em formato amêndoa com esmaltação nude" },
    { src: "images/work-2.jpg", alt: "Francesinha clássica em unhas quadradas" },
    { src: "images/work-3.jpg", alt: "Nail art com detalhes em folha dourada" },
    { src: "images/work-4.jpg", alt: "Esmaltação em gel rosa intenso com muito brilho" },
    { src: "images/work-5.jpg", alt: "Unhas com efeito cromado perolado" },
    { src: "images/work-6.jpg", alt: "Nail art minimalista com traços finos sobre base nude" },
  ],
  testimonials: [
    { rating: 5, text: "Amei o resultado! Ficou exatamente como eu queria.", author: "Mariana" },
    { rating: 5, text: "Atendimento maravilhoso e trabalho impecável.", author: "Ana" },
    { rating: 5, text: "Durou muito mais do que eu esperava. Já virei cliente fixa.", author: "Juliana" },
  ],
};

/* ---------------- Helpers ---------------- */

function esc(text) {
  var div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

var STAR =
  '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.5 2.3 14 8l6.2.5-4.7 4 1.4 6-5.4-3.2L6.1 18.5l1.4-6-4.7-4L9 8z"/></svg>';

/* ---------------- Links de WhatsApp ---------------- */

document.querySelectorAll("[data-wa]").forEach(function (el) {
  el.setAttribute("href", site.links.whatsapp);
});

document.getElementById("year").textContent = String(new Date().getFullYear());

/* ---------------- Serviços ---------------- */

var servicesList = document.getElementById("services-list");
site.services.forEach(function (service, i) {
  var li = document.createElement("li");
  li.className = "reveal";
  li.style.transitionDelay = i * 70 + "ms";
  li.innerHTML =
    '<article class="service-card">' +
    '<div class="service-top">' +
    "<h3>" + esc(service.name) + "</h3>" +
    (service.featured ? '<span class="badge">Popular</span>' : "") +
    "</div>" +
    '<p class="service-desc">' + esc(service.description) + "</p>" +
    '<div class="service-foot">' +
    '<span class="service-price">' + esc(service.price) + "</span>" +
    '<a class="service-link" href="' + site.links.whatsapp + '" target="_blank" rel="noopener noreferrer" aria-label="Agendar ' +
    esc(service.name) + ' pelo WhatsApp">Agendar</a>' +
    "</div>" +
    "</article>";
  servicesList.appendChild(li);
});

var allServices = document.getElementById("all-services");
site.services.concat(site.extraServices).forEach(function (service) {
  var row = document.createElement("div");
  row.className = "service-row";
  row.innerHTML =
    "<div>" +
    '<p class="name">' + esc(service.name) + "</p>" +
    '<p class="desc">' + esc(service.description) + "</p>" +
    "</div>" +
    '<p class="price">' + esc(service.price) + "</p>";
  allServices.appendChild(row);
});

/* ---------- Galeria: carrossel 3D com profundidade ---------- */

(function () {
  var root = document.getElementById("gallery-carousel");
  if (!root) return;

  var CFG = {
    cardWidth: 300,
    cardHeight: 380,
    radius: 18,
    tint: "#171717",
    depth: 220,
    spread: 90,
    tilt: 22,
    visibleCards: 4,
    falloff: 0.2,
    blur: 6,
    duration: 700,
    autoplayDelay: 3200,
  };

  var items = site.gallery;
  var count = items.length;
  if (!count) return;

  var reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  root.className = "depth-carousel reveal";
  root.setAttribute("role", "group");
  root.setAttribute("aria-roledescription", "carousel");
  root.setAttribute("aria-label", "Galeria de trabalhos");
  root.setAttribute("tabindex", "0");

  var stage = document.createElement("div");
  stage.className = "depth-carousel__stage";
  root.appendChild(stage);

  var cards = [];
  var tints = [];

  items.forEach(function (item, i) {
    var card = document.createElement("div");
    card.className = "depth-carousel__card";
    card.style.width = CFG.cardWidth + "px";
    card.style.height = CFG.cardHeight + "px";
    card.style.borderRadius = CFG.radius + "px";
    card.setAttribute("aria-roledescription", "slide");
    card.setAttribute("aria-label", i + 1 + " de " + count);
    card.innerHTML =
      '<img class="depth-carousel__img" src="' + item.src + '" alt="' + esc(item.alt) +
      '" width="' + CFG.cardWidth + '" height="' + CFG.cardHeight +
      '" loading="lazy" decoding="async" draggable="false" />';
    var tint = document.createElement("span");
    tint.className = "depth-carousel__tint";
    tint.style.background = CFG.tint;
    card.appendChild(tint);
    card.addEventListener("click", function () {
      if (drag && drag.moved) return;
      setFocus(i, true);
    });
    stage.appendChild(card);
    cards.push(card);
    tints.push(tint);
  });

  var dotsWrap = document.createElement("div");
  dotsWrap.className = "depth-carousel__dots";
  var dots = items.map(function (item, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "depth-carousel__dot" + (i === 0 ? " is-active" : "");
    b.setAttribute("aria-label", "Ir para a imagem " + (i + 1));
    b.addEventListener("click", function () {
      setFocus(i, true);
    });
    dotsWrap.appendChild(b);
    return b;
  });

  function arrow(dir, label, path) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "depth-carousel__arrow depth-carousel__arrow--" + dir;
    b.setAttribute("aria-label", label);
    b.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="' + path +
      '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    b.addEventListener("click", function () {
      navigateBy(dir === "prev" ? -1 : 1);
    });
    return b;
  }

  if (count > 1) {
    root.appendChild(arrow("prev", "Imagem anterior", "M15 5l-7 7 7 7"));
    root.appendChild(arrow("next", "Próxima imagem", "M9 5l7 7-7 7"));
  }
  root.appendChild(dotsWrap);

  var pos = 0;
  var focusIndex = 0;
  var scale = 1;
  var raf = null;

  function layout(p) {
    for (var i = 0; i < count; i++) {
      var el = cards[i];
      var d = i - p;
      if (count > 1) {
        d = ((d % count) + count) % count;
        if (d > count / 2) d -= count;
      }
      var back = Math.max(0, d);
      var az = Math.abs(d);
      var shown = az <= CFG.visibleCards + 0.5;

      var tz = -CFG.depth * d;
      var tx = CFG.spread * d;
      var ry = CFG.tilt * clamp(d, 0, 1);

      var opacity = d < 0 ? Math.max(0, 1 + d) : 1;
      if (!shown) opacity = 0;

      var brightness = Math.max(0.15, 1 - back * CFG.falloff);
      var blurPx = CFG.blur > 0 ? Math.min(CFG.blur, (back / Math.max(1, CFG.visibleCards)) * CFG.blur) : 0;

      el.style.transform =
        "translate(-50%, -50%) scale(" + scale + ") translateX(" + tx.toFixed(2) +
        "px) translateZ(" + tz.toFixed(2) + "px) rotateY(" + ry.toFixed(3) + "deg)";
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = "brightness(" + brightness.toFixed(3) + ") blur(" + blurPx.toFixed(2) + "px)";
      el.style.zIndex = String(Math.round(2000 - d * 20));
      el.style.pointerEvents = shown && opacity > 0.05 ? "auto" : "none";
      tints[i].style.opacity = clamp(back * CFG.falloff * 1.25, 0, 0.86).toFixed(3);
    }
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tweenTo(target, animate) {
    if (raf) cancelAnimationFrame(raf);
    var from = pos;
    var dur = animate && !reduced ? CFG.duration : 0;
    if (!dur) {
      pos = ((target % count) + count) % count;
      layout(pos);
      return;
    }
    var start = performance.now();
    function step(now) {
      var t = clamp((now - start) / dur, 0, 1);
      pos = from + (target - from) * easeOutCubic(t);
      layout(pos);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        pos = ((pos % count) + count) % count;
        layout(pos);
        raf = null;
      }
    }
    raf = requestAnimationFrame(step);
  }

  function setFocus(rawIndex, animate) {
    var idx = ((rawIndex % count) + count) % count;
    var delta = idx - pos;
    if (count > 1) {
      delta = ((delta % count) + count) % count;
      if (delta > count / 2) delta -= count;
    }
    tweenTo(pos + delta, animate);
    if (idx !== focusIndex) {
      focusIndex = idx;
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === idx);
      });
    }
  }

  function navigateBy(step) {
    setFocus(focusIndex + step, true);
  }

  /* Responsividade */
  function resize() {
    var w = root.getBoundingClientRect().width;
    var needed = CFG.cardWidth + Math.abs(CFG.spread) * 2 + 120;
    scale = clamp(w / needed, 0.4, 1);
    layout(pos);
  }
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(resize).observe(root);
  } else {
    window.addEventListener("resize", resize);
  }
  resize();

  /* Arraste (mouse e toque) */
  var drag = null;
  root.addEventListener("pointerdown", function (e) {
    if (count < 2) return;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    drag = { x: e.clientX, startPos: pos, lastX: e.clientX, lastT: performance.now(), v: 0, moved: false, id: e.pointerId };
  });
  root.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var stepPx = Math.max(CFG.cardWidth * 0.55 * scale, 40);
    var dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 4) {
      drag.moved = true;
      try {
        root.setPointerCapture(drag.id);
      } catch (err) {}
    }
    if (!drag.moved) return;
    var now = performance.now();
    var dt = Math.max(now - drag.lastT, 1);
    drag.v = (e.clientX - drag.lastX) / dt;
    drag.lastX = e.clientX;
    drag.lastT = now;
    pos = drag.startPos - dx / stepPx;
    layout(pos);
  });
  function endDrag() {
    if (!drag) return;
    var d = drag;
    drag = null;
    if (!d.moved) return;
    var stepPx = Math.max(CFG.cardWidth * 0.55 * scale, 40);
    setFocus(Math.round(pos - (d.v * 180) / stepPx), true);
  }
  root.addEventListener("pointerup", endDrag);
  root.addEventListener("pointercancel", endDrag);

  /* Teclado */
  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigateBy(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigateBy(1);
    }
  });

  /* Roda do mouse / trackpad */
  var wheelTimer = null;
  root.addEventListener(
    "wheel",
    function (e) {
      if (count < 2) return;
      e.preventDefault();
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      var rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      var delta = e.deltaMode === 1 ? rawDelta * 24 : rawDelta;
      pos += clamp(delta / (CFG.cardWidth * 0.9), -0.6, 0.6);
      layout(pos);
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(function () {
        setFocus(Math.round(pos), true);
      }, 130);
    },
    { passive: false }
  );

  /* Autoplay */
  if (!reduced && count > 1) {
    var hovered = false;
    var focused = false;
    root.addEventListener("mouseenter", function () {
      hovered = true;
    });
    root.addEventListener("mouseleave", function () {
      hovered = false;
    });
    root.addEventListener("focusin", function () {
      focused = true;
    });
    root.addEventListener("focusout", function () {
      focused = false;
    });
    setInterval(function () {
      if (!hovered && !focused && !drag) navigateBy(1);
    }, CFG.autoplayDelay);
  }

  layout(pos);
})();

/* ---------- Depoimentos: carrossel horizontal ---------- */

(function () {
  var track = document.getElementById("testimonials");
  var dotsWrap = document.getElementById("testimonials-dots");
  if (!track) return;

  site.testimonials.forEach(function (item, i) {
    var li = document.createElement("li");
    li.className = "testimonials-slide";
    li.setAttribute("aria-roledescription", "slide");
    li.setAttribute("aria-label", i + 1 + " de " + site.testimonials.length);
    li.innerHTML =
      '<figure class="testimonial">' +
      '<div class="stars" aria-label="Nota ' + item.rating + ' de 5">' + STAR.repeat(item.rating) + "</div>" +
      "<blockquote>“" + esc(item.text) + "”</blockquote>" +
      "<figcaption>" + esc(item.author) + "</figcaption>" +
      "</figure>";
    track.appendChild(li);
  });

  var dots = site.testimonials.map(function (item, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", "Ir para o depoimento " + (i + 1));
    b.className = i === 0 ? "is-active" : "";
    b.addEventListener("click", function () {
      scrollToSlide(i);
    });
    dotsWrap.appendChild(b);
    return b;
  });

  function scrollToSlide(index) {
    var card = track.children[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  function syncActive() {
    var best = 0;
    var bestDist = Infinity;
    Array.prototype.forEach.call(track.children, function (el, i) {
      var dist = Math.abs(el.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === best);
      dot.setAttribute("aria-selected", i === best ? "true" : "false");
    });
    return best;
  }

  track.addEventListener("scroll", syncActive);
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(syncActive).observe(track);

  var tDrag = null;
  track.addEventListener("pointerdown", function (e) {
    tDrag = { startX: e.clientX, scrollLeft: track.scrollLeft, moved: false, id: e.pointerId };
  });
  track.addEventListener("pointermove", function (e) {
    if (!tDrag) return;
    var dx = e.clientX - tDrag.startX;
    if (!tDrag.moved && Math.abs(dx) > 6) {
      tDrag.moved = true;
      try {
        track.setPointerCapture(tDrag.id);
      } catch (err) {}
      track.classList.add("is-dragging");
    }
    if (tDrag.moved) {
      e.preventDefault();
      track.scrollLeft = tDrag.scrollLeft - dx;
    }
  });
  function endTDrag() {
    if (!tDrag) return;
    var d = tDrag;
    tDrag = null;
    track.classList.remove("is-dragging");
    if (!d.moved) return;
    var idx = -1;
    Array.prototype.forEach.call(track.children, function (el, i) {
      if (idx === -1 && Math.abs(el.offsetLeft - track.offsetLeft - track.scrollLeft) < el.offsetWidth / 2) idx = i;
    });
    scrollToSlide(idx >= 0 ? idx : syncActive());
  }
  track.addEventListener("pointerup", endTDrag);
  track.addEventListener("pointercancel", endTDrag);
})();


/* ---------------- Reveal on scroll ---------------- */

var revealEls = document.querySelectorAll(".reveal");
if (typeof IntersectionObserver === "undefined") {
  revealEls.forEach(function (el) {
    el.classList.add("is-visible");
  });
} else {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach(function (el) {
    observer.observe(el);
  });
}

/* ---------------- Bloqueio de scroll ---------------- */

var previousOverflow = "";
function lockScroll() {
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
}
function unlockScroll() {
  document.body.style.overflow = previousOverflow;
}

/* ---------------- Modal de serviços ---------------- */

var modal = document.getElementById("services-modal");
var openBtn = document.getElementById("open-services");

if (site.links.allServices) {
  var link = document.createElement("a");
  link.className = "btn-outline";
  link.href = site.links.allServices;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Ver todos os serviços";
  openBtn.replaceWith(link);
} else {
  openBtn.addEventListener("click", function () {
    modal.hidden = false;
    lockScroll();
  });
}

function closeModal() {
  modal.hidden = true;
  unlockScroll();
}

modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  if (!modal.hidden) closeModal();
});

