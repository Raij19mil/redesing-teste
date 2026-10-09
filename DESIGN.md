# DESIGN — The Latvian Business & Lounge

<!-- Neo-Speakeasy. Documentado a partir do site construído em site/. -->

## Mundo visual

Neo-Speakeasy: a sala apagada de um clube de jazz, a cortina vermelha ao fundo e a luz que vem
dos abajures das mesas, não do teto. A estrutura é editorial (grade de 4 colunas, rótulos pequenos,
contagens entre parênteses, legendas em itálico), herdada de folhas de contato e sites de estúdio.
O site deve fazer sentir como é estar lá: escuro, quente, silencioso, com momentos de luz.

## Cores (tokens em `site/assets/css/style.css`, `:root`)

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0a0807` | Fundo da sala (base de todas as páginas) |
| `--ink-2` / `--ink-3` | `#110c0a` / `#1a1311` | Profundidades, abajur apagado |
| `--oxblood` / `--oxblood-2` | `#2b0709` / `#3e0b0e` | Seção "cortina" (Espaços, Para empresas) |
| `--curtain` / `--curtain-hi` | `#8f1a1c` / `#c8352f` | Seleção de texto, brilho da cortina, cartão |
| `--amber` / `--amber-hi` | `#e2a65a` / `#f3c98a` | Luz: ênfases em itálico, botão, abajures acesos, foco |
| `--brass` | `#c39a62` | Emblema no cartão |
| `--bone` | `#ece3d3` | Texto principal |
| `--smoke` | `#9a8f84` | Texto secundário, rótulos apagados (≥4.5:1 sobre `--ink`) |
| `--hair` / `--hair-strong` | marfim 14% / 28% | Filetes da grade |

Estratégia: Committed escuro. O preto ocupa a página; o vermelho aparece em faixas inteiras
(seção cortina) e nas fotos; o âmbar é a única cor de ação e de ênfase.

## Tipografia (auto-hospedada em `site/assets/fonts/`)

- **EB Garamond** 400/500, romano e itálico — títulos, corpo, legendas (`--serif`). Títulos misturam
  romano marfim com itálico âmbar ("Os melhores negócios se fecham *à meia-luz.*").
- **Archivo** 400/500 — rótulos em caixa-alta pequenos, botões, campos (`--label`).
- Escala fluida `--t-label` … `--t-h1` (até 7,4rem).

## Estrutura e componentes

- **Grade** `.frame .grid`: 4 colunas (2 no celular). Cabeçalho de seção = filete + rótulo (col. 1) +
  contagem `(03)` (col. 2) + título (col. 3–4).
- **Cabeçalho**: pílula "The Latvian ©1881" com o emblema, navegação distribuída na grade,
  "(Solicitar convite)" entre parênteses. Fica transparente sobre a foto e escurece com blur ao rolar.
- **Hero com luz de abajur**: foto do salão quase apagada; um foco de luz segue o cursor
  (no toque, passeia sozinho; parado em `prefers-reduced-motion`).
- **Cenas** (`.scene`): fotos grandes em contraponto com texto, numeradas em itálico ("1. A luz").
- **Horas** (`.hour`): linhas 12h–18h com um abajur que acende ao rolar.
- **Cortina** (`.curtain`): faixa vermelho-sangue com pregas sutis.
- **Agenda** (`.bill__list`): lista numerada estilo programa de casa noturna + foto fixa.
- **Mural** (`.closing__wall`): miniaturas espalhadas no preto antes do fechamento.
- **Cartão de associado**: laca bordô, emblema em latão, nome gravado ao vivo pelo formulário.
- **Botão**: pílula âmbar com brilho; links secundários em itálico âmbar com seta.
- **Campos**: só linha inferior, texto grande em itálico no placeholder, chips em pílula.

## Fotografia

Fotos em `site/assets/img/fotos/` (salão com cortina, saxofone, jazz em P&B). Tratamento: escurecer
(`brightness .6–.85`), manter o calor; P&B permanece P&B. Grão de filme global (`body::after`).

## Movimento

Entrada do hero "acendendo as luzes" (foto sai do escuro), revelação única por bloco, foco de luz,
abajures das horas e gravação do nome no cartão. Tudo desligado com `prefers-reduced-motion`.
