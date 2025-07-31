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

// This must go BEFORE express.json and uses a raw parser
app.use(
  '/interactions',
  bodyParser.raw({ type: '*/*' }),
  (req, res, next) => {
    try {
      verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY)(req, res, next);
    } catch (err) {
      console.error('🔐 Signature verification failed:', err);
      return res.status(401).send('Bad request signature');
    }
  },
  (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.toString('utf-8'));
      next();
    } catch (e) {
      console.error('❌ Failed to parse JSON body:', e);
      return res.status(400).send('Invalid JSON');
    }
  }
);

// ✅ Route to handle Discord interactions
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

    // Respond immediately
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `⏳ Processing ${profession} info...`,
      },
    });

    // Fire webhook
    try {
      const webhookUrl = `${process.env.GOOGLE_WEB_APP_URL}?profession=${encodeURIComponent(profession)}`;
      await fetch(webhookUrl, { method: 'POST' });
    } catch (error) {
      console.error('❌ Failed to call webhook:', error);
    }
  } else {
    return res.status(400).send('Unknown interaction type');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Bot is running on port ${PORT}`);
});
