--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    hire_date timestamp(3) without time zone NOT NULL,
    full_name text NOT NULL,
    salary numeric(10,2) NOT NULL,
    identification integer NOT NULL
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    id integer NOT NULL,
    code text NOT NULL,
    resumen text NOT NULL,
    description text NOT NULL,
    "employeeId" integer NOT NULL
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- Name: requests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requests_id_seq OWNER TO postgres;

--
-- Name: requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requests_id_seq OWNED BY public.requests.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    is_admin boolean NOT NULL,
    status boolean NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.requests_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
330685e1-6eed-46ec-a372-4cc281077b73	7e4da6e0731ad0e4431e31d86b9034857790f918dc337092d597de612dceeb2a	2024-09-08 12:11:55.100533-05	20240908171155_init	\N	\N	2024-09-08 12:11:55.037997-05	1
4bd8c0e9-f12e-4ee4-a445-4561e913f1d5	f04c0ab3d7e5ae853dc931344f978a2660675626be4f33b2f369cd8e7eac5b5f	2024-09-08 12:37:29.045585-05	20240908173729_change_structure_user	\N	\N	2024-09-08 12:37:29.037716-05	1
d158bfd5-42be-43a8-872d-879cc1d8a99f	a9a8b8b4b219cdb6843cfe4dda83e3378d8870c9320f898da2028f235ed1519e	2024-09-08 12:38:33.661483-05	20240908173833_change_names_tables	\N	\N	2024-09-08 12:38:33.613289-05	1
d755f52d-26c1-4cae-a8fa-a85e85470213	b488efc0006f564eb61930a7491a3d61d45239915dda1d25c6945667abd37b35	2024-09-08 14:50:08.44199-05	20240908195008_change_structure_field_salary	\N	\N	2024-09-08 14:50:08.41608-05	1
1f532c21-25ee-4d12-bfde-ea8e5e685930	5cffb72d19921a2419e8fc7e42334a950ae6bead3636c51b36a716fc2047587f	2024-09-08 20:40:29.360044-05	20240909014029_change_attribute_field_code	\N	\N	2024-09-08 20:40:29.345281-05	1
33d1432d-038c-42d5-bd38-e1391e1b2585	761042e7f321d829a975aaeaafc331643a570da45cc11ca8bb7df1060b03cf42	2024-09-08 22:34:55.517136-05	20240909033455_add_attribute_identification_to_employees_table	\N	\N	2024-09-08 22:34:55.503139-05	1
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, hire_date, full_name, salary, identification) FROM stdin;
41	2024-09-08 00:00:00	Zane White	2001.00	1004949655
42	2024-09-09 00:00:00	Charlie Brown	2005.00	1017614289
43	2024-09-09 00:00:00	Alice Hall	2009.00	1027399344
44	2024-09-10 00:00:00	Michael Wilson	2014.00	1043880364
45	2024-09-10 00:00:00	Emma Miller	2018.00	1054638314
46	2024-09-10 00:00:00	Jane Garcia	2019.00	1058132804
47	2024-09-11 00:00:00	Lily Wright	2022.00	1067077149
48	2024-09-11 00:00:00	Liam Torres	2023.00	1070859286
49	2024-09-11 00:00:00	Alice Hill	2024.00	1072741563
50	2024-09-11 00:00:00	Rachel Martin	2024.00	1073946830
51	2024-09-11 00:00:00	Oscar Hall	2025.00	1077116380
52	2024-09-11 00:00:00	Xander Anderson	2025.00	1077950078
53	2024-09-11 00:00:00	Hank Williams	2028.00	1084599737
54	2024-09-11 00:00:00	Quincy Nguyen	2028.00	1085725070
55	2024-09-12 00:00:00	Ethan Allen	2028.00	1086309825
56	2024-09-12 00:00:00	Yara Walker	2029.00	1087625651
57	2024-09-12 00:00:00	Tina Allen	2030.00	1090110040
58	2024-09-12 00:00:00	Frank Jones	2033.00	1100114296
59	2024-09-12 00:00:00	Charlie Anderson	2035.00	1107466356
60	2024-09-14 00:00:00	Ethan White	2045.00	1135790118
61	2024-09-15 00:00:00	Chloe Davis	2053.00	1160853398
62	2024-09-15 00:00:00	Chloe Lee	2053.00	1161755553
63	2024-09-15 00:00:00	Jane Wilson	2061.00	1183417943
64	2024-09-15 00:00:00	Charlie Wilson	2061.00	1183773333
65	2024-09-16 00:00:00	Oscar Thompson	2065.00	1196517693
66	2024-09-16 00:00:00	Wendy Robinson	2065.00	1197140325
67	2024-09-16 00:00:00	Eve Clark	2068.00	1204152619
68	2024-09-16 00:00:00	Diana Williams	2068.00	1205617466
69	2024-09-16 00:00:00	Liam Anderson	2069.00	1208088176
70	2024-09-17 00:00:00	Sophia Moore	2069.00	1209694163
71	2024-09-17 00:00:00	Emma Martinez	2071.00	1214659715
72	2024-09-17 00:00:00	Chloe King	2075.00	1225068818
73	2024-09-18 00:00:00	Quincy Smith	2078.00	1235336344
74	2024-09-18 00:00:00	Liam Lewis	2078.00	1236908990
75	2024-09-19 00:00:00	Jane White	2088.00	1266769390
76	2024-05-10 05:00:00	Hola mundo	100010.00	123456
78	2024-05-10 05:00:00	Hola mundo	100010.00	1234567
79	2024-05-19 00:00:00	user_name_533983	1500.00	1451515454
80	2024-09-11 05:00:00	Pepito perez	1400.00	24534242
\.


--
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requests (id, code, resumen, description, "employeeId") FROM stdin;
18	fdfsdfsds	fsfsff	sfsfsfs	80
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password, is_admin, status) FROM stdin;
2	jorge19	$2a$10$HiKFG8YVOoMQzNYiP3zi9uuQpUrqrta60/36H4Vs8l5gxy7euvMHK	f	f
3	mundo	$2a$10$LwmjjRDTQJtUYGpv4/cGUefgnWQD2k7V29MfSq6j6s6WMn6v89vM2	f	f
5	admin	$2a$10$yVnNaCZ0ZVID4l2BnC5QhOVXNNM8kKvhAD2GutSLn3qOF4aXY9Y/m	t	t
6	user_name_546439	$2a$10$azRIGmAPTFSK76ZTGSdciucGgmeqLzkya.GVGPdV/yHjeY0SsfqNy	t	t
7	user_name_704068	$2a$10$VjpO/AiCujfYXZxs/IGV.OJu.ZX12cjBvboXrLqqovNVL2zUhYHKe	t	t
8	user_name_849791	$2a$10$VdvGJ7a6kb6H/.wqdQWl6eBQH68L3R2VHnVtIzYAIXBKs1izhh4W6	t	t
9	user_name_127046	$2a$10$/hMh6MaV71IDSt9dIcer7OF1JcyJgxfZUOUaZhbUD9tib2lQix3AK	t	t
10	user_name_679571	$2a$10$oAhVP1L101VrsLfwNvC6BOPxUbrTRzE4bHkGQB.biNFZPtwcs2lkG	t	t
11	user_name_478598	$2a$10$FHmGP77F7Z/KhHFuhPw3quZoXtwgoVR3AHeb.rTzuSg33np4xnR3m	f	f
12	user_name_877208	$2a$10$nekcoQkbRTGKoSG5H6pH0O5ZnwjhD4UqdNb.dqhp.g3zZ7ClTuIYW	f	f
13	user_name_257198	$2a$10$ls5H8mD1oSpPiM97WqPVbOLsOxGxBdPDd3jCG2J.OISGa6TsLVZgi	t	t
14	user_name_47431	$2a$10$dUu7d.oE7XpV2thSqh0zQOO0UJfcnoJZnNH3LqZDsk0aJfOXeGHp2	f	f
15	user_name_529402	$2a$10$I6HqWPdRf1PUDJRpb2jlrOGcG/uGdCSvvRqQxmh9g7zVEoVeQLVMm	t	t
16	user_name_802045	$2a$10$NqBcJD8HEtxlcwM3fUsow.l9yfzbkzdzbtW.xH61UlTFWYGwROnZW	t	t
17	user_name_669460	$2a$10$LHhupPVirYupofsbdQIQtOroptd8i0HNbpXuUQ5PAw95Gi.bd8trC	t	t
18	user_name_611073	$2a$10$IZ0i4g8GcrCe22hivkV8POCUTDMcCL1Kg1My0uBGnyHZq5eKKYSWy	t	t
19	user_name_366646	$2a$10$/XPYjbVaGFiQ5DYJFCWifOlNROnF2haghlnI/97v7ITgui4qARAQ2	f	f
20	user_name_94556	$2a$10$XeejWzNl/1jsn3/bID6MHu40pZSZM2xlvQZGsS4vRXCNIyigfchDK	t	t
21	user_name_514998	$2a$10$2t.Ts6ZmOAt1jJZ5Im/CEOimZzDRW3pigNBy/GuQFy0/meVedACom	f	f
22	user_name_611239	$2a$10$r2wiYeyn5wtlyrsHVIYFDOQlcmLD0oVDv.a5mw3DNx1boVA0UuI6m	t	t
23	user_name_772428	$2a$10$.n49GgHdaLytbaqoecq9FOi63SfQgLFYpi.3dotzUMheSxxQc/Qzy	f	f
24	user_name_387039	$2a$10$Dw0oiOuWGjYAhbLCD6ypWeDSgfvoyi/N6gQqbNo85Fj7Z1MvzhI4G	t	t
25	user_name_457397	$2a$10$.LizwpWgXWd.A8NO6Jbbj.ng9/RJCw9xfD5fcy0Cr/8ALLv9Fp7Su	t	t
26	user_name_921506	$2a$10$f3mJE5SxfR2OeplxMewhduNAuaZ8K75TqnSTAMSZkEyt49AxNacx6	t	t
27	user_name_317668	$2a$10$8wmtmIvtfZyEQ1MH2l0s1OKB7GkfkpsZV9tOHgE73zviyRb9rtjHK	t	t
28	user_name_361856	$2a$10$cwMql7DdGrE1SiGMkIcmfuTiUlxgyAkrMidM9nCWiYrBFiWVHzbju	t	t
29	user_name_914078	$2a$10$MnwnnXlIn18RHFuY679.uOOYwV3xqrYWAOX.zFW/Ub5SLQqDZGtOu	t	t
30	user_name_617532	$2a$10$SBWkLa26fsxGKsGFkBmXzOFnIYQuKq3Gn7U3C9Hcpiz.wxyVphuSa	t	t
31	user_name_427491	$2a$10$YRpybeetCHIDgNaH8Gk2.e754/5LmG9gU82uHEgc1EQFd9LL/Ouqa	t	t
1	jorge019	$2a$10$pBz4CGYfDu15OciXWA6MKOcPdyLpOzK4WY2uN/xpvWKrtoSz6iia.	f	t
4	jasen019	$2a$10$NoIqEY5JxDpR1Wz6mlre/eTGX6kEelOglIWXnb2MYsXFBBCPs6Pja	f	t
32	jorgesalgado	$2a$10$9eiud4OQyh.haGhPgil7dOktJvDoLiBUvZ11p3IjpFKgPrYuDUg7y	f	f
\.


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 80, true);


--
-- Name: requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requests_id_seq', 18, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 32, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: employees_identification_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX employees_identification_key ON public.employees USING btree (identification);


--
-- Name: requests_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX requests_code_key ON public.requests USING btree (code);


--
-- Name: users_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_name_key ON public.users USING btree (name);


--
-- Name: requests requests_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT "requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

