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

/* ---------------- Galeria ---------------- */

var galleryEl = document.getElementById("gallery");
site.gallery.forEach(function (item, i) {
  var li = document.createElement("li");
  li.className = "reveal" + (i === 0 ? " featured" : "");
  li.style.transitionDelay = (i % 3) * 70 + "ms";
  li.innerHTML =
    '<button type="button" aria-label="Ampliar imagem: ' + esc(item.alt) + '">' +
    '<img src="' + item.src + '" alt="' + esc(item.alt) + '" width="800" height="800" loading="lazy" decoding="async" />' +
    "</button>";
  li.querySelector("button").addEventListener("click", function () {
    openLightbox(item);
  });
  galleryEl.appendChild(li);
});

/* ---------------- Depoimentos ---------------- */

var testimonialsEl = document.getElementById("testimonials");
site.testimonials.forEach(function (item, i) {
  var li = document.createElement("li");
  li.className = "reveal";
  li.style.transitionDelay = i * 70 + "ms";
  li.innerHTML =
    '<figure class="testimonial">' +
    '<div class="stars" aria-label="Nota ' + item.rating + ' de 5">' + STAR.repeat(item.rating) + "</div>" +
    "<blockquote>“" + esc(item.text) + "”</blockquote>" +
    "<figcaption>" + esc(item.author) + "</figcaption>" +
    "</figure>";
  testimonialsEl.appendChild(li);
});

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

/* ---------------- Lightbox ---------------- */

var lightbox = document.getElementById("lightbox");
var lightboxImg = document.getElementById("lightbox-img");
var lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(item) {
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCaption.textContent = item.alt;
  lightbox.setAttribute("aria-label", item.alt);
  lightbox.hidden = false;
  lockScroll();
}

function closeLightbox() {
  lightbox.hidden = true;
  unlockScroll();
}

lightbox.querySelectorAll("[data-close-lightbox]").forEach(function (el) {
  el.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  if (!modal.hidden) closeModal();
  if (!lightbox.hidden) closeLightbox();
});
