#!/bin/bash

NODE_HOME=../parte2/node_modules

# a expressão js que decide os fills baseados em uma escala
# EXP_ESCALA='z = d3.scaleSequential(d3.interpolateViridis).domain([0, 100]),
#             d.features.forEach(f => f.properties.fill = z(f.properties["Percentual Aprendizado Adequado (%)"])),
#             d'
EXP_ESCALA='z = d3.scaleThreshold().domain([10, 25, 50, 75, 100]).range(d3.schemeRdBu[4]),
            d.features.forEach(f => f.properties.fill = z(f.properties["Crescimento entre 2011 e 2013 (pp*)"])),
            d'

$NODE_HOME/ndjson-cli/ndjson-map -r d3 -r d3=d3-scale-chromatic \
  "$EXP_ESCALA" \
< geo4-municipios-e-aprendizado-simplificado.json \
| $NODE_HOME/ndjson-cli/ndjson-split 'd.features' \
| $NODE_HOME/d3-geo-projection/bin/geo2svg -n --stroke none -w 1000 -h 600 \
  > aprendizagem-na-pb-choropleth.svg
