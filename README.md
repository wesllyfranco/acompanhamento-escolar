# Acompanhamento Escolar — versão demonstrativa

Protótipo estático para apresentação do Sistema de Acompanhamento Escolar. O visual foi inspirado no Mirmetra: menu lateral escuro, navegação compacta, cartões de indicadores, destaque laranja e painéis responsivos. A versão não utiliza logo, login ou banco de dados.

## Dados e privacidade

Todos os dados são fictícios. Alterações realizadas na demonstração são salvas apenas no `localStorage` do navegador, pela chave `acompanhamento-escolar-demo-v1`. Não utilize esta versão com dados reais de estudantes.

## Publicar no GitHub Pages

1. Crie um repositório, por exemplo `acompanhamento-escolar-demo`.
2. Envie os arquivos desta pasta para a raiz do repositório:

   ```text
   index.html
   app.js
   styles.css
   ```

3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha a branch `main` e a pasta `/ (root)`.
5. Acesse o endereço informado pelo GitHub, normalmente:

   ```text
   https://SEU_USUARIO.github.io/acompanhamento-escolar-demo/
   ```

Os caminhos dos arquivos são relativos (`./app.js` e `./styles.css`), portanto funcionam também em repositórios publicados em subpastas.

## Próxima etapa

O frontend pode ser mantido quando a versão principal receber um backend. Na evolução para uso real, substituiremos o `localStorage` por chamadas a uma API e adicionaremos autenticação e banco de dados fora do GitHub Pages.
