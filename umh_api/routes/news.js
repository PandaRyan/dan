var express = require('express');
var router = express.Router();

router.post('/news', async(req, res) => {
    try {
        const response = await fetch(`https://newsdata.io/api/1/latest? 
            apikey=${PROCESS.ENV.}
            &q=subsidy OR subsidies
            &country=my
            &language=en,ms
            &image=1
            &video=0
            &removeduplicate=1
            &sort=relevancy
            &size=8`).then (response => response.json())
                     .then (data => setData(data))
    } catch (err) {
        res.status(500).json({status: "failed", message: err})
    }
})