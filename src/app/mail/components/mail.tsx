"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"

import { MailDisplay } from "@/app/mail/components/mail-display"
import { MailList } from "@/app/mail/components/mail-list"
import { type Mail } from "@/app/mail/data"
import { useMail } from '@/app/mail/use-mail'

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: Mail[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [mail] = useMail()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[700px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex justify-between p-4">
              <TabsList className="">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All RFPs
                </TabsTrigger>
                <TabsTrigger
                  value="high"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  High Priority
                  <span className="flex h-2 w-2 ml-2 rounded-full bg-red-600" />
                </TabsTrigger>
                <TabsTrigger
                  value="medium"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Medium Priority
                  <span className="flex h-2 w-2 ml-2 rounded-full bg-green-600" />
                </TabsTrigger>
                <TabsTrigger
                  value="low"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Low Priority
                  <span className="flex h-2 w-2 ml-2 rounded-full bg-gray-400" />
                </TabsTrigger>
              </TabsList>

              {/* <CalendarDateRangePicker /> */}
              <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8" />
                  </div>
                </form>
              </div>
            </div>


            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="high" className="m-0">
              <MailList items={mails.filter((item) => item.read === 1)} />
            </TabsContent>
            <TabsContent value="medium" className="m-0">
              <MailList items={mails.filter((item) => item.read === 2)} />
            </TabsContent>
            <TabsContent value="low" className="m-0">
              <MailList items={mails.filter((item) => item.read === 3)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
