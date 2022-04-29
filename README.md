# Controle de histórico de comentários de uma lista de contato.

## Tipos de listas de contato:

### *Sequencial:*
A lista sequencial é gerada a partir da definição dos números inicial e final. Sua ID é o próprio número em questão.

*Recursos:*
navegação sequencial um a um
navegação por status
se a ID for um telefone, pode gerar um link de chat no WhatsApp

Dados necessário para configuração da lista sequencial:
nome, tipo, n. inicial, n. final, se gera link para o WhatsApp

### *Não Sequencial:*
*Em breve...*

## Instalação:
*Pré requisito:*
NodeJS v17.7.2 ou superior
Firebase v10.7.2 ou superior

*Download*

```$ git clone git@github.com:mrgenesis/comments.git```

```$ cd comments```

```
$ npm install 
#ou 
$ yarn instal
```
*Configuraçao*

Acesso o seu projeto no firebase e recupere os dados de acesso (https://console.firebase.google.com/project). Crie o arquivo .env.production.local com o seguinte conteúdo:
```
REACT_APP_API_KEY=<apiKey>
REACT_APP_AUTH_DOMAIN=<authDomain>
REACT_APP_PROJECT_ID=<projectId>
REACT_APP_STORAGE_BUCKET=<storageBucket>
REACT_APP_MESSAGING_SENDER_ID=<messagingSenderId>
REACT_APP_APP_ID=<appId>
```

O que está entre `<>` deve ser substituído pelo valor real. Exemplo: `REACT_APP_API_KEY=XXXXXX`.


```
$ npm run build
# ou 
$ yarn build
```

*Faça login no console*

`$ firebase login`


Esse comando acima, vai solicitar que realize login em seu navegador. 

*Permissão de acesso*
Abra o arquivo `firestore.rule` e escreva seu e-mail do Google no local indicado.
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
        request.auth.token.email == <seu-e-mail@Google>;
    }
  }
}
```
Se quiser autorizar outras usuários, encadei outros e-mail usando o operador `Or` da seguinte forma:
`request.auth.token.email == A@Google || B@Google || C@Google;`.
No exemplo acima, os usuários dos e-mails A@Google,  B@Google e C@Google terão acesso ao sistema.
Após editar o arquivo, faça o deploy das regras com o seguinte comando:

`$ firebase deploy --only firestore:rules`

*Deploy*

Após realizar login, realize o deploy do aplicativo da seguinte forma:
`$ firebase deploy --only hosting`

O aplicativo ficará disponível em https://`<identificação do app>`.web.app
