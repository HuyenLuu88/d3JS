dibujaFondo("#fondo");
buildLegend('#legend');


var show_btn = false;
var added = false;
var lineas = [];
var lineas2 = [];
var lineas3 = [];
var lineas4 = [];

var tempdataset1,
  tempstart1,
  temptend1,
  tempid1,
  tempselect_id1,
  tempselect_value1;
var tempdataset2,
  tempstart2,
  temptend2,
  tempid2,
  tempselect_id2,
  tempselect_value2;
var tempdataset3,
  tempstart3,
  temptend3,
  tempid3,
  tempselect_id3,
  tempselect_value3;
var tempdataset4,
  tempstart4,
  temptend4,
  tempid4,
  tempselect_id4,
  tempselect_value4;
var flag11 = 1;
var flag12 = 1;
var flag13 = 1;
var flag14 = 1;
var flagstate1 = 0;
var limite = 2250;
var first = false;
var aNames;
var tempid;
var cFirst = true;


var dataupdate1, dataupdate2, dataupdate3, dataupdate4;

function promediaCada(arr, n) {
  if (!arr || !n) {
    return false;
  }
  let groups = [];
  while (arr.length) {
    groups.push(arr.splice(0, n));
  }

  return groups.map(
    group =>
      (group.reduce(
        (a, b) => parseInt(a) + parseInt(b)
      ) / parseInt(group.length)).toFixed(2)
  );
}
function cargaDatos1(datosli) {
  d3.csv(datosli, function (dataLineas) {
    dataLineas.map(function (d) {
      lineas.push(d.value);      
    })
    lineas = promediaCada(lineas, 8);
    lineas = lineas.filter(function (d, i) {
      return i < limite;
    });
  });
}


function cargaDatos2(datosli) {
  d3.csv(datosli, function (dataLineas) {
    dataLineas.map(function (d) {
      lineas2.push(d.value);
    })
    lineas2 = promediaCada(lineas2, 8);
    lineas2 = lineas2.filter(function (d, i) {
      return i < limite;
    });
  });
}
function cargaDatos3(datosli) {
  d3.csv(datosli, function (dataLineas) {
    dataLineas.map(function (d) {
      lineas3.push(d.value);
    })
    lineas3 = promediaCada(lineas3, 8);
    lineas3 = lineas3.filter(function (d, i) {
      return i < limite;
    });
  });
}
function cargaDatos4(datosli) {
  d3.csv(datosli, function (dataLineas) {
    dataLineas.map(function (d) {
      lineas4.push(d.value);
    })
    lineas4 = promediaCada(lineas4, 8);
    lineas4 = lineas4.filter(function (d, i) {
      return i < limite;
    });
  });
}


cargaDatos1("noise/c1-Joan.csv");
cargaDatos2("noise/c1-Ester.csv");
cargaDatos3("noise/c1-Gerard.csv");
cargaDatos4("noise/c1-Rosa.csv");
var datosOrigen1="noise/data_joan_1.csv";
var datosOrigen2="noise/data_ester_2.csv";
var datosOrigen3="noise/data_gerard_3.csv";
var datosOrigen4="noise/data_rosa_4.csv";
//var datosOrigen1="noise/data_h.csv";
//var datosOrigen2="noise/data_h2.csv";
//var datosOrigen3="noise/data_h3.csv";
//var datosOrigen4="noise/data_h4.csv";


setTimeout(function(){
  d3.csv(datosOrigen1, function (data) {
    dataupdate1 = data.filter(function (d, i) {
      d.noise = lineas[i];
      d.id = +i;
      d.nuevaVariable = +creaGrupos(d.id);
      d.nuevogrupo = +i - d.nuevaVariable;
    //  console.log(datosOrigen1,datosOrigen2,datosOrigen3,datosOrigen4);
      return i < limite;
    });
    if (dataupdate1) {
      if (first == false) {
        var names = [];
        var counts = [];
        dataupdate1.map((d) => {
          value = d.value.split("+");
          value.forEach(function (nm, j) {
            if (nm != 'cmplx') {
              ind = names.indexOf(nm);
              if (ind == -1) {
                names.push(nm);
                counts.push(1);
              } else {
                counts[ind] += 1;
              }
            }
          })
        });
        var obj = {};
        names.map((name, i) => {
          obj[name] = counts[i];
        })
        function getSortedKeys(obj) {
          var keys = Object.keys(obj);
          return keys.sort(function (a, b) { return obj[b] - obj[a] });
        }
        aNames = getSortedKeys(obj);
        first = true;
      }
    }
  });
  d3.csv(datosOrigen2, function (data) {
    dataupdate2 = data.filter(function (d, i) {
      d.noise = lineas2[i];
      d.id = +i;
      d.nuevaVariable = +creaGrupos(d.id);
      d.nuevogrupo = +i - d.nuevaVariable;
      return i < limite;
    });
  });
  d3.csv(datosOrigen3, function (data) {
    dataupdate3 = data.filter(function (d, i) {
      d.noise = lineas3[i];
      d.id = +i;
      d.nuevaVariable = +creaGrupos(d.id);
      d.nuevogrupo = +i - d.nuevaVariable;
      return i < limite;
    });
  });
  d3.csv(datosOrigen4, function (data) {
    dataupdate4 = data.filter(function (d, i) {
      d.noise = lineas4[i];
      d.id = +i;
      d.nuevaVariable = +creaGrupos(d.id);
      d.nuevogrupo = +i - d.nuevaVariable;
      return i < limite;
    });
  });
}, 1000);


setTimeout(() => {
  dibujaHeatmap("#my_dataviz", dataupdate1); //joan
  dibujaHeatmap("#my_dataviz2", dataupdate2); //ester
  dibujaHeatmap("#my_dataviz3", dataupdate3); //gererd
  dibujaHeatmap("#my_dataviz4", dataupdate4); //rosa
}, 1500);
var flag1 = "0";
var flag2 = "0";
var flag3 = "0";
var flag4 = "0";


//console.log(typeof(dataupdate1));

$(document).ready(function () {
  $("#my_dataviz, #my_dataviz2, #my_dataviz3, #my_dataviz4").click(function () {
    if (flag1 == "0" || flag2 == "0" || flag3 == "0" || flag4 == "0") {
      flag1 = 1;
      flag11 = 1;
      flag2 = 1;
      flag12 = 1
      flag3 = 1;
      flag13 = 1
      flag4 = 1;
      flag14 = 1
    }
    else {
      flag1 = 0;
      flag11 = 1;
      flag2 = 0;
      flag12 = 1;
      flag3 = 0;
      flag13 = 1
      flag4 = 0;
      flag14 = 1
    }
  });
});

function play() {
  var audio = document.getElementById("audio");
  audio.play();
}

function determinaSVG(espacio) {
  if (espacio === "#my_dataviz") {
    return "svg1";
  } else if (espacio === "#my_dataviz2") {
    return "svg2";
  } else if (espacio === "#my_dataviz3") {
    return "svg3";
  } else if (espacio === "#my_dataviz4") {
    return "svg4";
  }
}


function creaGrupos(valor) {
  var intervalos = [
    "0",
    "50",
    "100",
    "150",
    "200",
    "250",
    "300",
    "350",
    "400",
    "450",
    "500",
    "550",
    "600",
    "650",
    "700",
    "750",
    "800",
    "850",
    "900",
    "950",
    "1000",
    "1050",
    "1100",
    "1150",
    "1200",
    "1250",
    "1300",
    "1350",
    "1400",
    "1450",
    "1500",
    "1550",
    "1600",
    "1650",
    "1700",
    "1750",
    "1800",
    "1850",
    "1900",
    "1950",
    "2000",
    "2050",
    "2100",
    "2150",
    "2200",
    "2250",
  ];

  for (let i = 0; i < intervalos.length; i++) {
    if (valor >= intervalos[i] && valor < intervalos[i + 1]) {
      return intervalos[i];
    }
  }
}

function determinaColor(valor) {
  if (valor === 1) {
    return "#6baed6";
  } else if (valor === 2) {
    return "#4292c6";
  } else if (valor === 3) {
    return "#2171b5";
  } else if (valor === 4) {
    return "#08519c";
  } else if (valor === 5) {
    return "#08306b";
  } else if (valor === 6) {
    return "#030f22";
  } else {
    return "#f7fbff";
  }
}


function dibujaFondo(espacio) {
  var wi = document.getElementById("fondo").clientHeight;

  var svg = d3
    .select(espacio)
    .append("svg")
    .attr("width", "50%")
    .attr("height", "100%")
    .attr("id", "fondo")
    .append("image")
    .attr("xlink:href", "mapa.png")
    .style(" object-fit", "fill")
    .attr("width", "90%")
    .attr("height", "90%")
    .style("opacity", 0.7);
}

function buildLegend(legendC) {

  var cellSize = 12;

  //legend update
  var legendC = "legend";
  var clientHeight = document.getElementById(legendC).clientHeight;
  var clientWidth = document.getElementById(legendC).clientWidth;
  var clientWidth = 40;

  // set the dimensions and margins of the graph
  var margin = { top: 60, right: 25, bottom: 40, left: 40 },
    width = clientWidth - clientWidth * 0.02 - margin.left - margin.right,
    height = clientHeight - clientHeight * 0.02 - margin.top - margin.bottom;
  // debugger;
  var lsvg = d3
    .select("#legend")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", function () {
      return determinaSVG(legendC);
    })
    .append("g")
    .attr("transform", "translate(-" + margin.top*.8 + "," + margin.top*2 + ")");
  var legendElementHeight = cellSize * 2;
  var colors = [
    "#030f22",
    "#08306b",
    "#08519c",
    "#2171b5",
    "#4292c6",
  ];

  var legend = lsvg
    .selectAll(".legend")
    .data(["71-80","61-70","51-60","41-50","31-40"])
    .enter()
    .append("g")
    .attr("y", function (d, i) {
      return 20 + legendElementHeight * i;
    })
    .attr("class", "legend");

  legend
    .append("rect")
    .attr("y", function (d, i) {
      return 15 + legendElementHeight * i;
    })
    .attr("x", 17 + clientWidth + cellSize * 2)
    .attr("class", "bottomRect")
    .attr("height", legendElementHeight)
    .attr("width", cellSize / 2)
    .style("fill", function (d, i) {
      return colors[i];
    });

  legend
    .append("text")
    .attr("class", "mono")
    .text(function (d) {
      return d;
    })
    .attr("width", cellSize / 2)
    .attr("y", function (d, i) {
      return 30 + legendElementHeight * i;
    })
    .attr("x",-5 + clientWidth + cellSize);
}

function dibujaHeatmap(espacio, dataupdate) {
  var clientHeight = document.getElementById("my_dataviz").clientHeight;
//  console.log(clientHeight);


  // set the dimensions and margins of the graph
  var margin = { top: 60, right: 25, bottom: 30, left: 40 },
    width = clientHeight - clientHeight * 0.02 - margin.left - margin.right,
    height = clientHeight - clientHeight * 0.02 - margin.top - margin.bottom;


  // append the svg object to the body of the page
  var svg = d3
    .select(espacio)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top)
    .attr("id", function () {
      return determinaSVG(espacio);
    })
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = d3
      .map(dataupdate, function (d) {
        return d.nuevogrupo;
      })
      .keys();
    var myVars = d3
      .map(dataupdate, function (d) {
        return d.nuevaVariable;
      })
      .keys();

    // Build X scales and axis:
    var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05);
    svg
      .append("g")
      .style("font-size", 10)
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(x)
          .tickValues(
            x.domain().filter(function (d, i) {
              return !(i % 5) || i == 49;
            })
          )
          .tickSize(0)
      )
      .select(".domain")
      .remove();

    // Build Y scales and axis:
    var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05);
    svg
      .append("g")
      .style("font-size", 10)
      .call(
        d3
          .axisLeft(y)
          .tickValues(
            y.domain().filter(function (d, i) {
              return !(i % 5) || i == 44;
            })
          )
          .tickFormat(function (d, i) {
            return Math.floor((d * 4) / 60) + "min";
          })
          .tickSize(0)
      )
      .select(".domain")
      .remove();

    // Three function that change the tooltip when user hover / move / leave a cell
    // var timeout = 1000 / 24;
    // let timer;
    // clearTimeout(timer);

    
    
   

    function marcaAltos(){
      d3.selectAll("rect").style("stroke","none");
      d3.selectAll("rect").style("opacity", "1");
      d3.selectAll("rect")
        .filter(function (d){
         // console.log(d3.select(this).attr("noise"))
        // console.log(d.noise > 70);
          return d.noise >= 70;
        })
        .style("stroke","red").style("opacity", 1);
    }

    


    function marcaBajos(){
      d3.selectAll("rect").style("stroke","none");
      d3.selectAll("rect").style("opacity", "1");
      d3.selectAll("rect")
        .filter(function (d){
          //console.log(d3.select(this).attr("noise"))
         // console.log(d.noise < 40);
          return d.noise <= 40;
        })
        .style("stroke","red").style("opacity", 1);

    }

    function obtenlimite(value){
      if (value===10) {
        return 30        
      }else if (value===9) {
        return 10        
      }else if (value===8) {
        return 9              
      }else if (value===7) {
        return 8        
      }else if (value===6) {
        return 7        
      }else if (value===5) {
        return 6        
      }else if (value===4) {
        return 5        
      }else if (value===3) {
        return 4        
      }else if (value===2) {
        return 3        
      }else if (value===1) {
        return 2
      }
      
  }
    //var subeobaja="";
    function marcaPicos(){
      var distancia;
      d3.selectAll("rect").style("stroke","none");
      d3.selectAll("rect").style("opacity", "1");      
      var compara=[];      
      d3.selectAll(".sqheatmaps")
        .data(compara, function (d,i) {      
          compara.push(d.noise);
          return i + " " + d.noise;        
        })
      d3.selectAll((".sqheatmaps")      
      ).filter(function (d,i){        
        var datosiguiente=compara[i+1];      
        var rango = $("#seldist").val();        
        rango = parseInt(rango);
        var mayor;
        var menor;        
        var limite;
        if (d.noise > datosiguiente) {
          mayor=d.noise;
          menor=datosiguiente;
         // subeobaja="green";          
        }else if (datosiguiente > d.noise) {
          mayor=datosiguiente;
          menor=d.noise;
        //  subeobaja="red";
        }        
        comparable=mayor-menor;        
        if (comparable >= rango & comparable < rango+1) {
          //console.log(subeobaja);          
        }
        limite=obtenlimite(rango);
        return comparable >= rango & comparable < limite;
      })  
        .style("stroke",function(){
          return "red";
        }).style("opacity", 1);
    }

    function marcaNormal(){      
      d3.selectAll("rect").style("stroke","none");
      d3.selectAll("rect").style("opacity", "1");
    }

/*    function scatterPlot(){
      PopupCenter('http://127.0.0.1:8050/','xtf','900','500');
          }
*/
function scatterPlot(){
  //document.getElementById("totalChartTopLeft").style.opacity="100%"
  //$('totalChartTopLeft').html('dispersion.html')
  //document.getElementById('chart4').src = "icon-cancel.svg";
  PopupCenter('dispersion.html','xtf','600','400');
  console.log("show_btn:", show_btn);
  if (show_btn) {
    document.getElementById("chart4").style.display='none';
    document.getElementById("frame").style.display='block';
    show_btn = !show_btn;
  } else {
    document.getElementById("chart4").style.display='block';
    document.getElementById("frame").style.display='none';
    show_btn = !show_btn;
  }

};
    document.getElementById ("altos").addEventListener ("click", marcaAltos, false);
    document.getElementById ("bajos").addEventListener ("click", marcaBajos, false);
    document.getElementById ("picos").addEventListener ("click", marcaPicos, false);
    document.getElementById ("normal").addEventListener ("click", marcaNormal, false);
    if (!added) {
      document.getElementById ("scatterplot").addEventListener ("click", scatterPlot, false);
      added =true;
    }




    var mouseover = function (d) {

      d3.selectAll(".chart").selectAll("*").remove();
     // d3.select(this).style("stroke", "none").style("opacity", 1);
      
      //console.log(controlsEnabled);
    //  if(!controlsEnabled){
      $('.click-here').css('opacity', 0);
      var nuevo = this.getAttribute("class");
      d3.selectAll("rect").style("opacity", "0.3");
      d3.selectAll(".bottomRect").style("opacity", "1");

      d3.selectAll("rect")
        .filter(function (d, i) {
          return this.getAttribute("class") === nuevo;
        })
        .style("opacity", "1");

      d3.select(this).style("stroke", function (d){
        if (this.style.stroke === "red") {
          return "red";          
        }else return "yellow";}).style("opacity", 1);

      document.getElementById("totalChart").style.display = "block";
      document.getElementById("totalChartTopLeft").style.display = "block";
      document.getElementById("totalChartBottomRight").style.display = "block";
      document.getElementById("totalChartBottomLeft").style.display = "block";

      var dataset1 = [];
      var dataset2 = [];
      var dataset3 = [];
      var dataset4 = [];


      if (dataupdate1) {
        if (flag1 == "0") {
          var id = 1;
          var select_id = d.id;
          var select_value = "";
          dataupdate1
            .slice(d.id - (d.id < 3 ? d.id : 3), d.id + 4)
            .forEach(function (d, i) {
              if (d.id) {
                value = d.value.split("+");
                value.forEach(function (v, j) {
                  innerData = {
                    id: d.id,
                    pos: d.pos,
                    begin: d.tstart,
                    end: d.tend,
                    name: v,
                    valueY: d.noise,
                    valueX: parseInt(d.tstart) + (j / 5 + 1),
                  };
                  dataset1.push(innerData);
                });
              }
            });
          tempid = d.id; 
          tempdataset1 = dataset1;
          tempstart1 = d.tstart;
          temptend1 = d.tend;
          if(tempid === 0){
            //console.log(tempid);
            tempstart1 = 0;
          }
          if(tempid < 3 && tempid > 0){
            tempstart1 = (tempid * 1 + 2) * 4;
          }
          if(tempid == 3){
            tempstart1 = 16;
            tempend1 = 20;
          }
          tempid1 = id;
          tempselect_id1 = select_id;
          tempselect_value1 = select_value;
        }

        if (flag1 == "1") {
          detailChart(
            tempdataset1,
            tempstart1,
            temptend1,
            tempid1,
            tempselect_id1,
            tempselect_value1
          );
        }
      }

      if (dataupdate2) {
        if (flag2 == "0") {
          var id = 2;
          var select_id = d.id;
          var select_value = "";
          dataupdate2
            .slice(d.id - (d.id < 3 ? d.id : 3), d.id + 4)
            .forEach(function (d, i) {
              if (d.id) {
                value = d.value.split("+");
                value.forEach(function (v, j) {
                  innerData = {
                    id: d.id,
                    pos: d.pos,
                    begin: d.tstart,
                    end: d.tend,
                    name: v,
                    valueY: d.noise,
                    valueX: parseInt(d.tstart) + (j / 5 + 1),
                  };
                  dataset2.push(innerData);
                });
              }
            });
          
          tempid = d.id;
          tempdataset2 = dataset2;
          tempstart2 = d.tstart;
          temptend2 = d.tend;
          if(tempid < 3){
            tempstart2 = (d.id * 1 + 2) * 4;
          }
          if(tempid == 3){
            tempstart2 = 16;
            temptend2 = 20;
          }
          tempid2 = id;
          tempselect_id2 = select_id;
          tempselect_value2 = select_value;
          // detailChart(dataset2, d.tstart, d.tend, id, select_id, select_value);
        }
        if (flag2 == "1") {
          detailChart(
            tempdataset2,
            tempstart2,
            temptend2,
            tempid2,
            tempselect_id2,
            tempselect_value2
          );
        }
      }

      if (dataupdate3) {
        if (flag3 == "0") {
          var id = 3;
          var select_id = d.id;
          var select_value = "";
          dataupdate3
            .slice(d.id - (d.id < 3 ? d.id : 3), d.id + 4)
            .forEach(function (d, i) {
              if (d.id) {
                value = d.value.split("+");
                value.forEach(function (v, j) {
                  innerData = {
                    id: d.id,
                    pos: d.pos,
                    begin: d.tstart,
                    end: d.tend,
                    name: v,
                    valueY: d.noise,
                    valueX: parseInt(d.tstart) + (j / 5 + 1),
                  };
                  dataset3.push(innerData);
                });
              }
            });
          
          tempid = d.id;
          tempdataset3 = dataset3;
          tempstart3 = d.tstart;
          temptend3 = d.tend;
          
          if(tempid < 3){
            tempstart3 = (tempid * 1 + 2) * 4;
          }
          
          if(tempid == 3){
            tempstart3 = 16;
            temptend3 = 20;
          }
          tempid3 = id;
          tempselect_id3 = select_id;
          tempselect_value3 = select_value;
          // detailChart(dataset3, d.tstart, d.tend, id, select_id, select_value);
        }
        if (flag3 == "1") {
          detailChart(
            tempdataset3,
            tempstart3,
            temptend3,
            tempid3,
            tempselect_id3,
            tempselect_value3
          );
        }
      }

      if (dataupdate4) {
        if (flag4 == "0") {
          var id = 4;
          var select_id = d.id;
          var select_value = "";
          dataupdate4
            .slice(d.id - (d.id < 3 ? d.id : 3), d.id + 4)
            .forEach(function (d, i) {
              if (d.id) {
                value = d.value.split("+");
                value.forEach(function (v, j) {
                  innerData = {
                    id: d.id,
                    pos: d.pos,
                    begin: d.tstart,
                    end: d.tend,
                    name: v,
                    valueY: d.noise,
                    valueX: parseInt(d.tstart) + (j / 5 + 1),
                  };
                  dataset4.push(innerData);
                });
              }
            });

          tempdataset4 = dataset4;
          tempid = d.id;
          tempstart4 = d.tstart;
          temptend4 = d.tend;
          if(tempid < 3){
            tempstart4 = (tempid * 1 + 2) * 4;
          }
          if(tempid == 3){
            tempstart4 = 16;
            temptend4 = 20;
          }
          tempid4 = id;
          tempselect_id4 = select_id;
          tempselect_value4 = select_value;
          detailChart(dataset1, tempstart1, d.tend, 1, select_id, select_value);             
          detailChart(dataset2, tempstart2, d.tend, 2, select_id, select_value);
          detailChart(dataset3, tempstart3, d.tend, 3, select_id, select_value);
          detailChart(dataset4, tempstart4, temptend4, 4, select_id, select_value);          

        }

        if (flag4 == "1") {
          detailChart(
            tempdataset4,
            tempstart4,
            temptend4,
            tempid4,
            tempselect_id4,
            tempselect_value4
          );
        }
      }
    };


//cierre de if  }
    function determinaRango(valor){
      if (valor <= 40) {
        return "#4292c6";
      } else if (valor > 40 && valor <= 50) {
        return "#2171b5";
      } else if (valor > 50 && valor <= 60) {
        return "#08519c";
      } else if (valor > 60 && valor <= 70) {
        return "#08306b";
      } else if (valor > 70 && valor <= 80) {
        return "#030f22";
      } else {
        return "#f7fbff";
      }

    }

  /* var controlsEnabled = false;
    $().on('click', function() {
     controlsEnabled = controlsEnabled;
    });

    var mouseenter = function (d) {};
  */

    var mouseleave = function (d) {
    //  if(!controlsEnabled){
    //  $('.click-here').css('opacity', 1);
      // if(lastPoint % 50 == 0 || lastPoint < 50 || lastPoint >= 2200 || (lastPoint + 1) % 50 == 0){
    //  d3.selectAll(".chart").selectAll("*").remove();

      d3.select(this).style("stroke", function (d){
        if (this.style.stroke === "yellow") {
          return "none";          
        }else if (this.style.stroke === "red") {
          return "red";          
        }else if (this.style.stroke === "black") {
          return "black";          
        }
        
      } ).style("opacity", 1);
    //  d3.selectAll("rect").style("opacity", "1");
    //  console.log(controlsEnabled);
    //}
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const cambiaAgris = async () => {
      await delay(3900);
      //console.log("Waited 3.9s"); 
      document.getElementById('bocina').style.color="#9d9e9f";   
      
    };

    var mouseclick = function (d) {
    //  controlsEnabled=true;
    d3.selectAll("rect").style("stroke","none");
    document.getElementById('bocina').style.color="steelblue";
      var caja = this.parentNode.parentNode.id;
      var ruta;
      if (caja === "svg1") {
        ruta = "audio1/C1-Joan";
      } else if (caja === "svg2") {
        ruta = "audio2/C2-Ester-";
      } if (caja === "svg3") {
        ruta = "audio3/C1-Gerard";
      } if (caja === "svg4") {
        ruta = "audio4/C1-Rosa";
      }      
      var selected = this.firstChild.id;
      var audio = new Audio(ruta + selected);
      audio.play();
      
     //var value=this.id;
     // console.log(value);
      d3.select(this).style("stroke", "black").style("opacity", 1);
      cambiaAgris();
    };

    // add the squares
    var rect = svg
      .selectAll()
      .data(dataupdate, function (d) {
        return d.nuevogrupo + ":" + d.value;
      })
      .enter()
      .append("rect")      
      .attr("x", function (d) {
        return x(d.nuevogrupo);
      })
      .attr("y", function (d) {
        return y(d.nuevaVariable);
      })
      .attr("rx", 1)
      .attr("ry", 1)
      .attr("width", x.bandwidth() * 1.1)
      .attr("height", y.bandwidth() * 1.1)
      .style("fill", function (d) {
        textoAreaDividido = d.value.split("+");
        numeroPalabras = textoAreaDividido.length;
        return determinaRango(d.noise);
        //return determinaColor(numeroPalabras);
      })

      
      .attr("class", function (d) {
        return "linea" + d.nuevaVariable + " " + "sqheatmaps";
      })
      .style("stroke-width", 2)
      .attr("id", function (d) {
        return d.id;
      })
      .style("stroke", "none")
      .style("opacity", 1)
      .on("mouseover", mouseover)
      // .on("mousemove", mousemove)
      .on("mouseleave",  mouseleave)
      .on("click", mouseclick)
      .html("<audio></audio>")
      .select("audio")
      .attr("id", function (d) {
        var nuevo = d.id + 1;
        if (nuevo === 1) {
          nuevo = "01";
        } else if (nuevo === 2) {
          nuevo = "02";
        } else if (nuevo === 3) {
          nuevo = "03";
        } else if (nuevo === 4) {
          nuevo = "04";
        } else if (nuevo === 5) {
          nuevo = "05";
        } else if (nuevo === 6) {
          nuevo = "06";
        } else if (nuevo === 7) {
          nuevo = "07";
        } else if (nuevo === 8) {
          nuevo = "08";
        } else if (nuevo === 9) {
          nuevo = "09";
        } else nuevo = nuevo;

        return "-" + nuevo + ".wav";
      })
      .attr("class", "sonidos");

  $("#container, #my_dataviz, #my_dataviz2, #my_dataviz3, #my_dataviz4").click(function () {
    $('.click-here').css('opacity', 0);
    $(".chart g").remove();
    if (flag11 != 0) {
      detailChart(
        tempdataset1,
        tempstart1,
        temptend1,
        tempid1,
        tempselect_id1,
        tempselect_value1
      );
    }
    if (flag12 != 0) {
      detailChart(
        tempdataset2,
        tempstart2,
        temptend2,
        tempid2,
        tempselect_id2,
        tempselect_value2
      );
    }
    if (flag13 != 0) {
      detailChart(
        tempdataset3,
        tempstart3,
        temptend3,
        tempid3,
        tempselect_id3,
        tempselect_value3
      );
    }
    if (flag14 != 0) {
      detailChart(
        tempdataset4,
        tempstart4,
        temptend4,
        tempid4,
        tempselect_id4,
        tempselect_value4
      );
    }
  });

  // Add title to graph
  svg
    .append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "14px");

  // Add subtitle to graph
  svg
    .append("text")
    .attr("x", 0)
    .attr("y", -20)
    .attr("text-anchor", "left")
    .style("font-size", "14px")
    .style("fill", "grey")
    .style("max-width", 400);


  function detailChart(dataset, start, end, id, select_id, select_value) {
    dataset = dataset.map((d, i) => {
      dname = d.name;
      checker = (dname == 'cmplx' || dname == 'rtn') ? 'rtn' : dname;
      d.pos = aNames.indexOf(checker) + 1;
      //console.log(d.pos);
      return d;
      // dataset[i].pos = Math.floor(Math.random() * 10);
    });
    var clientHeight = document.getElementById('my_dataviz').clientHeight;
    const heightchart = clientHeight;
    var margin = { top: 7.5, right: 30, bottom: 50, left: 40 },

      // clientDetailHeight = document.getElementById('totalChart').clientHeight,

      width = heightchart * .9 - margin.left - margin.right,
      height = heightchart * .9 - margin.top - margin.bottom,
      // width = clientDetailHeight - clientDetailHeight*0.2 - margin.left - margin.right,
      // height = clientDetailHeight - clientDetailHeight*0.2 - margin.top - margin.bottom,
      xScale = d3.scaleLinear(),
      yScale = d3.scaleBand(),
      yScale1 = d3.scaleLinear(),
      bar = '', chart = '';

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale1).tickSize(0);
    var minX = dataset[0]["begin"];
    var maxX = dataset[dataset.length - 1]["end"];

    xScale.domain([minX, maxX]).range(0, width);
    xScale.rangeRound([0, width]);
    var yminX = d3.min(dataset.map((d) => d.valueY));
    var ymaxX = d3.max(dataset.map((d) => d.valueY));

    yScale1.domain([30, 90]).rangeRound([height, 0]);
    yScale.domain(dataset.map((d) => d.pos)).range(0, height);
    yScale.rangeRound([0, height]);
    var spanX = function (d, i) {
      return xScale(d["begin"]);
    },
      spanY = function (d) {
        // return yScale(d.pos);
        return height / aNames.length * (d.pos - 1);
      },
      spanW = function (d, i) {
        return xScale(d["end"]) - xScale(d["begin"]);
      },
      spanH = 10;
    //console.log(height);
    chart = d3
      .selectAll("#chart" + id)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background", "white")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // chart
    //   .style("width", function (dataset) {
    //     return `${dataset}px`;
    //   })
    //   .text(function (dataset) {
    //     return dataset;
    //   });

    chart.append("g").attr("class", "axis axis-x");

    chart
      .select(".axis-x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("dx", "-1.5em")
      .attr("transform", "rotate(-50)");

    chart.selectAll("g.axis-x line").attr("stroke", "rgba(241, 190, 50, 1)");
    d3.selectAll("g.axis-x g.tick line").attr("y2", function (d, i) {
      if (d == start || d == end) {
        return -height * .99;
      }
    });

    // chart.select('.axis-x').selectAll(".tick").remove(); 
    chart.select('.axis-x').selectAll('.tick').each(function (d, i) {
      if (i % 2 != 0) {
        this.remove();
      }
    });

    chart.append("g")
      .attr("class", "axis axis-y")

    chart.select('.axis-y')
      .call(yAxis);
    chart.selectAll("g.axis-y line").attr("stroke", "rgba(128, 128, 128, 1)");

    d3.selectAll("g.axis-y g.tick line")
      .attr("x2", function (d, i) {
        if (d == 0.0) { return width; }
      });

    chart.select('.axis-y')
      .selectAll("text")
      .style("fill", "blue")

    bar = chart.selectAll("bar-g")
      .data(dataset)
      .enter()
      .append("g").classed('bar-g', true);

    bar
      .style('width', function (dataset) { return `${dataset}px`; })
      .text(function (dataset) { return dataset; });

    // draw the impulse chart
    var line = d3
      .line()
      .x(function (d, i) {
        return xScale(d.valueX);
      })
      .y(function (d, j) {
        return yScale1(d.valueY);
      });

    chart
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "blue")
      //.style("stroke-opacity", ".3")
      .attr("stroke-width", .5)
      .attr("d", line(dataset));
    
    chart
      .append('defs')
      .append('pattern')
        .attr('id', 'diagonalHatch')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
      .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1);  
//trama en relleno
  /* bar
        .append("rect")
        // .classed("chart-span", true)
        .attr("y", spanY)
        .attr("x", spanX)
        .attr("width", spanW)
        .attr("height", spanH)
        .attr("class", function (d) {
          return 'rect' + getCnt(d) 
        })      
        .attr('fill', function(){        
          if (d3.select('rect').attr("class")!="rect4") {
            return 'url(#diagonalHatch)';                      
          }
        }) */

    bar
      .append("rect")
      // .classed("chart-span", true)
      .attr("y", spanY)
      .attr("x", spanX)
      .attr("id", function(d){
        var nuevoid=d.name+d.begin;
        return nuevoid;
      })
      .attr("width", spanW)
      .attr("height", spanH)      
      .attr("class", function (d) {
        return 'rect' + getCnt(d) + " " + "Pos"+getArea(d) + " " +"recchart" + id;
      })      
      .style("stroke-width", function () {
        return "1.5px";
      })
      .style("fill", function (d) {
        //console.log(d);
        return colorRelleno2(d.name);      
      })
      /*.style("stroke", "none")function(d){
        return colorRelleno(d.name)
      })*/

      
      .on("mousemove", function (d) {      
        //var  = this.getAttribute("class").split(' ')[2];        
        var  colorfill= this.style.fill;        
        //console.log(d.noise);
        var  opacidad= $(this).css("opacity")
        var buscado=this.id;
       // console.log(opacidad);
        mousemove1(d.name, buscado,colorfill,opacidad)
      })
      // .on("mouseover", mouseover)
      .on("mouseout", mouseout);
    }

    /*  document.getElementById("label" + id).innerHTML =
        "This 4 seconds id:" +
        select_id +
        " contains " +
        select_value +
        " identified labels of noise.";*/
  

}

function colorRelleno(name){
  if (name == "rtn") {
    return "rgba(70,130,180,.9)";
  } else if (name == "brak") {
    return "purple";
  } else if (name == "bird") {
    return "rgb(255,127,80)";
  } else if (name == "horn") {
    return "orange";
  } else if (name == "motorc") {
    return "red";
  } else if (name == "cdoor") {
    return "brown";
  } else if (name == "eng") {
    return "pink";
  } else if (name == "peop") {
    return "grey";
  } else if (name == "troll") {
    return "yellow";
  } else if (name == "beep") {
    return "Crimson";
  } else if (name == "bell") {
    return "olive";
  } else if (name == "dog") {
    return "cyan";
  } else if (name == "glass") {
    return "maroon";
  } else if (name == "hdoor") {
    return "beige";
  } else if (name == "musi") {
    return "maroon";
  } else if (name == "sire") {
    return "khaki";
  } else if (name == "wind") {
    return "magenta";
  } else if (name == "bike") {
    return "gold";
  } else if (name == "cmplx") {
    return "black";
  } else {
    return "navy";
  }
}

function colorRelleno2(name){
  if (name == "rtn") {
    return "rgb(255,255,0)";
  } else if (name == "brak") {
    return "rgb(230,230,250)";
  } else if (name == "bird") {
    return "rgb(255,127,80)";
  }  else if (name == "impls") {
    return "rgb(185,127,80)";
  } else if (name == "horn") {
    return "rgb(173,216,230)";
  } else if (name == "motorc") {
    return "rgb(255,0,0)";
  } else if (name == "cdoor") {
    return "rgb(218, 213, 105)";
  } else if (name == "eng") {
    return "rgb(220,220,220)";
  } else if (name == "peop") {
    return "rgb(0,255,0)";
  } else if (name == "troll") {
    return "rgb(186, 88, 160)";
  } else if (name == "beep") {
    return "rgb(255,183,165)";
  } else if (name == "bell") {
    return "rgb(144,101,202)";
  } else if (name == "dog") {
    return "rgb(216, 121, 76)";
  } else if (name == "glass") {
    return "rgb(149, 53, 83)";
  } else if (name == "hdoor") {
    return "rgb(132, 32, 0)";
  } else if (name == "musi") {
    return "rgb(154,205,50)";
  } else if (name == "sire") {
    return "rgb(204,153,102)";
  } else if (name == "wind") {
    return "rgb(255,83,73)";
  } else if (name == "bike") {
    return "rgb(186,184,108)";
  } else if (name == "cmplx") {
    return "black";
  } else {
    return "black";
  }
}

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("z-index", 1)

  



function mouseout() {
  div.style("display", "none");
  document.getElementById("totalChart").style.opacity="100%"
  document.getElementById("totalChartBottomLeft").style.opacity="100%"
  document.getElementById("totalChartBottomRight").style.opacity="100%"
  document.getElementById("totalChartTopLeft").style.opacity="100%"

}

function getCnt(d) {
  var nm = d.name;
  var begin = d.begin;
  var cnt = 0;
  
  if (tempdataset1) {
    tempdataset1.map((t) => {
      if (t.begin == begin && t.name == nm)
        cnt++;
  
    })
  }
  if (tempdataset2) {
    tempdataset2.map((t) => {
      if (t.begin == begin && t.name == nm)
        cnt++;
  
    })
  }
  if (tempdataset3) {
    tempdataset3.map((t) => {
      if (t.begin == begin && t.name == nm)
        cnt++;
  
    })
  }
  if (tempdataset4) {
    tempdataset4.map((t) => {
      if (t.begin == begin && t.name == nm)
        cnt++;
  
    })
  }
  //console.log(cnt)
  return cnt;
}

function getArea(d) {
  var nm = d.name;
  var begin = d.begin;  
  var cnt = 0;
  var caja1,caja2,caja3,caja4;
  
  if (tempdataset1) {
    tempdataset1.map((t) => {
      if (t.begin == begin && t.name == nm)      
        caja1=t;
      //  console.log(caja1.name);
        
    })
  } 

  if (tempdataset2) {
    tempdataset2.map((u) => {
      if (u.begin == begin && u.name == nm)
        caja2=u; 
      //  console.log(caja2.name);
    })
  }
  if (tempdataset3) {
    tempdataset3.map((v) => {
      if (v.begin == begin && v.name == nm)
        caja3=v;  
      //  console.log(caja3.name);

    })
  }
  if (tempdataset4) {
    tempdataset4.map((w) => {
      if (w.begin == begin && w.name == nm)
        caja4=w;
      //  console.log(caja4.name);


    })
  }  
  
  return cnt;
} 


function buscaEnCuadrante(arr, buscado){
  //var combinaciones=0;
  var aBuscar=[];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i].childNodes;
    aBuscar.push(element[1].id);        
  }if(aBuscar.includes(buscado)){
    return true;
  }else{
    return false;
  }
  
}

function getColor(value){
  $(value).css("fill");
}

function asignaFondos(buscado,colofill,opacidad){  
  
  var cuadrante11 = document.getElementById("cuadrante11");
  var espacio11 = document.getElementById("chart1");
  var cuadrante12 = document.getElementById("cuadrante12");
  var espacio12 = document.getElementById("chart2");
  var cuadrante21 = document.getElementById("cuadrante21");
  var espacio21 = document.getElementById("chart3");
  var cuadrante22 = document.getElementById("cuadrante22");
  var espacio22 = document.getElementById("chart4");

  var dentro11=espacio11.getElementsByClassName('bar-g');
  var arr = [].slice.call(dentro11);

  var dentro12=espacio12.getElementsByClassName('bar-g');
  var arr2 = [].slice.call(dentro12);

  var dentro21=espacio21.getElementsByClassName('bar-g');
  var arr3 = [].slice.call(dentro21);

  var dentro22=espacio22.getElementsByClassName('bar-g');
  var arr4 = [].slice.call(dentro22);
  
  var dc11=buscaEnCuadrante(arr,buscado);
  var dc12=buscaEnCuadrante(arr2,buscado);
  var dc21=buscaEnCuadrante(arr3,buscado);
  var dc22=buscaEnCuadrante(arr4,buscado);

  if(dc11) {
    cuadrante11.style.backgroundColor=colofill;
    cuadrante11.style.opacity=opacidad;
    document.getElementById("totalChart").style.opacity="100%"
  } else {
    cuadrante11.style.backgroundColor="white";
    document.getElementById("totalChart").style.opacity="40%"
  }

  if(dc12) { 
    cuadrante12.style.backgroundColor=colofill;
    cuadrante12.style.opacity=opacidad;
    document.getElementById("totalChartBottomLeft").style.opacity="100%"
  } else {
    cuadrante12.style.backgroundColor="white";
    document.getElementById("totalChartBottomLeft").style.opacity="40%"
  }

  if(dc21) {
    cuadrante21.style.backgroundColor=colofill;
    cuadrante21.style.opacity=opacidad;
    document.getElementById("totalChartBottomRight").style.opacity="100%"
  } else {
    cuadrante21.style.backgroundColor="white";
    document.getElementById("totalChartBottomRight").style.opacity="40%"
  }

  if(dc22) { 
    cuadrante22.style.backgroundColor=colofill;
    cuadrante22.style.opacity=opacidad;
    document.getElementById("totalChartTopLeft").style.opacity="100%"
  } else {
    cuadrante22.style.backgroundColor="white";
    document.getElementById("totalChartTopLeft").style.opacity="40%"
  }

}


function mousemove1(name,buscado,colorfill,opacidad) {        
 // console.log(buscado);          
  div
  .html("<span>"+name+"</span><p><table class='ttip'>"+
                              "<td id='cuadrante11'>" +  
   "&nbsp;" + "</td>               <td id='cuadrante12'>" +
   "&nbsp;" + "</td>" + "</td><tr> <td id='cuadrante21'>" +
   "&nbsp;" + "</td>" + "</td>     <td id='cuadrante22'>" +
   "&nbsp;" + "</td></tr>"+"</table>")
    .style("display", "inline-block")
    .style("left", (d3.event.pageX + 5) + "px")
    .style("top", (d3.event.pageY + 2) + "px")      
    asignaFondos(buscado,colorfill,opacidad);

}

function PopupCenter(url, title, w, h) {  
  // Fixes dual-screen position                         Most browsers      Firefox  
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;  
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;  
            
  width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;  
  height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;  
            
  var left = ((width / 2) - (w / 2)) + dualScreenLeft;  
  var top = ((height / 2) - (h / 2)) + dualScreenTop;  
  var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);  

  // Puts focus on the newWindow  
  if (window.focus) {  
      newWindow.focus();  
  }  
}  

