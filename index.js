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

// Parse JSON body first (no verify function here)
app.use(express.json());

// Then verify Discord signature on the raw body, BEFORE your routes
app.use(verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY));

// Optional: Middleware to catch JSON parse errors and log them
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('⚠️ Bad JSON received:', err);
    return res.status(400).send('Invalid JSON');
  }
  next(err);
});

app.post('/interactions', async (req, res) => {
  const interaction = req.body;

  if (!interaction) {
    console.error('⚠️ Missing request body');
    return res.status(400).send('Missing body');
  }

  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const profession = interaction.data.name;

    // Respond immediately to avoid timeout
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `⏳ Processing ${profession} info...`,
      },
    });

    // Trigger your webhook asynchronously
    try {
      const webhookUrl = `${process.env.GOOGLE_WEB_APP_URL}?profession=${encodeURIComponent(profession)}`;
      await fetch(webhookUrl, { method: 'POST' });
    } catch (error) {
      console.error('❌ Webhook error:', error);
    }
  } else {
    // Unknown interaction type
    res.status(400).send('Unknown interaction type');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot is running on port ${PORT}!`);
});
