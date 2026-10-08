# The Latvian — redesign do site

Redesign completo de [latvian.com.br](https://www.latvian.com.br), mantendo a identidade (emblema,
escuro de tabaco, latão e marfim) e refazendo estrutura, texto e interface.

## Estrutura

```
site/                 ← site estático pronto para publicar (abra site/index.html)
  index.html          Início
  clube.html          O Clube (princípios, comodidades, espaços)
  eventos.html        Eventos (formatos, eventos para empresas)
  contato.html        Contato (unidades + formulário)
  404.html
  assets/css|js|fonts|img
PRODUCT.md            Contexto do produto (impeccable)
DESIGN.md             Sistema visual (impeccable)
.impeccable/          Brief de direção e capturas de revisão (não publicar)
.claude/skills/       Skill impeccable
```

Rodar localmente: `cd site && python3 -m http.server 8000` → http://localhost:8000

## Publicar na Vercel

O `vercel.json` na raiz já deixa tudo pronto: sem build, servindo a pasta `site/`,
URLs limpas (`/clube`, `/eventos`, `/contato`), a `404.html` própria, cabeçalhos de
segurança e cache longo para fontes e imagens.

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório `raij19mil/redesing-teste`.
2. Deixe **Framework Preset = Other** e **Root Directory** vazio (raiz do repositório). Não precisa
   preencher build nem output: o `vercel.json` cuida disso.
3. Clique em **Deploy**. Cada push na branch gera um preview; a branch de produção publica o site.
4. Para usar o domínio próprio, adicione `latvian.com.br` em *Settings → Domains* e ajuste o DNS
   conforme a Vercel indicar.

Pela linha de comando: `npx vercel` (preview) e `npx vercel --prod` (produção), na raiz do repositório.

## Antes de publicar — confirmar com o cliente

Os fatos abaixo vieram de matérias públicas na imprensa, não do cliente:

- [ ] Horário (seg a sex, 12h às 18h) vale para as duas unidades?
- [ ] "Mais de 200 associados" continua correto?
- [ ] Endereço completo da unidade Bahia Marina.
- [ ] Comodidades por unidade (fumoir, cozinha, sala de TV etc.).
- [ ] Processo de associação (os 3 passos da home são uma proposta).

## Configurar (`site/assets/js/main.js`, objeto `LATVIAN_CONFIG`)

- `formEndpoint`: URL que recebe o formulário via POST JSON (Formspree, n8n, API própria).
  Vazio = abre o e-mail do visitante com a mensagem pronta.
- `email`: e-mail de contato (hoje `contato@latvian.com.br`, **a confirmar**).
- `memberAreaUrl`: link da área do associado. Vazio = leva ao contato.

## Imagens

Não há fotos no repositório. O emblema foi redesenhado em SVG a partir do print do site atual;
troque pelo arquivo oficial da marca quando possível. Fotos reais do fumoir, do bar e da vista
da Bahia Marina deixariam o site ainda mais forte.
