import multer from "multer";

const storage = multer.memoryStorage(); // stores file in RAM before uploading to S3

export const upload = multer({ storage });