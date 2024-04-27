"use client"
import { useChat } from 'ai/react';
import { useState } from 'react';
import { addDays, addHours, format, nextSaturday } from "date-fns"
import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  Clock,
  BellPlus,
  Trash2,
} from "lucide-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Mail } from "@/app/mail/data"
import Image from 'next/image';

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [placeholder, setPlaceholder] = useState("Type your question about the RFP here.");
  const today = new Date()
  const labels: string[] = ["Summarize the RPF", "Give address of client", "Give client info"];

  const mockOutput = "Type some questions about the RFP"

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between items-center pl-3 pr-4 pt-4 pb-3">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="AI Summary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">AI Summary</SelectItem>
              <SelectItem value="dark">Intelligent Product Matcher</SelectItem>
              {/* <SelectItem value="system">Product Matcher</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ArchiveRestore className="h-4 w-4" />
                <span className="sr-only">Set High Priority</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Set High Priority</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Set Medium Priority</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Set Medium Priority</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">Set Low Priority</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Set Low Priority</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!mail}>
                    <BellPlus className="h-4 w-4" />
                    <span className="sr-only">Alarm</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Snooze until</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Later today{" "}
                      <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Tomorrow
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      This weekend
                      <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Next week
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 7), "E, h:m b")}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <Calendar />
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>Set Alarm</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator />

      {mail ? (
        <div className="flex flex-1 flex-col">
          <ScrollArea className='text-sm h-[480px] px-4 pt-4'>
            {messages.length > 0 ? (
              messages.map(m => (
                <div key={m.id} className="whitespace-pre-wrap">
                  {m.role === 'user' ? 'User: ' : 'RFP Copilot: '}
                  {m.content}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center whitespace-pre-wrap p-4">
                <Image src="/placeholder.png" alt='' width="400" height="400" />
              </div>
            )}
          </ScrollArea>
          {/* <Separator className="mt-auto" /> */}
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  value={input}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                />
                <div className="flex items-center">
                  {labels.length ? (
                    <div className="flex items-center gap-2">
                      {labels.map((label) => (
                        <Badge key={label} variant="outline" onClick={() => setPlaceholder(label)}>
                          {label}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                  <Button
                    type='submit'
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  )
}
