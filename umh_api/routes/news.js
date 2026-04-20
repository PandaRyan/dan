var express = require('express');
var router = express.Router();

router.post('/', async(req, res) => {
    try {
        const response = await fetch(`https://newsdata.io/api/1/latest? 
            apikey=${process.env.NEWSDATA_KEY}
            &q=subsidy OR subsidies
            &country=my
            &language=en,ms
            &image=1
            &video=0
            &removeduplicate=1
            &sort=relevancy
            &size=8`)

        const data = await response.json();
        
        const formattedData = data.results.map(article => ({
            title: article.title,
            image_url: article.image_url,
            pubDate: article.pubDate,
            link: article.link
        }))

        res.status(200).json({
            status: "success",
            articles: formattedData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({status: "failed", message: err})
    }
})

module.exports = router;