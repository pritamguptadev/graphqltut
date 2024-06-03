import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

export async function uploader(filePath: string) {
    console.log(filePath, "FilePath");

    cloudinary.config({
        cloud_name: "dayauokco",
        api_key: "728126833127673",
        api_secret: "yp3OlXVmCO7KNaOU88-j9-wMFvY"
    });

    return new Promise((resolve, reject) => {
        // Upload file to Cloudinary
        cloudinary.uploader.upload(filePath, (error: any, result: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
