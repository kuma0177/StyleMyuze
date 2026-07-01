import functions from '@react-native-firebase/functions';
import { nanoid } from 'nanoid/non-secure';

const REGION = 'asia-south1';
const PROJECT_ID = 'myuze-e3c3b';
const BASE = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net`;

export type Feature = 'images' | 'tryOn' | 'reels';

export type ReserveResult = {
  ok: boolean;
  feature: Feature;
  dayKey: string;      
  resetAt: number;     
  allowed: boolean;
  remaining: number;
};

export type Summary = {
  dayKey: string;
  tz: string;
  counts: Record<Feature, number>;
  limits: Record<Feature, number>;
  remaining: Record<Feature, number>;
  resetAt: number;
};

export function prettyEta(msEpoch: number) {
  const ms = Math.max(0, msEpoch - Date.now());
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/** Reserve usage units before performing an action. */
export async function reserveUsage(opts: {
  feature: Feature;
  amount?: number;      // default 1
  tz?: string;          // default "Asia/Kolkata"
  requestId?: string;   // pass to RETRY the SAME attempt idempotently
}): Promise<{ result: ReserveResult; requestId: string }> {
  const requestId = opts.requestId ?? nanoid();
  const callable = functions().httpsCallableFromUrl(`${BASE}/consumeDaily`, { timeout: 60_000 });
  const { data } = await callable({
    requestId,
    feature: opts.feature,
    amount: opts.amount ?? 1,
    tz: opts.tz ?? 'Asia/Kolkata',
  });
  return { result: data as ReserveResult, requestId };
}

/** Refund previously reserved usage (only if your action failed). */
export async function refundUsage(opts: {
  feature: Feature;
  requestId: string;
  amount?: number;
  tz?: string;
}): Promise<void> {
  const callable = functions().httpsCallableFromUrl(`${BASE}/refundDaily`, { timeout: 30_000 });
  await callable({
    requestId: opts.requestId,
    feature: opts.feature,
    amount: opts.amount ?? 1,
    tz: opts.tz ?? 'Asia/Kolkata',
  });
}

/** Get today’s usage/limits/remaining for UI. */
export async function getUsageSummary(tz = 'Asia/Kolkata'): Promise<Summary> {
  const callable = functions().httpsCallableFromUrl(`${BASE}/getUsageSummary`, { timeout: 20_000 });
  const { data } = await callable({ tz });
  return data as Summary;
}

/** Map Firebase HttpsError codes to user-friendly messages. */
export function humanizeError(e: any) {
  const code = e?.code as string | undefined;
  if (code === 'functions/resource-exhausted') return 'Daily limit reached.';
  if (code === 'functions/unauthenticated') return 'Please sign in.';
  if (code === 'functions/failed-precondition') return 'App verification failed.';
  if (code?.startsWith('functions/invalid-argument')) return 'Bad request.';
  return e?.message || 'Something went wrong.';
}
