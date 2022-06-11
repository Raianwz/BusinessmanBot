const { CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');
const coins = require('./coins.json');
const combinations = require('./combinations.json');

async function  getUSDToBRL() {
    const response = await fetch('http://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    return `${data.USDBRL.name} está valendo R$ ${data.USDBRL.bid} 💵 Max. R$ ${data.USDBRL.high} ⬆ ➖ Min. R$ ${data.USDBRL.low} ⬇ ➖ <a:Frog:936264596514291723> Dados de ${DateFormat(data.USDBRL.create_date)}`;
}
async function  getEURToBRL() {
    const response = await fetch('http://economia.awesomeapi.com.br/json/last/EUR-BRL');
    const data = await response.json();
    return `${data.EURBRL.name} está valendo R$ ${data.EURBRL.bid} 💵 Max. R$ ${data.EURBRL.high} ⬆ ➖ Min. R$ ${data.EURBRL.low} ⬇ ➖ <a:Frog:936264596514291723> Dados de ${DateFormat(data.EURBRL.create_date)}`;
} 
async function  getANYToANY(param) {
    if(!isValidConversion(param)) return 'Informe os valores corretos!';
    const response = await fetch('http://economia.awesomeapi.com.br/json/last/' + param);
    const data = await response.json();
    for(var currency in data)
    {
        return `${data[currency].name} está valendo ${data[currency].bid} ${coins[data[currency].codein]} 💵 Max. ${data[currency].high} ${coins[data[currency].codein]}  ⬆ ➖ Min. ${data[currency].low} ${coins[data[currency].codein]}  ⬇ ➖ <a:Frog:936264596514291723> Dados de ${DateFormat(data[currency].create_date)}`;
    }
}   

async function getCurrentAmount(params)
{
    if(params.length !== 2) return 'Informe os paramêtros corretos!';
    if(parseFloat(params[0]) === NaN)return 'Informe um número!';
    if(!isValidConversion(params[1].toUpperCase())) return 'Informe os valores corretos!';

    let coin = params[1].split('-')[0];
    let valueFloat = parseFloat(params[0]);

    const response = await fetch('http://economia.awesomeapi.com.br/json/last/' + params[1]);
    const data = await response.json();

    let currentValue;
    let code;
    for(var currency in data)
    {
        if(data[currency].bid !== undefined)
            currentValue = parseFloat(data[currency].bid); 
        if(data[currency].codein !== undefined)
            code = data[currency].codein;
    }
    
    if(currentValue === undefined || code === undefined) return 'Erro na operação!';

    //return (valueFloat*currentValue).toFixed(2) + " " +  coins[code] + "s";
    return `${(valueFloat*currentValue).toFixed(2)} ${coins[code]}s <:BusinessCash:984999405155401789>`;

}

function isValidConversion(param)
{
    let params = param.split('-');
    if(params.length != 2) return false;
    if(coins[params[0]] === undefined || coins[params[1]] === undefined) return false;

    return true;
}

function DateFormat(coin){
    return `${coin.slice(8,10)}/${coin.slice(5,7)}/${coin.slice(0,4)} ${coin.slice(11,19)}`;
}

module.exports = {
    USDToBrl: getUSDToBRL,
    EURToBrl: getEURToBRL,
    ANYToANY: getANYToANY,
    CurrentAmount: getCurrentAmount
}