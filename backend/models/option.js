const Sequelize = require('sequelize');

module.exports = class Option extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        snsId: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        ATPT_OFCDC_SC_CODE: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: false,
        },
        SD_SCHUL_CODE: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: false,
        },
        SCHUL_NM: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: false,
        },
        ORG_RDNMA: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        },
        SCHUL_KND_SC_NM: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: false,
        },
        grade: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        class: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Option',
        tableName: 'options',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {}
};
