
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


INSERT INTO users (id, login, password, role) VALUES
(UUID_GENERATE_V4(), 'admin', '$2a$10$ggT8qPnA.PvQT7osiAO.teJzkYBfrO5cAZMuppiCNO5IhgVVWQ4FC', 0),
(UUID_GENERATE_V4(), 'user', '$2a$10$PEa64s0heJ2hS.4cQY6YrOEyeyisqcQwsYe33lWPZNffL1tZ5heBy', 1);


INSERT INTO product (id, name, price_in_cents, active, description, category, created_at) VALUES
(UUID_GENERATE_V4(), 'Cadeira Gamer Confort', 7999, true, 'Cadeira gamer com apoio lombar e regulagem de altura.', 'Móveis', NOW()),
(UUID_GENERATE_V4(), 'Notebook Dell Inspiron', 359999, true, 'Notebook com processador Intel i7 e 16GB de RAM.', 'Eletrônicos', NOW()),
(UUID_GENERATE_V4(), 'Smartphone Galaxy S22', 499999, true, 'Smartphone Samsung Galaxy com tela AMOLED e 128GB.', 'Eletrônicos', NOW()),
(UUID_GENERATE_V4(), 'Air Fryer Digital', 29999, true, 'Fritadeira elétrica sem óleo com controle digital.', 'Eletrodomésticos', NOW()),
(UUID_GENERATE_V4(), 'Sofá Retrátil 3 Lugares', 89999, true, 'Sofá com chaise retrátil e tecido de veludo.', 'Móveis', NOW()),
(UUID_GENERATE_V4(), 'Relógio Smartwatch Xiaomi', 24999, true, 'Relógio com monitoramento de batimentos e notificações.', 'Eletrônicos', NOW()),
(UUID_GENERATE_V4(), 'Geladeira Inox Brastemp', 479999, true, 'Geladeira frost free com compartimento de freezer.', 'Eletrodomésticos', NOW()),
(UUID_GENERATE_V4(), 'Mesa de Jantar 6 Lugares', 55999, true, 'Mesa de madeira maciça com acabamento rústico.', 'Móveis', NOW()),
(UUID_GENERATE_V4(), 'Fone de Ouvido Bluetooth', 15999, true, 'Fone sem fio com cancelamento de ruído ativo.', 'Eletrônicos', NOW()),
(UUID_GENERATE_V4(), 'Luminária LED para Escrivaninha', 9999, true, 'Luminária com ajuste de brilho e temperatura de cor.', 'Móveis', NOW());


