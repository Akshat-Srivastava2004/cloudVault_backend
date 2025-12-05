import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import path from "path";
import crypto from "crypto";

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  }
});

const BUCKET_NAME = "amzn-demo-myfirstbucket";

function generateFileName(originalName) {
  const ext = path.extname(originalName);
  const random = crypto.randomBytes(16).toString("hex");
  return `${random}${ext}`;
}


export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileName = generateFileName(req.file.originalname);

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const fileUrl = `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileName}`;

    return res.json({
      message: "File uploaded successfully",
      fileName,
      fileUrl
    });

  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};


export const listFiles = async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME
    });

    const result = await s3.send(command);

    const files = (result.Contents || []).map((obj) => ({
      name: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified,
      url: `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${obj.Key}`
    }));

    res.json({ files });

  } catch (error) {
    res.status(500).json({ message: "Could not list files", error });
  }
};


export const deleteFile = async (req, res) => {
  try {
    const { key } = req.params;

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });

    await s3.send(command);

    res.json({ message: "File deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};