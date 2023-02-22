import axios from 'axios';
import cheerio, { load } from 'cheerio';
import { readFileSync, writeFileSync } from 'fs';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1077753919461150740/wMggo6QbbLlaXyYPUB_21YKnMF_K9Qi--_DB57P_1mxgng6h4FhfEgBYeWgit3-74B9x';
const WEBSITE_URL = 'https://www.udel.edu/';
const FILE_PATH = 'src/lastScrape.txt';

const message = {
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
                    value: WEBSITE_URL,
                },
            ],
        },
    ],
};

const sendWebhook = async () => {
    axios.post(WEBHOOK_URL, message)
        .then((response) => {
            console.log('Message sent to Discord webhook');
        })
        .catch((error) => {
            console.error('Error sending message to Discord webhook:', error);
        });
};

const scrapeWebsite = async () => {
    const lastScrape = readFileSync(FILE_PATH, 'utf8');
    const response = await axios.get(WEBSITE_URL);
    const $ = load(response.data);
    const currentScrape = $('body').html();

    if (lastScrape !== currentScrape) {
        console.log('There is a change in the website!');
        sendWebhook();
    } else {
        console.log('There is no change in the website.');
    }

    if (currentScrape !== null) {
        writeFileSync(FILE_PATH, currentScrape);
    }
};

const main = async () => {
    while (true) {
        await scrapeWebsite();
        await new Promise(r => setTimeout(r, 30000));
    }
};

main();