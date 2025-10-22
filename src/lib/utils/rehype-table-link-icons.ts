import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

/**
 * Rehype plugin to add icons to table cells based on link content
 * Detects content type (video, article, podcast, audio) and adds appropriate icon at cell start
 */
export default function rehypeTableLinkIcons() {
  return (tree: Root) => {
    const processedCells = new Set<Element>();

    visit(tree, "element", (node: Element) => {
      // Only process table cells (td) in the first column
      if (node.tagName === "td" && !processedCells.has(node)) {
        processedCells.add(node);

        // Find the first link in this cell
        const firstLink = findFirstLink(node);
        if (!firstLink) return;

        // Add target="_blank" to the link to open in new tab
        if (!firstLink.properties) {
          firstLink.properties = {};
        }
        firstLink.properties.target = "_blank";
        firstLink.properties.rel = "noopener noreferrer";

        // Get the text content of the cell (not just the link)
        const cellText = getTextContent(node);
        const lowerText = cellText.toLowerCase();

        // Determine icon based on text content
        let iconPath: string | null = null;

        if (lowerText.includes("video") || lowerText.includes("watch")) {
          iconPath = "/icons/video.svg";
        } else if (
          lowerText.includes("podcast") ||
          lowerText.includes("listen") ||
          lowerText.includes("audio")
        ) {
          iconPath = "/icons/audio.svg";
        } else if (
          lowerText.includes("article") ||
          lowerText.includes("read") ||
          lowerText.includes("study") ||
          lowerText.includes("slides") ||
          lowerText.includes("docs")
        ) {
          iconPath = "/icons/article.svg";
        }

        // If an icon was matched, prepend it to the cell
        if (iconPath) {
          const iconNode: Element = {
            type: "element",
            tagName: "img",
            properties: {
              src: iconPath,
              alt: "",
              className: ["table-cell-icon"],
            },
            children: [],
          };

          // Wrap all existing content in a span to keep it together
          const contentWrapper: Element = {
            type: "element",
            tagName: "span",
            properties: {
              className: ["table-cell-content"],
            },
            children: [...node.children],
          };

          // Replace cell children with icon and wrapped content
          node.children = [iconNode, contentWrapper];
        }
      }
    });
  };
}

/**
 * Helper function to find the first link in a node
 */
function findFirstLink(node: ASTNode): Element | null {
  if (
    node.type === "element" &&
    "tagName" in node &&
    node.tagName === "a"
  ) {
    return node as Element;
  }

  if ("children" in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      const link = findFirstLink(child);
      if (link) return link;
    }
  }

  return null;
}

type ASTNode = Element | { type: string; value?: string; children?: ASTNode[] };

/**
 * Helper function to extract text content from a node
 */
function getTextContent(node: Element): string {
  let text = "";

  function extract(n: ASTNode): void {
    if (n.type === "text" && "value" in n) {
      text += n.value;
    } else if ("children" in n && Array.isArray(n.children)) {
      n.children.forEach(extract);
    }
  }

  extract(node);
  return text;
}

