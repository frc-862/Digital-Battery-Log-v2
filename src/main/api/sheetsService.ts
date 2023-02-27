import fs from "fs/promises";
import { google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";
import path from "path";
import process from "process";
import { OAuth2Client } from "googleapis-common";
import { batteryRecord } from "../db/models/battery";
import { BatteryRecord } from "../types";
import { HydratedDocument } from "mongoose";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const spreadsheetId = "1SX7XJvakIZy1HRAKwPCJXn5hu9fjtQ1SoHH57GadeV0";
const valueInputOption = "RAW";

export const sync = () =>
  authorize()
    .then(syncDb)
    .catch((err) => console.error(err));

/**
 * checks to see if credentials exist
 * @return {Promise<OAuth2Client | null>}
 *
 */
async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    return google.auth.fromJSON(credentials) as OAuth2Client;
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: OAuth2Client): Promise<void> {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 * @return {Promise<OAuth2Client>}  An authorized OAuth2 client.
 */
async function authorize(): Promise<OAuth2Client> {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function syncDb(auth: OAuth2Client): Promise<void> {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values
    .get({
      spreadsheetId: spreadsheetId,
      range: "Master Record!A2:E",
    })
    .catch();
  let nextOpenRow: number;
  if (res.data.values == undefined) {
    nextOpenRow = 2;
  } else {
    nextOpenRow = res.data.values.length + 2;
  }
  const docs: HydratedDocument<BatteryRecord>[] = await batteryRecord.find({
    updated: false,
  });
  const range = `Master Record!A${nextOpenRow}:E`;

  const values = docs.map((doc) => {
    return [
      `${doc.number.slice(0, 2)}${doc.number.slice(2, 4)}}`,
      doc.out == true ? "in" : "out",
      doc.soc,
      doc.rint,
      doc.time,
    ];
  });
  const resource = { values };
  if (values.length > 0) {
    await sheets.spreadsheets.values
      .update({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: valueInputOption,
        requestBody: resource,
      })
      .catch();
  }
  let batteries: string[] = [];
  docs.forEach((doc) => {
    let batteryString =
      doc.number.toString().slice(0, 2) +
      "." +
      doc.number.toString().slice(2, 4);
    if (!batteries.includes(batteryString)) {
      batteries.push(batteryString);
    }
  });
  batteries.sort((a, b) => {
    let aNum = parseInt(a.replace(".", ""));
    let bNum = parseInt(b.replace(".", ""));
    return aNum - bNum;
  });
  batteries.forEach(async (battery) => {
    const docs: HydratedDocument<BatteryRecord>[] = await batteryRecord
      .find({
        number: parseInt(battery.replace(".", "")),
        updated: false,
      })
      .catch();
    const values = docs.map((doc) => {
      return [
        `${doc.number.slice(0, 2)}${doc.number.slice(2, 4)}}`,
        doc.out == true ? "in" : "out",
        doc.soc,
        doc.rint,
        doc.time,
      ];
    });
    const resource = { values };
    await sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: `${battery}!A2:E`,
      })
      .catch(async (err) => {
        if (Object.entries(err)[2][1] == 400) {
          await addSheet(sheets, spreadsheetId, battery).then(async () => {
            await sheets.spreadsheets.values
              .get({
                spreadsheetId: spreadsheetId,
                range: `${battery}!A2:E`,
              })
              .catch((err) => {
                return console.error(err);
              })
              .then(async (res) => {
                if (!res) return;

                let nextOpenRow: number;
                if (res.data.values == undefined) {
                  nextOpenRow = 2;
                } else {
                  nextOpenRow = res.data.values.length + 2;
                }

                const range = `${battery}!A${nextOpenRow}:E${
                  nextOpenRow + docs.length
                }`;

                if (values.length > 0) {
                  await sheets.spreadsheets.values
                    .update({
                      spreadsheetId: spreadsheetId,
                      range: range,
                      valueInputOption: valueInputOption,
                      requestBody: resource,
                    })
                    .catch(() => {
                      return;
                    })
                    .then(async () => {
                      await batteryRecord
                        .updateMany(
                          {
                            number: parseInt(battery.replace(".", "")),
                            updated: false,
                          },
                          { updated: true },
                        )
                        .catch(() => {
                          return;
                        });
                    });
                }
              });
          });
        }
      })
      .then(async (res) => {
        if (!res) return;

        let nextOpenRow: number;
        if (res.data.values == undefined) {
          nextOpenRow = 2;
        } else {
          nextOpenRow = res.data.values.length + 2;
        }

        const range = `${battery}!A${nextOpenRow + docs.length}:E`;

        if (values.length > 0) {
          await sheets.spreadsheets.values
            .update({
              spreadsheetId: spreadsheetId,
              range: range,
              valueInputOption: valueInputOption,
              requestBody: resource,
            })
            .catch(() => {
              return;
            })
            .then(async () => {
              await batteryRecord
                .updateMany(
                  {
                    number: parseInt(battery.replace(".", "")),
                    updated: false,
                  },
                  { updated: true },
                )
                .catch(() => {
                  return;
                });
            });
        }
      });
  });
}
/***
 * Adds a new sheet to the spreadsheet
 * @param sheets The google sheets object
 * @param spreadsheetId The id of the spreadsheet
 * @param tabName The name of the new tab
 * @returns void
 */
async function addSheet(
  sheets: any,
  spreadsheetId: string,
  tabName: string,
): Promise<void> {
  const resource = {
    requests: [
      {
        addSheet: {
          properties: {
            title: tabName,
          },
        },
      },
    ],
  };
  await sheets.spreadsheets
    .batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: resource,
    })
    .catch((err: any) => console.error(err))
    .then(async (newSheet: any) => {
      const headerResource = {
        values: [
          [
            "Battery #",
            "In/Out",
            "State of Charge",
            "Internal Resistance (RINT)",
            "Time",
          ],
        ],
      };

      const formattingResource = {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: newSheet.data.replies[0].addSheet.properties.sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 5,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColorStyle: {
                    rgbColor: {
                      red: 0 / 255,
                      green: 0 / 255,
                      blue: 255 / 255,
                      alpha: 1,
                    },
                  },
                  textFormat: {
                    fontSize: 10,
                    bold: true,
                    foregroundColorStyle: {
                      rgbColor: {
                        red: 230 / 255,
                        green: 145 / 255,
                        blue: 56 / 255,
                        alpha: 1,
                      },
                    },
                  },
                },
              },
              fields: "*",
            },
          },
        ],
      };

      await sheets.spreadsheets
        .batchUpdate({
          spreadsheetId: spreadsheetId,
          resource: formattingResource,
        })
        .catch((err: any) => console.error(err));
      await sheets.spreadsheets.values
        .update({
          spreadsheetId: spreadsheetId,
          range: `${tabName}!A1:E1`,
          valueInputOption: "USER_ENTERED",
          requestBody: headerResource,
        })
        .catch();
    });
}
