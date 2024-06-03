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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../DB/lib/db");
const imageuploader_1 = require("./imageuploader");
class UserServices {
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, imageUrl } = payload;
            let hashed = yield UserServices.createHashedPassword(password);
            let data = yield (0, imageuploader_1.uploader)("/Users/pritam/desktop/download.jpeg");
            //    console.log(data,"kjhgfdsytrebvcgfd");
            return db_1.prismaClient.userData.create({
                data: {
                    firstName,
                    email,
                    lastName: lastName ? lastName : "",
                    password: hashed,
                    profileImage: data === null || data === void 0 ? void 0 : data.secure_url
                }
            });
        });
    }
    static genrateUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            let data = yield UserServices.getUser(email);
            if (!data) {
                throw new Error("user does not exist");
            }
            let passRes = yield UserServices.compareHashedPass(password, data.password);
            //    console.log("service data",data,passRes);
            if (!passRes) {
                throw new Error("cred invalid");
            }
            let res = yield UserServices.genrateJWTToken(data.id, data.email);
            return res;
        });
    }
    static createHashedPassword(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            let hashed = yield bcryptjs_1.default.hash(pass, 8);
            return hashed;
        });
    }
    static getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield db_1.prismaClient.userData.findUnique({ where: { email } });
            return data;
        });
    }
    static compareHashedPass(pass, hased) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(pass, hased);
        });
    }
    static genrateJWTToken(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.sign({ id, email }, UserServices.jwtSecrt);
        });
    }
    static decodeToken(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield jsonwebtoken_1.default.verify(pass, UserServices.jwtSecrt);
            return res;
        });
    }
    static followUser(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield db_1.prismaClient.follows.create({ data: {
                    follower: { connect: { id: from } },
                    following: { connect: { id: to } },
                } });
            return res;
        });
    }
    static unfollowUser(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield db_1.prismaClient.follows.delete({ where: {
                    followerId_followingId: { followerId: from, followingId: to }
                } });
            return res;
        });
    }
}
exports.UserServices = UserServices;
UserServices.jwtSecrt = "kddlkfdf";
