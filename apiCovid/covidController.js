//Import COVID Model
Covid = require('./covidModel');

// For index
exports.index = function (req, res) {
    var cases = [];
    var hUCI = [];
    var date = [];
    
    Covid.get(function (err, covid) {
        if (err)
            res.json({
                status: "Erro!",
                message: err
            });

        // List the number of new cases
        for (var i=0; i<covid.length; i++) {
            cases.push(covid[i].newCases);
        }

        // List list number of intensive care admissions
        for (var j=0; j<covid.length; j++) {
            hUCI.push(covid[j].uci);
        }

        // Identify the day with more new cases
        var max = null;
        max = Math.max(...cases);
        var dateMax = cases.indexOf(max);

        // Identify the day with fewer new cases
        var min = null;
        min = Math.min(...cases);
        var dateMin = cases.indexOf(min);

        // Convert to date
        for (var k=0; k<covid.length; k++) {
            date.push(covid[k].data);
        }

        // Make the average
        var sum = 0;
        for(var l=0; l<covid.length; l++) { 
            sum += covid[l].newCases; // Sum
        } 
        var avg = sum / l;
        
        res.json({
            status: "OK",
            message: "Data obtained successfully!",
            New_Cases: cases,
            ICH: hUCI,
            max: date[dateMax],
            min: date[dateMin],
            average: avg,
            sum: sum
        });
    });
};

// Create new COVID data
exports.add = function (req, res) {
    var covid = new Covid();
    covid.data = req.body.data? req.body.data: covid.data;
    covid.newCases = req.body.newCases;
    covid.uci = req.body.uci;

    //Guardar e verificar erros
    covid.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New information added!",
            data: covid
        });
    });
};

// To see COVID data
exports.view = function (req, res) {
    Covid.findById(req.params.covid_id, function (err, covid) {
        if (err)
            res.send(err);
        res.json({
            message: 'Data details',
            data: covid
        });
    });
};