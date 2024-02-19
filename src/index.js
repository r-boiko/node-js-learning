import 'dotenv/config';
import { app } from './server.js';
import { generateHash } from './utils.js';

console.log(generateHash(5));
console.log(generateHash(30));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
