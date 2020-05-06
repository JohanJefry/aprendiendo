// Dependencias
import Sequelize from 'sequelize';

// configuration
import { $db } from '../../config';

// db COnnection
const { database, username, password, dialect, port } = $db();

const sequelize = new Sequelize(database, username, password, { // coneccion postgresql
  dialect,
  port,
  define: {
    underscored: true // createdAt en kamecase
  }

});

// console.log(sequelize);

// Models
const models = {
  Post: sequelize.import('./Post'),
  Tag: sequelize.import('./Tag'),
  User: sequelize.import('./User')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

export default models;
