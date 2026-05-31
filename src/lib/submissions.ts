type SubmissionPayload = Record<string, unknown>;

const endpoint = import.meta.env.VITE_SUBMISSION_ENDPOINT?.trim() || '';

export const isRemoteSubmissionEnabled = Boolean(endpoint);

export async function submitToRemote(payload: SubmissionPayload) {
  if (!endpoint) {
    return { ok: false, skipped: true };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      // text/plain avoids CORS preflight for Google Apps Script web apps.
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      source: window.location.hostname,
      userAgent: navigator.userAgent,
      ...payload,
    }),
  });

  if (response.type !== 'opaque' && !response.ok) {
    throw new Error(`Submission endpoint returned ${response.status}`);
  }

  return { ok: true, skipped: false };
}
