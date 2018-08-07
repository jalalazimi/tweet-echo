import * as express from "express";
import * as crypto from 'crypto';
import * as cors from 'cors';
import * as OAuth from 'oauth-request';

const request = require('request-promise');

const bodyParser = require('body-parser');
const stripHtml = require("string-strip-html");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


const isValidtwitterUrl = url => /(^|[^'"])(https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+))/.test(url)

const extractingTweetIdFromURL = url => {
    if (!isValidtwitterUrl(url)) {
        throw new Error('not valid')
    }
    const arr = url.split('/');
    return arr[arr.length - 1]
};


const twitter = OAuth({
    consumer: {
        key: 'uloHq83EUIjx32TSnqJUTWTXt',
        secret: 'FODNE2TyueQEDuwhPRUmbWyniKQgtCQKbbsjEddtLFMACRbFoM'
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function (base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

twitter.setToken({
    key: '16341288-Z9c468O0OC3881egpFRN0i3yxDDakfCVTZ2UCLOWb',
    secret: 'wOuH1AKqiTazMLehaNvkLhZ8QHFmx755mKZXa69KhWE23'
});


const getOembed = (url) => {
    const options = {
        url: 'https://publish.twitter.com/oembed',
        qs: {url: url},
        json: true
    };
    return new Promise(function (resolve, reject) {
        twitter.get(options, async (err, response, tweets) => {
            if (err) return reject(err);
            resolve(tweets);
        })
    })
}

const tweetData = async url => {
    const options = {
        url: 'https://api.twitter.com/1.1/statuses/show.json',
        qs: {id: extractingTweetIdFromURL(url)},
        json: true
    };
    return new Promise(function (resolve, reject) {
        twitter.get(options, async (err, response, tweets) => {
            if (err) return reject(err);
            resolve(tweets);
        })
    })
}

const removeUserDataFromTweet = t => {
    return t.substr(0, t.lastIndexOf("—"));
}

app.get('/', (req, res): void => {
    const {url} = req.query;
    Promise.all([tweetData(url), getOembed(url)])
        .then((tweet: any) => {
            res.json(Object.assign(tweet[0], {full_text: removeUserDataFromTweet(stripHtml(tweet[1].html))}))
        })
        .catch(err => {
            throw new Error(err)
        })
})

app.listen(8523, () => console.log('Example app listening on port 3000!'))
