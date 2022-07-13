# Regras de negocios

[x] - Ter o **Filme** em cartaz
[x] - **Filme** em cartaz com seus **Gêneros** e **Classifição etária**
[] - Filme que irá estrear
[] - Uma **Sessão** pode acontece em várias **Salas**
[] - Uma **Sessão** tem vários horário de **Exibição**
[] - Comprar de pipocas -> combos

[] - Quando a pessoa compra a pipoca - combo com o ticked do filme terá desconto, se comprar sem o ticked do filme preço normal
[] - Quantidade de assentos - posição do assento

[] - Ter promoções de combos porar determinado filme


# Estrutra de tabelas

* Filmes
* Preços
* Gênero
* Salas
* Itens
* Combos
* Combo Itens
* Sessão

## Relacionamento entre as tabelas

- Filme  : Gênero = N:N
- Sessão : Sala   = 1:N
- Sessão : Filme  = 1:N
- Sessão : Combos = 1:N
- Sessão : Preços = 1:N

- Combos Itens : Combo = N:N
- Combos Itens : Itens = N:N

## Regras

Não pode ter uma **Filme** com o mesmo **título**

Pode ter o mesmo **Filme** em várias sessões e salas diferentes

Um **Filme** pode ter mais de um **Gênero**

Um **Filme** tem que ter pelo menos um **Gênero** e tem que ter uma **Classificação**

Pode vender um **Combo** sem ter o ingresso do **Filme**

Uma pessoa pode comprar vários **Combos**

Não pode existe uma **Sessão** na mesma **Sala** e horário


Entrar na DTO de filme e passar os IDs para ele na service