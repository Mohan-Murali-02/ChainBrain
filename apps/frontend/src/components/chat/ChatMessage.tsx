import { useState } from "react";
import { Bot, User, Copy, Check, Terminal } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../../api/chatApi";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === "assistant";
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderInline = (text: string) => {
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    const segments = text.split(regex);

    return segments.map((seg, idx) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-slate-900 dark:text-white">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      if (seg.startsWith("`") && seg.endsWith("`")) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-cyan-300 border border-slate-200 dark:border-slate-700/80"
          >
            {seg.slice(1, -1)}
          </code>
        );
      }
      return seg;
    });
  };

  const renderFormattedContent = (content: string) => {
    const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: content.substring(lastIndex, match.index),
        });
      }

      parts.push({
        type: "code",
        language: match[1] || "bash",
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: "text",
        content: content.substring(lastIndex),
      });
    }

    return parts.map((part, index) => {
      if (part.type === "code") {
        const isCopied = copiedCode === part.content;
        return (
          <div
            key={index}
            className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-[#090d16] shadow-md text-xs font-mono"
          >
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-cyan-400">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                {part.language || "Terminal"}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(part.content)}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] hover:text-white hover:bg-slate-800 text-slate-300 transition-colors"
                title="Copy code"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 overflow-x-auto text-emerald-300 leading-relaxed text-[13px]">
              <code>{part.content}</code>
            </pre>
          </div>
        );
      }

      const lines = part.content.split("\n");
      return (
        <div key={index} className="space-y-2 text-[14px] leading-relaxed">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={lIdx} className="h-1.5" />;

            if (trimmed.startsWith("### ")) {
              return (
                <h4
                  key={lIdx}
                  className="font-bold text-slate-900 dark:text-white text-base mt-3 mb-1.5 flex items-center gap-1.5 tracking-tight"
                >
                  {trimmed.replace("### ", "")}
                </h4>
              );
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h3
                  key={lIdx}
                  className="font-extrabold text-slate-900 dark:text-white text-lg mt-4 mb-2 tracking-tight"
                >
                  {trimmed.replace("## ", "")}
                </h3>
              );
            }

            const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
            const lineContent = isBullet ? trimmed.substring(2) : trimmed;
            const inlineFormatted = renderInline(lineContent);

            if (isBullet) {
              return (
                <div key={lIdx} className="flex items-start gap-2.5 pl-1 my-1">
                  <span className="text-indigo-500 dark:text-cyan-400 font-bold text-base leading-tight mt-0.5">•</span>
                  <span className="text-slate-700 dark:text-slate-200 flex-1 leading-normal">
                    {inlineFormatted}
                  </span>
                </div>
              );
            }

            return (
              <p key={lIdx} className="text-slate-700 dark:text-slate-200 my-1">
                {inlineFormatted}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div
      className={`flex items-start gap-3 my-3.5 ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      {isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl p-4 transition-all duration-200 ${
          isAssistant
            ? "bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-md dark:shadow-xl rounded-tl-sm backdrop-blur-md"
            : "bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/20 rounded-tr-sm"
        }`}
      >
        <div className="text-sm leading-relaxed">{renderFormattedContent(message.content)}</div>
        <div
          className={`text-[11px] mt-2.5 flex items-center justify-end font-medium ${
            isAssistant ? "text-slate-400 dark:text-slate-500" : "text-blue-100"
          }`}
        >
          {message.timestamp}
        </div>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
