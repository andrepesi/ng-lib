# NgLib

Esse template auxilia na criação de bibliotecas Angular, criando uma distribuição de 'entrada-primaria', implementando a a estrutura definida em 
[Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).

Caracteristicas:
- Uma biblioteca simples de exemplo
- Uma aplicação de demonstração que consome a biblioteca em modo JIT e a executa em 'Watch mode'

Algumas tarefas comuns já estao implementadas e presentes como 'npm scripts' :

- `npm start` para executar um servidor em modo 'live-reload' contendo a aplicação de demonstração
- `npm run build` compila a biblioteca
- `npm run lint` para iniciar o lint 
- `npm run clean` para limpar
- `npm install ./relative/path/to/lib` após `npm run build` para testar localmente a biblioteca em outra app, sem a necessidade de publica-lo no NPM.

## NgLib Library 
Antes de qualquer coisa, tenha certeza de ter minimamente as versões 6.9 do NodeJS e a versão 3.0 do NPM instaladas.
Depois ...

### Instalação

1. Cria uma pasta para o projeto (por exemplo teste-app).
1. Execute o comando `npm install -g @andrepesi/ng-lib`( ou `npm i -g @andrepesi/ng-lib` ) para instalar o gerador.
1. Dê um duplo clique na pasta que  você criou e no prompt de comando  execute `ng-lib` para inicializar o gerador de template. 
1. Forneça o nome da biblioteca que deseja criar. E aguarde alguns instantes enquanto o gerador cria os arquivos necessarios.
1. Execute `npm install ( ou npm i)` para instalar as dependecias iniciais da biblioteca
1. Execute `npm start` para executar a aplicação de demonstração

O fluxo todo via linha comando ficaria asssim
```
mkdir 'nome-da-pasta'
cd 'nome-da-pasta'
npm install -g @andrepesi/ng-lib
ng-lib
npm install
npm start
```

## O que compoe a biblioteca inicial criada pelo NgLib

O template fornecido pelo **NgLib** contem uma estrtura similar a proposta em [Quickstart seed](https://github.com/angular/quickstart).
Ele foi modificado para construir e testar bibliotecas, ao inves de aplicativos como em outras ferramentas.
Consequentemente existem muitos arquivos diferentes no projeto, mas nosso foco será nos arquivos TypeScript (`.ts`) e na pasta **`/src`**.

```
src/
├── demo/
|  └── app/
|     ├── app.component.ts
|     └── app.module.ts
└── lib/
   ├── index.ts
   └── src/
      ├── component/
      |  └── lib.component.ts
      ├── service/
      |  └── lib.service.ts
      └── module.ts

```

Cada arquivo tem um propósito e evolui independentemente conforme a biblioteca cresce

Arquivos fora de `src /` dizem respeito à criação, implantação e teste do seu aplicativo.
Eles incluem arquivos de configuração e dependências externas.

Arquivos dentro de `src / lib /` "pertencem" a sua biblioteca, enquanto `src / demo /` contém uma aplicação de demonstração
que carrega sua biblioteca.

As bibliotecas não funcionam sozinhas, por isso é muito útil ter esse aplicativo de "demonstração" durante o desenvolvimento
para ver como sua biblioteca ficaria para os consumidores.

Quando você executar `npm start`, o aplicativo de demonstração será iniciado.

A biblioteca criada possui inicialmente esses arquivos em `src/`

<table width="100%">
  <col width="20%">
  </col>
  <col width="80%">
  </col>
  <tr>
    <th>
      File
    </th>
    <th>
      Purpose
    </th>
  </tr>
  <tr>
    <td>
      <code>demo/app/app.component.ts</code>
    </td>
    <td>
      Um componente angular de demonstração, o qual faz a chamada de um metodo de um servico de testes
    </td>
  </tr>
  <tr>
    <td>
      <code>demo/app/app.module.ts</code>
    </td>
    <td>
      Um <code>NgModule</code> que importa a biblioteca <code>LibModule</code> criada por padrao pelo gerador. Lembre-se de altera-lo posteriormente quando você alterar o nome do modulo na pasta lib.
    </td>
  </tr>
  <tr>
    <td>
      <code>lib/src/component/app.component.ts</code>
    </td>
    <td>
      Um componente de exemplo da nossa biblioteca que apenas renderiza uma tag <code>h2</code>.
    </td>
  </tr>
  <tr>
    <td>
      <code>lib/src/service/lib.service.ts</code>
    </td>
    <td>
      Um serviço de exemplo que retorna um determinado valor
    </td>
  </tr>
  <tr>
    <td>
      <code>lib/src/module.ts</code>
    </td>
    <td>
      Um <code>NgModule</code> principal da biblioteca chamado <code>LibModule</code> Lembre-se de altera-lo posteriormente.
    </td>
  </tr>
  <tr>
    <td>
      <code>lib/index.ts</code>
    </td>
    <td>
      Essa é a api publica da sua biblioteca, todos os arquivos que deverão ser consumidos devem ser referenciados aqui.      
    </td>
  </tr>
</table>


## Compilando a biblioteca

Você pode compilar sua biblioteca executando `npm run build`. 
Isto irá gerar um diretório `dist /` com todos os pontos de entrada descritos acima.

Toda a logica da compilação se encontra no arquivo `./build.js`. Caso você comece a usar outras bibliotecas fique atento. Pode ser necessario incluir a referencia desses pacotes.