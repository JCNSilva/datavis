#!/bin/bash

LIBPATH='../node_modules'

echo 'Starting data generation...'
echo 'Do you want to install the dependencies? (y to confirm)'
read dependencies

if [ '$dependencies' = 'y' ];
then
 echo 'Installing dependencies'
 npm install shapefile
 npm install ndjson-cli
 npm install d3-dsv
 npm install topojson
 npm install d3
 npm install d3-scale-chromatic
 LIBPATH='node_modules'
else
 echo 'Not installing dependencies'
fi

$LIBPATH/d3-geo-projection/bin/geo2svg \
 -w 960 -h 700 \
 < ../dados/br_municipios_projetado.json \
 > br-ortho.svg

$LIBPATH/ndjson-cli/ndjson-split 'd.features' \
 < ../dados/br_municipios_projetado.json \
 | $LIBPATH/ndjson-cli/ndjson-map 'd.CodigoIBGE = "" + d.properties.GEOCODIGO, d' \
 > br-ortho-map.ndjson

$LIBPATH/d3-dsv/bin/dsv2json -n \
 < ../dados/idhm.csv \
 > br-idhm.ndjson

EXP_PROPRIEDADE='d[0].properties = Object.assign({}, d[0].properties, d[1]), d[0]'
$LIBPATH/ndjson-cli/ndjson-join --left \
 'd.CodigoIBGE' \
 br-ortho-map.ndjson \
 br-idhm.ndjson \
 | $LIBPATH/ndjson-cli/ndjson-map "$EXP_PROPRIEDADE" \
 > br-map-idhm2.ndjson

$LIBPATH/topojson/node_modules/topojson-server/bin/geo2topo -n \
 tracts=- \
 < br-map-idhm2.ndjson \
 | $LIBPATH/topojson/node_modules/topojson-simplify/bin/toposimplify -p 1 -f \
 | $LIBPATH/topojson/node_modules/topojson-client/bin/topoquantize 1e5 \
 | $LIBPATH/topojson/node_modules/topojson-client/bin/topo2geo tracts=- \
 > br-map-idhm-final.json

echo 'Done'
