"use strict";
import * as Joi from 'joi';
import { controller } from '../test/controller';
import { API_BASE_URL_V3, ResponseHandler } from "../../../utils";
import { CONSTANT, SWAGGER_DEFAULT_RESPONSE_MESSAGES } from '../../../constants';
import { ResponseToolkit } from '@hapi/hapi';
const moment = require('moment');
const responseHandler = new ResponseHandler();

export const UserRoute = [

    {
        method: 'POST',
        path: API_BASE_URL_V3 + '/create/user',
        handler: async (request: Request | any, h: ResponseToolkit) => {
            try {
                //const tokenData = request.auth.credentials.tokenData;
                let result = await controller.createuser({...request.payload });
                return responseHandler.sendSuccess(h, result, request);
            }
            catch (error) {
                console.log("Error in create user api", error, "create_user")
                return responseHandler.sendError(request, error);
            }
        },
        options: {
            description: 'API to create user',
            plugins: {
                "hapi-swagger": {
                    responseMessages: SWAGGER_DEFAULT_RESPONSE_MESSAGES
                }
            }
        }
    },
    {
        method: 'POST',
        path: API_BASE_URL_V3 + '/login',
        handler: async (request: Request | any, h: ResponseToolkit) => {
            try {
                let result = await controller.loginuser({...request.payload });
                return responseHandler.sendSuccess(h, result, request);
            }
            catch (error) {
                console.log("Error in login user api", error, "login_user")
                return responseHandler.sendError(request, error);
            }
        },
        options: {
            description: 'API to login user',
            plugins: {
                "hapi-swagger": {
                    responseMessages: SWAGGER_DEFAULT_RESPONSE_MESSAGES
                }
            }
        }
    },
    {
        method: 'POST',
        path: API_BASE_URL_V3 + '/logout',
        handler: async (request: Request | any, h: ResponseToolkit) => {
            try {
                let result = await controller.logoutuser({...request.payload });
                return responseHandler.sendSuccess(h, result, request);
            }
            catch (error) {
                console.log("Error in logout user api", error, "logout_user")
                return responseHandler.sendError(request, error);
            }
        },
        options: {
            description: 'API to logout user'
        }
    },
    {
        method: 'GET',
        path: API_BASE_URL_V3 + '/get/users',
        handler: async (request: Request | any, h: ResponseToolkit) => {
            try {
                //const tokenData = request.auth.credentials.tokenData;
                let result = await controller.getusers();
                return responseHandler.sendSuccess(h, result, request);
            }
            catch (error) {
                console.log("Error in get user api", error, "get_user")
                return responseHandler.sendError(request, error);
            }
        },
        options: {
            description: 'API to get user'
        }
    },
    {
        method: 'POST',
        path: API_BASE_URL_V3 + '/send/text/user',
        handler: async (request: Request | any, h: ResponseToolkit) => {
            try {
                //const tokenData = request.auth.credentials.tokenData;
                let result = await controller.sendmessage({...request.payload });
                return responseHandler.sendSuccess(h, result, request);
            }
            catch (error) {
                console.log("Error in send text user api", error, "send_text")
                return responseHandler.sendError(request, error);
            }
        },
        options: {
            description: 'API to send text'
        }
    },
    {
        method: 'POST',
        path: API_BASE_URL_V3 + '/get/history',
        handler: async (request: Request | any, h: ResponseToolkit) => {
            try {
                //const tokenData = request.auth.credentials.tokenData;
                let result = await controller.chathistoryforuser({...request.payload });
                return responseHandler.sendSuccess(h, result, request);
            }
            catch (error) {
                console.log("Error in get history api", error, "get_history")
                return responseHandler.sendError(request, error);
            }
        },
        options: {
            description: 'API to get history'
        }
    },
    {
        method: 'POST',
        path: API_BASE_URL_V3 + '/get/unread',
        handler: async (request: Request | any, h: ResponseToolkit) => {
            try {
                //const tokenData = request.auth.credentials.tokenData;
                let result = await controller.unread_message({...request.payload });
                return responseHandler.sendSuccess(h, result, request);
            }
            catch (error) {
                console.log("Error in create user api", error, "create_user")
                return responseHandler.sendError(request, error);
            }
        },
        options: {
            description: 'API to create user'
        }
    }

]
