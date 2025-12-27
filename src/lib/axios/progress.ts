import { AxiosProgressEvent } from 'axios';

export type Progress = {
  loaded: number;
  total?: number;
  percent?: number;
};

export function toProgress(e: AxiosProgressEvent): Progress {
  const loaded = e.loaded ?? 0;
  const total = e.total ?? undefined;
  const percent = total && total > 0 ? Math.round((loaded / total) * 100) : undefined;
  return { loaded, total, percent };
}
