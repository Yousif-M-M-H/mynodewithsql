module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define("todos", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.TEXT
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Todos;
}
