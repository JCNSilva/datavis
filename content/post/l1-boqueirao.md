---
title: "O açude Epitácio Pessoa e a transposição"
date: 2017-11-14T23:09:08-03:00
draft: false
slug: "epitacio-pessoa-transposicao"
tags: ["artigo", "água", "vega-lite"]
---

# O açude Epitácio Pessoa e a transposição

<div id="vis1" width=450></div>

<div id="vis2" width=450></div>

<div id="vis3" width=450></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>

<script>
    const spec1 = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "width": 800,
      "height": 450,
      "title": "Volume mensal do Açude Epitácio Pessoa (milhões de m³)",
      "data": {
        "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
        "format": {
            "type": "json",
            "property": "volumes",
            "parse": {
                "DataInformacao": "utc:'%d/%m/%Y'"
            }
        }
      },

      "layer": [
        {  
            "mark":  "area",

            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "timeUnit": "utcyearmonth",
                    "axis": {
                        "title": "Data"
                    }
                },
                "y": {
                    "field": "Volume",
                    "aggregate": "mean",
                    "type": "quantitative",
                    "axis": {
                        "title": "Volume (em m³)"
                    }
                }
            }
        },

        {
            "data": {
                "values": [
                    {"percentile-20" : 82.34}
                ]
            },
            "mark": "rule",
            "encoding": {
                "y": {
                    "field": "percentile-20",
                    "type": "quantitative"
                },
                "size": {
                    "value": 3
                },
                "color": {
                    "value": "red"
                }
            }
        }
      ]
    };

    vegaEmbed('#vis1', spec1).catch(console.warn);

</script>

<script>
    const spec2 = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "height": 350,
      "width": 500,
      "title": "Volume mensal do Açude Epitácio Pessoa (%)",
      "data": {
        "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
        "format": {
            "type": "json",
            "property": "volumes",
            "parse": {
                "DataInformacao": "utc:'%d/%m/%Y'"
            }
        }
      },

      "mark": "bar",

      "transform": [{
          "filter": {
              "field": "DataInformacao",
              "timeUnit": "utcyearmonth",
              "range": [{"year": 2014, "month": "jan"}, {"year": 2017, "month": "nov"}]
          }
      }],

      "encoding": {
          "x": {
              "field": "DataInformacao",
              "type": "temporal",
              "timeUnit": "utcyearmonth",
              "axis": {
                  "title": "Data"
              }
          },
          "y": {
              "field": "VolumePercentual",
              "aggregate": "mean",
              "type": "quantitative",
              "axis": {
                  "title": "Volume (%)"
              }
          }
       }  
    };

    vegaEmbed('#vis2', spec2).catch(console.warn);

</script>

<script>
    const spec3 = ;
    vegaEmbed('#vis3', spec3).catch(console.warn);
</script>
