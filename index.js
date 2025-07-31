import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fetch from 'node-fetch';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware
} from 'discord-interactions';

const app = express();

app.use(express.json({
  verify: verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY),
}));

app.post('/interactions', async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const profession = interaction.data.name;

    // ✅ Immediately respond to Discord to avoid timeout
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `⏳ Processing ${profession} info...`,
      },
    });

    // ✅ Trigger Google Apps Script webhook asynchronously
    try {
      const webhookUrl = `${process.env.GOOGLE_WEB_APP_URL}?profession=${encodeURIComponent(profession)}`;
      await fetch(webhookUrl, { method: 'POST' });
    } catch (error) {
      console.error('❌ Webhook error:', error);
    }
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot is running on port ${PORT}!`);
});

