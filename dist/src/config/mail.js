"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: 'emerson_cdias@hotmail.com',
            name: 'Emerson Dias',
        },
    },
};
