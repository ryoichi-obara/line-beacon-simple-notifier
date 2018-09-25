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

const fetchProfile = async userId => request({
  uri: `https://api.line.me/v2/bot/profile/${userId}`,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
  },
});

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  const body = JSON.parse(event.body);
  console.log(JSON.stringify(body));

  // Validate signature.
  if (!validateSignature(event.headers['X-Line-Signature'], event.body)) {
    return response(400, 'Failed signature validation');
  }

  const lineEvent = body.events[0];
  const { replyToken } = lineEvent;

  if (lineEvent.type === 'follow') {
    // Added.
    await reply(replyToken, 'フォローありがとうございます!');
  } else if (lineEvent.type === 'unfollow') {
    // Blocked..
  } else if (lineEvent.type === 'join') {
    // Joined invited talk room.
    await reply(replyToken, 'トークルームに参加しました');
  } else if (lineEvent.type === 'message') {
    // Reply message for message.
    await reply(replyToken, '返信機能は実装中です...');
  } else if (lineEvent.type === 'beacon') {
    // Message for Beacon.
    const userId = lineEvent.source.userId || '';
    const prof = JSON.parse(await fetchProfile(userId));
    const { type } = lineEvent.beacon;
    if (type === 'enter') {
      await reply(replyToken, `${prof.displayName}さん、小原のBeaconが近くにありますよ!`);
    } else if (type === 'leave') {
      await reply(replyToken, `${prof.displayName}さん、小原のBeaconから離れました.`);
    } else {
      console.log(type);
    }
  }

  return response(200, {});
};
