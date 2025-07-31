import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fetch from 'node-fetch';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';

const app = express();

// ✅ Middleware to parse raw body for verification
import bodyParser from 'body-parser';
import { Buffer } from 'buffer';

app.get('/', (req, res) => {
  console.log('📥 Ping received at root path /');
  res.send('Bot is alive');
});


app.use(
  '/interactions',
  bodyParser.raw({ type: '*/*' }),
  (req, res, next) => {
    console.log('📩 Incoming request to /interactions');

    verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY)(req, res, (err) => {
      if (err) {
        console.error('🔐 Signature verification failed:', err);
        return res.status(401).send('Bad request signature');
      }
      next();
    });
  }
);

app.post('/interactions', async (req, res) => {
  const interaction = req.body;

  if (!interaction) {
    console.error('⚠️ Empty or invalid request body');
    return res.status(400).send('Missing body');
  }

  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const profession = interaction.data.name;

    // Respond to Discord immediately
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `⏳ Processing ${profession} info...`,
      },
    });

    // Call your webhook in the background
    try {
      const response = await fetch(process.env.GOOGLE_WEB_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ profession }),
      });

      const text = await response.text();
      console.log('📨 Webhook response:', text);

      if (!response.ok) {
        console.error(`❌ Webhook failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error calling webhook:', error);
    }
  } else {
    return res.status(400).send('Unknown interaction type');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Bot is running on port ${PORT}`);
});
