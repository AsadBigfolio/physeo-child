import { Queue } from "bullmq";
import { redis } from "../redis";

export const watchLaterQueue = new Queue("watchLater", {
    connection: redis,
});
