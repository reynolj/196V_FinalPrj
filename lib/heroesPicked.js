d3.json("../data/heroStats.json", function(myJson){
    data = getData(myJson);
    createPieChart(data);
});

function getData(json){
    let myArray = [];
    let totalPicks = 0;
    for (let i = 0; i < 10; i++){
        totalPicks += json.data[i].total;
    }
    for (let i = 0; i < 10; i++){
        let index = heroLookup.findIndex(hero => hero.ID === json.data[i].hero);
        let heroName = heroLookup[index].Hero;
        myArray[i] = {
            "picks": json.data[i].total,
            "percent": (100 * json.data[i].total/totalPicks).toFixed(2),
            "hero": heroName,
            "wins": json.data[i].wins,
            "losses": json.data[i].losses,
            "winrate": (100 * json.data[i].winrate).toFixed(2),
            "kda": json.data[i].kda.toFixed(2)
        };
    }
    return myArray;
}

function createPieChart(data) {
    //console.log(data);
    var width = 700,
        height = 700,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.category10();

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.picks;
        });

    var svg = d3.select("#hero-pick-pie").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var arcs = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .style("fill", function (d, i) {
            return color(i);
        })

        .on("mouseover", function (d) {
            console.log(d);
            let heroName = document.getElementById("hero-name");
            let heroPicks = document.getElementById("hero-stats-picks");
            let heroWins = document.getElementById("hero-stats-wins");
            let heroLosses = document.getElementById("hero-stats-losses");
            let heroWinrate = document.getElementById("hero-stats-winrate");
            let heroKDA = document.getElementById("hero-stats-kda");
            let heroHeadPicks = document.getElementById("hero-stats-head-picks");
            let heroHeadWins = document.getElementById("hero-stats-head-wins");
            let heroHeadLosses = document.getElementById("hero-stats-head-losses");
            let heroHeadWinrate = document.getElementById("hero-stats-head-winrate");
            let heroHeadKDA = document.getElementById("hero-stats-head-kda");
            heroName.innerText = d.data.hero;
            heroPicks.innerText = d.data.picks;
            heroWins.innerText = d.data.wins;
            heroLosses.innerText = d.data.losses;
            heroWinrate.innerText = d.data.winrate;
            heroKDA.innerText = d.data.kda;
            heroHeadPicks.innerText = "Picks";
            heroHeadWins.innerText = "Wins";
            heroHeadLosses.innerText = "Losses";
            heroHeadWinrate.innerText = "Winrate";
            heroHeadKDA.innerText = "KDA";
        })
        .on("mouseout", function () {
            let heroName = document.getElementById("hero-name");
            let heroPicks = document.getElementById("hero-stats-picks");
            let heroWins = document.getElementById("hero-stats-wins");
            let heroLosses = document.getElementById("hero-stats-losses");
            let heroWinrate = document.getElementById("hero-stats-winrate");
            let heroKDA = document.getElementById("hero-stats-kda");
            let heroHeadPicks = document.getElementById("hero-stats-head-picks");
            let heroHeadWins = document.getElementById("hero-stats-head-wins");
            let heroHeadLosses = document.getElementById("hero-stats-head-losses");
            let heroHeadWinrate = document.getElementById("hero-stats-head-winrate");
            let heroHeadKDA = document.getElementById("hero-stats-head-kda");
            heroName.innerText = "";
            heroPicks.innerText = "";
            heroWins.innerText = "";
            heroLosses.innerText = "";
            heroWinrate.innerText = "";
            heroKDA.innerText = "";
            heroHeadPicks.innerText = "";
            heroHeadWins.innerText = "";
            heroHeadLosses.innerText = "";
            heroHeadWinrate.innerText = "";
            heroHeadKDA.innerText = "";
        });

    arcs.append("text")
        .attr("transform", function (d) {
            var c = arc.centroid(d);
            return "translate(" + c[0]*1.6 + "," + c[1]*1.6 + ")";
        })
        .style("text-anchor", "middle")
        .attr("class", "graph-shadow")
        .text(function (d) {
            return d.data.hero;
        });

    arcs.append("text")
        .attr("transform", function (d) {
            var c = arc.centroid(d);
            return "translate(" + c[0] * 1.6 + "," + ((c[1] * 1.6) + 25) + ")";
        })
        .style("text-anchor", "middle")
        .attr("class", "graph-shadow")
        .text(function (d){
            return d.data.percent + "%";
        });
}

function test() {
    console.log(data);

}