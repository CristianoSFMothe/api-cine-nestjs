# Cine API

<h1 align="center">NestJs API User</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest 
  
  <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  </p>
  
----

## 📝️ Descrição

> Um REST Full API de cadastro de usuários usando o <a href="https://nestjs.com/" target="_blank">NestJs</a>, framerwork do <a href="https://nodejs.org/en/" target="_blank">NodeJs</a>

---

## 📥️ Instalação

Caso não tenha o NestJs instalado na sua máquina, mas tenha o NodeJs instalado, basta usar o seguinte comando para instalar o NestJs de forma global

```bash
# Instalação do NestJs
$ npm i -g @nestjs/cli
```

* Caso já tenha o NodeJs instalado

```bash
# Instalação dos pacotes
$ npm install
```

## 🛠️ Criando o projeto e configurando

```bash
# Criando o projeto
$ nest new <name_project>
```

* Ao iniciar o projeto selecionar o gerenciador de pacotes, que nesse caso será o `npm`

* Ao terminar a criação abri o projeto

> Estrutura Inicial do NestJs

<img src="https://user-images.githubusercontent.com/68359459/157122215-fedfcf00-3086-432c-9d1e-605fabfb9a24.png" alt="Estrutura inicial do NestJs">


> Fazendo uma pequena limpeza no projeto, removendo alguns arquivos que não serão utilizados no momento.

* Remover app.controller.spec.ts em src
* Remover app.controller.ts em src
* Remover app.service.ts em src
* Remover os respectivos imports no arquivo `app.module.ts`:

```js
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

<img src="https://user-images.githubusercontent.com/68359459/157122163-f5eae8de-77ef-48d6-bb92-40f6b3a1cfef.png" alt="Limpeza do projeto">

---

## 💻️ Executando o APP

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
