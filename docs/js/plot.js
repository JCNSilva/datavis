"use strict";

var SVGHeight = 400, SVGWidth = 650;
var	margin = {top: 10, right: 10, bottom:30, left: 30},
    VisWidth = SVGWidth - margin.left - margin.right,
    VisHeight = SVGHeight - margin.top - margin.bottom,
    LegHeight = VisHeight * 0.25;

var tooltip = d3.select("body")
            .append("div")
                .attr("class", "tooltip")
                    .style("opacity", 0);

function createPanels() {
    d3.selectAll(".chart")
        .append("svg")
            .attr("height", SVGHeight)
            .attr("width", SVGWidth)
            .attr("id", (d, i) => "plot_" + (i + 1))
        .append("g")
            .attr("transform", "translate (" + margin.left + "," + margin.top + ")");
}

function createLegends(){
    d3.select("#chart_1")
        .append("svg")
            .attr("height", LegHeight)
            .attr("width", SVGWidth)
            .attr("id", "leg_1")
        /*.append("g")
            .attr("transform", "translate (" + margin.left + ", " + (margin.top + VisHeight) + ")");*/
}

function plot1(data) {

    var meios_locomocao = ["carro", "moto", "ônibus", "caminhão", "ciclistas", "pedestres"];

    var xScale = d3.scaleTime()
                    .domain(d3.extent(data, (d) => d.horario_inicial))
                    .rangeRound([margin.left, margin.left + VisWidth])
                    .nice();

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, (d, i) => d.total_motorizados)])
                    .range([VisHeight + margin.top, margin.top])
                    .nice();

    var colorScale = d3.scaleOrdinal()
                    .domain(meios_locomocao)
                    .range(d3.schemeCategory10);

    var plot = d3.select("#plot_1");

    var carLine = d3.line()
                    .x((d) => xScale(d.horario_inicial))
                    .y((d) => yScale(d.carros));

    plot.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", carLine)
            .attr("stroke", colorScale("carro"))
            .on("mouseover", function(d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                tooltip.html("carro")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });

    var mcicleLine = d3.line()
                    .x((d) => xScale(d.horario_inicial))
                    .y((d) => yScale(d.motos));

    plot.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", mcicleLine)
            .attr("stroke", colorScale("moto"))
            .on("mouseover", function(d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                tooltip.html("motos")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });

    var busLine = d3.line()
                    .x((d) => xScale(d.horario_inicial))
                    .y((d) => yScale(d.onibus));

    plot.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", busLine)
            .attr("stroke", colorScale("ônibus"))
            .on("mouseover", function(d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                tooltip.html("ônibus")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });

    var truckLine = d3.line()
                    .x((d) => xScale(d.horario_inicial))
                    .y((d) => yScale(d.caminhoes));

    plot.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", truckLine)
            .attr("stroke", colorScale("caminhão"))
            .on("mouseover", function(d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                tooltip.html("caminhão")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });

    var bikeLine = d3.line()
                    .x((d) => xScale(d.horario_inicial))
                    .y((d) => yScale(d.total_ciclistas));

    plot.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", bikeLine)
            .attr("stroke", colorScale("ciclistas"))
            .on("mouseover", function(d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                tooltip.html("ciclistas")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });

    var pedestrianLine = d3.line()
                    .x((d) => xScale(d.horario_inicial))
                    .y((d) => yScale(d.total_pedestres));

    plot.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", pedestrianLine)
            .attr("stroke", colorScale("pedestres"))
            .on("mouseover", function(d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                tooltip.html("pedestres")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                    });

    plot.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + (VisHeight + margin.top) + ")")
            .call(d3.axisBottom(xScale));

    plot.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(yScale));


    /* Legend */
    var legend = d3.select("#leg_1")
                    .selectAll("g");

    var squareSize = 15;

    legend.data(meios_locomocao)
        .enter()
        .append("g")
            .attr("id", (d, i) => ("leg1_el" + (i + 1)))
        .append("rect")
            .attr("x", (d, i) => Math.floor(i % 3) * squareSize * 12)
            .attr("y", (d, i) => Math.floor(i / 3) * squareSize * 2)
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", d => colorScale(d));

    legend.data()
            .append("text")
                .attr("html", (d, i) => d);


}

function plot2(data) {
    var plot = d3.select("#chart_2 > svg > g");

    var xScale = d3.scaleBand()
                    .domain(["carros","motos","onibus","caminhoes","ciclistas","pedestres"])
                    .range([margin.left, margin.left + VisWidth])
                    .paddingInner(0.25)
                    .paddingOuter(0.4);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.total) * 1.1])
                    .rangeRound([VisHeight + margin.top, margin.top])
                    .nice();

    var colorScale = d3.scaleOrdinal()
                    .domain(["carros","motos","onibus","caminhoes","ciclistas","pedestres"])
                    .range(d3.schemeCategory10);

    plot.selectAll("g")
        .data(data)
        .enter()
            .append("rect")
                .attr("class", "bar")
                .attr("width", xScale.bandwidth())
                .attr('height', (d) => VisHeight + margin.top - yScale(d.total))
                .attr('x', d => xScale(d.meio_locomocao))
                .attr('y', d => yScale(d.total))
                .attr("fill", d => colorScale(d.meio_locomocao))
                .on("mouseover", function(d) {
                    tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                    tooltip.html(d.total)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                });

    plot.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + (VisHeight + margin.top) + ")")
            .call(d3.axisBottom(xScale));

    plot.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(yScale));
}

function plot3(data) {
    var plot = d3.select("#chart_3 > svg > g");

    var xScale = d3.scaleLinear()
                    .domain([0, d3.max(data, (d) => d.total) + 0.5 * d3.max(data, (d) => d.total)])
                    .rangeRound([margin.left, margin.left + VisWidth])
                    .nice();

    var yScale = d3.scalePoint()
                    .domain(["ciclistas", "pedestres"])
                    .range([VisHeight + margin.top, margin.top])
                    .padding(0.5);

    var colorScale = d3.scaleOrdinal()
                    .domain(["carro", "moto", "ônibus", "caminhão", "ciclistas", "pedestres"])
                    .range(d3.schemeCategory10);

    plot.selectAll("g")
        .data(data)
        .enter()
            .append("circle")
                .attr("class", "point")
                .attr("cx", d => xScale(d.total))
                .attr("cy", d => yScale(d.meio_locomocao))
                .attr("fill", d => colorScale(d.meio_locomocao))
                .on("mouseover", function(d) {
                    tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                    tooltip.html(d.sexo + ": " + d.total)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                });

    var locomotionLine = d3.line()
                    .x((d) => xScale(d.total))
                    .y((d) => yScale(d.meio_locomocao));

    plot.append("path")
            .datum(data.filter(function (d) {return d.meio_locomocao === "pedestres"}))
            .attr("class", "line")
            .attr("d", locomotionLine)
            .attr("stroke", d => colorScale("pedestres"));

    plot.append("path")
            .datum(data.filter(function (d) {return d.meio_locomocao === "ciclistas"}))
            .attr("class", "line")
            .attr("d", locomotionLine)
            .attr("stroke", d => colorScale("ciclistas"));

    plot.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + (VisHeight + margin.top) + ")")
            .call(d3.axisBottom(xScale));

    plot.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(yScale));
}

/* RUN */
createPanels();
createLegends();

d3.csv("/datavis/data/dados_l2v1.csv",
        (data) => {
            data.map(function(d) {
                d.horario_inicial = d3.timeParse("%H:%M")(d.horario_inicial);
                d.horario_final = d3.timeParse("%H:%M")(d.horario_final);
                d.carros = +d.carros;
                d.motos = +d.motos;
                d.onibus = +d.onibus;
                d.caminhoes = +d.caminhoes;
                d.total_motorizados = +d.total_motorizados;
                d.mulheres_ciclistas = +d.mulheres_ciclistas;
                d.homens_ciclistas = +d.homens_ciclistas;
                d.total_ciclistas = +d.total_ciclistas;
                d.mulheres_pedestres = +d.mulheres_pedestres;
                d.homens_pedestres = +d.homens_pedestres;
                d.total_pedestres = +d.total_pedestres;
                d.pedestres_com_cachorro = +d.pedestres_com_cachorro;
                d.pedestres_sem_cachorro = +d.pedestres_sem_cachorro;
            });
            plot1(data);
        });

d3.csv("/datavis/data/dados_l2v2.csv",
        (data) => {
            data.map(function(d) {
                d.total = +d.total;
            });
            plot2(data);
        });

d3.csv("/datavis/data/dados_l2v3.csv",
        (data) => {
            data.map(function(d) {
                d.total = +d.total;
            });
            plot3(data);
        });
/* RUN END */
