---
title: "A Crise Hídrica e o Açude Epitácio Pessoa"
date: 2017-11-14T23:09:08-03:00
draft: false
comments: true
slug: "crise-hidrica-epitacio-pessoa"
tags: ["artigo", "água", "vega-lite", "lab-01"]
---

Ainda que apresente consequências sociais mais brandas, a crise hídrica que se estende
sobre o nordeste brasileiro já atingiu proporções que não eram vistas desde a Grande Seca de 1915.
Desde 2012, 600 municípios da região decretaram situação de emergência e cerca de 23 milhões de nordestinos
tiveram suas vidas afetadas pela estiagem.

Com toda a sua área inserida no *Polígono das Secas*, a Paraíba foi um dos estados mais afetados e
atualmente, 196 municípios do estado encontram-se em situação de emergência, inclusive Campina Grande.

O reservatório que abastece a cidade, Epitácio Pessoa, localizado no município de Boqueirão,
atingiu o menor nível desde sua em construção, em 1957, mesmo com as estratégias de racionamento adotadas
pelas autoridades desde o final do ano de 2014.

Essas estratégias de racionamento foram apontadas como tardias por alguns setores da população,
mas a análise da série histórica mostra que esse pode não ser o caso. Em novembro de 2004, o açude atingiu
níveis similares àqueles vistos em dezembro de 2014, momento em que o racionamento foi decretado. No primeiro
caso, talvez devido a análises meteorológicas ou outros fatores, nenhum plano de racionamento foi
feito público à população.

<div id="vis1" width=450></div>

Apesar da possibilidade de outros fatores influenciarem no nível do reservatório, essa informação pode
ser utilizada para avaliar a efetividade do racionamento.

<div id="vis2" width=450></div>

Olhando muito atentamente é possível ver uma pequena diminuição no ritmo da
diminuição do nível do reservatório a partir de Janeiro de 2015, mas conforme
o nível do repositório caiu, as ações se tornaram menos efetivas.

A partir de abril de 2017, porém, um novo fator passou a atuar sobre o açude.
Foi nesse mês que as obras do eixo leste da transposição do rio São Francisco foram finalizadas e
as águas do rio também passaram a abastecer o açude.

Talvez, a abundância de água tenho feito algumas autoridades se afobarem e o racionamento
foi desfeito apenas 4 meses após o término das obras, o que causou uma pequena diminuição na
velocidade de enchimento do açude, como pode ser visto abaixo.

<div id="vis3" width=450></div>

##### Referências
* http://g1.globo.com/profissao-reporter/noticia/2017/05/nordeste-brasileiro-vive-pior-seca-dos-ultimos-cem-anos.html
* https://pt.wikipedia.org/wiki/Pol%C3%ADgono_das_secas
* http://www.paraibadebate.com.br/crise-hidrica-196-municipios-da-paraiba-estao-em-situacao-de-emergencia-prefeitos-pedem-auxilio-ao-governo-federal/
* https://g1.globo.com/pb/paraiba/noticia/diario-oficial-publica-decreto-de-situacao-de-emergencia-em-196-cidades-da-paraiba.ghtml
http://www.maispb.com.br/220670/acude-de-boqueirao-chega-5-e-sai-do-estado-critico.html
* http://g1.globo.com/pb/paraiba/noticia/2014/12/comeca-racionamento-em-cidades-abastecidas-por-boqueirao-na-paraiba.html
* http://www.jornaldaparaiba.com.br/vida_urbana/racionamento-campina-grande-fica-sem-agua-do-sabado-a-terca.html
* http://www.jornaldaparaiba.com.br/vida_urbana/racionamento-na-regiao-de-cg-fica-maior-a-partir-deste-sabado.html
* http://www.jornaldaparaiba.com.br/vida_urbana/racionamento-passa-a-ser-de-quase-cinco-dias-em-campina-grande.html
* https://g1.globo.com/pb/paraiba/noticia/racionamento-de-agua-em-campina-grande-e-regiao-muda-a-partir-deste-sabado-22.ghtml
* https://g1.globo.com/pb/paraiba/noticia/fim-do-racionamento-em-boqueirao-e-antecipado-para-sexta-feira-anuncia-ricardo-coutinho.ghtml

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>

<script>
    const spec1 = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "height": 380,
      "width": 600,
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
              "range": [{"year": 1997, "month": "jan"}, {"year": 2017, "month": "nov"}]
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

    vegaEmbed('#vis1', spec1).catch(console.warn);

</script>

<script>
    const spec2 = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "height": 380,
      "width": 600,
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

      "mark": "line",

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
    const spec3 = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "height": 380,
      "width": 600,
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

      "mark": "area",

      "transform": [{
          "filter": {
              "field": "DataInformacao",
              "timeUnit": "utcyearmonth",
              "range": [{"year": 2017, "month": "apr"}, {"year": 2017, "month": "nov"}]
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

    vegaEmbed('#vis3', spec3).catch(console.warn);

</script>
