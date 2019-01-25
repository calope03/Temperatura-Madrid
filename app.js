function ajaxHandler (url, cb){
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cb(data)  
    })
    .catch(function(error) {
      console.log(error)
    });  
}

ajaxHandler("http://airemad.com/api/v1/weather/S001", function(data){
    var dataTemperatura = {
      label: 'Temperatura (ºC)',
      data: [],
      type: 'line',
      fill: false,
      borderColor:"rgb(249, 196, 5)",
      yAxisID: "y-axis-temp"
    };
    
    var dataHumedad = {
      label: 'Humedad (%)',
      data: [],
      borderColor:"rgb(17, 66, 201)",
      backgroundColor:"rgba(82, 145, 207, 0.7)",
      yAxisID: "y-axis-hum"
    };
    
    var dataTotal= {
      labels: [],
      datasets: [dataTemperatura, dataHumedad]
    };
    data.list.forEach(function(element,i){
        dataTotal.labels.push(element.dt_txt);
        dataTemperatura.data.push(element.main.temp);
        dataHumedad.data.push(element.main.humidity);
    });
    var chartOptions = {
      scales: {
        yAxes: [{
          id: "y-axis-temp",
          ticks: {
            callback: function(value, index, values) {
                return value + '\u00B0C';
            }
          }
        }, {
          id: "y-axis-hum",
          ticks: {
            callback: function(value, index, values) {
                return value + '%';
            }
          }
        }]
      }
    };

    var ctx = document.getElementById('myChart').getContext('2d');
    var mixedChart = new Chart(ctx, {
      type: 'bar',
      data: dataTotal,
      options: chartOptions
    });
});
