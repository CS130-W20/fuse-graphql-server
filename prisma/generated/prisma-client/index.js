"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Event",
    embedded: false
  },
  {
    name: "EventStatus",
    embedded: false
  },
  {
    name: "Friendship",
    embedded: false
  },
  {
    name: "FriendStatus",
    embedded: false
  },
  {
    name: "Notification",
    embedded: false
  },
  {
    name: "NotificationStatus",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://fuse-server-50668288f2.herokuapp.com`,
  secret: `prisma-4uz3-secret`
});
exports.prisma = new exports.Prisma();
