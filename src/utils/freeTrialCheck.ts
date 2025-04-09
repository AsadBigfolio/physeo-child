
const TRIAL_PERIOD_DAYS = 20;
export function isTrialActive(createdAt: string | Date): boolean {
    const trialStart = new Date(createdAt);
    const now = new Date();

    const diffInMs = now.getTime() - trialStart.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays < TRIAL_PERIOD_DAYS;
}
