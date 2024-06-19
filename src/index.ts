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
      "https://cdn.discordapp.com/icons/1244174322176622604/a_c8579e06e04178ef5d23a8adcf981755.gif?size=2048",
    )
    .setAssetsLargeText("🚀・SZP Community")
    .setAssetsSmallImage(
      "https://cdn.discordapp.com/icons/1244177583910813786/91e98ff2d518702bcce38270d049e51e.png?size=2048",
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
