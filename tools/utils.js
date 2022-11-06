import cookie from "cookie";
import jsonwebtoken from "jsonwebtoken";
import { configs, server } from "../config";
export function parseCookie(req) {
  if (!req) return {};
  return cookie.parse(req.headers.cookie || "");
}
export function signJwt(data, exp) {
  return jsonwebtoken.sign(data, process.env.JWT_SECRET, { expiresIn: exp });
}
export function verifyJwt(jwt) {
  try {
    return jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}
export function decodeJwt(jwt) {
  return jsonwebtoken.decode(jwt);
}
export function getProfileImg(id, avatar) {
  if (avatar) {
    const useravatar_format =
      avatar && avatar.startsWith("a_") ? "gif" : "webp";
    return (
      avatar &&
      `/api/img?url=https://cdn.discordapp.com/avatars/${id}/${avatar}.${useravatar_format}`
    );
  } else {
    return "https://cdn.discordapp.com/embed/avatars/0.png";
  }
}
export function generateBotInvite(guildid) {
  return `https://discord.com/oauth2/authorize?client_id=${configs.botId}&redirect_uri=${server}/callback/bot&permissions=8&response_type=code&scope=bot%20applications.commands%20identify%20guilds&guild_id=${guildid}&disable_guild_select=true`;
}
// export function checkAuthorGetAccessToken(ctx) {
//   const parsed = parseCookie(ctx.req);
//   if (!parsed.token) {
//     return {
//       redirect: {
//         destination: "/api/auth/discord",
//         permanent: false,
//       },
//     };
//   }
//   const decodingJwt = decodeJwt(parsed.token);
//   return decodingJwt.access_token;
// }
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
