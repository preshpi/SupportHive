import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 5000,
      open: true,
      origin: "http://127.0.0.1:5000",
    },
    preview: {
      host: "0.0.0.0",
      port: 3333,
    },
  };
});
