export type HookPullPayload = {
  id: string;
  progress: number;
  intensity?: number;
};

export const HOOK_PULL_EVENT = "hook:pull-progress";

export function emitHookPull(payload: HookPullPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<HookPullPayload>(HOOK_PULL_EVENT, { detail: payload }));
}
