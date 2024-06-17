import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv";
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from "./utils/translations.json";
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(
      `\r${gradient(["purple", "pink"])(`Connecting${".".repeat(ponto)}`)}`,
    );
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang("pt");
  } else {
    setlang("en");
  }
  if (client.guilds.cache.get("1244174322176622604")) {
    if (
      client.guilds.cache
        .get("1244174322176622604")
        .channels.cache.get("1244175061649195150")
    ) {
      (
        client.guilds.cache
          .get("1244174322176622604")
          .channels.cache.get("1244175061649195150") as TextChannel
      )
        .send({ content: "🚀・ Sonyzap Foi Iniciado!" })
        .catch((error) => {});
    } else {
      console.log("...");
    }
  } else {
    console.log(gradient(["red", "orange"])(t("nosvr")));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId("1244175021761363999")
    .setType("PLAYING")
    .setURL("https://discord.gg/DFEuaSZFEh")
    .setName("👾 SZP Community!")
    .setState("🚀・ Entre Já!")
    .setDetails("🚀・ Melhor Comunidade De Bot!")
    .setAssetsLargeImage(
      "https://media.discordapp.net/attachments/1244175003897958512/1252146603448602625/SZP_1.png?ex=667127e6&is=666fd666&hm=ee478e4ab8a84cb6b1f2965b5b0656aa572df364faa2946b86c4f154f5ecde41&=&format=webp&quality=lossless&width=472&height=472",
    )
    .setAssetsLargeText("🚀・SZP Community")
    .setAssetsSmallImage(
      "https://media.discordapp.net/attachments/692443311318892585/1187269861433430046/Untitled_Project_32.jpg?ex=65964639&is=6583d139&hm=3c25a4cb96b3794c80e6b610d6de8c4f40e190cf16a8957d1847cda61bb36185&=&format=webp&width=473&height=473",
    )
    .setAssetsSmallText("Join")
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t("join"), "https://discord.gg/DFEuaSZFEh");
  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(
    gradient(["purple", "pink"])("Your token (Not a bot token)\n» "),
    (input) => {
      if (input.trim() === "") {
        console.log(gradient(["red", "orange"])("this token is empty"));
        process.kill(1);
      } else {
        client.login(input).catch((error) => {
          if (error.message === "An invalid token was provided.") {
            console.clear();
            console.log(gradient(["red", "orange"])("Invalid token"));
          } else {
            console.clear();
            console.error(
              gradient(["red", "orange"])(
                `Erro ao fazer login: ${error.message}`,
              ),
            );
          }
        });
      }
    },
  );
} else {
  console.clear();
  client.login(token).catch((error) => {
    console.clear();
    if (error.message === "An invalid token was provided.") {
      console.log(gradient(["red", "orange"])("Invalid token"));
    } else {
      console.clear();
      console.error(gradient(["red", "orange"])(error.message));
    }
  });
}

export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;
