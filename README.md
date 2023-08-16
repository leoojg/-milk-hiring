## Cenário do problema a ser solucionado

Considere o cenário onde há N fazendeiros que produzem leite e entregam sua produção para uma fábrica de processamento.

O objetivo neste cenário é ter um registro do volume de leite entregue e o preço recebido em cada mês por litro de leite, bem como o montante recebido para a produção mensal.

Para cada semestre do ano o preço do litro de leite é computado usando diferentes regras:


|Critério| Primeiro semestre - Jan a Jun | Segundo semestre - Jul a Dez |
|---|:---:|---|
|Preço base por litro| R$ 1,80| R$ 1,95|
|Custo por KM até 50KM| R$ 0,05 | |
|Custo por KM acima de 50KM| R$ 0,06 | |
|Bônus p/ produção acima de 10.000 L| |R$ 0,01|

A regra para computar o preço do litro de leite é:

Preço = (Volume do mês * Preço base) - (Custo por KM * distância da fazenda até a fábrica) + (Bônus p/ produção * litros entregues no mês)

Considerando as regras descritas, crie uma API com os seguintes recursos:
- cadastro de fazendeiro e fazenda;
- cadastro da produção de leite diário, em litros;
- consulta do volume de leite entregue para cada dia e a média mensal, dado uma fazenda e um mês de parâmetro;
- consulta do preço do litro de leite pago ao fazendeiro, dado um código de fazenda e um mês de parâmetro. Apresentar o preço no formato numérico brasileiro e inglês;
- consulta do preço do litro de leite pago para cada mês do ano, dado uma fazenda e um ano de parâmetro. Apresentar o preço no formato numérico brasileiro e inglês;