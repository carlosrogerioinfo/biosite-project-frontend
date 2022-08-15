# Biosite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Variáveis de Ambiente

As urls das gateways devem ser alteradas nos arquivos 
**environment.prod.ts**<br/>
**environment.ts**

![image](https://user-images.githubusercontent.com/72615280/184627551-9c01c62d-26c1-474f-b65e-d6dd4e84e6df.png)


# Backend Biosite

### Baixe aqui o projeto backend
https://github.com/carlosrogerioinfo/biosite-project-backend

O projeto **Biosite** é um exemplo de estrutura de aplicação distribuída com utilização de **API**, **Gateways** para isolamento das APIs, possui uma implementação funcional do uso do **CRQS** (Command Query Responsibility Segregation), uso de **VO** (Value Objects) e uso de **Notification Pattern** e muito mais, este projeto tem a intenção de servir de modelo para desenvolvedores iniciantes que estão aprendendo desenvolvimento de backends com comunicação entre APIs via gateway na plataforma Asp.Net Core usando linguagem C#.

A parte de comunicação entre a api gateway de exemplo com os endpoints das outras APIs, não está totalmente concluída, no projeto atual, a gateway se comunica com a API de autenticação para realizar o login e obter o token, e também está realizando comunicação com as APIs de biomarcadores e órgãos, trazendo todos os registros apenas. Os demais endpoints tanto da API de autenticação, quanto das APIs de biomarcadores e orgãos necessitam ser implementados. Aos poucos, a medida que sobrar um tempinho, eu vou adicionando.

Mas, sinta-se a vontade para usar o código e implementar as outras chamadas do gateway para os demais endpoints de suas respectivas APIs. Obviamente simplificamos o projeto de modo que foi criado apenas uma única api gateway para chamar os endpoints das outras APIs, mas, sinta-se a vontade para incluir as outras APIs gateway como forma de aprendicado para você.

## Estrutura
![image](https://user-images.githubusercontent.com/72615280/184603584-e7506330-86ea-443f-b0ec-b557e7e2fe4b.png)
![image](https://user-images.githubusercontent.com/72615280/184607195-504fd06e-b14e-4590-a34c-7731574ecbcf.png)

## As APIs podem ser testadas através dos seguintes endereços logo abaixo:

**API Gateway** : <a href="http://gateway.sampleapicore.uni5.net/" target="_blank">http://gateway.sampleapicore.uni5.net/</a>
  
**API de autenticação**: <a href="http://authentication.sampleapicore.uni5.net/" target="_blank">http://authentication.sampleapicore.uni5.net/</a>

**API de biomarcadores**: <a href="http://biomarker.sampleapicore.uni5.net/" target="_blank">http://biomarker.sampleapicore.uni5.net/</a>

**API de órgãos**: <a href="http://organ.sampleapicore.uni5.net/" target="_blank">http://organ.sampleapicore.uni5.net/</a>

## Informações de login para autenticação

**e-mail** : carlos@biosite.com<br/>
**senha** : teste123

**e-mail** : carlos@biosite.com<br/>
**senha** : teste123

## Banco de dados

Para este projeto foi usado o banco de dados SQL Server, mas não se preocupe, eu vou te passar um serviço de hospedagem onde tanto o banco de dados SQL server quanto serviço de hospedagem de aplicações asp.net e asp.net core são gratuítos. Basta você cadastrar sua conta criar seu database e executar os scripts que estão no projeto.

### Script I - Criação das tabelas <br/>
https://github.com/carlosrogerioinfo/biosite-api-gateway-sample/blob/main/script-database/script-criacao-tabelas.sql

### Script II - Inclusão de registros nas tabelas <br/>
https://github.com/carlosrogerioinfo/biosite-api-gateway-sample/blob/main/script-database/script-inclusao-dados.sql


## Hospedagem gratuita (Asp.Net Core / SQL Server)

Hospedagem gratuita para aplicações asp.net e asp.net core e com banco de dados sql server incluídos gratuitamente.
<a href="https://somee.com/" target="_blank">https://somee.com/</a>

## Links úteis
<a href="https://www.markdownguide.org/basic-syntax/#overview" target="_blank">Sintaxe Básica Markdown</a>

## Contato
E-mail: carlosrogerio.info@gmail.com <br/>

