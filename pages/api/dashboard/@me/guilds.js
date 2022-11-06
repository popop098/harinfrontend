import { server } from "../../../../config";
export default async function handler(req, res) {
  const accessToken = req.headers.authorization;
  const result = await fetch(
    `${server.replace("3", "5")}/dashboard/@me/guilds`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  const data = await result.json();
  return res.status(200).json(data);
}
