const { CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');
const coins = require('./coins.json');
const combinations = require('./combinations.json');

async function  getUSDToBRL() {
    const response = await fetch('http://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    return `${data.USD.name} está valendo R$ ${data.USD.bid} 💵 Max. R$ ${data.USD.high} ⬆ ➖ Min. R$ ${data.USD.low} ⬇ ➖ <a:Frog:936264596514291723> Dados de ${data.USD.create_date}`;
}
async function  getEURToBRL() {
    const response = await fetch('http://economia.awesomeapi.com.br/json/last/EUR-BRL');
    const data = await response.json();
    return `${data.EUR.name} está valendo R$ ${data.EUR.bid} 💵 Max. R$ ${data.EUR.high} ⬆ ➖ Min. R$ ${data.EUR.low} ⬇ ➖ <a:Frog:936264596514291723> Dados de ${data.EUR.create_date}`;
} 
async function  getANYToANY(param) {
    if(!isValidConversion(param)) return 'Informe os valores corretos!';
    const response = await fetch('http://economia.awesomeapi.com.br/json/last/' + param);
    const data = await response.json();
    for(var currency in data)
    {
        return `${data[currency].name} está valendo ${data[currency].bid} ${coins[data[currency].codein]} 💵 Max. ${data[currency].high} ${coins[data[currency].codein]}  ⬆ ➖ Min. ${data[currency].low} ${coins[data[currency].codein]}  ⬇ ➖ <a:Frog:936264596514291723> Dados de ${data[currency].create_date}`;
    }
}   

async function getCurrentAmount(params)
{
    if(params.length !== 2) return 'Informe os paramêtros corretos!';
    if(parseFloat(params[0]) === NaN)return 'Informe um número!';
    if(!isValidConversion(params[1])) return 'Informe os valores corretos!';

    let coin = params[1].split('-')[0];
    let valueFloat = parseFloat(params[0]);

    const response = await fetch('http://economia.awesomeapi.com.br/json/last/' + params[1]);
    const data = await response.json();

    let currentValue = parseFloat(data[coin].bid);

    return valueFloat*currentValue + " " +  coins[data[coin].codein] + "s";

}

function isValidConversion(param)
{
    let params = param.split('-');
    if(params.length != 2) return false;
    if(coins[params[0]] === undefined || coins[params[1]] === undefined) return false;

    return true;
}

module.exports = {
    USDToBrl: getUSDToBRL,
    EURToBrl: getEURToBRL,
    ANYToANY: getANYToANY,
    CurrentAmount: getCurrentAmount
}