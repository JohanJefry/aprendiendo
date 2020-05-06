import Sequelize from 'sequelize-mock';
import { isFunction } from '../../utils/is';
import Post from '../Post';

const sequelize = new Sequelize();
const DataType = sequelize.Sequelize;// creamos los mismo types de Post (UUID, BOOLEAn)
const model = Post(sequelize, DataType);
const schema = model._defaults;// contiene el schema real

describe('#post', () => {
  it('should have correct model name', () => {
    expect(model.name).toBe('Post'); // verifica que el name sea Post
  });

  it('should match the schema', () => {
    expect(schema).toEqual({
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4()
      },
      title: {
        type: DataType.STRING,
        allowNull: false
      },
      slug: {
        type: DataType.STRING,
        unique: true,
        allowNull: false
      },
      readingTime: {
        type: DataType.STRING,
        allowNull: false,
        defaultValue: '3 min'
      },
      content: {
        type: DataType.TEXT,
        allowNull: false
      },
      language: {
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'es'
      },
      image: {
        type: DataType.STRING
      },
      published: {
        type: DataType.BOOLEAN,
        defaultValue: false
      }
    });
  });

  it('should have associate method', () => {
    expect(isFunction(model.associate)).toBe(true);
  });
});
