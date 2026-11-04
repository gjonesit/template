# Quaderno — tema Jekyll generico

Tema Jekyll senza dipendenze (niente plugin, niente CMS, niente build JS), pensato per qualsiasi sito:
associazione, studio, attività, rivista, progetto. Stile "quaderno a quadretti / pop", classi in stile framework.
I testi sono in italiano e tutti modificabili dai file dati.

## Avvio
    bundle install
    bundle exec jekyll serve      # http://localhost:4000

## Dove si modifica
| Cosa | File |
|---|---|
| Nome, hero, tiles, carousel, citazione, footer, testi dell'interfaccia | `_data/site.yml` |
| Voci del menu | `_data/navigation.yml` |
| Titolo, descrizione, lingua, endpoint form | `_config.yml` |
| Articoli | `_posts/AAAA-MM-GG-titolo.md` (`category:` → i filtri del blog si creano da soli) |
| Progetti | `_projects/nome.md` (`area:`, `color:`, `description:`, `image:`, `link:` → filtri automatici) |
| Pagine | `about.html`, `contact.html`, `privacy.html`, `cookie.html` |
| Colori e font | variabili `:root` in `assets/css/main.css` |

## Personalizzare in 5 minuti
1. `_config.yml`: `title`, `description`, `form_action`.
2. `_data/site.yml`: `brand`, `hero`, `intro`, `tiles`, `feature`, `carousel`, `quote`, `marquee`, `footer`.
3. Sostituisci gli esempi in `_posts/` e `_projects/`; completa `privacy.html` e `cookie.html`.
4. Facoltativo: `hero.image` (es. `/assets/img/foto.jpg`) mostra la polaroid accanto al titolo.
5. Se rinomini `/progetti/` o `/blog/`, aggiorna `permalink` nelle pagine, `_config.yml` (collection) e `_data/navigation.yml`.

## Classi (mini-guida)
- **Layout**: `.container`, `.container-narrow`, `.grid`, `.section`, `.section-head`
- **Navigazione**: `.navbar`, `.navbar-brand`, `.navbar-toggle`, `.navbar-search`, `.nav`, `.nav-link`, `.offcanvas`, `.offcanvas-nav`, `.search`
- **Tipografia**: `.heading-xl`, `.lead`, `.text-small`, `.eyebrow`, `.prose`
- **Colori**: `.bg-red|yellow|pink|green|blue|lime|mint|wine|dark`, `.text-light`, `.text-dark`
- **Bottoni**: `.btn` + `.btn-primary` | `.btn-secondary`
- **Hero**: `.hero`, `.hero-notes`, `.hero-eyebrow`, `.hero-title`, `.hero-subtitle`, `.hero-actions`, `.polaroid`, `.note`, `.doodle`
- **Blocchi**: `.tiles`/`.tile`, `.feature`, `.stats`/`.stat`, `.bubble`, `.section-wave`, `.quote`, `.marquee`
- **Card**: `.card` + `.card-outline` | `.card-tall`, `.card-title`, `.card-icon`, `.card-link`
- **Carousel**: `.carousel`, `.carousel-controls`, `.progress`
- **Liste**: `.list`, `.list-item`, `.list-title`, `.list-arrow`
- **Filtri/badge**: `.filters`, `.badge`, `.badge-active`, `.empty-state`
- **Form**: `.form`, `.form-group`, `.form-control`, `.alert`, `.alert-success`
- **Divisori**: `.divider-checker`, `.divider-flip`, `.divider-scallop`
- **Animazioni**: `.anim-reveal`, `.anim-pop`, `.anim-float`, `.anim-tilt`
- **Footer**: `.footer`, `.footer-grid`, `.footer-title`, `.footer-link`, `.footer-copy`, `.back-to-top`

## Comportamenti JS (attributi `data-*`)
`data-toggle="offcanvas" data-target="id"`, `data-dismiss="offcanvas"`, `data-carousel` (+ `-prev`, `-next`, `-progress`),
`data-scrub` (citazione), `data-count` (contatori), `data-tilt`, `data-parallax`,
`data-filter-group` / `data-filter` / `data-filter-items` + `data-category`, `data-search-input` / `data-search-results`,
`data-search-labels` (etichette dei risultati, da `labels.search_types`).

## Aggiungere una pagina
Crea `nome.html` con `layout: page`, `title`, `lead`, `permalink` e aggiungila a `_data/navigation.yml`.
