﻿# AngularSpringCrud
Application I'm using to train the concepts learned of Angular and Spring Boot

Para utlizar o banco de dados com docker, colocar as seguintes informações:

# Aviso importante

Caso haja alteração em alguma entidade, é necessário criar a migration e deletar os containers e imagens, e rodar o docker compose novamente.

## Para se conectar no banco de dados via docker pelo terminal:

* Rode o comando:
     ```sh
  docker compose up -d
  ```
* Rode o comando:
   ```sh
  docker exec -it back-db-1 bash
  ```
* Em seguida, o comando:
    
   ```sh
   psql -U postgres -d product
    ```
* Para listar todas as tabelas:
    
   ```sh
   \dt
    ```
