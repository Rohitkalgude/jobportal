import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env,
//   },
// });
