import AWS from 'aws-sdk';
import axios from 'axios';
import { Readable } from 'stream';

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadImageToS3(
  imageUrl: string,
  bucketName: string,
  key: string,
): Promise<string> {
  try {
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
    });

    const stream = Readable.from(response.data);

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: stream,
      ContentType: 'image/jpeg', // Adjust based on actual image type
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw error;
  }
}
