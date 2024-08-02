import sharp from 'npm:sharp';

console.log('%cCompressing started!', 'background-color: blue');

function Run(name: string, mimeType: 'jpeg' | 'png' | 'webp') {
  sharp(`${Deno.env.get('FROM_DIR')}${name}`)
    [mimeType]({
      quality: Number(Deno.env.get('QUALITY')),
    })
    .toFile(`${Deno.env.get('TO_DIR')}${name}`, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
}

export default Run;
