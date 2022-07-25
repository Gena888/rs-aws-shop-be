import AWS from "aws-sdk";
import csv from "csv-parser";

const BUCKET = "my-import-service-gena888";

export const importFileParser = async (event) => {
  const s3 = new AWS.S3({ region: "eu-west-1", signatureVersion: 'v4' });
  for (const record of event.Records) {
    const key = record.s3.object.key;
    const bucketName = record.s3.bucket.name;

    const bucket = s3.getObject({
      Bucket: BUCKET,
      Key: key,
    });

    const handleParseAndUpdate = async () => {
      console.log(key + " Parsed");
      await s3
        .copyObject({
          Bucket: bucketName,
          Key: key.replace("uploaded", "parsed"),
          CopySource: bucketName + "/" + key,
        })
        .promise();
      await s3
        .deleteObject({
          Bucket: bucketName,
          Key: key,
        })
        .promise();
      console.log(key + " mooved from uploaded to parsed");
    };

    await new Promise(() => {
      bucket
        .createReadStream()
        .pipe(csv())
        .on("data", (item) => {
          console.log(item);
        })
        .on("end", handleParseAndUpdate);
    });
  }
  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ContentType": "text/csv",
    }
  };
};