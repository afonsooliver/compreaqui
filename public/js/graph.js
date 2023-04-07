
fetch("/json")
  .then(data => data.json())
  .then(json => {
    for (var key in json) {
      document.getElementById("content").innerHTML += '<p>' + json[key]['date'] + '--------<a href=' + json[key]['url'] + '>' + json[key]['shopid'] + '</a>------------' + json[key]['source'] + '</p>'
    }
    return json
  })
  .then(json => {
    console.log(json)
    var date_array = {};
    for (var key in json) {
      var date = json[key]['date'].split(',')[0].split('/')
      date = date[2]+'.'+date[1]+'.'+date[0]
      date_array[date] = 0
    }
    for (var key in json) {
      var date = json[key]['date'].split(',')[0].split('/')
      date = date[2]+'.'+date[1]+'.'+date[0]
      date_array[date] = date_array[date] + 1
    }
    console.log(date_array)

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          label: '#cliques',
          data: date_array,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })






