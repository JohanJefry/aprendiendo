import Sequelize from 'sequelize-mock';
import { isFunction } from '../../utils/is';
import User from '../User';

const sequelize = new Sequelize();
const DataType = sequelize.Sequelize;// creamos los mismo types de Post (UUID, BOOLEAn)
const model = User(sequelize, DataType);
const schema = model._defaults;// contiene el schema real

describe('#User', () => {
  it('should have correct model name', () => {
    expect(model.name).toBe('User');
  });

  it('should match the schema', () => {
    expect(schema).toEqueal({
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4()
      },
      username: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The user just accepts alphanumeric characters'
          },
          len: {
            args: [4, 20],
            msg: 'the username must be from 4 to 20 characters'
          }
        }
      },
      password: {
        type: DataType.STRING,
        allowNull: false
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email'
          }
        }
      },
      privilege: {
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'user'
      },
      active: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  });

  it('should have beforeCreate hook', () => {
    expect(isFunction(model.optios.hooks.beforeCreate)).toBe(true);
  });

  it('should have associate method', () => {
    expect(isFunction(model.associate)).toBe(true);
  });
});
