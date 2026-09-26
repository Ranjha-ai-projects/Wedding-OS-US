import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

function syncAssetsPlugin(): Plugin {
  const syncDir = (src: string, dest: string) => {
    try {
      if (!fs.existsSync(src)) return;
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      for (const file of fs.readdirSync(src)) {
        if (file.startsWith('.') || file.endsWith('.md')) continue;
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);
        if (fs.existsSync(srcFile) && fs.statSync(srcFile).isFile()) {
          if (!fs.existsSync(destFile) || fs.statSync(srcFile).size !== fs.statSync(destFile).size) {
            fs.copyFileSync(srcFile, destFile);
          }
        }
      }
    } catch (err) {
      // Non-blocking sync
      console.warn('Sync assets warning:', err);
    }
  };

  const doSync = () => {
    const rootDir = process.cwd();
    // Sync songs & gallery in both public/assets and src/assets so wherever user places files, it works
    syncDir(path.resolve(rootDir, 'public/assets/songs'), path.resolve(rootDir, 'src/assets/songs'));
    syncDir(path.resolve(rootDir, 'src/assets/songs'), path.resolve(rootDir, 'public/assets/songs'));
    syncDir(path.resolve(rootDir, 'public/assets/gallery'), path.resolve(rootDir, 'src/assets/gallery'));
    syncDir(path.resolve(rootDir, 'src/assets/gallery'), path.resolve(rootDir, 'public/assets/gallery'));
  };

  return {
    name: 'sync-assets-plugin',
    buildStart() {
      doSync();
    },
    configureServer(server) {
      doSync();
      server.watcher.on('add', (filePath) => {
        if (filePath.includes('assets') && (filePath.includes('songs') || filePath.includes('gallery'))) {
          doSync();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), syncAssetsPlugin()],
})
