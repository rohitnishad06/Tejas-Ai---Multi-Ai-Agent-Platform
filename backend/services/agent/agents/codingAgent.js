import { getModel } from "../config/llmModels.js";

export const codingAgent = async (state) => {
  const intentLlm = await getModel("intent");
  const llm = await getModel("coding");
  const intentRes = await intentLlm.invoke(`
            You are an intent classifier.
          Return ONLY one of these values.
            CODE_GENERATION
            CODE_REVIEW
            CODE_EXPLANATION
            DEBUGGING
            OPTIMIZATION
            CONVERSION
            DOCUMENTATION
            User Request:
            ${state.prompt}
        `);
  const intent = intentRes.content;

  if (intent == "CODE_GENERATION") {
    const prompt = `
You are Tejas Ai Coding Agent.

Generate the requested project.

Default Stack:
- HTML
- CSS
- JavaScript

Only use React, Next.js, Vue, Tailwind CSS, Bootstrap, TypeScript, or any other framework if the user explicitly requests it.

Requirements:
- Responsive design
- Modern UI
- CSS Variables
- Flexbox/Grid
- Smooth scrolling
- Hover effects
- Clean spacing
- Semantic HTML
- Accessible components
- Mobile-first
- Single-page application unless the user requests multiple pages

IMAGES
===================
 ALWAYS USE REAL UNSPLASH IMAGES.
 never use placeholder

Return ONLY valid JSON.

The JSON schema must be exactly:

{
  "files": [
    {
      "name": "index.html",
      "content": "..."
    },
    {
      "name": "style.css",
      "content": "..."
    },
    {
      "name": "script.js",
      "content": "..."
    }
  ]
}

Rules:
- Output must start with "{"
- Output must end with "}"
- Do NOT wrap the JSON in markdown
- Do NOT use \`\`\`json
- Do NOT include explanations
- Do NOT include comments outside the JSON
- Do NOT include extra text before or after the JSON
- Escape all quotes and newlines correctly so the JSON is valid
- Every file must contain valid code

User Request:
${state.prompt}
`;

    const res = await llm.invoke(prompt);

    const data = JSON.parse(res.content);
    return {
      ...state,
      aiResponse: "code generated successfuly",
      artifacts: [
        {
          id: Date.now(),
          type: "Project",
          files: data.files || [],
          title:state.prompt
        },
      ],
    };
  }

  const res = await llm.invoke(`
    The user's request is:
${intent}
Return Markdown only.
Never generate project files.
Use headings like:
# Overview
## Explanation
## Problems
## Improvements
## Best Practices
## Optimized Code (if needed)
User Request:
${state.prompt}
    `);

  const data = res.content;
  return {
    ...state,
    aiResponse: data,
    artifacts: [],
  };
};
