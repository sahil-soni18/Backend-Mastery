import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import sequelize from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const db = {};

const importModel = async (file) => {
const module = await import(new URL(`file://${path.join(__dirname, file)}`).href);
  const model = module.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
};

const loadModels = async () => {
  const files = fs.readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    });

  await Promise.all(files.map(file => importModel(file)));

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

await loadModels();

export default db;