import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Image from "next/image";
import Mini_logo from "@/public/assets/mini_logo.svg";
import * as Icons from "@/public/assets/icons/Icons";

export function Menu() {
  return (
    <Menubar className="flex-col gap-10 bg-black_third w-20 h-screen justify-center p-0 m-0 border-0">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image src={Mini_logo} width="32" height="32" alt="Filmbox logo" />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image src={Icons.Home} width="32" height="32" alt="Menu icon" />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image
            src={Icons.Category}
            width="32"
            height="32"
            alt="Category icon"
          />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image src={Icons.User} width="32" height="32" alt="User icon" />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image
            src={Icons.Message}
            width="32"
            height="32"
            alt="Message icon"
          />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image src={Icons.Heart} width="32" height="32" alt="Heart icon" />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image src={Icons.Share} width="32" height="32" alt="Share icon" />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image src={Icons.Tv} width="32" height="32" alt="Tv icon" />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
export default Menu;
