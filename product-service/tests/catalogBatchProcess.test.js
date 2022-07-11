import { SNS, Lambda as LambdaMock } from 'aws-sdk';
import { catalogBatchProcess, makeNotification } from '../catalogBatchProcess';

jest.mock('aws-sdk', () => {
  const mSNS = {
    publish: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  const mLambda = { invoke: jest.fn() };
  return {
    SNS: jest.fn(() => mSNS),
    Lambda: jest.fn(() => mLambda)
  };
});

describe('catalogBatchProcess function', () => {
  let sns;
  beforeEach(() => {
    sns = new SNS();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing of SNS', async () => {
    const THIS_TOPIC_ARN = process.env.SNS_ARN
    process.env.SNS_ARN = 'TEST-SNS-TOPIC';

    const mockedResponseData = {
      Success: 'OK',
    };
    sns.publish().promise.mockResolvedValueOnce(mockedResponseData);
    const mEvent = 'test message';
    await makeNotification(mEvent);

    expect(sns.publish).toBeCalledWith({
      Message: 'test message',
      MessageAttributes: {
        image:
        {
          DataType: "String",
          StringValue: 'false'
        }
      },
      Subject: "Product has been published",
      TopicArn: 'TEST-SNS-TOPIC'
    });
    expect(sns.publish().promise).toBeCalledTimes(1);

    process.env.SNS_ARN = THIS_TOPIC_ARN
  })
  it('should invoke lambda', () => {
    const mLambda = new LambdaMock();
    const mResult = {};
    (mLambda.invoke).mockImplementationOnce((params, callback) => {
      callback(null, mResult);
    });
    catalogBatchProcess({ Records: [{}] });
    expect(LambdaMock).toBeCalledWith({ region: 'eu-west-1', endpoint: undefined });
    expect(mLambda.invoke).toBeCalledWith(
      {
        FunctionName: 'product-service-dev-postProduct',
        Payload: JSON.stringify({}),
      },
      expect.any(Function),
    );
  })
});
