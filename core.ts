import { ensureDirSync, existsSync } from 'fsLib';
import sharp from 'npm:sharp';

export const FOLDER: {
  CURRENT: string;
  MAIN_FOLDER: string;
  FROM_DIR: string;
  TO_DIR: string;
} = {
  CURRENT: String(Deno.cwd()),
  MAIN_FOLDER: String(Deno.env.get('MAIN_FOLDER')),
  FROM_DIR: String(Deno.env.get('FROM_DIR')),
  TO_DIR: String(Deno.env.get('TO_DIR')),
};

export function Run({
  name,
  fileSize,
  extention,
}: {
  name: string;
  fileSize: number;
  extention: 'jpeg' | 'png' | 'webp';
}) {
  sharp(`${FOLDER.CURRENT}\\${FOLDER.MAIN_FOLDER}\\${FOLDER.FROM_DIR}\\${name}`)
    [extention]({
      quality: Number(Deno.env.get('QUALITY')),
    })
    .toFile(
      `${FOLDER.CURRENT}\\${FOLDER.MAIN_FOLDER}\\${FOLDER.TO_DIR}\\${name}`,
      (err, info) => {
        if (err) {
          console.error(err);
        } else {
          // File details
          console.log('%c=====================', 'color: white');
          console.log(`%cFile name: ${name}`, 'background-color: green');
          console.log(
            `%cOld size: ${formatFileSize(fileSize)}`,
            'background-color: darkorange'
          );
          console.log(
            `%cNew size: ${formatFileSize(info.size)}`,
            'background-color: darkgreen'
          );
          console.log('%c=====================', 'color: white');
        }
      }
    );
}

export function isFolders() {
  if (!existsSync(FOLDER.MAIN_FOLDER)) {
    // Create folders
    ensureDirSync(
      `${FOLDER.CURRENT}\\${FOLDER.MAIN_FOLDER}\\${FOLDER.FROM_DIR}`
    );
    ensureDirSync(`${FOLDER.CURRENT}\\${FOLDER.MAIN_FOLDER}\\${FOLDER.TO_DIR}`);
  }

  return true;
}

export function formatFileSize(bytes: number): string {
  const units: Array<string> = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size: number = bytes;
  let unitIndex: number = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
