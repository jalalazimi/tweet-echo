var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var request = require('request-promise');
var crypto = require('crypto');
var cors = require('cors');
var OAuth = require('oauth-request');
var app = express();
var bodyParser = require('body-parser');
var stripHtml = require("string-strip-html");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var isValidtwitterUrl = function (url) { return /(^|[^'"])(https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+))/.test(url); };
var extractingTweetIdFromURL = function (url) {
    if (!isValidtwitterUrl(url)) {
        throw new Error('not valid');
    }
    var arr = url.split('/');
    return arr[arr.length - 1];
};
var twitter = OAuth({
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
var getOembed = function (url) {
    var options = {
        url: 'https://publish.twitter.com/oembed',
        qs: { url: url },
        json: true
    };
    return new Promise(function (resolve, reject) {
        var _this = this;
        twitter.get(options, function (err, response, tweets) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err)
                    return [2 /*return*/, reject(err)];
                resolve(tweets);
                return [2 /*return*/];
            });
        }); });
    });
};
var tweetData = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var options;
    return __generator(this, function (_a) {
        options = {
            url: 'https://api.twitter.com/1.1/statuses/show.json',
            qs: { id: extractingTweetIdFromURL(url) },
            json: true
        };
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var _this = this;
                twitter.get(options, function (err, response, tweets) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (err)
                            return [2 /*return*/, reject(err)];
                        resolve(tweets);
                        return [2 /*return*/];
                    });
                }); });
            })];
    });
}); };
var removeUserDataFromTweet = function (t) {
    return t.substr(0, t.lastIndexOf("—"));
};
app.get('/', function (req, res) {
    var url = req.query.url;
    Promise.all([tweetData(url), getOembed(url)])
        .then(function (tweet) {
        res.json(Object.assign(tweet[0], { full_text: removeUserDataFromTweet(stripHtml(tweet[1].html)) }));
    })["catch"](function (err) {
        throw new Error(err);
    });
});
app.listen(8523, function () { return console.log('Example app listening on port 3000!'); });
