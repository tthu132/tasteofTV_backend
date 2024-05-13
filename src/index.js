const express = require("express")

const dotenv = require('dotenv')
const { default: mongoose } = require("mongoose")
const routes = require("./routes")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001


app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json())
app.use(cookieParser())

// app.use(cors({ origin: true, credentials: true }));
routes(app)


mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('connect success!');
    })
    .catch((erro) => {
        console.log(erro);
    })


// import "./khoa_models/index.js"

// app.post('/api/translate', async (req, res) => {
//     try {
//         const { text, language } = req.body;
//         const translatedText = await translateText(text, language);
//         res.status(200).json({ text: translatedText });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Failed to translate text' });
//     }
// });
app.listen(port, () => {
    console.log('sever is running in port: ', +port);
})