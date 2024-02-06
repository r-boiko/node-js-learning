import { readFile, writeFile } from 'node:fs/promises';

const DB_FILE_PATH = './files/db.json';

export const saveUsers = async (req, res) => {
  const users = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const allUsers = await readFile(DB_FILE_PATH, 'utf-8');
    await writeFile(
      DB_FILE_PATH,
      JSON.stringify([...JSON.parse(allUsers), ...users]),
    );
  } catch (e) {
    await writeFile(DB_FILE_PATH, JSON.stringify(users));
  }

  return res.json({ data: users });
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await readFile(DB_FILE_PATH, 'utf-8');
    return res.json({ data: JSON.parse(allUsers) });
  } catch (e) {
    return res.json({ data: { message: 'Users not found' } });
  }
};
