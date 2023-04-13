// Import the Employee model
const Employee = require('./Employee');

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmergencyContact extends Model {
    static associate(models) {
      EmergencyContact.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        onDelete: 'CASCADE',
      });
    }
  }

  EmergencyContact.init(
    {
      primary_contact_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      primary_contact_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      primary_contact_relationship: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondary_contact_name: {
        type: DataTypes.STRING,
      },
      secondary_contact_phone: {
        type: DataTypes.STRING,
      },
      secondary_contact_relationship: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'EmergencyContact',
      timestamps: false, // set timestamps to false
    }
  );

  return EmergencyContact;
};
