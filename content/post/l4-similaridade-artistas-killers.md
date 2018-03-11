---
title: "Artistas Similares a The Killers Segundo o Spotify"
date: 2018-03-10T20:31:32-03:00
draft: false
comments: true
slug: "similaridade-the-killers"
image: "images/the-killers.jpg"
tags: ["visualizacao", "similaridade", "d3", "lab-04", "musica", "the-killers", "rede"]
---

Usando dados sobre a similaridade entre artistas disponibilizados pela API
do Spotify e pré-processados pelo sistema [Spotify Artist Network](http://labs.polsys.net/playground/spotify/),
é possível observar uma rede que conecta artistas semelhantes aos seus artistas favoritos.

<!--more-->

Abaixo, é possível observar a rede de artistas similares à banda americana *The Killers*,
popular nos anos 2000. O tamanho dos nós representa a popularidade de um artista.

<div id="chart"></div>

A rede, fortemente conectada, reflete a similaridade entre os artistas a partir
da cor de seus nós: quanto mais escuro um nó, mais similar a banda é o artista em questão.

Sabendo disso, é possível observar que os artistas mais semelhantes à banda
são bandas indie ou de rock alternativo que fizeram tanto sucesso quanto a banda nos anos 2000,
como *The Strokes*, *Arctic Monkeys*, *Franz Ferdinand* e *MGMT*.

<style>
		.node {
		    stroke: #fff;
		    stroke-width: 2px;
		}

		.link {
            stroke: #666;
			stroke-opacity: 0.3;
		}
        #chart{
            background-color: #f7f7f7;
        }
</style>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="network.js"></script>
