"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const cloudinary_1 = require("cloudinary");
function uploader(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(filePath, "FilePath");
        cloudinary_1.v2.config({
            cloud_name: "dayauokco",
            api_key: "728126833127673",
            api_secret: "yp3OlXVmCO7KNaOU88-j9-wMFvY"
        });
        return new Promise((resolve, reject) => {
            // Upload file to Cloudinary
            cloudinary_1.v2.uploader.upload(filePath, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    });
}
exports.uploader = uploader;
