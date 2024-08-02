import Run from './sharp.ts';

for await (const row of Deno.readDir(String(Deno.env.get('FROM_DIR')))) {
  const mimeType = row?.name.split('.')[1];

  switch (mimeType) {
    case 'jpeg':
    case 'jpg':
      Run(row.name, 'jpeg');
      break;
    case 'png':
      Run(row.name, 'png');
      break;
    case 'webp':
      Run(row.name, 'webp');
      break;
  }
}
