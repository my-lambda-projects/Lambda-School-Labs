--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    country_name character varying NOT NULL,
    flag character varying NOT NULL,
    country_img character varying NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: friends_with; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friends_with (
    id integer NOT NULL,
    user_1 integer NOT NULL,
    user_2 integer NOT NULL,
    status character varying NOT NULL
);


ALTER TABLE public.friends_with OWNER TO postgres;

--
-- Name: friends_with_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.friends_with_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.friends_with_id_seq OWNER TO postgres;

--
-- Name: friends_with_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.friends_with_id_seq OWNED BY public.friends_with.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    age integer NOT NULL,
    nationality character varying NOT NULL,
    picture_url character varying,
    email character varying,
    role character varying NOT NULL,
    CONSTRAINT users_age_check CHECK ((age >= 14))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_countries_join; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_countries_join (
    id integer NOT NULL,
    user_id integer NOT NULL,
    country_id integer NOT NULL,
    status character varying NOT NULL
);


ALTER TABLE public.users_countries_join OWNER TO postgres;

--
-- Name: users_countries_join_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_countries_join_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_countries_join_id_seq OWNER TO postgres;

--
-- Name: users_countries_join_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_countries_join_id_seq OWNED BY public.users_countries_join.id;


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


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: friends_with id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends_with ALTER COLUMN id SET DEFAULT nextval('public.friends_with_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_countries_join id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_countries_join ALTER COLUMN id SET DEFAULT nextval('public.users_countries_join_id_seq'::regclass);


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, country_name, flag, country_img) FROM stdin;
\.


--
-- Data for Name: friends_with; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.friends_with (id, user_1, user_2, status) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, first_name, last_name, age, nationality, picture_url, email, role) FROM stdin;
\.


--
-- Data for Name: users_countries_join; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_countries_join (id, user_id, country_id, status) FROM stdin;
\.


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 1, false);


--
-- Name: friends_with_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.friends_with_id_seq', 1, false);


--
-- Name: users_countries_join_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_countries_join_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: friends_with friends_with_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends_with
    ADD CONSTRAINT friends_with_pkey PRIMARY KEY (id);


--
-- Name: users_countries_join users_countries_join_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_countries_join
    ADD CONSTRAINT users_countries_join_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: users_countries_join users_countries_join_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_countries_join
    ADD CONSTRAINT users_countries_join_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: users_countries_join users_countries_join_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_countries_join
    ADD CONSTRAINT users_countries_join_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

