import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

export async function uploader(filePath:any) {
   
    cloudinary.config({ 
        cloud_name: "dayauokco", 
        api_key: "728126833127673", 
        api_secret: "yp3OlXVmCO7KNaOU88-j9-wMFvY" // Click 'View Credentials' below to copy your API secret
    });
  return new Promise((resolve, reject) => {
    // Read file from disk
    fs.readFile(filePath, (error:any, data:any) => {
      if (error) {
        reject(error);
      } else {
        // Upload file to Cloudinary
        cloudinary.uploader.upload(data, (error:any, result:any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
    }
    });
  });
}