-- Adminer 4.8.1 PostgreSQL 14.2 dump

\connect "cineapi";

DROP TABLE IF EXISTS "combos";
CREATE TABLE "public"."combos" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "deleted_at" timestamp,
    "name" character varying NOT NULL,
    "price" numeric(10,2) NOT NULL,
    CONSTRAINT "PK_5b4bab633aee439e2bade42cc3c" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "combos" ("id", "created_at", "updated_at", "deleted_at", "name", "price") VALUES
('a2923bbf-0668-406b-b202-e209dd97b5cf',	'2022-07-24 17:21:29.318473',	'2022-07-24 17:21:29.366039',	NULL,	'THOR: AMOR E TROVÃO',	46.48),
('8efdf963-3e3d-4d30-bf61-aea51cda4e64',	'2022-07-24 17:17:38.51482',	'2022-07-24 17:22:46.948065',	'2022-07-24 17:22:46.948065',	'THOR: AMOR E TROVÃO',	46.48);

DROP TABLE IF EXISTS "items";
CREATE TABLE "public"."items" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "deleted_at" timestamp,
    "name" character varying NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "quantity" integer NOT NULL,
    "combo_id" uuid,
    CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "items" ("id", "created_at", "updated_at", "deleted_at", "name", "price", "quantity", "combo_id") VALUES
('c2ad35e1-f6af-4df8-9f97-b6cb3c3bcff8',	'2022-07-24 17:12:54.384681',	'2022-07-24 17:21:29.318473',	NULL,	'Balde de Pipoca Manteiga G',	17.50,	1,	'a2923bbf-0668-406b-b202-e209dd97b5cf'),
('e4da3917-3029-49fa-be84-a5681a5bac68',	'2022-07-24 17:13:28.204199',	'2022-07-24 17:21:29.318473',	NULL,	'Coca-Cola lata 350ml',	7.50,	2,	'a2923bbf-0668-406b-b202-e209dd97b5cf'),
('3eb07c6e-e43b-4d83-9ed8-01a3febaf1c7',	'2022-07-24 17:13:55.255113',	'2022-07-24 17:21:29.318473',	NULL,	'Barra de Chocolate Nestle 90g',	6.99,	2,	'a2923bbf-0668-406b-b202-e209dd97b5cf');

DROP TABLE IF EXISTS "movie";
CREATE TABLE "public"."movie" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "title" character varying NOT NULL,
    "description" text NOT NULL,
    "filmCast" jsonb NOT NULL,
    "direction" jsonb NOT NULL,
    "recommendation" integer NOT NULL,
    "genre" jsonb NOT NULL,
    "duration" integer NOT NULL,
    "classification" jsonb NOT NULL,
    "deleted_at" timestamp,
    CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "movie" ("id", "created_at", "updated_at", "title", "description", "filmCast", "direction", "recommendation", "genre", "duration", "classification", "deleted_at") VALUES
('a45e936d-3a1a-4ddf-a6b6-28182a5f3700',	'2022-07-23 19:45:09.404914',	'2022-07-24 14:55:12.132674',	'THOR: AMOR E TROVÃO',	'Thor: Amor e Trovão é do mesmo diretor de Thor: Ragnarok (2017). Após os eventos ocorridos em Vingadores: Ultimato (2019), Thor (Chris Hemsworth) abandonou os tempos de herói e busca a paz interior. Sua aposentadoria será interrompida porque Gorr (Christian Bale), o assassino Carniceiro dos Deuses, busca a extinção dos deuses.',	'["Chris Hemsworth", "Natalie Portman", "Christian Bale"]',	'["Taika Waititi"]',	5,	'["AÇÃO", "AVENTURA"]',	119,	'["CLASSIFICAÇÃO 14", "Violência, Nudez, Drogas Lícitas."]',	'2022-07-24 14:55:12.132674'),
('e1c5e277-d718-435d-8b08-2fd6f3c54a45',	'2022-07-24 14:58:30.19915',	'2022-07-24 14:58:30.19915',	'THOR: AMOR E TROVÃO',	'Thor: Amor e Trovão é do mesmo diretor de Thor: Ragnarok (2017). Após os eventos ocorridos em Vingadores: Ultimato (2019), Thor (Chris Hemsworth) abandonou os tempos de herói e busca a paz interior. Sua aposentadoria será interrompida porque Gorr (Christian Bale), o assassino Carniceiro dos Deuses, busca a extinção dos deuses.',	'["Chris Hemsworth", "Natalie Portman", "Christian Bale"]',	'["Taika Waititi"]',	5,	'["AÇÃO", "AVENTURA"]',	119,	'["CLASSIFICAÇÃO 14", "Violência, Nudez, Drogas Lícitas."]',	NULL);

DROP TABLE IF EXISTS "rooms";
CREATE TABLE "public"."rooms" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "name" character varying NOT NULL,
    "maximum_capacity" integer NOT NULL,
    "minimum_capacity" integer NOT NULL,
    "type_room" rooms_type_room_enum DEFAULT 'TWO_D' NOT NULL,
    "deleted_at" timestamp,
    "movie_id" uuid,
    CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "rooms" ("id", "created_at", "updated_at", "name", "maximum_capacity", "minimum_capacity", "type_room", "deleted_at", "movie_id") VALUES
('b4b9b774-e0f0-4fee-a723-8f8976289f4d',	'2022-07-23 21:40:20.546641',	'2022-07-24 14:58:30.19915',	'sala 6',	200,	100,	'TWO_D',	NULL,	'e1c5e277-d718-435d-8b08-2fd6f3c54a45');

DROP TABLE IF EXISTS "sessions";
CREATE TABLE "public"."sessions" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "exhibition" jsonb NOT NULL,
    "roomsId" uuid,
    "deleted_at" timestamp,
    CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "sessions" ("id", "created_at", "updated_at", "exhibition", "roomsId", "deleted_at") VALUES
('bcd8061f-f527-4e68-a55e-312e87237aad',	'2022-07-23 21:02:36.060452',	'2022-07-23 21:40:20.546641',	'["14:30"]',	'b4b9b774-e0f0-4fee-a723-8f8976289f4d',	NULL);

DROP TABLE IF EXISTS "tickets";
CREATE TABLE "public"."tickets" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "deleted_at" timestamp,
    "description" character varying NOT NULL,
    "session_id" uuid,
    "price" numeric(10,2) NOT NULL,
    CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"),
    CONSTRAINT "REL_73f270d03cacce3e2eac969834" UNIQUE ("session_id")
) WITH (oids = false);

INSERT INTO "tickets" ("id", "created_at", "updated_at", "deleted_at", "description", "session_id", "price") VALUES
('368c34a5-c8a5-4468-aecc-363b0821900d',	'2022-07-24 20:23:02.460674',	'2022-07-24 20:23:02.460674',	NULL,	'string',	'bcd8061f-f527-4e68-a55e-312e87237aad',	32.00);

DROP TABLE IF EXISTS "typeorm_metadata";
CREATE TABLE "public"."typeorm_metadata" (
    "type" character varying NOT NULL,
    "database" character varying,
    "schema" character varying,
    "table" character varying,
    "name" character varying,
    "value" text
) WITH (oids = false);


ALTER TABLE ONLY "public"."items" ADD CONSTRAINT "FK_34634ce5dc5678bfbf2df50c45b" FOREIGN KEY (combo_id) REFERENCES combos(id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."rooms" ADD CONSTRAINT "FK_e29e76e506f61c49cb08beb9aca" FOREIGN KEY (movie_id) REFERENCES movie(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."sessions" ADD CONSTRAINT "FK_0339f94b21dfaa88068ca53085c" FOREIGN KEY ("roomsId") REFERENCES rooms(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."tickets" ADD CONSTRAINT "FK_73f270d03cacce3e2eac9698341" FOREIGN KEY (session_id) REFERENCES sessions(id) NOT DEFERRABLE;