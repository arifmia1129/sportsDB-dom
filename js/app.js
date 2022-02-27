const errorContainer = document.getElementById("error-container");
const loadPlayers = async () => {
    const playerName = document.getElementById("input-field").value;

    if (playerName === "") {
        const h3 = document.createElement("h3");
        h3.classList.add("text-center");
        h3.classList.add("text-danger");
        h3.classList.add("p-5");
        h3.innerText = "Error for empty search field!";
        errorContainer.textContent = "";
        errorContainer.appendChild(h3);
        document.getElementById("player-container").textContent = "";
    }

    else {
        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${playerName}`);
        const data = await res.json();
        if (data.player === null) {
            const h3 = document.createElement("h3");
            h3.classList.add("text-center");
            h3.classList.add("text-danger");
            h3.classList.add("p-5");
            h3.innerText = "Not found any result";
            errorContainer.textContent = "";
            errorContainer.appendChild(h3);
            document.getElementById("input-field").value = "";
            document.getElementById("player-container").textContent = "";
        }
        else {
            displayPlayers(data.player);
            document.getElementById("input-field").value = "";
        }
    }
}
const displayPlayers = players => {
    const parentDiv = document.getElementById("player-container");
    parentDiv.textContent = "";
    errorContainer.textContent = "";
    players?.forEach(player => {
        console.log(player);
        const div = document.createElement("div");
        div.classList.add("col-md-6");
        div.classList.add("col-sm-12");
        const imgSrc = player.strThumb;
        if (imgSrc !== null) {
            div.innerHTML = `
        <div class="card m-2">
            <img src="${imgSrc}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text">${player.strBirthLocation}</p>
                <div>
                    <button href="#" class="btn btn-danger">Delete</button>
                    <button onclick=loadDetails('${player.idPlayer}') href="#" class="btn btn-success">Details</button>
                </div>
            </div>
        </div>
        `;
        }
        else {
            div.innerHTML = `
        <div class="card m-2">
            <img height=286px; src="images/1.png" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text">${player.strBirthLocation}</p>
                <div>
                    <button href="#" class="btn btn-danger">Delete</button>
                    <button onclick=loadDetails('${player.idPlayer}') href="#" class="btn btn-success">Details</button>
                </div>
            </div>
        </div>
        `;
        }
        parentDiv.appendChild(div);
    })
}


const loadDetails = player => {
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${player}`)
        .then(res => res.json())
        .then(data => displayDetails(data.players[0]));
}