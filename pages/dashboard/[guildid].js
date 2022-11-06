import { Sidebar } from "flowbite-react";
import GuildNav from "../../components/GuildNav";
import { BackendEnpoints } from "../../tools/Constance";
import { fetcher } from "../../tools/utils";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
const Odometer = dynamic(import("react-odometerjs"), {
  ssr: false,
});
export default function GuildDashboard() {
  const router = useRouter();
  const fetchUrl = BackendEnpoints.Guild(router.query.guildid);
  const { data, error, isValidating } = useSWR(fetchUrl, fetcher, {
    revalidateOnFocus: false,
  });
  return (
    <>
      <GuildNav />
      <div className="flex h-screen">
        <div className="sm:block hidden">
          <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="#">Dashboard</Sidebar.Item>
                <Sidebar.Item href="#" label="Pro" labelColor="alternative">
                  Kanban
                </Sidebar.Item>
                <Sidebar.Item href="#" label="3">
                  Inbox
                </Sidebar.Item>
                <Sidebar.Item href="#">Users</Sidebar.Item>
                <Sidebar.Item href="#">Products</Sidebar.Item>
                <Sidebar.Item href="#">Sign In</Sidebar.Item>
                <Sidebar.Item href="#">Sign Up</Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
        <div className="p-3 h-full w-full overflow-y-auto bg-gray-500">
          <h2 className="text-2xl font-bold">{data?.name}</h2>
          {JSON.stringify(data)}
          <div className="sm:flex sm:gap-2">
            <div
              className="px-4 py-2 bg-white rounded-lg shadow-md w-fit"
              style={{ borderLeftWidth: "6px", borderLeftColor: "#3B82F6" }}
            >
              <h1 className="text-gray-500 text-md font-bold">Total Members</h1>
              <span className="text-3xl text-black font-bold">
                <Odometer
                  value={!isValidating ? data.members : 0}
                  format="(,ddd)"
                  theme="default"
                  duration={1500}
                />
              </span>
            </div>
            <div
              className="px-4 py-2 bg-white rounded-lg shadow-md w-fit"
              style={{ borderLeftWidth: "6px", borderLeftColor: "#3B82F6" }}
            >
              <h1 className="text-gray-500 text-md font-bold">
                Total Channels
              </h1>
              <span className="text-3xl text-black font-bold">
                <Odometer
                  value={!isValidating ? data.channels : 0}
                  format="(,ddd)"
                  theme="default"
                  duration={1500}
                />
              </span>
            </div>
            <div
              className="px-4 py-2 bg-white rounded-lg shadow-md w-fit"
              style={{ borderLeftWidth: "6px", borderLeftColor: "#3B82F6" }}
            >
              <h1 className="text-gray-500 text-md font-bold">Total Roles</h1>
              <span className="text-3xl text-black font-bold">
                <Odometer
                  value={!isValidating ? data.roles : 0}
                  format="(,ddd)"
                  theme="default"
                  duration={1500}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
