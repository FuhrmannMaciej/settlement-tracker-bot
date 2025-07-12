import fetch from 'node-fetch'; // Even in Node 18+, you need this in CommonJS
import dotenv from 'dotenv';
dotenv.config();

const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APP_ID}/guilds/${process.env.GUILD_ID}/commands`;

const command = {
  name: 'request',
  description: 'Get the latest data from Google Sheet',
  type: 1,
};

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(command),
});

const data = await res.json();
console.log('Slash command registered:', data);
