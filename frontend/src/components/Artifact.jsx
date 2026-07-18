import React, { useMemo, useState } from "react";
import { Code2, Eye, Copy, Check, PanelRightClose } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ArtiFact = () => {
  const { artifacts } = useSelector((state) => state.message);

  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState("code");
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);

  console.log("Artifacts:", artifacts);

  const artifact = artifacts?.[0];

  const currentFile = artifact?.files?.[activeFile];
  

  const getLanguage = (filename = "") => {
    const ext = filename.split(".").pop().toLowerCase();

    switch (ext) {
      case "html":
        return "html";

      case "css":
        return "css";

      case "js":
        return "javascript";

      case "jsx":
        return "jsx";

      case "ts":
        return "typescript";

      case "tsx":
        return "tsx";

      case "json":
        return "json";

      case "md":
        return "markdown";

      default:
        return "text";
    }
  };

  // Copy current file content
  const handleCopy = async () => {
    if (!currentFile?.content) return;

    await navigator.clipboard.writeText(currentFile.content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // preview
  const previewDocument = useMemo(() => {
    if (!artifact?.files) return "";

    const html =
      artifact.files.find((f) => f.name.endsWith(".html"))?.content || "";

    const css =
      artifact.files.find((f) => f.name.endsWith(".css"))?.content || "";

    const js =
      artifact.files.find((f) => f.name.endsWith(".js"))?.content || "";

    return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8"/>

<style>
${css}
</style>

</head>

<body>

${html}

<script>

${js}

</script>

</body>

</html>
`;
  }, [artifact]);

  // get color
  const getFileColor = (filename = "") => {
    const ext = filename.split(".").pop().toLowerCase();

    switch (ext) {
      case "html":
        return "text-orange-400";

      case "css":
        return "text-blue-400";

      case "js":
        return "text-yellow-400";

      case "jsx":
        return "text-cyan-400";

      case "ts":
      case "tsx":
        return "text-sky-400";

      case "json":
        return "text-green-400";

      case "md":
        return "text-gray-300";

      default:
        return "text-slate-400";
    }
  };

  // file badge
  const getFileBadge = (filename = "") => {
    const ext = filename.split(".").pop().toLowerCase();

    switch (ext) {
      case "html":
        return "HTML";

      case "css":
        return "CSS";

      case "js":
        return "JS";

      case "jsx":
        return "JSX";

      case "ts":
        return "TS";

      case "tsx":
        return "TSX";

      case "json":
        return "{}";

      case "md":
        return "MD";

      default:
        return "FILE";
    }
  };

   if (!artifact?.files?.length) return null

  return (
    <motion.aside
      initial={{ width: 360 }}
      animate={{
        width: collapsed ? 56 : 360,
      }}
      transition={{
        duration: 0.25,
        ease: easeInOut,
      }}
      className="hidden lg:flex h-full shrink-0 overflow-hidden border-l border-white/10 bg-[#0d1117]"
    >
      {/* COLLAPSED */}
      <AnimatePresence mode="wait">
        {collapsed ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center py-3"
          >
            {/* Expand Button */}
            <button
              onClick={() => setCollapsed(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <PanelRightClose size={16} className="rotate-180" />
            </button>

            {/* Vertical Title */}
            <div className="flex flex-1 items-center justify-center">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                {artifact.title}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full flex-col"
          >
            {/*  HEADER */}
            <header className="flex h-14 items-center border-b border-white/10 px-4">
              {/* Collapse */}
              <button
                onClick={() => setCollapsed(true)}
                className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <PanelRightClose size={16} />
              </button>

              {/* Artifact Icon */}
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20">
                <Code2 size={16} className="text-indigo-400" />
              </div>

              {/* Title */}
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-white">
                  {artifact.title}
                </h2>

                <p className="text-xs text-slate-500">
                  {artifact.files.length} files
                </p>
              </div>
            </header>

            {/*  TOOLBAR */}

            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
              {/* Copy Button */}

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={14} className="text-green-400" />
                      Copied
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy size={14} />
                      Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Code / Preview Switch */}

              <div className="flex rounded-lg bg-[#161b22] p-1">
                {/* Code */}

                <button
                  onClick={() => setTab("code")}
                  className={`relative flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
                    tab === "code"
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "code" && (
                    <motion.div
                      layoutId="toolbar-tab"
                      className="absolute inset-0 rounded-md bg-indigo-500"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    <Code2 size={13} />
                    Code
                  </span>
                </button>

                {/* Preview */}

                <button
                  onClick={() => setTab("preview")}
                  className={`relative flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
                    tab === "preview"
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "preview" && (
                    <motion.div
                      layoutId="toolbar-tab"
                      className="absolute inset-0 rounded-md bg-indigo-500"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    <Eye size={13} />
                    Preview
                  </span>
                </button>
              </div>
            </div>

            {/* FILE TABS */}

            <div className="border-b border-white/10">
              <div
                className="
      flex
      overflow-x-auto
      overflow-y-hidden
      whitespace-nowrap
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
    "
              >
                {artifact.files?.map((file, index) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveFile(index)}
                    className={`
          relative
          shrink-0
          flex
          items-center
          gap-2
          px-4
          py-3
          text-xs
          transition
          ${
            activeFile === index
              ? "text-white"
              : "text-slate-400 hover:text-white"
          }
        `}
                  >
                    {/* Badge */}

                    <span
                      className={`
            text-[9px]
            font-bold
            uppercase
            ${getFileColor(file.name)}
          `}
                    >
                      {getFileBadge(file.name)}
                    </span>

                    {/* Name */}

                    <span>{file.name}</span>

                    {/* Active Indicator */}

                    {activeFile === index && (
                      <motion.div
                        layoutId="active-file"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                        className="
              absolute
              bottom-0
              left-0
              right-0
              h-0.5
              bg-indigo-500
            "
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/*  CONTENT */}

            <div className="flex-1 overflow-hidden bg-[#0b0d12]">
              {tab === "code" ? (
                <SyntaxHighlighter
                  language={getLanguage(currentFile?.name)}
                  style={oneDark}
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    margin: 0,
                    padding: "20px",
                    background: "#0b0d12",
                    height: "100%",
                    overflow: "auto",
                    fontSize: "13px",
                    fontFamily:
                      "'JetBrains Mono','Fira Code','Consolas','monospace'",
                    lineHeight: "1.7",
                  }}
                  lineNumberStyle={{
                    minWidth: "2.5em",
                    color: "#6b7280",
                    userSelect: "none",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily:
                        "'JetBrains Mono','Fira Code','Consolas','monospace'",
                    },
                  }}
                >
                  {currentFile?.content || ""}
                </SyntaxHighlighter>
              ) : (
                <div className="h-full w-full">
                  <div className="h-full w-full bg-white">
                    <iframe
                      title="Preview"
                      srcDoc={previewDocument}
                      sandbox="allow-scripts allow-modals"
                      className="h-full w-full border-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default ArtiFact;
