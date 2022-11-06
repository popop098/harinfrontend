import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { useRouter } from "next/router";
export default function GuildNav() {
  const router = useRouter();
  return (
    <div className="block md:hidden lg:hidden sm:hidden">
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Link href="/navbars" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">About</Navbar.Link>
          <Navbar.Link href="/navbars">Services</Navbar.Link>
          <Navbar.Link href="/navbars">Pricing</Navbar.Link>
          <Navbar.Link href="/navbars">Contact</Navbar.Link>
        </Navbar.Collapse>
        <div className="flex md:order-2">
          <Navbar.Toggle />
          <Dropdown arrowIcon={false} inline={true}>
            <Dropdown.Header>
              <span className="block text-sm">test</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => router.push("/dashboard")}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => router.push("/api/auth/discord/logout")}
            >
              <p className="text-red-500">Logout</p>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
    </div>
  );
}
