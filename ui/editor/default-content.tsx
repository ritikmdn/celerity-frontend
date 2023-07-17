const DEFAULT_EDITOR_CONTENT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Introducing Celerity" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Celerity is an AI sense checker that ensures your writing is coherent with your business data.",
        }
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Highlight the text that you'd like to sense check.",
        }
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Sample research based on indexed reports" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "The overall fintech market opportunity in India is estimated at $584B and is expected to reach $2T by 2030, growing at a compounded annual growth rate (CAGR) of 18% from 2022 to 2030." }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "The growth of fintech in India is driven by factors such as the rise in informal employment, increasing per capita income, expanding internet user base (930M today to 1.3B by 2030), and significant venture capital flow. " },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "India has seen a significant rise in fintech investment, with about $35 billion invested across segments thus far, more than doubling India’s share of global fintech funding since 2016.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default DEFAULT_EDITOR_CONTENT;
