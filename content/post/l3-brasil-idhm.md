---
title: "Evolução do IDHM nos Municípios Brasileiros"
date: 2018-03-10T14:47:42-03:00
draft: false
comments: true
slug: "brasil-evolucao-idhm"
image: "images/sao-caetano.jpg"
tags: ["visualizacao", "brasil", "d3", "lab-03", "idhm", "mapa"]
---

<style>
    .cidades {
      fill: none;
      stroke-linejoin: round;
    }

    path:hover, path.highlighted {
      fill: tomato;
    }

    div.tooltip {
      position: absolute;
      background-color: white;
      border: 1px solid black;
      color: black;
      font-family:"avenir next", Arial, sans-serif;
      padding: 4px 8px;
      display: none;
      z-index: 10;
    }

    #vis1, #vis2 {
        background-color: #f3f3f3;
    }
</style>

O IDHM, ou Índice de Desenvolvimento Humano Municipal, é uma medida do
desenvolvimento econômico e social de um município. Assim como o IDH - Índice de
Desenvolvimento Humano - o IDHM analisa a expectativa de vida, o nível de educação
e a renda média dos cidadãos de um município, mas adequa os índices à realidade
brasileira.

<!--more-->

O índice apresenta valores a partir de 0, sendo 1 seu valor máximo. Nos mapas
abaixo é possível observar a evolução do índice no país entre os anos 2000 e 2010.

<svg id="vis1" width="100%" height="620px"></svg>
<svg id="vis2" width="100%" height="620px"></svg>

O grande destaque se dá ao fato de quase não existirem mais municípios com IDHM
menor que 0.5 atualmente, feito que era relativamente comum em 2000.

Ao observar as visualizações, também é possível perceber a concentração
de municípios com os maiores IDMH nas regiões Sul e Sudeste do país.
De acordo com os dados de 2010, nenhum dos municípios dessas duas
regiões possui IDHM menor que 0.5.

#### Referências
- https://oglobo.globo.com/economia/entenda-indice-de-desenvolvimento-humano-idhm-20514135

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="https://d3js.org/topojson.v2.min.js"></script>
<script src="interatividade.js"></script>
