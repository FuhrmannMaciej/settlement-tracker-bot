import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const commandId = 'YOUR_COMMAND_ID_HERE'; // Replace with actual ID from list-commands.js
const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APP_ID}/guilds/${process.env.GUILD_ID}/commands/${commandId}`;

async function deleteCommand() {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });

  if (res.ok) {
    console.log(`✅ Deleted command with ID: ${commandId}`);
  } else {
    console.error(`❌ Failed to delete command: ${res.status}`);
  }
}

deleteCommand();
