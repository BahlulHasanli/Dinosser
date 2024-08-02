import { FOLDER, isFolders, Run } from './core.ts';

if (isFolders()) {
  for await (const { name } of Deno.readDir(
    `${FOLDER.CURRENT}\\${FOLDER.MAIN_FOLDER}\\${FOLDER.FROM_DIR}`
  )) {
    const mimeType = name.split('.')[1];
    const fileSize: number = Deno.statSync(
      `${FOLDER.CURRENT}\\${FOLDER.MAIN_FOLDER}\\${FOLDER.FROM_DIR}\\${name}`
    )?.size;

    switch (mimeType) {
      case 'jpeg':
      case 'jpg':
        Run({
          name,
          fileSize,
          mimeType: 'jpeg',
        });
        break;
      case 'png':
        Run({
          name,
          fileSize,
          mimeType,
        });
        break;
      case 'webp':
        Run({
          name,
          fileSize,
          mimeType,
        });
        break;
    }
  }
}
