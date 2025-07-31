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
  console.log('✅ Interaction received:', interaction);

  if (!interaction) {
    console.error('⚠️ Empty or invalid request body');
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: '❌ Received invalid interaction.',
      },
    });
  }

  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    console.log('📥 Received command:', JSON.stringify(interaction, null, 2));
    const profession = interaction.data.name;

    // ✅ Respond to Discord immediately
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `⏳ Processing ${profession} info...`,
      },
    });

    // ✅ Fire webhook asynchronously (Google Apps Script)
    try {
      const webhookUrl = `${process.env.GOOGLE_WEB_APP_URL}?profession=${encodeURIComponent(profession)}`;
      const webhookRes = await fetch(webhookUrl, { method: 'POST' });

      if (!webhookRes.ok) {
        console.error(`❌ Webhook failed with status: ${webhookRes.status}`);
      } else {
        console.log(`✅ Webhook triggered for ${profession}`);
      }
    } catch (error) {
      console.error('❌ Webhook error:', error);
    }

    return;
  }

  // 🛡️ Fallback: respond to unknown interaction types to avoid timeout
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: '❓ Unknown interaction type received.',
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Bot is running on port ${PORT}`);
});
