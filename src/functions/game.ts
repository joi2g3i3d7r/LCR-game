import { SQSEvent, SQSHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { GameCounter } from '../game/game-counter.class';
import { Game } from '../game/game.class';
import { InputParameters } from '../game/inputParameters';

const sqs = new AWS.SQS();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const queueURL = process.env.MY_QUEUE_URL || '';

export const handler: SQSHandler = async (event: SQSEvent) => {
  event.Records.forEach(async record => {
    try {
      const { playersLegth, dicesDirections } = JSON.parse(record.body);
      const gameCounter = new GameCounter();
      const inputArguments = new InputParameters(playersLegth, dicesDirections);
      const game = new Game(inputArguments, gameCounter);

      const gameResult = game.start();

      const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'GameResultTable',
        Item: {
          id: uuid(),
          gameResult,
        },
      };

      const saved = await dynamodb.put(params).promise();

      console.log('saved', saved);
    } catch (error) {
      console.log('An error occurred', error);
    }

    await sqs.deleteMessage({ QueueUrl: queueURL, ReceiptHandle: record.receiptHandle }).promise();
  });
};
