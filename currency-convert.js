const axios = require('axios');

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=3d3f4f458d565529073dcc511bf48588')
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        
        if (isNaN(rate)) {
            throw new Error();
        }

        return rate;
    } catch(e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
    };
};

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch(e) {
        throw new Error(`Unable to get currencies that use ${currencyCode}`);
    }
};

const convertCurrency = async (from, to, amount) => {
   const rate = await getExchangeRate(from, to);
   const countries = await getCountries(to);
   const convertedAmount = (amount * rate).toFixed(2);
   return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
};

convertCurrency('USD', 'EUR', 20).then((message)=> {
    console.log(message);
}).catch((e) => {
    console.log(e.message);
});

const add = async (a, b) => a + b + c

const doWork = async () => {
    try {
        const result = await add(12, 13)
        return result;
    } catch(e) {
        return 10
    } 
};

doWork().then((data) => {
    console.log(data);
}).catch((e) => {
    console.log('Something went wrong!');
});

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//      });
//     };

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to);
//     }).then((countries) => {
//            return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
//     });
// };

// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// });

// getCountries('CAD').then((countries) => {
//     console.log(countries);
// });



