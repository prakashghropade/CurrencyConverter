
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message =document.querySelector(".msg");


let i = 0;
for (let select of dropdowns){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;

        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener('change', (evt) => {
        updateflag(evt.target);
    })
}

const updateflag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
     img.src = newSrc;
}




updateExchageRate = async () =>{
    let amount = document.querySelector('.amount input');
    let amountval = amount.value;
    if(amountval === "" || amountval < 1){
      amountval = 1;
      amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalamount = amount.value * rate;
    message.innerText = `${amountval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
}

btn.addEventListener("click", (event) =>{
    event.preventDefault();
    updateExchageRate();
  
});
window.addEventListener("load", () =>{
    updateExchageRate();
})
