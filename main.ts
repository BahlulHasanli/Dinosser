import { FOLDER, isFolders, Run } from './core.ts';

if (isFolders()) {
  for await (const { name } of Deno.readDir(
    `${FOLDER.CURRENT}\\${FOLDER.MAIN_FOLDER}\\${FOLDER.FROM_DIR}`
  )) {
    const extension = name.split('.')[1]?.toLocaleLowerCase();
    const fileSize: number = Deno.statSync(
      `${FOLDER.CURRENT}\\${FOLDER.MAIN_FOLDER}\\${FOLDER.FROM_DIR}\\${name}`
    )?.size;

    let validExtention: 'jpeg' | 'png' | 'webp' = 'jpeg';

    if (extension === 'jpeg' || extension === 'jpg') {
      validExtention = 'jpeg';
    } else if (extension === 'png') {
      validExtention = 'png';
    } else if (extension === 'webp') {
      validExtention = 'webp';
    }

    Run({
      name,
      fileSize,
      extention: validExtention,
    });
  }
}
