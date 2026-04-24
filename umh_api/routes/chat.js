var OpenAI = require("openai");
var express = require('express');
var router = express.Router();
require('dotenv').config();

const { CloudClient } = require('chromadb');
const { GoogleGeminiEmbeddingFunction } = require('@chroma-core/google-gemini')
const CHROMA_TENANT = process.env.CHROMA_TENANT
const CHROMA_DATABASE = process.env.CHROMA_DATABASE
const COLLECTION_NAME = process.env.COLLECTION_NAME
const CHROMA_API_KEY = process.env.CHROMA_API_KEY
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const TOP_K = 5;

//chroma client
const chroma = new CloudClient({
    tenant: CHROMA_TENANT,
    database: CHROMA_DATABASE,
    apiKey: CHROMA_API_KEY,
})

async function retrieveContext(question) {
    try {
        const embedder = new GoogleGeminiEmbeddingFunction({ api_key: GOOGLE_API_KEY });
        const collection = await chroma.getCollection({ name: COLLECTION_NAME, embeddingFunction: embedder})
        const results = await collection.query({
            queryTexts: [question],
            nResults: TOP_K,
            include: ["documents", "metadatas", "distances"]
        })

        const hits = []
        if (results.documents && results.documents[0]) {
            for (let i = 0; i < results.documents[0].length; i++) {
                hits.push({
                    text: results.documents[0][i],
                    metadata: results.metadatas[0][i],
                    score: 1 - results.distances[0][i]
                });
            }
        }
        
        return hits;
    } catch (err) {
        return err.message;
    }
}

router.post('/groceries', async(req, res) => {
    let { usermsg, userdetails } = req.body;

    try {
        const client = new OpenAI({
            baseURL: "https://api.ilmu.ai/v1",
            apiKey: process.env.ILMU_API_KEY
        })

        const hits = await retrieveContext(usermsg);

        
        if (!Array.isArray(hits)) {
            return res.status(500).json({
                success: false,
                error: "Failed to retrieve context from Chroma Cloud"
            })
        }

        const contextParts = hits.map((hit, index) => 
            `[Chunk ${index + 1} | Section: ${hit.metadata.section || 'Unknown'}]\n${hit.text}`
        )
        const contextString = contextParts.join('\n\n---\n\n')

        const response = await client.chat.completions.create({
            model: "ilmu-glm-5.1",
            messages: [
                {
                    role: "system",
                    content: 
                    `
                    You are a helpful assistant for Malaysian government subsidy information. 
                    You specialize in answering questions related to subsidies available for the Malaysian public, with reference to the Malaysia Budget 2026 document.
                    In this specific section, you are focusing on subsidies related to groceries.
                    When answering, you should rely solely on the provided context from the Malaysia Budget 2026 document. Do not make assumptions or use information that is unrelated to the scope. You should tailor your answers to user's specific subsidy available. (Eg: government allocated RM 1 billion, but user only entitled for RM 100, then only mention the RM 100 subsidy in your answer)
                    If the question is unrelated to Malaysian government subsidies, respond with "I'm sorry, but I can only assist with questions related to Malaysian government subsidies."
                    If there is no relevant subsidy available for the user's situation, respond with "I'm sorry, but there is no relevant subsidy information available for your query."
                    You will be supplied with context retrieved from the Malaysia Budget 2026 document, which may include information about various subsidies. Your answers should always include the following: Name of the subsidy, a brief description (that includes eligibility criteria and how it relates to the user's situation.)
                    Depending on the level of context available from the Malaysia Budget 2026 document, you are required to meet all criterias as described above, thus, do further research if necessary. However, it is important to NOT provide any made up or assumed information.
                    You will also be supplied with the user's simple profile, which includes their age, income group (B40, M40, T20), and state of residence. Use this information to determine whether they are eligible for the subsidies you recommend. By default, assume that the user is a consumer, unless otherwise stated in their question.

                    You are to strictly respond in a JSON format as follows:
                    {
                        "main_response": {
                            "subsidy_name": 
                            "description":
                        }

                        "supplementary_response": {
                            available: "true"/"false"
                            {
                                "subsidy_name":
                                "description":
                            }
                        }
                    }

                    There should only be ONE main response, and the number of supplementary response depends on however many are available. If there are supplementary responses, make available "true", if not, make it "false".

                    ###
                    CONTEXT:
                    ${contextString}

                    ###
                    User Details:
                    Birth Year: ${userdetails.birthYear}
                    Income Group: ${userdetails.incomeGroup}
                    State of Residence: ${userdetails.state}
                    `
                },
                {
                    role: "user",
                    content: usermsg
                },
            ],
            temperature: 0.6,
            response_format: {"type": "json_object"},
            max_tokens: 500
        })

        const returnResponse = response.choices[0].message.content;

        res.status(201).json({returnResponse});
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
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
    let { usermsg } = req.body;

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
                    content: "reply in 5 words"
                },
                {
                    role: "user",
                    content: "Hello"
                },
            ],
            temperature: 0.7,
            response_format: {"type": "json_object"},
            max_tokens: 100
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