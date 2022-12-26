import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import fs from "fs";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const body = req.body;
    var buf = Buffer.from(
      req.body.file.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
      },
    });

    const target = {
      Bucket: "bibbits3",
      Key: Date.now().toString(),
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    try {
      const parellelUploads = new Upload({
        client: s3Client,
        leavePartsOnError: true,
        params: target,
      });

      let _progress = null;

      parellelUploads.on("httpUploadProgress", (progress) => {
        _progress = progress;
      });

      const response = await parellelUploads.done();

      if (response)
        res.status(201).json({ success: "upload success",  data: {
            image: response["Location"],
          },});
      else res.status(500).json({});
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else res.status(404).json({});
};

export default handler;
