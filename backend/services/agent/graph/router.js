import { getModel } from "../config/llmModels.js"

export const router = async(state) => {
  const llm = await getModel("router")
  const prompt = `text
You are an agent router.

Available agents:
- chat
- search
- coding
- pdf
- ppt
- image

Rules:

chat:
- General conversation
- Explanations
- Learning
- Questions

search:
- Current events
- Latest information
- News
- Recent developments
- Internet lookup

coding:
- Generate code
- Debug code
- Build projects
- Architecture
- API design

vision:
- Generate image
- create image

pdf:
- Questions about generating PDFs or document context

ppt:
- Questions about generating PowerPoint presentations or PPT context

Return ONLY one word:
- chat
- search
- coding
- pdf
- ppt
- vision

User Query:
${state.prompt}
`

const response = await llm.invoke(prompt);
console.log(response)
return {
  ...state,
  agent:response.content
        .trim()
        .toLowerCase()
}

}

