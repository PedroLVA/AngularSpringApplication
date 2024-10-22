# Aplicação CRUD Spring Boot/Angular

 Este projeto é uma aplicação simples de CRUD de produtos.

## Tecnologias Utilizadas

- **Frontend:** Angular
- **Backend:** Spring Boot
- **Banco de Dados:** PostgreSQL
- **Contêinerização:** Docker
- **Autenticação:** JWT

## Pré-requisitos

Antes de iniciar, verifique se você possui as seguintes ferramentas instaladas:

- **Node.js** e **npm**: [Instalar Node.js](https://nodejs.org/)
- **Docker** e **Docker Compose**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Angular CLI** (globalmente):  
  ```bash
  npm install -g @angular/cli
  ```

## Configurando Frontend

### 1. Clonar o Repositório

```bash
git clone https://github.com/PedroLVA/AngularSpringApplication.git
```
### 2. Navegue até a pasta front

```bash
cd front
```
### 3. Instalando Dependências

```bash
npm install
```

### 4. Executando o Frontend

```bash
ng serve
```
A aplicação estará disponível em http://localhost:4200.
<br><br><br>
## Configurando Backend

### 1. Navegue até a pasta back

```bash
cd ../backend
```

### 2. Configure o Docker
Certifique-se de ter o arquivo docker-compose.yml configurado corretamente para o seu banco de dados e a aplicação Spring Boot.

### 3. Executando o Backend com Dockek

```bash
docker-compose up --build
```
Isso irá construir a imagem e iniciar o container do backend. A aplicação estará disponível em http://localhost:8080.
<br>

## Após isso, siga os seguintes passos.

- Vá até a aba de login.
- Tente logar com as credênciais:
  <br>usuário: *admin*
  <br>senha: *admin*


## Estrutura do Projeto

```plaintext
roommates/
│
├── front/           # Código-fonte do frontend (Angular)
│   ├── src/            # Diretório principal com componentes, serviços, etc.
│   ├── package.json     # Dependências e scripts do Angular
│   └── ...
│
└── back/            # Código-fonte do backend (Spring Boot)
    ├── src/            # Diretório principal com controladores, serviços, etc.
    ├── Dockerfile      # Arquivo para construir a imagem do Docker
    ├── docker-compose.yml # Configuração dos serviços do Docker
    └── ...
```


