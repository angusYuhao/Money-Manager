var yhFinance = require("yahoo-finance");

yhFinance.historical({
    symbol: "MSFT",
    from: '2021-03-01',
    to: '2021-04-01',
}, function(err, quotes) {
    console.log(quotes[0]['close']);
});