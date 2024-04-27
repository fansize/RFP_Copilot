import { ComponentProps } from "react"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { FileBox, FileText, FileBarChart } from "lucide-react";

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail } from "@/app/mail/data"
import { useMail } from "@/app/mail/use-mail"

interface MailListProps {
  items: Mail[]
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail()
  const labelIcons: Record<string, JSX.Element> = {
    PDF: <FileBox className="h-3 w-3 mr-2" />,
    DOC: <FileText className="h-3 w-3 mr-2" />,
    EXCEL: <FileBarChart className="h-3 w-3 mr-2" />,
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {item.read && (
                    <span
                      className={`flex h-2 w-2 rounded-full ${item.read === 1
                        ? "bg-red-600"
                        : item.read === 2
                          ? "bg-green-600"
                          : item.read === 3
                            ? "bg-gray-300"
                            : ""
                        }`}
                    />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground text-red-500"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <div>
                {item.labels.length ? (
                  <div className="flex items-center gap-2">
                    {item.labels.map((label) => (
                      <Badge key={label} variant="outline" className="items-center">
                        {labelIcons[label]}
                        {label}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="text-xs">{"similarity score " + (item.similarity * 100).toFixed(1) + "%"}</div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default"
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline"
  }

  return "secondary"
}
