import { Sidebar } from "flowbite-react";
import GuildNav from "../../components/GuildNav";
import { BackendEnpoints } from "../../tools/Constance";
import { fetcher } from "../../tools/utils";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image";
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
        <div className="sm:block hidden bg-discord-dark-sidebar">
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
        <div className="p-5 h-full w-full overflow-y-auto overflow-x-hidden bg-discord-dark">
          <div className="flex items-center gap-2">
            <Image
              src={data?.icon}
              width={90}
              height={90}
              loading="lazy"
              className="rounded-full transform transition-all duration-150 easy-in-out hover:rounded-md"
            />
            <div>
              <h2 className="text-3xl font-bold">{data?.name}</h2>
              <p className="text-discord-white-hover">{router.query.guildid}</p>
            </div>
          </div>
          <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
            <div className="sm:flex sm:space-x-4">
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                      <h3 className="text-sm leading-6 font-medium text-gray-400">
                        Total Members
                      </h3>
                      <p className="text-3xl font-bold text-black">
                        <Odometer
                          value={!isValidating ? data.members : 0}
                          format="(,ddd)"
                          theme="default"
                          duration={1500}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                      <h3 className="text-sm leading-6 font-medium text-gray-400">
                        Total Channels
                      </h3>
                      <p className="text-3xl font-bold text-black">
                        <Odometer
                          value={!isValidating ? data.channels : 0}
                          format="(,ddd)"
                          theme="default"
                          duration={1500}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                      <h3 className="text-sm leading-6 font-medium text-gray-400">
                        Total Roles
                      </h3>
                      <p className="text-3xl font-bold text-black">
                        <Odometer
                          value={!isValidating ? data.roles : 0}
                          format="(,ddd)"
                          theme="default"
                          duration={1500}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
