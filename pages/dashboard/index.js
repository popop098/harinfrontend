import { parseCookie, decodeJwt } from "../../tools/utils";
import { server } from "../../config";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Title,
} from "@tremor/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Dashboard({ accessToken }) {
  const [guilds, setGuilds] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchGuilds() {
      const result = await fetch(`${server}/api/dashboard/@me/guilds`, {
        headers: {
          Authorization: accessToken,
        },
      });
      const data = await result.json();
      setGuilds(data);
    }
    fetchGuilds();
    const interval = setInterval(() => {
      fetchGuilds();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="px-10 bg-gray-600">
        <div className="p-5">
          <Card>
            <Title>List of Guilds</Title>
            <div
              className="px-3 py-2 w-fit rounded-md bg-yellow-200/50"
              style={{
                borderLeftWidth: "4px",
                borderLeftColor: "rgb(202 138 4)",
              }}
            >
              <h4 className="text-xl font-bold text-yellow-600">
                Tip. 정렬기준
              </h4>
              <p className="text-sm text-black">
                정렬기준은 봇이 접속한 길드를 우선적으로 정렬합니다.
              </p>
            </div>
            <Table marginTop="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Guild Name</TableHeaderCell>
                  <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guilds ? (
                  guilds.data
                    .sort(function (a, b) {
                      return b.join - a.join;
                    })
                    .map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Image
                            src={item.icon}
                            width={50}
                            height={50}
                            className="rounded-full"
                            loading="lazy"
                          />
                          {item.name}
                        </TableCell>
                        <TableCell>
                          {item.join ? (
                            <button
                              type="button"
                              onClick={() =>
                                router.push(`/dashboard/${item.id}`)
                              }
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                    dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              Manage
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                let inviteWin;
                                inviteWin = window.open(
                                  `/api/auth/discord/bot/invite?id=${item.id}`,
                                  "",
                                  "width=562px, height=972px, top=30px, left=675px, resizable=no"
                                );
                              }}
                              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none 
                              bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
                              focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 
                              dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Invite
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <div className="flex h-screen">
                    <div className="m-auto text-center">
                      <div className="spinner m-auto" />
                      <h2 className="text-2xl text-white font-bold">
                        불러오는중입니다.
                      </h2>
                    </div>
                  </div>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const parsed = parseCookie(ctx.req);
  if (!parsed.token) {
    return {
      redirect: {
        destination: "/api/auth/discord",
        permanent: false,
      },
    };
  }
  const decodingJwt = decodeJwt(parsed.token);
  return {
    props: {
      accessToken: decodingJwt.access_token,
    },
  };
};
