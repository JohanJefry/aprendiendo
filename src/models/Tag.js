export default (sequelize, { STRING, UUID, UUIDV4 }) => {
  const Tag = sequelize.define('Tag', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: UUID,
      defaultValue: UUIDV4()
    },
    name: {
      type: STRING,
      allowNull: false
    }
  });

  return Tag;
};
