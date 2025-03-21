import AWS from "aws-sdk";
import { toast } from "react-toastify";

const accessKeyId = process.env.REACT_APP_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_SECRET_KEY;
const region = process.env.REACT_APP_REGION;
const bucketName = process.env.REACT_APP_S3_BUCKET; 

AWS.config.update({
    accessKeyId,
    secretAccessKey,
  });

export const handleImageChange = async (e, setImageURL, selectedImage) => {
    const file = e.target.files[0];
  
    if (!file) {
      setImageURL(null);
      return;
    }
  
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/tiff",
      "image/bmp",
      "image/svg+xml",
      "application/pdf", // PDF support
      "application/msword", // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      "application/vnd.ms-excel", // XLS
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
      "text/plain", // TXT
    ];
  
    if (!validImageTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image.");
      setImageURL(null);
      return;
    }
  
    const customerID = "66925640c4a9c61a716cc8fd_Products";
  
    try {
      selectedImage(URL.createObjectURL(file));
      const fileName = file.name.split("/").pop();
      const key = `${customerID}/${fileName}`;
  
      const s3 = new AWS.S3({
        accessKeyId,
        secretAccessKey,
        region,
      });
  
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
      };
  
      const result = await s3.upload(params).promise();
      console.log("Image Uploaded Successfully", result.key);
      setImageURL(result.key)
    } catch (error) {
          console.error("Error uploading file:", error);
          toast.error("Failed to upload image. Please try again.");
          throw error;
        }
    }
  