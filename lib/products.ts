export type Product = {
  id: string;
  name: { vi: string; en: string };
  description: { vi: string; en: string };
  category: { id: string; vi: string; en: string };
  tags: string[];
  sample?: boolean;
  preview?: { src: string; alt: { vi: string; en: string } };
  links: {
    demo?: string;
    source?: string;
    download?: string;
  };
};

export const products: Product[] = [
  {
    id: "highlighter",
    name: { vi: "Highlighter", en: "Highlighter" },
    description: {
      vi: "Thư viện và tiện ích Chrome/Edge để tô sáng, lưu và chia sẻ đoạn văn bản trên website.",
      en: "A library and Chrome/Edge extension for highlighting, saving, and sharing text on websites.",
    },
    category: { id: "browser-tools", vi: "Tiện ích trình duyệt", en: "Browser tools" },
    tags: ["TypeScript", "Chrome", "Edge"],
    preview: {
      src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/highlighter-preview.png`,
      alt: {
        vi: "Ảnh playground Highlighter với một đoạn văn đã được tô sáng.",
        en: "Highlighter playground with a passage of text highlighted.",
      },
    },
    links: { source: "https://github.com/Phunghao2701/highlighter" },
  },
  {
    id: "sample-dev-tool",
    name: { vi: "Công cụ mẫu: Hỗ trợ lập trình", en: "Sample tool: Developer helper" },
    description: {
      vi: "Mô tả minh họa cho một công cụ dành cho lập trình viên.",
      en: "Placeholder description for a developer tool.",
    },
    category: { id: "developer-tools", vi: "Công cụ lập trình", en: "Developer tools" },
    tags: ["Demo", "Software"],
    sample: true,
    links: {},
  },
  {
    id: "sample-data-tool",
    name: { vi: "Công cụ mẫu: Kiểm tra dữ liệu", en: "Sample tool: Data checker" },
    description: {
      vi: "Mô tả minh họa cho một tiện ích kiểm tra dữ liệu.",
      en: "Placeholder description for a data checking utility.",
    },
    category: { id: "utilities", vi: "Tiện ích", en: "Utilities" },
    tags: ["Demo", "Data"],
    sample: true,
    links: {},
  },
];
