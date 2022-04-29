Controle de histórico de comentários de uma lista de contato.

Tipos de listas de contato:

Sequencial: 
A lista sequencial é gerada a partir da definição dos números inicial e final. Sua ID é o próprio número em questão.

Recursos:
navegação sequencial um a um
navegação por status
se a ID for um telefone, pode gerar um link de chat no WhatsApp

Dados necessário para configuração da lista sequencial:
nome, tipo, n. inicial, n. final, se gera link para o WhatsApp



Pré requisito:
NodeJS v17.7.2 ou superior
Firebase v10.7.2 ou superior

Instalação:
`$ git clone git@github.com:mrgenesis/comments.git`
`$ cd comments`
`$ npm install #ou “yarn instal”l, se preferir`


Acesso o seu projeto no firebase e recupere os dados de acesso. Crie o arquivo .env.production.local com o seguinte conteúdo:
```
REACT_APP_API_KEY=<apiKey>
REACT_APP_AUTH_DOMAIN=<authDomain>
REACT_APP_PROJECT_ID=<projectId>
REACT_APP_STORAGE_BUCKET=<storageBucket>
REACT_APP_MESSAGING_SENDER_ID=<messagingSenderId>
REACT_APP_APP_ID=<appId>
```

Note que “`<foo>`” deve ser substituído pelo valor real.

ou “`yarn build`”, se preferir
`$ npm run build`
`$ firebase login`

Esse comando acima, vai solicitar que realize login em seu navegador. Após realizar login, realize o deploy do aplicativo da seguinte forma:
$ firebase deploy --only hosting

O aplicativo ficará disponível em https://`<identificação do app>`.web.app
