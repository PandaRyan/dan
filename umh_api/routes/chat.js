var OpenAI = require("openai");
var express = require('express');
var router = express.Router();

router.post('/groceries', async(req, res) => {
    
})

router.post('/utilities', async(req, res) => {

})

router.post('/transportation', async(req, res) => {

})

router.post('/healthcare', async(req, res) => {
    
})

router.post('/education', async(req, res) => {
    
})

router.post('/others', async(req, res) => {

})

router.post('/test', async(req, res) => {
    let { usermsg } = req.usermsg;

    try {
        const client = new OpenAI({
            baseURL: "https://api.ilmu.ai/v1",
            apiKey: process.env.ILMU_API_KEY
        })

        const response = await client.chat.completions.create({
            model: "ilmu-glm-5.1",
            messages: [
                {
                    role: "system",
                    content: ""
                },
                {
                    role: "user",
                    content: "Hello"
                },
            ],
            temperature=0.7,
            response_format={"type": "json_object"},
            max_tokens = 10000
        })

        res.json(response);
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
})


module.exports = router;