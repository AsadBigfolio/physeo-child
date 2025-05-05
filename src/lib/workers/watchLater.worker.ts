import { Worker } from "bullmq";

import WatchLater from '../../models/WatchLater';
import { redis } from '../redis';

export const watchLaterWorker = new Worker(
    "watchLater",
    async (job) => {
        try {
            await WatchLater.create(job.data);
            console.log(`✅ Created WatchLater entry for user: ${job.data.userId}`);
        } catch (error) {
            console.error("Worker error:", error);
            throw error;
        }
    },
    { connection: redis }
);

watchLaterWorker.on("failed", (job, err) => {
    console.error(`Job failed [ID: ${job?.id}]:`, err.message);
});
