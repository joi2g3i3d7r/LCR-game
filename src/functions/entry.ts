import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';

const sqs = new AWS.SQS();
const queueURL = process.env.MY_QUEUE_URL || '';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!queueURL) {
      throw new Error(`queue URL doesn't provided`);
    }

    const result = await sqs
      .sendMessage({
        MessageBody: JSON.stringify(event.queryStringParameters || { playersLegth: '0', dicesDirections: '' }),
        QueueUrl: queueURL,
      })
      .promise();

    const response = {
      statusCode: 200,
      body: `Mensaje enviado: ${JSON.stringify(event.queryStringParameters || {})}`,
    };

    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: `An error occured ${err}`,
    };
  }
};
