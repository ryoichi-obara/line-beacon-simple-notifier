// Developer environment
require('dotenv').config();

// main parameters for Lambda.
const eventRepeatIntent = {
  resource: '/',
  path: '/',
  httpMethod: 'POST',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json;charset=UTF-8',
    Host: '0v0jholqn2.execute-api.ap-northeast-1.amazonaws.com',
    'User-Agent': 'LineBotWebhook/1.0',
    'X-Amzn-Trace-Id': 'Root=1-5b9a46eb-d92b19011379dac55687d852',
    'X-Forwarded-For': '203.104.146.154',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
    'X-Line-Signature': 'z1c1/U1tgQa3wCVXUcQTk3gpbWc3Fy0Zwg+BkGSt6Xk=',
  },
  multiValueHeaders: {
    Accept: [
      '*/*',
    ],
    'Content-Type': [
      'application/json;charset=UTF-8',
    ],
    Host: [
      '0v0jholqn2.execute-api.ap-northeast-1.amazonaws.com',
    ],
    'User-Agent': [
      'LineBotWebhook/1.0',
    ],
    'X-Amzn-Trace-Id': [
      'Root=1-5b9a46eb-d92b19011379dac55687d852',
    ],
    'X-Forwarded-For': [
      '203.104.146.154',
    ],
    'X-Forwarded-Port': [
      '443',
    ],
    'X-Forwarded-Proto': [
      'https',
    ],
    'X-Line-Signature': [
      'z1c1/U1tgQa3wCVXUcQTk3gpbWc3Fy0Zwg+BkGSt6Xk=',
    ],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: 'jfagoolcnk',
    resourcePath: '/',
    httpMethod: 'POST',
    extendedRequestId: 'NKAEvFAitjMFTYg=',
    requestTime: '13/Sep/2018:11:15:55 +0000',
    path: '/v1',
    accountId: '048895066302',
    protocol: 'HTTP/1.1',
    stage: 'v1',
    requestTimeEpoch: 1536837355155,
    requestId: '61d20ef6-b746-11e8-818a-993cb7eeb536',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '203.104.146.154',
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'LineBotWebhook/1.0',
      user: null,
    },
    apiId: '0v0jholqn2',
  },
  body: '{"events":[{"type":"message","replyToken":"********************************","source":{"userId":"*********************************","type":"user"},"timestamp":1536837355105,"message":{"type":"text","id":"*************","text":"てす"}}]}',
  isBase64Encoded: false,
};

const event = eventRepeatIntent;
const context = {};

// const lambda = require('./build/index');
const lambda = require('./src/index');

// Execute.
console.time('execute lambda.handler');
lambda.handler(event, context)
  .then((data) => {
    console.log('Process complete successfully. Returned value is below.');
    console.log(data);
    console.timeEnd('execute lambda.handler');
  })
  .catch((e) => {
    console.error(e);
    console.timeEnd('execute lambda.handler');
  });
