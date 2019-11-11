# tcc
Trabalho de Conclusão de Curso de Engenharia de Software - UTFPR

## Desenvolviemnto de uma plataforma veiculação publicitaria
aplicação MEAN Stack

o MEAN Stack é o conjunto de tecnologias que juntas possibilitam o desenvolvimento de aplicações web utilizando a linguagem JavaScript desde a interface do usuário até a visualização da aplicação do lado servidor, são elas:
- O MongoDB é um banco gratuito de dados de código aberto, orientado à documentos (MONGODB, 2019).
- O Express é um framework de criação backend, utiliza o Node.js (EXPRESS.JS, 2019).
- O Angular é um framework baseado em JavaScript utilizado na construção da interface de aplicações SPA (single-page application), desenvolvido pela empresa Google (DICLEY, 2014).
- O Node.js é uma plataforma do servidor JavaScript (NODEBR, 2016).

A Figura apresenta a arquitetura MEAN e a relação com as tecnologias.

![](https://blog.octalmind.com/wp-content/uploads/2018/07/blog-post1_1.png)
 
### 1.api
Api construido em node.js e express, conectando com um banco mongodb, fornecendo estrutura de back-end para todas as visões 
### 2.empresa
Administrativo de acesso para o cliente empresa, onde possa publicar sua peças publicitarias.
### 3.docs
Repositorio de documentos, latex, diagramas, docx, pdf e etc.
### 4.cliente
Modulo cliente, com listagem de promoçoes cadastradas.
### OBJETIVO PRINCIPAL

Desenvolver uma aplicação WEB onde todos os módulos de interface de
acesso até a aplicação do lado servidor sejam escritos em linguagem
TypeScript para ser modelo para futuros estudos no desenvolvimento de
software utilizando as tecnologias relacionadas ao acrônimo MEAN Stack,
sendo elas respectivamente MongoDB, Express, Angular e NodeJS, junto a
palavra stack do inglês “pilha”.

Usando como escopo do software desenvolvido uma proposta de
produto que surgiu durante uma competição de empreendedorismo, o Startup
Weekend 2016 1 , realizada em Londrina, estado do Paraná.

Assim aplicando os conhecimentos de Engenharia de Software
adquiridos durante a trajetória da graduação, para o desenvolvimento de uma
plataforma web com dois domínios sendo eles, o Domínio Empresa e o
Domínio Cliente, sendo ambos detalhadas no capítulo 3, que em resumo
permitirá obter dados da localização dos usuários, via georreferenciamento e
manipular esses dados no lado servidor, sendo na sua maioria desenvolvida na
Linguagem de programação já mencionada TypeScript e suas bibliotecas.

Estas aplicações web propostas pretende disponibilizar um conjunto de
informações relacionadas a produtos em promoções disponibilizados no
sistema e a levanto em conta a distância entre da localização dos clientes e
empresas.

### OBJETIVOS ESPECÍFICOS
Os objetivos específicos a serem alcançados para sucesso do
desenvolvimento desta proposta é a criação de duas interfaces de acesso via
navegador web e uma aplicação no lado servidor, ambas baseada na
arquitetura de desenvolvimento de uma aplicação MEAN Stack, são elas:
#### a. O desenvolvimento de um domínio web que permitirá ao usuário
consultar via navegador no seu dispositivo, utilizando de parâmetro sua
localização, as promoções próximas vinculadas à plataforma.
##### b. O desenvolvimento de uma aplicação web para divulgação das
promoções e publicidades pelas empresas, onde as mesmas possam adicionar sua localização e publicar os produtos em ofertas para os
clientes da sua região.
##### c. O desenvolvimento de uma API para a integração e manipulação dos
dados gerados pelas plataformas web proposta.
