-Como iniciar o sistme-

Lista de bibliotecas e/ou frameworks utilizados
DotNet Core 2.2
bibliotecas do dotnet core
Microsoft.EntityFrameworkCore 5.0.7
Microsoft.EntityFrameworkCore.SqlServer 5.0.7
Microsoft.EntityFrameworkCore.Abstractions
Microsoft.EntityFrameworkCore.Design
Microsoft.EntityFrameworkCore.Relationa

Angular 11
bibliotecas do Angular

ngx-toastr
animations
angular material
ngx-mask

Explicação de como rodar a ferramenta em ambiente de desenvolvimento
API

Executar o comando
dotnet restore – Restaura as dependências e as ferramentas de um projeto.

Executar package manager console os seguintes comandos para criar o banco de dados
Add-Migration StartMigration
e em seguida
Update-Database

Explicação de como rodar o front
Na pasta raiz executar o comando npm install – Restaura as dependências e as ferramentas de um projeto.

Ao executar a API e o Front é necessario realizar um cadastro de usuario (Esta aberto para cadastro apenas para testes)
Preencha os campos e cadastre o usuario e a senha
O usuario de autenticação será o e-mail cadastrado e a senha deverá conter ao meno 1 caracter especial, 1 letra maiuscula, 1 letra minuscula e no minimo 8 caracteres

Na dashboard consta os acessos aos registros Veiculo e Condutor, o registro de compra/venda não consegui terminar em tempo.

Com exceção ao cadastrado de usuario e login todos os metodos exigem autenticação com token valido.