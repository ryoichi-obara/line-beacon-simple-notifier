const crypto = require('crypto');
const request = require('request-promise');

const { CHANNEL_ACCESS_TOKEN } = process.env;
const { CHANNEL_SECRET } = process.env;

const validateSignature = (signature, body) => signature === crypto.createHmac('sha256', CHANNEL_SECRET).update(Buffer.from(body, 'utf8')).digest('base64');

const response = (code, body) => ({
  statusCode: code,
  body: JSON.stringify(body),
});

const reply = async (replyToken, message) => {
  const opts = {
    uri: 'https://api.line.me/v2/bot/message/reply',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    method: 'POST',
    body: JSON.stringify({
      replyToken,
      messages: [{ type: 'text', text: message }],
    }),
  };
  await request(opts).catch((e) => {
    console.log(`error: ${e.message}`);
    throw e;
  });
};

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  const body = JSON.parse(event.body);
  console.log(JSON.stringify(body));

  // Validate signature.
  if (!validateSignature(event.headers['X-Line-Signature'], event.body)) {
    return response(400, 'Failed signature validation');
  }
  const { replyToken } = body.events[0];

  if (body.events[0].type === 'message') {
    // Reply message for message.
    await reply(replyToken, '返信機能は実装中です...');
  } else if (body.events[0].type === 'beacon') {
    // Message for Beacon.
    const userId = body.events[0].source.userId || '';
    console.log(userId);
    await reply(replyToken, `${userId}さん、小原のBeaconが近くにありますよ!`);
  }

  return response(200, 'Success');
};
