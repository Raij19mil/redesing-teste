# DESIGN — The Latvian Business & Lounge

<!-- Clássico e reservado. Documentado a partir do site construído em site/. -->

## Mundo visual

Um clube privado visto à meia-luz: sala escura, um toque de vinho, filetes dourados finos e muito
silêncio. Clássico, simétrico e centrado. A sensação é de exclusividade: pouca informação por vez,
o suficiente para entender, e o resto fica para quem entra.

Regras de conteúdo: uma ideia por seção, frases curtas, no máximo um botão principal por tela.

## Cores (tokens em `site/assets/css/style.css`, `:root`)

| Token | Valor | Uso |
|---|---|---|
| `--ink` / `--ink-2` | `#0b0908` / `#120e0c` | Fundo da sala |
| `--wine` / `--wine-2` | `#1f0a0b` / `#2a0f10` | Faixas em vinho (O Clube, Eventos), seleção |
| `--gilt` / `--gilt-hi` | `#c6a572` / `#e2c896` | Dourado envelhecido: filetes, ênfases em itálico, botões, foco |
| `--ivory` | `#e9e1d2` | Títulos |
| `--ivory-2` | `#c9bfae` | Texto corrido (≥ 10:1 sobre `--ink`) |
| `--mist` | `#b0a696` | Notas secundárias (≥ 7.9:1 sobre `--ink` e `--wine`) |
| `--hint` | `#8a8174` | Placeholder (≥ 4.9:1) |
| `--line` | dourado 30% | Ornamento, campos de formulário, sublinhado de link |

Estratégia: Restrained. Neutros escuros dominam; o dourado aparece em traço fino, nunca em bloco.
Superfícies se separam por **degrau de tom** (`--ink` → `--ink-2` → `--wine`), nunca por filete,
sombra ou degradê. O único filete decorativo é o ornamento da marca. O único objeto com sombra é o
cartão de associado, porque ele flutua.
As fotos trazem o vermelho, sempre dessaturadas e escurecidas.

## Tipografia

Clássico e moderno numa só página: um Didone de 1800 sobre um geométrico dos anos 1920.

- **Bodoni Moda** (variável, `opsz` + `wght`, 400–900) em títulos, ledes, citação, horas e nome do rodapé.
  Peso 400 nos títulos (500 em `h3`), tracking -0.02em, `font-optical-sizing: auto`. O final do título
  segue em itálico dourado (`<em>`), a assinatura da casa.
- **Jost** (variável, 300–700; herdeira da Futura, de 1927) no texto corrido, nos campos e em toda a
  interface: navegação, botões e links em caixa-alta, 500, `letter-spacing: .16em`, `--t-ui` = .875rem.
- Rótulos de campo em Jost 500, caixa normal, 1rem. Nada de texto pequeno em itálico: notas e horários
  vão em Jost reto, em `--mist`.
- Fontes auto-hospedadas em `site/assets/fonts/` (licença OFL junto).

## Componentes

- **Ornamento** (`.ornament`): dois filetes finos com um losango ao centro; abre cada seção. É o
  único filete decorativo do site.
- **Campos de cor** (`.field-ink`, `.field-wine`): a seção inteira muda de tom, chapado, sem degradê.
- **Cabeçalho**: simétrico, links em versaletes à esquerda e à direita, emblema ao centro (na home ele
  aparece só depois de rolar, para o emblema central do hero reinar sozinho).
- **Botão** (`.btn`): placa de latão chapada (`--gilt`) com os quatro cantos chanfrados (`clip-path`,
  o octógono das portas art déco), texto Jost em caixa-alta e uma seta desenhada em SVG que avança no
  hover. Hover clareia para `--gilt-hi`; foco é um anel interno (o recorte cortaria o `outline`).
  No máximo um por tela.
- **Link** (`.link`): Jost em caixa-alta dourada; um filete de 35% da largura que se completa no hover.
- **Cenas**: uma foto por vez com moldura interna fina, texto curto ao lado, alternando lados.
- **Princípios** (`.principles`): título grande em itálico à esquerda e uma frase à direita, separados por espaço.
- **Um dia no clube** (`.day` / `.hour`): quatro horas com foto; os "abajures" acendem em sequência com a leitura.
- **Comodidades** (`.amenities`): nomes em itálico, cada um sob um losango.
- **Prancha** (`.plate`) e **Dividido** (`.split`): foto larga entre seções; foto + texto num campo de cor.
- **Duas casas** (`.houses`): duas colunas num campo `--ink-2`, com horário; separadas por espaço.
- **Rodapé**: fechamento desenhado, com "The Latvian" grande e o nome em dourado.
- **Cartão de associado**: vinho escuro com moldura interna, emblema, "Seu nome" que recebe o nome digitado.
- **Formulário**: poucos campos (nome, e-mail, WhatsApp, empresa), só linha inferior.

## Movimento

Lento e discreto: a foto do hero "acende" ao abrir, o texto surge em sequência, foco de luz suave
segue o cursor, blocos aparecem com leve subida. Tudo desligado com `prefers-reduced-motion`.
