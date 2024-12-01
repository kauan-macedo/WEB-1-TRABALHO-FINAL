DROP DATABASE IF EXISTS alunos;
CREATE DATABASE alunos;
USE alunos;

DROP TABLE IF EXISTS telefones;
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS cursos;

CREATE TABLE IF NOT EXISTS cursos (
    id_curso int primary key AUTO_INCREMENT,
    nome_curso varchar(100) not null,
    carga_horaria int not null,
    turno enum('M', 'T', 'N', 'I') not null,
    tipo enum('Tecnólogo', 'Bacharelado', 'Engenharia') not null
);

CREATE TABLE IF NOT EXISTS alunos (
    id_aluno int AUTO_INCREMENT primary key,
    nome_aluno varchar(100) not null,
    email_aluno varchar(100) unique,
    id_curso int not null,
    matricula enum('Ativa', 'Trancada', 'Cancelada') not null,
    constraint fkAlunos foreign key (id_curso) references cursos (id_curso)
);

CREATE TABLE IF NOT EXISTS telefones (
    id_aluno int,
    telefone char(13),
    constraint fkTelefones foreign key (id_aluno) references alunos (id_aluno)
);

insert into cursos (nome_curso, carga_horaria, turno, tipo)
    values ('Análise e Desenvolvimento de Sistemas', 2310, 'N', 'Tecnólogo'),
    ('Ciência da Computação', 3200, 'I', 'Bacharelado'),
    ('Engenharia Elétrica', 3600, 'I', 'Engenharia');

insert into alunos (nome_aluno, email_aluno, id_curso, matricula) values
    ('João Pedro Gonçalves Cardoso', 'joao.mail@ufpr.br', 1, 'Ativa'),
    ('Kauan Kelvin', 'kauan.mail@ufpr.br', 1, 'ativa'),
    ('João Gabriel Fanti', 'fanti.mail@ufpr.br', 2, 'Ativa'),
    ('Fulano de Tal', 'fulano.mail@ufpr.br', 3, 'Trancada'),
    ('Ciclano de Tal', 'ciclano.mail@ufpr.br', 3, 'Cancelada');

insert into telefones (id_aluno, telefone) values
    (1, '(41)1234-5678'),
    (1, '(41)8765-4321'),
    (2, '(41)1111-1111'),
    (3, '(41)2222-2222'),
    (4, '(41)3333-3333'),
    (5, '(41)4444-4444'),
    (5, '(41)5555-5555'),
    (5, '(41)6666-6666');

show tables;
describe cursos;
describe alunos;
describe telefones;

select * from alunos;
    