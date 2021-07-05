Como iniciar o sistema
Link Github
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
•	API

Executar o comando
1.	dotnet restore
 – Restaura as dependências e as ferramentas de um projeto.
2.	Executar package manager console os seguintes comandos para criar o banco de dados
•	Add-Migration StartMigration
e em seguida
•	Update-Database



Explicação de como rodar o front
Na pasta raiz executar o comando npm install 
– Restaura as dependências e as ferramentas de um projeto.
Importante, Na pasta global no arquivo GlobalVar, é indispensável que a porta da API esteja atualizada conforme a porta utilizada na API alterando o rootURL,
por padrão ela esta da seguinte forma:
public rootURL:string = 'https://localhost:44307/api';

Ao executar a API e o Front é necessário realizar um cadastro de usuário (Está aberto para cadastro apenas para testes)
Preencha os campos e cadastre o usuário e a senha
O usuário de autenticação será o e-mail cadastrado e a senha deverá conter ao menos 1 caractere especial, uma letra maiúscula, uma letra minúscula e no mínimo 8 caracteres

Na dashboard consta os acessos aos registros Veiculo e Condutor, o registro de compra/venda não consegui terminar em tempo.

Com exceção ao cadastrado de usuário e login todos os métodos exigem autenticação com token valido.
