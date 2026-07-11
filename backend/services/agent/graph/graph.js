import { END, START, StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { chatAgent } from "../agents/chatAgent.js";
import { codingAgent } from "../agents/codingAgent.js";
import { visionAgent } from "../agents/vision.js";
import { pdfAgent } from "../agents/pdfAgent.js";
import { pptAgent } from "../agents/pptAgent.js";
import { searchAgent } from "../agents/searchAgent.js";
import { router } from "./router.js";

const workflow = new StateGraph(agentState);

workflow.addNode("router", router);
workflow.addNode("chat", chatAgent);
workflow.addNode("coding", codingAgent);
workflow.addNode("vision", visionAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("search", searchAgent);

workflow.addEdge(START, "router");
workflow.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case "chat":
        return "chat";
      case "coding":
        return "coding";
      case "pdf":
        return "pdf";
      case "ppt":
        return "ppt";
      case "search":
        return "search";
      case "vision":
        return "vision";
      default:
        return "chat";
    }
  },
  {
    chat: "chat",
    coding: "coding",
    pdf: "pdf",
    ppt: "ppt",
    search: "search",
    vision: "vision",
  },
);

workflow.addEdge("search", "chat");
workflow.addEdge("chat", END);
workflow.addEdge("coding", END);
workflow.addEdge("pdf", END);
workflow.addEdge("ppt", END);
workflow.addEdge("vision", END);

export const graph = workflow.compile();

// langgraph---------

//                         start
//                           |
//                           |                                                 direct
//                       route agent
//                             |
//   ------------------------------------------------------------------
//   |           |           |             |             |             |      conditional
//   |           |           |             |             |             |
//   |           |           |             |             |             |
// chat <_____search        coding        pdf           ppt         vision
//   |           |           |             |             |             |        direct
//   |           |           |             |             |             |
//   |           |           |             |             |             |
//   |           |           |             |             |             |
//   ___________________________________________________________________
//                               |
//                               end
