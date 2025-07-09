import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { askGemini } from "@/lib/gemni";
import { cn } from "@/lib/utils";

const Chat = () => {
    const [messages, setMessages] = useState<{ text: string; role: "user" | "ai" }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, role: "user" as const };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const aiReply = await askGemini(input);
            setMessages((prev) => [...prev, { text: aiReply, role: "ai" }]);
        } catch {
            setMessages((prev) => [...prev, { text: "Failed to get response.", role: "ai" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Property Assistant (Pakistan)
            </h1>

            <Card className="h-[500px] overflow-y-auto p-4 space-y-3 bg-muted rounded-lg shadow-inner">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={cn(
                            "rounded-lg px-4 py-2 text-sm max-w-[80%]",
                            msg.role === "user"
                                ? "ml-auto bg-primary text-white"
                                : "mr-auto bg-white border"
                        )}
                    >
                        {msg.text}
                    </div>
                ))}

                {loading && (
                    <div className="text-muted-foreground text-sm italic">Thinking...</div>
                )}

                <div ref={scrollRef} />
            </Card>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
                className="mt-4 flex gap-2"
            >
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about property in Islamabad, Lahore..."
                    className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                    Send
                </Button>
            </form>
        </div>
    );
};

export default Chat;
