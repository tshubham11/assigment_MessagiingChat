'use strict';

import * as Sequelize from 'sequelize';
import { database } from '../../../../utils';

/**
 * Model for the Users
 */


 export class Users extends Sequelize.Model { }

// define the attributes
Users.init({
    "id": { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true },
    "user_name": { type: Sequelize.STRING,primaryKey: true },
    "password": { type: Sequelize.STRING},
    "status": { type: Sequelize.BOOLEAN, defaultValue: true  },
    "session_status": { type: Sequelize.BOOLEAN, defaultValue: false  }, 
    "created_at": { type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),allowNull: false},
    "updated_at":{ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),allowNull: false}
}, {
    "sequelize": database,
    "freezeTableName": true,
    "modelName": "Users",
    "underscored": true,
    "timestamps": true
});
//Users.sync({ alter: true });
