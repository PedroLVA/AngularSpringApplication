# 🚀 Aplicação CRUD de Produtos - Spring Boot & Angular

## 📋 Visão Geral
Aplicação completa de Gerenciamento de Produtos desenvolvida com tecnologias modernas, para fins educacionais.

## 🛠️ Tecnologias Utilizadas
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

## 🔍 Recursos Principais
- 🖥️ Interface de usuário moderna com Angular
- 🔒 Autenticação segura via JWT
- 📦 Gerenciamento completo de produtos
- 🐳 Contêinerização com Docker
- 💾 Persistência de dados com PostgreSQL

## 📋 Pré-requisitos
Antes de começar, instale:
- 📦 **Node.js** e **npm**: [Baixar Node.js](https://nodejs.org/)
- 🐳 **Docker** e **Docker Compose**: [Instalar Docker](https://docs.docker.com/get-docker/)
- 🅰️ **Angular CLI** (instalação global):  
  ```bash
  npm install -g @angular/cli
  ```

## 🚀 Configuração do Projeto

### Frontend (Angular)
```bash
# Clonar o repositório
git clone https://github.com/PedroLVA/AngularSpringApplication.git

# Navegar para o diretório frontend
cd front

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
ng serve
```
🌐 Acesso: http://localhost:4200

### Backend (Spring Boot)
```bash
# Navegar para o diretório backend
cd ../backend

# Construir e iniciar contêineres Docker
docker-compose up --build
```
🖥️ Acesso: http://localhost:8080

## 🔐 Credenciais de Acesso
- **Usuário:** *admin*
- **Senha:** *admin*

## 📂 Estrutura do Projeto
```
roommates/
│
├── front/           # Frontend Angular
│   ├── src/         # Código-fonte principal
│   └── package.json # Configurações de dependências
│
└── back/            # Backend Spring Boot
    ├── src/         # Código-fonte principal
    ├── Dockerfile   # Configuração de build Docker
    └── docker-compose.yml # Orquestração de serviços
```

## 📸 Capturas de Tela
<div align="center">
  <img src="https://github.com/user-attachments/assets/4c50fe8b-4a35-4164-9b43-374962e15140" width="400" alt="Captura de Tela 1">
  <img src="https://github.com/user-attachments/assets/570bc82c-9233-486b-bca1-0fb977deb3cc" width="400" alt="Captura de Tela 2">
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/3e390930-95e5-4c92-97f0-d73edc9268d5" width="400" alt="Captura de Tela 3">
  <img src="https://github.com/user-attachments/assets/ee99382d-a889-47d9-9b55-1c3fbe4968a6" width="400" alt="Captura de Tela 4">
</div>
