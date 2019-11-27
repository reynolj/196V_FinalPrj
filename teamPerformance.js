let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let teamStats = JSON.parse(this.responseText);
        //document.getElementById("demo").innerHTML = myObj.name;
        let select = document.getElementById("team-selector");
        for (let i = 0; i < teamStats.data.length; i++){
            //teamArray.push(teamStats.data[i].team.name);
            let option = document.createElement("option");
            option.text = teamStats.data[i].team.name;
            select.add(option);
        }

        displayTeamName();

        select.onchange = function() {
            displayTeamName();

        };

        function displayTeamName(){
            let selectedTeamStats = teamStats.data.find(entry => entry.team.name === select.options[select.selectedIndex].text);
            let teamName = selectedTeamStats.team.name;
            console.log(selectedTeamStats);
            document.getElementById("team-name").innerHTML = "Dota2 TI9 :: " + teamName;
        }
        //let svg =
    }
};
//xmlhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://datdota.com/api/teams/performances?teams=2163&tier=1&tier=2&valve-event=does-not-matter&threshold=1&patch=7.22&after=20%2F08%2F2019&before=25%2F08%2F2019&duration=0%3B200&duration-value-from=0&duration-value-to=200", true);
xmlhttp.open("GET", "./data/teamPerformanceData.json", true);
xmlhttp.send();