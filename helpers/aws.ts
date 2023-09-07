import AWS from "aws-sdk";
import { getRandomFileName } from ".";

export const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET!;
export const REGION = process.env.NEXT_PUBLIC_AWS_REGION!;

const AWS_KEYS = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_CLIENT_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
};

AWS.config.update(AWS_KEYS);

export const S3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const simpleUpload = async (
  file: any,
  fileName: string,
  setProgress?: (progress: number) => void
): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: file,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    S3.upload(params)
      .on("httpUploadProgress", (progress) => {
        setProgress?.(progress.loaded / progress.total);
      })
      .send(
        (
          err: any,
          data:
            | AWS.S3.ManagedUpload.SendData
            | PromiseLike<AWS.S3.ManagedUpload.SendData>
        ) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
  });
};

export const deleteFile = async (
  fileUrl: string
): Promise<AWS.S3.DeleteObjectOutput> => {
  const fileName = fileUrl
    .split("arcadiaweb-brooke.s3.eu-west-3.amazonaws.com/")
    .pop();
  const params: AWS.S3.DeleteObjectRequest = {
    Bucket: S3_BUCKET,
    Key: fileName!,
  };

  return new Promise((resolve, reject) => {
    S3.deleteObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const isS3File = (url: string | undefined): boolean => {
  return !!url && url.includes("arcadiaweb-brooke.s3.eu-west-3.amazonaws.com");
};

export const getAwsUploadParams = (file: any): AWS.S3.PutObjectRequest => {
  return {
    ACL: "public-read",
    Body: file,
    Bucket: S3_BUCKET,
    Key: getRandomFileName(file.name),
  };
};

export const AWS_UPLOAD_BASE_URL = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.amazonaws.com/`;
