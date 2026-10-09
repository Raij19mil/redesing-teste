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
| `--ivory` | `#e9e1d2` | Texto principal |
| `--mist` | `#9b9184` | Texto secundário (≥ 4.5:1 sobre `--ink`) |
| `--line` / `--line-soft` | dourado 22% / marfim 10% | Filetes |

Estratégia: Restrained. Neutros escuros dominam; o dourado aparece em traço fino, nunca em bloco.
As fotos trazem o vermelho, sempre dessaturadas e escurecidas.

## Tipografia

Uma só família, **EB Garamond** (400/500, romano e itálico), auto-hospedada em `site/assets/fonts/`.
- Títulos em romano com a parte final em itálico dourado.
- Rótulos e navegação em **versaletes** espaçados (`.caps`, `font-variant-caps: all-small-caps; letter-spacing: .22em`).
- Escala contida: título principal até 5rem.

## Componentes

- **Ornamento** (`.ornament`): dois filetes finos com um losango ao centro; abre cada seção.
- **Cabeçalho**: simétrico, links em versaletes à esquerda e à direita, emblema ao centro (na home ele
  aparece só depois de rolar, para o emblema central do hero reinar sozinho).
- **Botão** (`.btn`): moldura dupla fina dourada, texto em versaletes; preenche de dourado no hover.
- **Link** (`.link`): itálico dourado com filete inferior.
- **Cenas**: uma foto por vez com moldura interna fina, texto curto ao lado, alternando lados.
- **Listas** (`.list`): linhas com numeral romano/hora em versalete e uma frase.
- **Duas casas** (`.houses`): duas colunas centradas separadas por um filete vertical.
- **Cartão de associado**: vinho escuro com moldura interna, emblema, "Seu nome" que recebe o nome digitado.
- **Formulário**: poucos campos (nome, e-mail, WhatsApp, empresa), só linha inferior.

## Movimento

Lento e discreto: a foto do hero "acende" ao abrir, o texto surge em sequência, foco de luz suave
segue o cursor, blocos aparecem com leve subida. Tudo desligado com `prefers-reduced-motion`.
