import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import Link from "next/link";
function NavbarHead() {
  return (
    <Navbar>
    <NavbarBrand>
      {/* <AcmeLogo /> */}
      <Link className="font-bold text-inherit" href='/'>Avatar</Link>
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {/* <NavbarItem>
        <Link color="foreground" href="/">
          Home
        </Link>
      </NavbarItem> */}
      <NavbarItem isActive>
        <Link href="#example" aria-current="page">
          Example
        </Link>
      </NavbarItem>
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="flex">
        <Link href="https://discord.gg/p7y9CH4G" target="_blank">Discord</Link>
      </NavbarItem>
      <NavbarItem>
        
        <Button as={Link} color="primary" href="/create" variant="flat" >
           Create
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>  )
}

export default NavbarHead