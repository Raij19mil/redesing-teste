# DESIGN — The Latvian Business & Lounge

<!-- Documentado a partir do site construído em site/ (redesign 2026). -->

## Mundo visual

A mesa do clube vista de cima: madeira escura e tabaco, o selo de latão gravado e o cartão
de associado pousado sobre ela. Seções de leitura em papel de cardápio. Discreto, masculino
sem caricatura, sem brilho de "luxo" genérico (nada de dourado metálico em gradiente, glass ou neon).

## Cores (tokens em `site/assets/css/style.css`, `:root`)

| Token | Valor | Uso |
|---|---|---|
| `--night` | `#0c0a08` | Fundo principal, cabeçalho, rodapé |
| `--night-2` | `#15110d` | Variação do fundo noturno |
| `--tobacco` | `#2b1d13` | Seções de destaque (manifesto, eventos, convite) |
| `--leather` | `#3a2618` | Profundidade, scrollbar |
| `--paper` | `#ece4d2` | Seções de leitura (espaços, princípios) |
| `--brass` | `#b8925f` | Botão primário, filetes, rótulos |
| `--brass-hi` | `#d6b582` | Hover, ênfases, foco |
| `--brass-ink` | `#7a5a32` | Latão sobre papel (contraste AA) |
| `--ivory` | `#e3dac6` | Texto principal no escuro, emblema |
| `--ivory-dim` | `#b9ae98` | Texto secundário no escuro |
| `--sepia` / `--sepia-dim` | `#2a1d13` / `#5b4836` | Texto sobre papel |
| `--danger` / `--danger-paper` | `#e2876b` / `#9c3a1f` | Erros de formulário |

Estratégia: Committed — o escuro de tabaco ocupa a maior parte da página; o latão é o único acento;
o papel aparece em blocos inteiros, nunca como cartão solto.

## Tipografia (auto-hospedada em `site/assets/fonts/`)

- **Libre Caslon Display** — títulos (`--display`). Caslon é a letra inglesa do século XIX; conversa com o "Est. 1881".
- **Libre Caslon Text** 400/400 itálico/700 — corpo (`--text`), numerais oldstyle.
- **Cinzel** 500/600 — navegação, botões, rótulos em versal (`--caps`); ecoa as letras romanas do emblema.
- Escala fluida `--step--1` … `--step-4`; corpo com medida de até 64ch.

## Componentes

- **Emblema** (`assets/img/emblem*.svg`): redesenho vetorial do selo, com Cinzel embutida.
  Variações: marfim (padrão), latão (cartão), tinta (fundo claro). Substituir pelo arquivo oficial quando houver.
- **Cartão de associado** (`.member-card`): proporção de cartão (85,6×54), latão sobre preto, escala por container
  query (`cqw`). Inclina com o ponteiro (desligado em `prefers-reduced-motion` e telas de toque) e recebe nome/empresa
  do formulário em tempo real.
- **Botões**: retos, versal Cinzel espaçada; primário latão, fantasma com filete. Sobre papel, primário sépia.
- **Campos**: só linha inferior, rótulo em versal latão, erro em itálico abaixo do campo.
- **Listas editoriais**: programa de eventos e princípios em linhas com filetes, sem cards.
- **Régua "Um dia no clube"**: marcos 12h–18h que acendem conforme a leitura.

## Espaço e ritmo

`--gutter` fluido, `--section` entre 4,5rem e 9,5rem, largura máxima `--wrap: 78rem`.
Cabeçalhos de seção em duas colunas (título + apoio). Alternância noite → tabaco → papel.

## Movimento

Uma revelação única por seção (opacidade + leve subida + desfoque), ease-out exponencial;
entrada do hero em cascata; cartão com "gravação" ao digitar. Tudo desligado com `prefers-reduced-motion`.

## Superfícies do navegador

Seleção, scrollbar, cursor de texto, foco e sublinhados temáticos em latão.
