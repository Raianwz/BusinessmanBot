const fetch = require('node-fetch');

async function  getUSDToBRL() {
    const response = await fetch('http://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    return `${data.USD.name} está valendo R$ ${data.USD.bid} 💵 Max. R$ ${data.USD.high} ⬆ ➖ Min. R$ ${data.USD.low} ⬇ ➖ DankMods Dados de ${data.USD.create_date}`;
}   
async function  getANYToANY(param) {
    const response = await fetch('http://economia.awesomeapi.com.br/json/last/' + param);
    const data = await response.json();
    for(var currency in data)
    {
        console.log("Fon", data[currency]);
        return `${data[currency].name} está valendo R$ ${data[currency].bid} 💵 Max. R$ ${data[currency].high} ⬆ ➖ Min. R$ ${data[currency].low} ⬇ ➖ DankMods Dados de ${data[currency].create_date}`;
    }
}   

module.exports = {
    USDToBrl: getUSDToBRL,
    ANYToANY: getANYToANY
}