'use strict';

import * as Sequelize from 'sequelize';
import { database } from '../../../../utils';

/**
 * Model for the Chats
 */


 export class Chats extends Sequelize.Model { }

// define the attributes
Chats.init({
    "id": { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true,primaryKey: true },
    "sender": { type: Sequelize.STRING},
    "recipient": { type: Sequelize.STRING },
    "message": { type: Sequelize.STRING },
    "read_status": { type: Sequelize.BOOLEAN, defaultValue: false  }, 
    "created_at": { type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),allowNull: false},
    "updated_at":{ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),allowNull: false}
}, {
    "sequelize": database,
    "freezeTableName": true,
    "modelName": "Chats",
    "underscored": true,
    "timestamps": true
});
//Chats.sync({ alter: true });
