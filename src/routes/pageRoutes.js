const express = require('express');
const authControllers = require('../controllers/authControllers');
const endUserControllers = require('../controllers/endUserControllers')

const pageRoutes = express.Router();
pageRoutes.route('/').get((req, res) => {
    res.render('index')
});

pageRoutes.route('/erfolgrei').get((req, res) => {
    res.render('erfolgrei')
});


pageRoutes.route('/nUmsatz').get((req, res) => {
    endUserControllers.getUmsat((ok, results) => {
        if (ok) {
            res.render('nUmsatz', { results })
            console.log(results)
        } else {
            res.send(results)
        }
    })

});

pageRoutes.route('/nieUberweisen').get((req, res) => {
    endUserControllers.getUmsat((ok, results) => {
        if (ok) {
            res.render('nieUberweisen', { results })
            // console.log(results)
        } else {
            res.send(results)
        }
    })

});

//(this is for the routing without rendering anyresults)
// pageRoutes.route('/nieUberweisen').get((req, res) => {

//     res.render('nieUberweisen')

// });

pageRoutes.route('/nieUberWeisen').post((req, res) => {
    if (!req.body.zahlungsempfaaaenger || !req.body.ibaaan || !req.body.betraaag || !req.body.verwendungszweeeck || !req.body.ausfuehrungsdaaatum) {
        res.redirect("/");
    } else {
        //let restMoney = window.document.getElementById("wieViel").value
        authControllers.addTraaanskt(req.body.wieViel, req.body.zahlungsempfaaaenger, req.body.ibaaan, req.body.betraaag, req.body.verwendungszweeeck, req.body.ausfuehrungsdaaatum, (check) => {

            if (check) {
                //  req.session.user = check
                //console.log(check);
                console.log(req.body);
                res.redirect('/erfolgrei');

            } else {
                res.send("Sorry something went wrong. Please try again later");
            }
        });
    }

})










module.exports = pageRoutes;