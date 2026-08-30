# Letícia Nails — versão estática (HTML/CSS/JS puro)

Cópia fiel da versão React, sem frameworks, build ou dependências.

## Estrutura

```
static-site/
├── index.html
├── style.css
├── script.js
├── favicon.ico
└── images/   (hero.jpg, work-1..6.jpg)
```

## Uso local

Abra `index.html` diretamente no navegador (duplo clique). Funciona via `file://`.

## Publicação

- **Cloudflare Pages / GitHub Pages / Netlify**: publique o conteúdo desta pasta como raiz do site. Não há comando de build (build command vazio, output directory = esta pasta).

## Personalização

Todos os textos, links, serviços, galeria e depoimentos ficam no topo do `script.js`
(objeto `site` e as constantes `WHATSAPP_NUMBER` / `WHATSAPP_MESSAGE`).
