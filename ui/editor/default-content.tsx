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
          text: "Celerity is an AI workbench for strategy and investment professionals. This version implements the following features as a proof of concept:",
        }
      ],
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
              content: [{ type: "text", text: "Sense check: Highlight the text that you want to proofread, and the assistant will check for conflicts and errors against your data sources" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Search: The assistant lets you search for information from the ingested data and selected external sources" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "You can ingest internal data as pdfs to the workbench from the sidebar. Additionally, you can use external sources - demography data from Our World in Data & economic data from IMF for India.",
        }
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Sample research on the Indian fintech market" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The overall Indian fintech market opportunity is estimated at $584B and expected to reach $5T by 2030, growing at a compounded annual growth rate (CAGR) of 18% from 2022 to 2030 driven by: ",
        }
      ],
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
              content: [
                { type: "text", text: "India’s large population (1.4B in 2021), rise in informal employment, increasing per capita income (Gross domestic product per capita expected to grow by 8% between 2022 to 2028), and growing internet user base (930M today to 1.3B by 2030)" },
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
                  text: "Significant venture capital flow with $35B invested across segments thus far, more than doubling India’s share of global fintech funding since 2016 ",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Fintech has played a significant role in transforming India's financial landscape and driving economic growth, contributing 7% to India’s Gross domestic product of $2.5T in 2020. ",
        }
      ],
    },
  ],
};

export default DEFAULT_EDITOR_CONTENT;
