import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { commands } from './commands.js';
dotenv.config();

// Define the Discord API endpoint for guild-level command registration
const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APP_ID}/guilds/${process.env.GUILD_ID}/commands`;

async function registerCommands() {
  try {
    const res = await fetch(url, {
      method: 'PUT', // Use PUT to overwrite all commands for the guild
      headers: {
        'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
    });

    const data = await res.json();
    console.log('✅ Slash commands registered:', data);
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
}

registerCommands();
