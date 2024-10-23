# Aplicação CRUD Spring Boot/Angular

 Este projeto é uma aplicação simples de CRUD de produtos.

## Tecnologias Utilizadas:

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

![image](https://github.com/user-attachments/assets/4c50fe8b-4a35-4164-9b43-374962e15140)
![image](https://github.com/user-attachments/assets/570bc82c-9233-486b-bca1-0fb977deb3cc)
![image](https://github.com/user-attachments/assets/3e390930-95e5-4c92-97f0-d73edc9268d5)
![image](https://github.com/user-attachments/assets/ee99382d-a889-47d9-9b55-1c3fbe4968a6)
![image](https://github.com/user-attachments/assets/696c40ea-7371-4a2a-9be7-548802ab85b5)





