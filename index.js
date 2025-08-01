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
    const commandName = interaction.data.name;

    if (commandName === 'submit') {
      const resource = interaction.data.options.find(o => o.name === 'resource')?.value;
      const tier = interaction.data.options.find(o => o.name === 'tier')?.value;
      const quantity = interaction.data.options.find(o => o.name === 'quantity')?.value;
      const user = interaction.member?.user?.username || 'Unknown';

      // Respond immediately to Discord
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `📦 Submitting ${quantity}x ${resource} (${tier})...`,
        },
      });

      try {
        const response = await fetch(process.env.GOOGLE_WEB_APP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            command: '/submit',
            args: [resource, tier, quantity.toString()],
            user,
          }),
        });

        const result = await response.text();
        console.log('📨 Webhook response:', result);
      } catch (err) {
        console.error('❌ Failed to submit:', err);
      }

    } else {
      // Default: profession info
      const profession = commandName;

      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `⏳ Processing ${profession} info...`,
        },
      });

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
      } catch (error) {
        console.error('❌ Error calling webhook:', error);
      }
    }
  } else {
    res.status(400).send('Unknown interaction type');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Bot is running on port ${PORT}`);
});
