echo Passo 2

npm install shapefile

node_modules/shapefile/bin/shp2json dados/25SEE250GC_SIR.shp \
    -o pb-geo.json

echo Passo 3

npm install d3-geo-projection

node_modules/d3-geo-projection/bin/geoproject 'd3.geoOrthographic().rotate([54, 14, -2]).fitSize([1000, 600], d)' \
    < pb-geo.json \
    > pb-ortho.json

node_modules/d3-geo-projection/bin/geo2svg \
    -w 1000 \
    -h 600 \
    < pb-ortho.json \
    > pb-ortho.svg

echo Passo 4

npm install ndjson-cli

node_modules/ndjson-cli/ndjson-split 'd.features' \
    < pb-ortho.json \
    > pb-ortho.ndjson

echo Passo 5

npm install d3-dsv

# Renda Média
node_modules/d3-dsv/bin/dsv2json \
  -r ',' \
  -n \
  < dados/DomicilioRenda_PB.csv \
  > pb-censo-renda.ndjson

node_modules/ndjson-cli/ndjson-map 'd.Cod_setor = d.properties.CD_GEOCODI, d' \
  < pb-ortho.ndjson \
  > pb-censo-renda-map.ndjson

node_modules/ndjson-cli/ndjson-join 'd.Cod_setor' \
    pb-censo-renda-map.ndjson \
    pb-censo-renda.ndjson \
    > pb-censo-renda-join.ndjson

node_modules/ndjson-cli/ndjson-map \
    '
    d[0].properties = {
	renda_media: Number(d[1].V002.replace(",", ".")) /
		 (Number(d[1].V005) + Number(d[1].V006) + Number(d[1].V007) + Number(d[1].V008) + Number(d[1].V009)+
                  Number(d[1].V010) + Number(d[1].V011) + Number(d[1].V012) + Number(d[1].V013) + Number(d[1].V014))},
    d[0]
    ' \
    < pb-censo-renda-join.ndjson \
    > pb-ortho-comdado-renda.ndjson

# situacao
node_modules/d3-dsv/bin/dsv2json \
    -r ';' \
    -n \
    < dados/Basico_PB.csv \
    > pb-censo-situacao.ndjson

node_modules/ndjson-cli/ndjson-map 'd.Cod_setor = d.properties.CD_GEOCODI, d' \
    < pb-ortho.ndjson \
    > pb-censo-situacao-map.ndjson

node_modules/ndjson-cli/ndjson-join 'd.Cod_setor' \
    pb-censo-situacao-map.ndjson \
    pb-censo-situacao.ndjson \
    > pb-censo-situacao-join.ndjson

node_modules/ndjson-cli/ndjson-map \
    '
    d[0].properties = {
  	    situacao: d[1].Situacao_setor in [1,2,3] ? "Urbana" : "Rural" },
    d[0]
    ' \
    < pb-censo-situacao-join.ndjson \
    > pb-ortho-comdado-situacao.ndjson

echo Passo 6

npm install topojson

# Renda
node_modules/topojson/node_modules/topojson-server/bin/geo2topo -n \
    tracts=pb-ortho-comdado-renda.ndjson \
    > pb-tracts-renda-topo.json

node_modules/topojson/node_modules/topojson-simplify/bin/toposimplify -p 1 -f \
    < pb-tracts-renda-topo.json \
    | node_modules/topojson/node_modules/topojson-client/bin/topoquantize 1e5 \
    > pb-quantized-renda-topo.json

# Raça
node_modules/topojson/node_modules/topojson-server/bin/geo2topo -n \
    tracts=pb-ortho-comdado-situacao.ndjson \
    > pb-tracts-situacao-topo.json

node_modules/topojson/node_modules/topojson-simplify/bin/toposimplify -p 1 -f \
    < pb-tracts-situacao-topo.json \
    | node_modules/topojson/node_modules/topojson-client/bin/topoquantize 1e5 \
    > pb-quantized-situacao-topo.json

echo Passo 7

npm install d3
npm install d3-scale-chromatic

#Renda
node_modules/topojson/node_modules/topojson-client/bin/topo2geo tracts=- \
  < pb-quantized-renda-topo.json \
  | node_modules/ndjson-cli/ndjson-map -r d3 -r d3=d3-scale-chromatic \
  'z = d3.scaleThreshold().domain([0, 0.375e4, 0.75e4, 1.125e4, 1.5e4]).range(d3.schemeOrRd[5]), d.features.forEach(f => f.properties.fill = z(f.properties.renda_media)), d' \
  | node_modules/ndjson-cli/ndjson-split 'd.features' \
  | node_modules/d3-geo-projection/bin/geo2svg -n --stroke none -w 1000 -h 600 \
  > pb-tracts-renda-threshold-light.svg

#Raça
node_modules/topojson/node_modules/topojson-client/bin/topo2geo tracts=- \
  < pb-quantized-situacao-topo.json \
  | node_modules/ndjson-cli/ndjson-map -r d3 -r d3=d3-scale-chromatic \
  'z = d3.scaleOrdinal().domain(["Urbana", "Rural"]).range(["#b30000", "#fef0d9"]), d.features.forEach(f => f.properties.fill = z(f.properties.situacao)), d' \
  | node_modules/ndjson-cli/ndjson-split 'd.features' \
  | node_modules/d3-geo-projection/bin/geo2svg -n --stroke none -w 1000 -h 600 \
  > pb-tracts-situacao-threshold-light.svg

echo Fim
