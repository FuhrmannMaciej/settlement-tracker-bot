require('dotenv').config();
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');
const fetch = require('node-fetch');

const app = express();

app.use(express.json({
  verify: verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY),
}));

app.post('/interactions', async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND && interaction.data.name === 'request') {
    try {
      await fetch(process.env.GOOGLE_WEB_APP_URL, { method: 'POST' });

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '✅ Request received! The data will appear shortly.',
        },
      });
    } catch (error) {
      console.error('Error sending to Google Apps Script:', error);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '❌ Failed to trigger Google Apps Script.',
        },
      });
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Bot is running!');
});
