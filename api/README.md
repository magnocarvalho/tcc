# meifacil-backend-teste
##Aplicação do lado Servidor desenvolvida em NODE.JS e EXPRESS

NODE.JS
EXPRESS
MONGODB
GULP
TYPESCRIPT
MONGOOSE

para inicar aplicação e nescessario o uso do banco Mongodb na sua versão 4 ou superior.

json com o banco de dados para teste esta na pasta database

```bash
npm i -g gulp
npm i -g mocha
```
foi usado o node na sua versão 10.16.0
```bash
npm i node@10.16.0
```
demais dependencias:
```bash
npm i --save -d 
``` 
build use:
```bash
npm start 
```
durante o build nodemon implementado chama os testes escritos no teste.js:
```bash
npm teste
```
##Perguntas:

Explique com suas palavras o que é domain driven design e sua importância na estratégia de desenvolvimento de software.

``
Desenvolvimento de software em conjunto com as partes especialista do dominio que o sistema abrange, trabalhando com pequenas partes do sistemas, com comunição entre todas as partes usando de modelagens que possa sem entedidos por todos, trazendo para dentro do desenvolviemnto que realmente entende do que esta sendo desenvolvido dando ganho ao projeto, eficiencia, aliado a metodologia de desenvolvimento agil, traz muito ganho ao desenvolvimento de software.   
``

Explique com suas palavras o que é e como funciona uma arquitetura baseada em microservices. explique ganhos com este modelo, desafios em sua implementação e desvantagens.

``
Aplicações do lado servidor baseadas em micro seviços, são serviços entreges de forma separadas, para evitar sobrecargas e enventuais quedas de todo o sistema, caso alguma falha ocorra, sendo assim servidores para cada função do software e criado, separando as depedencia e bancos, caso um falhe outro continua a funcionar, o valor de infraestrutura e muito maior que APi comun. 
``

Explique qual a diferença entre processamento sincrono e assincrono e qual o melhor cenário para utilizar um ou outro.

``
sicrono acontece ao mesmo tempo, assisncrono são processos em fila e usado quando uma função depende de outra, criamos uma fila de processo para no final temos o resultado. por padrão o node.js que foi usado para desenvolviemnto de projeto e sicrono, tive que implementar algumas funçoes dentro de uma fila assincrona, para solucionar isso, uma vez que tinhamos na requisição, varias interaçoes com tabelas e informaçoes diferentes do banco de dados, caso de erro em alguma, tambme implemente um função de rollback
``