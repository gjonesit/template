# Jekyll Template

Template Jekyll senza dipendenze (niente plugin, niente CMS, niente build JS).
Stile "quaderno a quadretti / pop", classi in stile framework.

## Avvio
    bundle install
    bundle exec jekyll serve      # http://localhost:4000

## Dove si modifica
| Cosa | File |
|---|---|
| Nome, hero, tiles, carousel, citazione, footer | `_data/site.yml` |
| Voci del menu | `_data/navigation.yml` |
| Titolo, lingua, endpoint form | `_config.yml` |
| Articoli | `_posts/AAAA-MM-GG-titolo.md` (`category:` per i filtri) |
| Progetti | `_projects/nome.md` (`area:`, `color:`, `description:`, `image:`, `link:`) |
| Colori e font | variabili `:root` in `assets/css/main.css` |

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
`data-filter-group` / `data-filter` / `data-filter-items` + `data-category`, `data-search-input` / `data-search-results`.

## Pagine di esempio
Home, Blog, Progetti, Contatti, 404. Per aggiungere una pagina: crea `nome.html` con `layout: page`, `title`, `lead`
e aggiungila a `_data/navigation.yml`.
