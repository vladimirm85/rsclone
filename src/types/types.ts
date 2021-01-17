export type DrawType = {
  draw: (ctx: any, frameCount: number) => void;
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    verificationKey?: string;
  }
}
