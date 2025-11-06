// stackbit.config.ts
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"], // folder that will store your editable content
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "body", type: "markdown", required: false },
          ],
        },
      ],
    }),
  ],
  siteMap: ({ documents, models }) => {
    const pageModels = models.filter((m) => m.type === "page");
    return documents
      .filter((d) => pageModels.some((m) => m.name === d.modelName))
      .map((doc) => ({
        stableId: doc.id,
        urlPath: `/${doc.id}`,
        document: doc,
        isHomePage: doc.id === "index",
      }));
  },
});
