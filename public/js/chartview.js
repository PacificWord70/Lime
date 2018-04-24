var colors = ['rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]

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



console.log("COLOR", colors[3 % 12])
firebase.auth().onAuthStateChanged(function (user) {
    var colorCount = -1;
    return firebase.database().ref('/UserInfo/' + user.uid + '/UserBudgets/').once('value').then(function (snapshot) {
        var reads = [];
        snapshot.forEach(function (childSnapshot) {
            var id = childSnapshot.key;
            console.log(id);
            var promise = firebase.database().ref('/Budgets/' + id).once('value').then(function (snap) {
                return snap.val();
                // The Promise was fulfilled.
            }, function (error) {
                console.error(error);
            });
            console.log(promise);
            reads.push(promise);
        });
        return Promise.all(reads);
    }, function (error) {
        console.error(error);
    }).then(function (values) {
        console.log(values);
        for (var bug of values) {
            bug.name
            var dt = new Date();
            var year = String(dt.getFullYear());
            var month = String(dt.getMonth());
            var data = [];

            if (bug.Expenses == null) {
                colorCount++;
                console.log("COLORS", colors[colorCount % 12])
                for (var cat in bug.categories) {
                    var label = [];
                    var dataNumber = [];
                    var dataValues = {
                        label: label,
                        data: dataNumber,
                        backgroundColor: [
                            colors[colorCount % 12]
                        ],
                        borderColor: [
                            'rgba(0,0,0,.2)'
                        ],
                        borderWidth: 1
                    }
                    data.push(dataValues);
                    console.log("Cat", cat)
                    label.push(cat);
                    dataNumber.push(0)
                }
            } else {
                console.log("Budget", bug.Expenses[year][month])
                console.log("BUG CATS", bug.categories)
                for (var cat in bug.categories) {
                    colorCount++;
                    console.log("COLORS", colors[colorCount % 12])
                    var label = [];
                    var dataNumber = [];
                    var dataValues = {
                        label: label,
                        data: dataNumber,
                        backgroundColor: [
                            colors[colorCount % 12]
                        ],
                        borderColor: [
                            'rgba(0,0,0,.2)'
                        ],
                        borderWidth: 1
                    }
                    data.push(dataValues);
                    console.log("Cat", cat)
                    var spent;
                    if (bug.Expenses[dt.getFullYear()][dt.getMonth()].categories[cat] == undefined) {
                        spent = 0
                    } else {
                        spent = bug.Expenses[dt.getFullYear()][dt.getMonth()].categories[cat].spent
                    }
                    label.push(cat);
                    dataNumber.push(bug.categories[cat].total - spent)
                    console.log(cat)
                    console.log(bug.categories[cat])
                }
                console.log(bug.categories)
                console.log(bug.name)
            }
            $('#mcatContainer').append(
                "<div style=\"width:90%;\" class=\"animated fadeInBottom card z-depth-4\">" +
                "<div class=\"card-body\">" +
                "<div class=\"card-text\" id=\"" + "div" + "\">" +
                "<canvas id=\"" + bug.BID + "\" width=\"300\" height=\"100\"></canvas>" +
                "</div>" +
                "</div>" +
                "</div>")
            console.log("Budget Name", bug.name)
            var cat = document.getElementById(bug.BID).getContext('2d');
            var myChart = new Chart(cat, {
                type: 'bar',
                data: {
                    datasets: data
                },
                options: {
                    title: {
                        display: true,
                        text: bug.name
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }

    });

});