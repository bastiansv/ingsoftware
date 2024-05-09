import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Solicitudes extends Sequelize.Model {}

Solicitudes.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_ejecutivo: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    userRut: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: Sequelize.DataTypes.DECIMAL(10, 2), // Decimal para manejar montos
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    interestRate: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
    },
    ufValueAtCreation: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default Solicitudes;