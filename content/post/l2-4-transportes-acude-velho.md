---
title: "Uso de Bicicletas no Entorno do Açude Velho"
date: 2017-12-09T20:43:08-03:00
draft: false
comments: true
slug: "bicicletas-acude-velho"
tags: ["visualizacao", "mobilidade", "igualdade", "d3", "lab-02"]
---

<link rel="stylesheet" href="/datavis/css/l2-custom.css">

A mobilidade é um tema cada vez mais presente nas discussões sobre desenvolvimento
sustentável e qualidade de vida nos centros urbanos. Dentre as discussões envolvendo
o tema, as bicicletas são constantemente citadas como instrumentos de mobilidade efetivos.

<!--more-->

Uma equipe do [LabRua](https://www.facebook.com/LabRua/), entidade que objetiva
desenvolver estudos sobre o espaço público, cultura e conservação do patrimônio
histórico, distribuiu-se por três pontos no entorno do Açude Velho em Campina Grande
e observou a presença dos vários meios de locomoção durante um dia inteiro. Os dados obtidos,
reunidos [neste repositório](https://github.com/luizaugustomm/pessoas-no-acude/blob/master/dados/processados/dados.csv),
foram utilizados nesta análise, que visa comparar a utilização de bicicletas com aquela
dos demais meios de locomoção no local, explorando ainda um pouco da demografia dos
usuários desse tipo de transporte.

Os dados temporais apontam a dominância dos carros em todos os períodos do dia,
seguidos de perto pelas motos, que deixam de ser o segundo meio de locomoção mais
utilizado na localidade apenas no período noturno, quando são superadas pelos pedestres.
As bicicletas são o quarto meio de locomoção mais utilizado em praticamente todo o dia,
exceto no início da manhã, onde se tornam o segundo meio mais presente por um curto
período, e no final da manhã, quando são superadas em número pelos caminhões.

<div class="row chart" id="chart_1"></div>

Em números totais, a situação é semelhante à vista na análise temporal. Os carros
são o meio de locomoção mais utilizado, apresentando mais do que o dobro da ocorrência
do segundo meio mais utilizado, que são as motos.
Os pedestres são a terceira maior massa presente na região, seguidos pelos
ciclistas. Caminhões e ônibus completam a lista, com menos de 1000 aparições durante
o dia, cada.

<div class="row chart" id="chart_2"></div>

Os dados referentes a pedestres e ciclistas continham, ainda, informações sobre
o gênero dos indivíduos que permitiram observar a disparidade existente entre
o número de homens e mulheres nesses dois grupos.

Apesar da grande disparidade entre o total de homens e mulheres entre os pedestres,
aquela existente entre os dois gêneros no grupo de ciclistas é ainda maior. A
quantidade de homens ciclistas é mais de dez vezes maior que a de mulheres.

<div class="row chart" id="chart_3"></div>

Apesar da pequena amostra espacial e temporal - os dados foram colhidos em um única
região e em um único dia - é possível obter alguns *insights* sobre a situação da utilização
da bicicleta na cidade.

O Açude Velho é uma área turística e, por isso, conta com mais segurança que as
demais regiões da cidade. Além disso, a área conta com uma boa estrutura para
ciclistas e pedestres. Em outras regiões, que não disponham de tais facilidades,
portanto, é bastante provável que a proporção de ciclistas e pedestres seja ainda menor,
o que aponta para a pouca utilização desse meio na cidade.

A grande disparidade entre os sexos observada no meio dos ciclistas, infelizmente,
não é uma exclusividade da cidade, muito menos do país. Estudos realizados nos
[Estados Unidos](https://www.treehugger.com/bikes/why-women-dont-bike-blame-it-housework.html)
e no [Reino Unido](https://www.cyclinguk.org/article/campaigns-guide/women-cycling)
também apontam para essa realidade.

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="/datavis/js/plot.js"></script>
