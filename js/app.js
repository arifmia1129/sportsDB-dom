const errorContainer = document.getElementById("error-container");
const spinner = document.getElementById("spinner");
const loadPlayers = async () => {
    document.getElementById("details-container").textContent = "";
    const playerName = document.getElementById("input-field").value;
    spinner.style.display = "block";

    if (playerName === "") {
        const h3 = document.createElement("h3");
        h3.classList.add("text-center");
        h3.classList.add("text-danger");
        h3.classList.add("p-5");
        h3.innerText = "Error for empty search field!";
        errorContainer.textContent = "";
        errorContainer.appendChild(h3);
        document.getElementById("player-container").textContent = "";
        spinner.style.display = "none";
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
            spinner.style.display = "none";
        }
        else {
            displayPlayers(data.player);
            document.getElementById("input-field").value = "";
            spinner.style.display = "none";
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
                    <button id="delete-btn" href="#" class="btn btn-danger delete-btn">Delete</button>
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
                    <button  href="#" class="btn btn-danger delete-btn">Delete</button>
                    <button onclick=loadDetails('${player.idPlayer}') href="#" class="btn btn-success">Details</button>
                </div>
            </div>
        </div>
        `;
        }
        parentDiv.appendChild(div);

        const buttons = document.getElementsByClassName("delete-btn");
        for (const button of buttons) {
            button.addEventListener("click", function (event) {
                event.target.parentNode.parentNode.parentNode.style.display = "none";
            })
        }
    })
}


const loadDetails = player => {
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${player}`)
        .then(res => res.json())
        .then(data => displayDetails(data.players[0]));
}

const displayDetails = player => {
    const detailsContainer = document.getElementById("details-container");
    document.getElementById("player-container").textContent = "";
    detailsContainer.textContent = "";
    const male = document.getElementById("male");
    const female = document.getElementById("female");
    if (player.strGender === "male" || player.strGender === "Male") {
        male.style.display = "block";
        female.style.display = "none";
    }
    else {
        female.style.display = "block";
        male.style.display = "none";
    }
    const div = document.createElement("div");
    const imgSrc = player.strThumb;
    if (imgSrc !== null) {
        div.innerHTML = `
        <div class="card m-2">
            <img src="${imgSrc}" class="card-img-top">
            <div class="card-body">
            <h3 class="card-title">${player.strPlayer}</h3>
            <h5>${player.strBirthLocation}</h5>
            <h5>${player.strNationality}</h5>
            <p class="card-text">${player.strDescriptionEN}</p>
            </div>
        </div>
        `;
    }
    else {
        div.innerHTML = `
        <div class="card m-2">
            <img height=286px; src="images/1.png" class="card-img-top img-fluid">
            <div class="card-body">
                <h3 class="card-title">${player.strPlayer}</h3>
                <h5>${player.strBirthLocation}</h5>
                <h5>${player.strNationality}</h5>
                <p class="card-text">${player.strDescriptionEN}</p>
            </div>
        </div>
        `;
    }
    detailsContainer.appendChild(div);

}