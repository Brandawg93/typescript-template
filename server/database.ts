import { Sequelize, Model, DataTypes } from 'sequelize';

// Define the model for storing server access time
class ServerAccess extends Model {
  public id!: number;
  public lastAccessed!: Date;
}

// Initialize Sequelize with your database connection details
const sequelize = new Sequelize('sqlite::memory:');

// Define the ServerAccess model schema
ServerAccess.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastAccessed: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ServerAccess',
  },
);

// Sync the model with the database
sequelize.sync();

// Function to update the last accessed time
export async function updateLastAccessed(): Promise<void> {
  const serverAccess = await ServerAccess.findOne();
  if (serverAccess) {
    serverAccess.lastAccessed = new Date();
    await serverAccess.save();
  } else {
    await ServerAccess.create({ lastAccessed: new Date() });
  }
}

// Function to get the last accessed time
export async function getLastAccessed(): Promise<Date | null> {
  const serverAccess = await ServerAccess.findOne();
  return serverAccess ? serverAccess.lastAccessed : null;
}
