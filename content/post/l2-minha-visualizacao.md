---
title: "Analisando o Volume Percentual de Boqueirão"
date: 2017-11-29T20:43:08-03:00
draft: false
slug: "epitacio-pessoa-d3"
tags: ["visualizacao", "água", "d3", "lab-02"]
---

<script src="https://d3js.org/d3.v4.min.js"></script>

<style>
    .mychart rect {
      fill: steelblue;
    }

    .mychart rect:hover {
      fill: goldenrod;
    }

    .mychart text {
      font: 12px sans-serif;
      text-anchor: left;
    }

    .mychart circle:hover  {
         fill-opacity: 1;
    }
</style>

Como parte dos trabalhos do laboratório 2, foi elaborada a seguinte visualização
utilizando d3.js.

<div class="row mychart" id="chart"></div>

A visualização mostra o 10-percentil e o 90-percentil do volume percentual
do açude Epitácio Pessoa a cada mês do ano. A cor azul indica que o mês
está dentro da estação chuvosa do semiárido, enquanto que a cor marrom
indica que o mês está na estação de estiagem.

<script type="text/javascript">
"use strict"

function draw(dados) {

    dados.map((d, i) => d.tipo_mes = (d.mes >= 1 && d.mes <= 6 ? "chuvoso" : "seco"));

  // definicoes de altura e largura do svg e da vis dentro
  var alturaSVG = 400, larguraSVG = 900;
  var	margin = {top: 10, right: 20, bottom:45, left: 45}, // para descolar a vis das bordas do grafico
      larguraVis = larguraSVG - margin.left - margin.right,
      alturaVis = alturaSVG - margin.top - margin.bottom;

//Prepara onde adicionaremos a visualizacao
    var grafico = d3.select('#chart') // cria elemento <svg> com um <g> dentro
      .append('svg')
        .attr('width', larguraVis + margin.left + margin.right)
        .attr('height', alturaVis + margin.top + margin.bottom)
      .append('g') // para entender o <g> vá em x03-detalhes-svg.html
        .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');

//As escalas

     var xScale = d3.scaleLinear()
        .domain([80, 110])
        .range([0, larguraVis - 250])
        .clamp(true);

    var yScale = d3.scaleLinear()
        .domain([10, 40])
        .range([alturaVis, 25])
        .clamp(true);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);


//As marcas

    grafico.selectAll('g')
            .data(dados)
            .enter()
              .append('circle')
                .attr('cx', d => xScale(d.noventa_percentil))
                .attr('cy', d => yScale(d.dez_percentil))
                .attr('r', '5')
                .attr('fill', d => colorScale(d.tipo_mes))
                .attr('fill-opacity', '0.3');

//Os eixos
    grafico.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + alturaVis + ")")
            .call(d3.axisBottom(xScale)); // magica do d3: gera eixo a partir da escala

    grafico.append('g')
            .attr('transform', 'translate(0,0)')
            .call(d3.axisLeft(yScale))  // gera eixo a partir da escala

    grafico.append("text")
      .attr("transform", "translate(-30," + (alturaVis + margin.top)/2 + ") rotate(-90)")
      .text("10-percentil");

      grafico.append("text")
      .attr("transform", "translate(250, " + (alturaVis + 30) + ")")
      .text("90-percentil");
};

d3.csv('/dados/boqueirao-por-mes.csv', function(dados) {
  draw(dados);
});

</script>
