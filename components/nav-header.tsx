"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 transition-colors rounded-xl"
        >
          {/* Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <Image src="/zero.png" alt="Zerofreight logo" width={28} height={28} />
          </div>

          {/* Text */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              Zerofreight
            </span>
            <span className="text-xs text-muted-foreground">
              Admin Panel
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
