import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function UserInput() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
        </div>
    )
}

export function UserTextArea() {
    return (
        <div className="grid w-full gap-2">
            <Textarea placeholder="Type your question about the RFP here." />
            <Button>Send</Button>
        </div>
    )
}