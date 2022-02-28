/* 
 * Copyright (C) MOTHER - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by 
 * Mac Neil Ivan Tumacay <tumacayivan@gmail.com>, 04/20/2021
 */

function getConfig() {
  return {
    env: 'test',
    host: 'https://ophirium-test.herokuapp.com',
    // host: 'http://localhost:8080',
    name: 'Base',
    jwt: {
      header: 'Authorization',
      prefix: 'Bearer',
      issuer: 'APN',
      subject: 'Base Authentication',
      audience: 'Base',
      key: 'bf207728-be64-48ce-acbc-4697b473a03a',
      expiry: {
        min: 1800000,
        mid: 86400000,
        max: 172800000
      }
    }

    // test: {
    //   app: {
    //     name: 'Base',
    //     jwt: {
    //       header: 'Authorization',
    //       prefix: 'Bearer',
    //       issuer: 'APN',
    //       subject: 'Base Authentication',
    //       audience: 'Base',
    //       key: 'This is the secret for signing tokens',
    //       expiry: {
    //         min: 1800000,
    //         mid: 86400000,
    //         max: 172800000
    //       }
    //     }
    //   }
    // },
    // admin: {
    //   data: {
    //     user_id: '-MUpGebc5wUiSV4n7aSF',
    //     franchisee_id: '-MXzP4bc5wUiSV4n8b9A',
    //   }
    // },
    // user: {
    //   role: {}
    // }
  };
}

module.exports = { getConfig };