import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

// new segment to connect to Render's PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is important for connecting to Render's PostgreSQL
    },
  },
});


// previous local hose section

// const sequelize = process.env.DB_URL
//   ? new Sequelize(process.env.DB_URL)
//   : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'postgres',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { sequelize, User, Ticket };
