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
        if (testInput === "") {
            return "Empty";
        } else if (isNaN(testInput) === false) {
            return "Is a Number";
        } else if (isNaN(testInput)) {
            return "Not a Number";
        };
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
        if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
            window.alert("All fields are required.");
        } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number") {
            window.alert("Pilot and copilot names cannot be numeric, and fuel status and cargo status inputs must be numeric values.");
        } else {
            let launchStatus = document.getElementById("launchStatus");
            list.style.visibility = "visible";
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
                if (fuelLevel < 10000 && cargoMass > 10000) {
                    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                    launchStatus.style.color = "rgb(199, 37, 78)";
                    fuelStatus.innerHTML = "Fuel level too low for launch";
                    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
                } else if (fuelLevel >= 10000 && cargoMass > 10000) {
                    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                    launchStatus.style.color = "rgb(199, 37, 78)";
                    fuelStatus.innerHTML = `Fuel level high enough for launch`;
                    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
                } else if (fuelLevel < 10000 && cargoMass <= 10000) {
                    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                    launchStatus.style.color = "rgb(199, 37, 78)";
                    fuelStatus.innerHTML = "Fuel level too low for launch";
                    cargoStatus.innerHTML = `Cargo mass low enough for launch`;
                } else if (fuelLevel >= 10000 && cargoMass <= 10000) {
                    launchStatus.innerHTML = "Shuttle is Ready for Launch";
                    launchStatus.style.color = "rgb(65, 159, 106)";
                    fuelStatus.innerHTML = `Fuel level high enough for launch`;
                    cargoStatus.innerHTML = `Cargo mass low enough for launch`;
                };
        };
    };


async function myFetch() {
    let planetsReturned;
    try {
        planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
                return response.json();
        });
    } catch (err) {
        console.error(err);
    };
    return planetsReturned;
};

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports = {
    addDestinationInfo: addDestinationInfo,
    validateInput: validateInput,
    formSubmission: formSubmission,
    pickPlanet: pickPlanet,
    myFetch: myFetch
};
