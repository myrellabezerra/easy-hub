# EasyHub

Portfólio dos projetos Easy, criados por Myrella Bezerra: sistemas web simples para pequenos negócios.

| Projeto | O que é | Status |
|---|---|---|
| [AgendEasy](https://agendeasy.com.br) | Agendamentos online para barbeiros e designers de sobrancelhas | No ar (v1.1) |
| SmartEasy | Gestão de ordens de serviço para assistências técnicas | Protótipo |

## Estrutura

```
easy-hub/
├── index.html            # página única: início, cards dos projetos, sobre e contato
└── assets/
    ├── css/styles.css    # tokens de cor (claro/escuro) e estilos
    ├── js/theme.js       # tema claro/escuro (carregado no <head>)
    ├── js/main.js        # filtro dos cards e janelas de detalhes
    ├── fonts/            # Outfit e Inter servidas pelo próprio site (licença OFL)
    └── img/              # ícone do EasyHub
```

## Paleta

| Cor | Hex | Uso |
|---|---|---|
| Azul | `#00508F` | botões e links no tema claro, brilhos do fundo |
| Azul-marinho | `#14293A` | cabeçalho, início, contatos e fundo do tema escuro |
| Pêssego | `#FFCD82` | destaques, faixa animada, selo de protótipo, botões no tema escuro |

## Contatos

LinkedIn e GitHub já aparecem. Para mostrar e-mail e WhatsApp, preencha `CONTATOS` no topo de
`assets/js/main.js`. Os campos vazios ficam escondidos.

## Executando

Não há build. Abra o `index.html` no navegador ou rode um servidor local:

```bash
python3 -m http.server 5600   # http://localhost:5600
```

## Adicionando um projeto

1. Em `index.html`, copie um `<article class="card">` dentro de `.cards` e troque capa, textos e tags.
2. Use `data-status="live"` (no ar) ou `data-status="proto"` (protótipo) para o filtro funcionar,
   e atualize os números nos botões de filtro.
3. Copie também um `<dialog class="details">` com um `id` novo e aponte o botão "Ver detalhes"
   para ele (`data-open="id-da-janela"`).
