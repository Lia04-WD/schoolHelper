const Sequelize = require('sequelize');

module.exports = class Login extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: false,
        },

        nickName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },

        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },

        snsId: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Login',
        tableName: 'socialLogin',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {}
};
