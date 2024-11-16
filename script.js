let baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let select = document.querySelectorAll(".select");

let input = document.querySelector(".input");

let btn = document.querySelector(".btn");

let fromCurr = document.querySelector(".from select");

let toCurr = document.querySelector(".to select");

let winner = document.querySelector(".winner");

let para = document.querySelector(".paraline");

for(let list of select) {
    for(currcode in countryList) {
        let newOptions = document.createElement("option");
        newOptions.innerText = currcode;

        list.append(newOptions);

        if(list.name === "from" && currcode === "USD") {
            newOptions.selected = "selected";
        } else if(list.name === "to" && currcode === "INR") {
            newOptions.selected = "selected";
        }

        list.addEventListener("change", (evt) => {
            changeFlag(evt.target);
        })
    }
}

let changeFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async () => {
    let amtVal = input.value;
    if(amtVal === "" || amtVal <= 0){
        amtVal = 0;
        input.value = "0";
    }

    let URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let responce = await fetch(URL);
    let data = await responce.json();
    let rate = await data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    
    let finalRate = amtVal * rate;
    winner.classList.remove("hide");
    para.innerText = `${amtVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`;
});
