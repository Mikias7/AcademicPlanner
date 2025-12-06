// src/custom.d.ts
declare global {
  interface Window {
    process: {
      env: {
        PUBLIC_URL: string;
        [key: string]: string | undefined;
      };
    };
  }
}

export {};
