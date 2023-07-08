require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
            `;
};

function validateInput(testInput) {
    testInput = document.querySelector("testForm");
    testInput.addEventListener("formSubmit", function (event) {
        if (testInput === "") {
            return "Empty";
        } else if (isNaN(testInput)) {
            return "Not a number";
        } else if (isNaN(testInput) === false) {
            return "Is a number";
        };
    });
};

function formSubmission(document, list, pilotInput, copilotInput, fuelLevelInput, cargoMassInput) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
        if (validateInput(pilotStatus) === "Empty"|| validateInput(copilotStatus) === "Empty" || validateInput(fuelStatus) === "Empty" || validateInput(cargoStatus) === "Empty") {
            window.alert("All fields are required.");
            event.preventDefault();
        } else if (validateInput(pilotStatus) === "Is a number" || validateInput(copilotStatus) === "Is a number") {
            window.alert("Pilot and Copilot names cannot be numeric.");
            event.preventDefault();
        } else if (validateInput(fuelStatus) === "Not a number" || validateInput(cargoStatus) === "Not a number") {
            window.alert("Fuel status and cargo status inputs must be numeric values.");
            event.preventDefault();
        } else if (validateInput(pilotStatus) === "Not a number" && validateInput(copilotStatus) === "Not a number" && validateInput(fuelStatus) === "Is a number" && validateInput(cargoStatus) === "Is a number") {
            list.style.visiblity = "visible";
            pilotStatus.innerHTML = `Pilot ${pilotInput.value} is ready for launch.`;
            copilotStatus.innerHTML = `Copilot ${copilotInput.value} is ready for launch.`;
            if (fuelLevelInput.value < 10000) {
                let faultyItems = document.getElementById("faultyItems");
                faultyItems.style.visiblity = "visible";
                launchStatus.innerHTML = "Shuttle not ready for launch.";
                launchStatus.style.color = "red";
                fuelStatus.innerHTML = "Fuel level too low for launch.";
            } else if (fuelLevelInput.value >= 10000) {
                launchStatus.innerHTML = "Shuttle is ready for launch.";
                launchStatus.style.color = "green";
                fuelStatus.innerHTML = `Fuel level is ${fuelLevelInput.value}L.`;
            };
            if (cargoMassInput.value > 10000) {
                let faultyItems = document.getElementById("faultyItems");
                faultyItems.style.visiblity = "visible";
                launchStatus.innerHTML = "Shuttle not ready for launch.";
                launchStatus.style.color = "red";
                cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
            } else if (fuelLevelInput.value <= 10000) {
                launchStatus.innerHTML = "Shuttle is ready for launch.";
                launchStatus.style.color = "green";
                cargoStatus.innerHTML = `Cargo mass is ${cargoMassInput.value}kg.`;
            };
        }
    };

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        response.json().then(function (json) {
            console.log(json);
        });
    });
    return planetsReturned;
};

function pickPlanet(listedPlanets) {
    let randomNumber = Math.floor(Math.random() * listedPlanets.length);
    return listedPlanets[randomNumber];
};

module.exports = {
    addDestinationInfo: addDestinationInfo,
    validateInput: validateInput,
    formSubmission: formSubmission,
    pickPlanet: pickPlanet,
    myFetch: myFetch
};
