import { DocumentType } from '@typegoose/typegoose';
import UserModel, { User } from '../db/schema/users.schema';

import { signJWT } from '../utils/jwt';
import sendEmail from '../utils/sendMail';

import { User as CreateUser } from '../types/user.types';
import config from '../config/default';

class AuthService {
    public signTokens = async (user: DocumentType<User>) => {
        const token = await signJWT(
            { id: user._id, email: user.email },
            config.secrectKey,
            {
                algorithm: 'HS256',
                expiresIn: config.jwtAccessExpiresIn,
            }
        );

        return token;
    };

    public register = async (data: Partial<CreateUser>) => {
        const user = await UserModel.create(data);

        return user;
    };

    public sendResetPasswordEmail = async (
        user: DocumentType<User>,
        resetPasswordURL: string
    ) => {
        const template = `<head>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <title>Reset Password Email Template</title>
              <meta name="description" content="Reset Password Email Template." />
              <style type="text/css">
                a:hover {
                  text-decoration: underline !important;
                }
              </style>
              </head>
              
              <body
              marginheight="0"
              topmargin="0"
              marginwidth="0"
              style="margin: 0px; background-color: #f2f3f8"
              leftmargin="0"
              >
              <table
                cellspacing="0"
                border="0"
                cellpadding="0"
                width="100%"
                bgcolor="#f2f3f8"
                style="
                  @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
                  font-family: 'Open Sans', sans-serif;
                "
              >
                <tr>
                  <td>
                    <table
                      style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
                      width="100%"
                      border="0"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td style="height: 80px">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="text-align: center">
                          <a href="http://paradigmresear.ch/" title="logo" target="_blank">
                          <svg id="Paradigm_Logo" width="85" height="85" data-name="Paradigm Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" style="cursor:pointer"><path d="M704.79,383.08c0-.13-.1-.27-.15-.4l0-.08a4.81,4.81,0,0,0-.62-1.08l-.11-.13-.28-.33-.16-.15a2.55,2.55,0,0,0-.3-.26l-.18-.14-.33-.23s-.08-.06-.13-.08L402.5,207a5,5,0,0,0-5,0l-50,28.87a5,5,0,0,0-2.5,4.33V759.81a5,5,0,0,0,2.5,4.33l50,28.86c.12.07.24.12.36.18a3.68,3.68,0,0,0,.35.15,4.21,4.21,0,0,0,.63.2l.34.07c.21,0,.42,0,.64.06l.18,0a318.64,318.64,0,0,0,304.79-410.6ZM395,780l-40-23.09V248.85L590,384.53l-40,23.09L402.5,322.46a5,5,0,0,0-7.5,4.33V500a4.93,4.93,0,0,0,3.54,4.77A4.89,4.89,0,0,0,400,505a5.11,5.11,0,0,0,1.5-.24,5.2,5.2,0,0,0,1-.43l2.18-1.26,47.83-27.6.13-.09L602.5,388.86a5,5,0,0,0,0-8.66L360,240.19l40-23.09L690,384.53,417.41,541.91,397.5,553.4h0a5,5,0,0,0-2.5,4.33Zm10-288.67V335.45l40,23.1V468.24Zm50-127,85,49.07-85,49.06Zm163,329a306.25,306.25,0,0,1-213,90.28v-223l21.32-12.31L697,392.05A308.92,308.92,0,0,1,618,693.36Z"></path><path d="M660.06,463.06a6.49,6.49,0,0,0-.55-.36,5,5,0,0,0-5,0l-57,32.93,0,0-150,86.59a5,5,0,0,0-2.5,4.33V726.08a5,5,0,0,0,.28,1.63.94.94,0,0,0,.06.15c0,.12.09.24.14.36l.13.23c0,.08.08.17.13.25a2.83,2.83,0,0,0,.2.28,1,1,0,0,0,.12.17c.06.08.13.15.2.23s.1.13.16.19a4.89,4.89,0,0,0,.41.37,5,5,0,0,0,3.17,1.14,5.23,5.23,0,0,0,1-.09q5.5-1.1,10.95-2.41A262.25,262.25,0,0,0,662.13,473.8c0-2.15,0-4.39-.08-6.85A5,5,0,0,0,660.06,463.06Zm-66.77,46.59A197.32,197.32,0,0,1,455,660.42V589.49Zm30.54,80.22A252.23,252.23,0,0,1,455,719.92v-49.1a207.32,207.32,0,0,0,149.6-167.7l47.53-27.44A252.78,252.78,0,0,1,623.83,589.87Z"></path></svg>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="height: 20px">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            width="95%"
                            border="0"
                            align="center"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                              max-width: 670px;
                              background: #fff;
                              border-radius: 3px;
                              text-align: center;
                              -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                              -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                              box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                            "
                          >
                            <tr>
                              <td style="height: 40px">&nbsp;</td>
                            </tr>
                            <tr>
                              <td style="padding: 0 35px">
                                <h1
                                  style="
                                    color: #1e1e2d;
                                    font-weight: 500;
                                    margin: 0;
                                    font-size: 32px;
                                    font-family: 'Rubik', sans-serif;
                                  "
                                >
                                  You have requested to reset your password
                                </h1>
                                <p
                                  style="
                                    color: #455056;
                                    font-size: 15px;
                                    line-height: 24px;
                                    margin: 0;
                                  "
                                >
                                  We cannot simply send you your old password. A unique
                                  link to reset your password has been generated for you.
                                  To reset your password, click the following link.
                                </p>
                                <a
                                  href="${resetPasswordURL}"
                                  style="
                                    background: #20e277;
                                    text-decoration: none !important;
                                    font-weight: 500;
                                    margin-top: 35px;
                                    color: #fff;
                                    text-transform: uppercase;
                                    font-size: 14px;
                                    padding: 10px 24px;
                                    display: inline-block;
                                    border-radius: 50px;
                                  "
                                  >Reset Password</a
                                >
                                <br></br>
                                <p
                                  style="
                                    color: #455056;
                                    font-size: 15px;
                                    line-height: 24px;
                                    margin: 0;
                                  "
                                >
                                  This link will expire in 15 minuites.
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style="height: 40px">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
              
                      <tr>
                        <td style="height: 20px">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="text-align: center">
                          <p
                            style="
                              font-size: 14px;
                              color: rgba(69, 80, 86, 0.7411764705882353);
                              line-height: 18px;
                              margin: 0 0 0;
                            "
                          >
                            &copy; <strong>http://paradigmresear.ch/</strong>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="height: 80px">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              </body>`;

        await sendEmail(user.email, 'Reset Password', template);
    };
}

export default AuthService;
