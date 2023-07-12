import { CONSTANT, MESSAGES } from "../../../constants";
import { bajajApiHandler, cryptoHandler, DatabaseDao} from "../../../utils";
import { Users } from "./model/user.model";
import { Chats } from "./model/chats.model";
const bajajApi = new bajajApiHandler();
const moment = require('moment');
const crypto = new cryptoHandler();
import { redisCli } from "../../../lib/redisClient";
const { Op } = require('sequelize')
import * as CONFIG from '../../../constants';
import * as tokenManager from '../../../lib/tokenManager';

let createuser = async function (payload) {
    try {
        let {user_name,password} = payload;
        // find user in table 
        let finduser = await DatabaseDao.findOne(Users, {
            where: { user_name: user_name }
        });

        if(!finduser){

            const userData = {
                user_name : user_name,
                password: password   
            };
    
            await DatabaseDao.create(Users,userData);
            
        } else {   //if use found return error user exists
            return { ...MESSAGES.SUCCESS.USER_EXIST}
        }

        return { ...MESSAGES.SUCCESS.RIGHT}

    } catch (error) {
        console.log("error in create user api", error, "CreateUSer")
        throw error;
    }
}

let loginuser = async function (payload) {
    try {
        let {user_name} = payload;
        // store value in redis to check for session or we can de with JWT token also
        await redisCli.storeValue( `${user_name}`, true);
        //await redisCli.expireKey(`${user_name}`, 3600);

        return { ...MESSAGES.SUCCESS.RIGHT}

    } catch (error) {
        console.log("error in login user api", error, "login")
        throw error;
    }
}

let logoutuser = async function (payload) {
    try {
        let {user_name} = payload;

        await redisCli.deleteKey(`${user_name}`);

        return { ...MESSAGES.SUCCESS.RIGHT}

    } catch (error) {
        console.log("error in logout user api", error, "logout")
        throw error;
    }
}

let getusers = async function () {
    try {

        let finduser = await DatabaseDao.find(Users,{
            attributes: ['user_name']
        });

        if(!finduser){

            return { ...MESSAGES.SUCCESS.NOUSER_EXIST}
            
        } else {
            return { ...MESSAGES.SUCCESS.RIGHT, data : {finduser}}
        }
    } catch (error) {
        console.log("error in get user api", error, "getUsers")
        throw error;
    }
}

let sendmessage = async function (payload) {
    try {
        let {sender,recipient,message} = payload;

        let sessionstatus = await redisCli.getValue(`${sender}`);
        if(!sessionstatus) { return { ...MESSAGES.SUCCESS.SESSION_EXPIRE} };

        const chatData = {
            sender : sender,
            recipient: recipient,
            message: message
        };

        await DatabaseDao.create(Chats,chatData);

        return { ...MESSAGES.SUCCESS.RIGHT}

    } catch (error) {
        console.log("error in create user api", error, "CreateUSer")
        throw error;
    }
}

let chathistoryforuser = async function (payload) {
    try {
        let {user_name,from_username} = payload;

        let sessionstatus = await redisCli.getValue(`${user_name}`);
        if(!sessionstatus) { return { ...MESSAGES.SUCCESS.SESSION_EXPIRE} };

        let chathistory = await DatabaseDao.find(Chats, {
            attributes: ['sender','recipient','message','created_at'],
            where: { [Op.or]: [{ sender: from_username,recipient: user_name  }, { sender: user_name,recipient: from_username  }] },
            //order: [ ['created_at','ASEC'] ]
        });

        const criteria = { where: { [Op.or]: [{ sender: from_username,recipient: user_name  }, { sender: user_name,recipient: from_username  }] }};
        const update = {read_status: true};
        
        await DatabaseDao.update(Chats, criteria, update);

        return { ...MESSAGES.SUCCESS.RIGHT, data : chathistory}

    } catch (error) {
        console.log("error in chathistory user api", error, "chathistory")
        throw error;
    }
}

let unread_message = async function (payload) {
    try {
        let {user_name,from_username} = payload;

        let sessionstatus = await redisCli.getValue(`${user_name}`);
        if(!sessionstatus) { return { ...MESSAGES.SUCCESS.SESSION_EXPIRE} };

        let chathistory = await DatabaseDao.find(Chats, {
            attributes: ['sender','message','created_at'],
            where: { recipient: user_name, read_status : false},
            //order: [ ['created_at','ASC'] ]
        });

        return { ...MESSAGES.SUCCESS.RIGHT, data : chathistory}

    } catch (error) {
        console.log("error in unread_message user api", error, "unread_message")
        throw error;
    }
}



export let controller = {
    createuser,
    loginuser,
    logoutuser,
    getusers,
    sendmessage,
    chathistoryforuser,
    unread_message
}

