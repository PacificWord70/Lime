        //doughnut by day
        var ctxx = document.getElementById("city").getContext('2d');
        var myDoughnutChart = new Chart(ctxx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                }]

                // These labels appear in the legend and in the tooltips when hovering different arcs
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        //total stacked bar
        var ctxxx = document.getElementById("total").getContext('2d');
        var stackedBar = new Chart(ctxxx, {
            type: 'bar',
            data: {
                labels: ["This Month"],
                datasets: [
                    //need one of these groups for each category
                    {
                        type: 'bar',
                        label: 'budget1',
                        data: [65],
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false
                    }, {
                        type: 'bar',
                        label: 'budget2',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        data: [43],
                    }, {
                        type: 'bar',
                        label: 'budget3',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        data: [10],
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
        //all budgets in month
        var ctx = document.getElementById("budgets").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                //labels should be the name of each of their budgets
                labels: ["Budget1", "Budget2", "Budget3", "budget4", "Budget5", "budget6"],
                datasets: [{
                    label: "Positive is remaining funds, while negative is overspending", //,'list2'],//["Budget1", "Budget2", "Budget3", "budget4", "Budget5", "budget6"],
                    //data should be how much left in budgets
                    data: [12, -19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        //categories for each budget
        //repeat this block to create new graph
        //also put on new card
        var cat = document.getElementById("cat").getContext('2d');
        var myChart = new Chart(cat, {
            type: 'bar',
            data: {
                //labels should be the name of each of their budgets
                labels: ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"],
                datasets: [{
                    label: ["Budget 1"], //,'list2'],//["Budget1", "Budget2", "Budget3", "budget4", "Budget5", "budget6"],
                    //data should be how much left in budgets
                    data: [12, -19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        var line = document.getElementById("line").getContext('2d');
        var myChart = new Chart(line, {
            type: 'line',
            data: {
                //labels should be the name of each of their budgets
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],
                datasets: [{
                    data: [12, -19, 3, 5, -2, -3, -12, -19, 3, 5, 2, -3, -12, 19, 3, 5, 2, 3]
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });