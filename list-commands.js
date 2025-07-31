import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APP_ID}/guilds/${process.env.GUILD_ID}/commands`;

async function listCommands() {
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });

  const commands = await res.json();
  console.log('Registered commands:');
  commands.forEach(cmd => {
    console.log(`${cmd.name}: ${cmd.id}`);
  });
}

listCommands();
