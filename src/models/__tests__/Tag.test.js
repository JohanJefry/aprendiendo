import Sequelize from 'sequelize-mock';
import Tag from '../Tag';

const sequelize = new Sequelize();
const DataType = sequelize.Sequelize;// creamos los mismo types de Post (UUID, BOOLEAn)
const model = Tag(sequelize, DataType);
const schema = model._defaults;// contiene el schema real

describe('#Tag', () => {
  it('should have correct model name', () => {
    expect(model.name).toBe('Tag');
  });

  it('should match the schema', () => {
    expect(schema).toEqual({
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4()
      },
      name: {
        type: DataType.STRING,
        allowNull: false
      }
    });
  });
});
