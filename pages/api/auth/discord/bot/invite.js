import { generateBotInvite } from "../../../../../tools/utils";
export default async function handler(req, res) {
  const { id } = req.query;
  return res.redirect(301, generateBotInvite(id));
}
