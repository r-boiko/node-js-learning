import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import axios from 'axios';

const processImage = async ({ imgUrl, pathToDir }) => {
  try {
    const { data } = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    await writeFile(`${pathToDir}${path.basename(imgUrl)}`, data);

    return { message: 'Image saved' };
  } catch (e) {
    return { message: 'Please, check imgUrl', e };
  }
};

processImage({
  imgUrl: 'https://cdn2.thecatapi.com/images/9m4.jpg',
  pathToDir: './',
})
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
