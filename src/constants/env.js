"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_EVENT = void 0;
var fs_1 = __importDefault(require("fs"));
var GITHUB_EVENT = JSON.parse(
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
fs_1.default.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
exports.GITHUB_EVENT = GITHUB_EVENT;
