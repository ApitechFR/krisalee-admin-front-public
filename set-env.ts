// require fs module from 'fs';
const fs = require('fs');

// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');

require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
    API_URL: '${process.env.API_URL}',
    KC_URL: '${process.env.KC_URL}',
    KC_REALM: '${process.env.KC_REALM}',
    KC_CLIENT_ID: '${process.env.KC_CLIENT_ID_FRONTEND}',
    DIR: '${process.env.DIR}',
    NEXTCLOUD_URL: '${process.env.NEXTCLOUD_URL}',
    SITE_INTERNE_URL: '${process.env.SITE_INTERNE_URL}',
    SITE_EXTERNE_URL: '${process.env.SITE_EXTERNE_URL}',
    KEYCLOAK_URL: '${process.env.KEYCLOAK_URL}',
    MAILSERVER_URL: '${process.env.MAILSERVER_URL}',
    CHAT_URL: '${process.env.CHAT_URL}',
   production: '${process.env.PRODUCTION}',
   ORGANIZATION_ID: '${process.env.ORGANIZATION_ID}',
   ORGANIZATION_ADMIN_ID: '${process.env.ORGANIZATION_ADMIN_ID}',
   PROD_TAG_ID: '${process.env.PROD_TAG_ID}',
   alertUserId:'${process.env.ALERT_USER_ID}',
   SEARCH_COLUMNS:${process.env.SEARCH_COLUMNS},
   ADMIN_APITECH_EMAIL:'${process.env.ADMIN_APITECH_EMAIL}',
};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the environment content... \n'));

// console.log(colors.grey(envConfigFile));
fs.writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});