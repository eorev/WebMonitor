"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var axios_1 = require("axios");
var cheerio_1 = require("cheerio");
var fs_1 = require("fs");
var WEBHOOK_URL = 'https://discord.com/api/webhooks/1077753919461150740/wMggo6QbbLlaXyYPUB_21YKnMF_K9Qi--_DB57P_1mxgng6h4FhfEgBYeWgit3-74B9x';
var WEBSITE_URL = 'https://www.udel.edu/';
var FILE_PATH = 'src/lastScrape.txt';
var message = {
    username: 'Null Monitor',
    avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
    embeds: [
        {
            title: 'The website has changed!',
            description: 'Changes...',
            color: 0x00ff00,
            fields: [
                {
                    name: 'Link to website',
                    value: WEBSITE_URL
                },
            ]
        },
    ]
};
var sendWebhook = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios_1["default"].post(WEBHOOK_URL, message)
            .then(function (response) {
            console.log('Message sent to Discord webhook');
        })["catch"](function (error) {
            console.error('Error sending message to Discord webhook:', error);
        });
        return [2 /*return*/];
    });
}); };
var scrapeWebsite = function () { return __awaiter(void 0, void 0, void 0, function () {
    var lastScrape, response, $, currentScrape;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lastScrape = (0, fs_1.readFileSync)(FILE_PATH, 'utf8');
                return [4 /*yield*/, axios_1["default"].get(WEBSITE_URL)];
            case 1:
                response = _a.sent();
                $ = (0, cheerio_1.load)(response.data);
                currentScrape = $('body').html();
                if (lastScrape !== currentScrape) {
                    console.log('There is a change in the website!');
                    sendWebhook();
                }
                else {
                    console.log('There is no change in the website.');
                }
                if (currentScrape !== null) {
                    (0, fs_1.writeFileSync)(FILE_PATH, currentScrape);
                }
                return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, scrapeWebsite()];
            case 1:
                _a.sent();
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 30000); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}); };
main();
