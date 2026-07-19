
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { X, Copy, Check, Code2 } from "lucide-react";
import React, { useState, useRef } from "react";

const MessageBubble = ({ role, content, images }) => {
  const isUser = role?.toLowerCase() === "user";

  const [lightBox, setlightBox] = useState(null);
  const [copyCode, setCopyCode] = useState("");

  // markdown component
  const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
  ),

  h4: ({ children }) => (
    <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>
  ),

  h5: ({ children }) => (
    <h5 className="text-base font-semibold mt-3 mb-2">{children}</h5>
  ),

  h6: ({ children }) => (
    <h6 className="text-sm font-semibold text-slate-400 mt-3 mb-2">
      {children}
    </h6>
  ),

  p: ({ children }) => (
    <p className="mb-4 leading-7 break-words text-slate-200">
      {children}
    </p>
  ),

  strong: ({ children }) => (
    <strong className="font-bold text-white">
      {children}
    </strong>
  ),

  em: ({ children }) => (
    <em className="italic">
      {children}
    </em>
  ),

  del: ({ children }) => (
    <del className="opacity-70">
      {children}
    </del>
  ),

  hr: () => (
    <hr className="my-6 border-white/10" />
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-4 border-indigo-500 pl-4 italic text-slate-300">
      {children}
    </blockquote>
  ),

  ul: ({ children }) => (
    <ul className="list-disc ml-6 my-4 space-y-2">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal ml-6 my-4 space-y-2">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="leading-7">
      {children}
    </li>
  ),

  table: ({ children }) => (
    <div className="my-5 overflow-x-auto">
      <table className="min-w-full border border-white/10 rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-white/5">
      {children}
    </thead>
  ),

  tbody: ({ children }) => (
    <tbody>
      {children}
    </tbody>
  ),

  tr: ({ children }) => (
    <tr className="border-b border-white/10">
      {children}
    </tr>
  ),

  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="px-4 py-3">
      {children}
    </td>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300"
    >
      {children}
    </a>
  ),

  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="my-5 rounded-xl border border-white/10 max-w-full"
    />
  ),

// pre now just passes through — the code component builds the whole block
  pre: ({ children }) => <>{children}</>,

  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const codeRef = useRef(null);
    const blockId = useRef(Math.random().toString(36).slice(2)).current;

    const handleCopy = () => {
      const text = codeRef.current?.innerText ?? "";
      navigator.clipboard.writeText(text);
      setCopyCode(blockId);
      setTimeout(() => setCopyCode(""), 1500);
    };

    if (inline || !match) {
      return (
        <code
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-pink-300"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="my-5 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
          <div className="flex items-center gap-2 text-slate-300">
            <Code2 size={16} />
            <span className="text-sm font-semibold capitalize">
              {match[1]}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
          >
            {copyCode === blockId ? (
              <>
                <Check size={14} />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="overflow-x-auto p-4 m-0 bg-transparent border-0">
          <code
            ref={codeRef}
            className={`${className} font-mono text-sm`}
            {...props}
          >
            {children}
          </code>
        </pre>
      </div>
    );
  },
};

console.log("CONTENT:", content);

  return (
    <div
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm break-words ${
          isUser
            ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-br-md"
            : "bg-[#1b1d24] border border-white/10 text-slate-200 rounded-bl-md"
        }`}
      >
        <div
          className={`prose prose-sm max-w-none leading-7
            ${
              isUser
                ? "prose-invert"
                : "prose-invert prose-headings:text-white prose-p:text-slate-200 prose-strong:text-white prose-li:text-slate-200 prose-a:text-blue-400"
            }
            prose-pre:bg-[#0f1117]
            prose-pre:border
            prose-pre:border-white/10
            prose-pre:rounded-xl
            prose-pre:p-4
            prose-code:text-indigo-300
            prose-code:before:hidden
            prose-code:after:hidden
          `}
        >
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setlightBox(img)}
                  loading="lazy"
                  onError={(e) => e.currentTarget.remove()}
                  className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition"
                />
              ))}
            </div>
          )}

          <Markdown
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {content}
          </Markdown>
        </div>
      </div>

      {lightBox && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white bbg-white/10 rounded-full p-2"
            onClick={() => setlightBox(null)}
          >
            <X />
          </button>
          <img
            src={lightBox}
            className="max-w-[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
