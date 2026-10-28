"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FolderOpen, Search } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";

type Locale = "vi" | "en";

const copy = {
  vi: {
    collection: "Bộ công cụ",
    brandNote: "Phần mềm cá nhân",
    categories: "Danh mục",
    technologies: "Công nghệ",
    sampleData: "Dữ liệu mẫu",
    title: "Những công cụ mình đã hoàn thiện.",
    intro: "Các sản phẩm phần mềm mình làm, chia sẻ để mọi người khám phá.",
    browse: "Khám phá công cụ",
    tools: "Công cụ trong bộ sưu tập",
    emptyTitle: "Chưa có công cụ nào được đăng.",
    emptyBody: "Danh mục đã sẵn sàng cho sản phẩm đầu tiên.",
    search: "Tìm công cụ",
    all: "Tất cả",
    results: "{count} kết quả",
    noResults: "Không tìm thấy công cụ phù hợp.",
    clear: "Xóa bộ lọc",
    demo: "Dùng thử",
    source: "Mã nguồn",
    download: "Tải xuống",
    language: "Ngôn ngữ",
    backToTop: "Lên đầu trang",
    decorTitle: "Chỉ mục công cụ",
    decorSub: "Phần mềm hữu ích, làm có chủ đích",
  },
  en: {
    collection: "Tool collection",
    brandNote: "Personal software",
    categories: "Categories",
    technologies: "Technologies",
    sampleData: "Sample data",
    title: "Tools I’ve built and finished.",
    intro: "Software projects I’ve made, shared for people to explore.",
    browse: "Browse tools",
    tools: "Tools in the collection",
    emptyTitle: "No tools have been published yet.",
    emptyBody: "The catalog is ready for its first entry.",
    search: "Search tools",
    all: "All tools",
    results: "{count} results",
    noResults: "No tools match that search.",
    clear: "Clear filters",
    demo: "Try it",
    source: "Source",
    download: "Download",
    language: "Language",
    backToTop: "Back to top",
    decorTitle: "Tool index",
    decorSub: "Software, made with intention",
  },
} as const;

export function ToolShelf() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const text = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = locale === "vi" ? "Công cụ mình làm" : "Tools I’ve built";
  }, [locale]);

  const categories = useMemo(
    () =>
      Array.from(
        new Map(products.map((product) => [product.category.id, product.category[locale]] as const)),
      ),
    [locale],
  );

  const matchingProducts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(locale === "vi" ? "vi-VN" : "en-US");
    return products.filter((product) => {
      const matchesCategory = category === null || product.category.id === category;
      const haystack = [
        product.name.vi,
        product.name.en,
        product.description.vi,
        product.description.en,
        product.category.vi,
        product.category.en,
        ...product.tags,
      ]
        .join(" ")
        .toLocaleLowerCase(locale === "vi" ? "vi-VN" : "en-US");
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [category, locale, query]);

  const resetFilters = () => {
    setQuery("");
    setCategory(null);
  };

  return (
    <div id="top" className="site-shell">
      <header className="site-header container">
        <a className="wordmark" href="#top" aria-label={text.collection}>
          <span className="wordmark__name">{text.collection}</span>
          <span className="wordmark__note">{text.brandNote}</span>
        </a>
        <div className="header-tools">
          <a className="header-link" href="#tools">
            {text.tools}
          </a>
          <div className="language-switch" role="group" aria-label={text.language}>
            {(["vi", "en"] as const).map((language) => (
              <button
                key={language}
                type="button"
                className="language-switch__button"
                aria-pressed={locale === language}
                aria-label={language === "vi" ? "Tiếng Việt" : "English"}
                onClick={() => setLocale(language)}
              >
                {language === "vi" ? "VI" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__inner container">
            <div className="hero__copy">
              <h1 id="hero-title">{text.title}</h1>
              <p className="hero__intro">{text.intro}</p>
              <a className="primary-action" href="#tools">
                {text.browse}
              </a>
            </div>

            <div className="workbench" aria-hidden="true">
              <div className="workbench__desk" />
              <div className="workbench__sheet workbench__sheet--back" />
              <div className="workbench__sheet workbench__sheet--middle" />
              <div className="workbench__sheet workbench__sheet--front">
                <div className="workbench__topline">
                  <span>{text.decorTitle}</span>
                  <span className="workbench__tab" />
                </div>
                <div className="workbench__content">
                  <div className="workbench__rule workbench__rule--long" />
                  <div className="workbench__rule workbench__rule--short" />
                  <div className="workbench__rule workbench__rule--medium" />
                </div>
                <div className="workbench__bottomline">{text.decorSub}</div>
              </div>
              <span className="workbench__seal" />
            </div>
          </div>
        </section>

        <section id="tools" className="collection container" aria-labelledby="tools-title">
          <div className="collection__heading">
            <h2 id="tools-title">{text.tools}</h2>
            {products.length > 0 && (
              <p className="collection__count" aria-live="polite">
                {text.results.replace("{count}", String(matchingProducts.length))}
              </p>
            )}
          </div>

          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__symbol" aria-hidden="true">
                <FolderOpen strokeWidth={1.4} />
              </div>
              <div className="empty-state__copy">
                <h3>{text.emptyTitle}</h3>
                <p>{text.emptyBody}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="catalog-controls">
                <label className="search-field">
                  <span className="visually-hidden">{text.search}</span>
                  <Search className="search-field__icon" aria-hidden="true" size={18} />
                  <Input
                    className="search-field__input"
                    type="search"
                    value={query}
                    placeholder={text.search}
                    aria-label={text.search}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <div className="category-filters" role="group" aria-label={text.categories}>
                  <Button
                    type="button"
                    variant="ghost"
                    className={`filter-button${category === null ? " is-selected" : ""}`}
                    aria-pressed={category === null}
                    onClick={() => setCategory(null)}
                  >
                    {text.all}
                  </Button>
                  {categories.map(([id, name]) => (
                    <Button
                      key={id}
                      type="button"
                      variant="ghost"
                      className={`filter-button${category === id ? " is-selected" : ""}`}
                      aria-pressed={category === id}
                      onClick={() => setCategory(id)}
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </div>

              {matchingProducts.length > 0 ? (
                <ul className="tool-list">
                  {matchingProducts.map((product) => {
                    const actions = [
                      { url: product.links.demo, label: text.demo },
                      { url: product.links.source, label: text.source },
                      { url: product.links.download, label: text.download },
                    ].flatMap((action) => action.url ? [action] : []);

                    return (
                      <li className="tool-row" key={product.id}>
                        {product.preview && (
                          <Popover.Root>
                            <Popover.Trigger
                              className="tool-row__preview-trigger"
                              openOnHover
                              closeDelay={120}
                              aria-label={product.preview.alt[locale]}
                            >
                              <Image
                                className="tool-row__preview"
                                src={product.preview.src}
                                alt={product.preview.alt[locale]}
                                width={1440}
                                height={900}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </Popover.Trigger>
                            <Popover.Portal>
                              <Popover.Positioner
                                className="tool-row__preview-positioner"
                                side="top"
                                align="center"
                                sideOffset={12}
                              >
                                <Popover.Popup className="tool-row__preview-popover">
                                  <Image
                                    src={product.preview.src}
                                    alt=""
                                    width={1440}
                                    height={900}
                                    sizes="(max-width: 720px) calc(100vw - 32px), 640px"
                                  />
                                </Popover.Popup>
                              </Popover.Positioner>
                            </Popover.Portal>
                          </Popover.Root>
                        )}
                        <div className="tool-row__main">
                          <h3>{product.name[locale]}</h3>
                          <p>{product.description[locale]}</p>
                          <div className="tool-row__meta">
                            <span>{product.category[locale]}</span>
                            {product.sample && <span className="tool-row__sample">{text.sampleData}</span>}
                            {product.tags.length > 0 && (
                              <ul className="tool-tags" aria-label={text.technologies}>
                                {product.tags.map((tag) => (
                                  <li key={tag}>{tag}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        {actions.length > 0 && (
                          <div className="tool-row__actions">
                            {actions.map((action) => (
                              <a
                                key={action.label}
                                href={action.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {action.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="no-results">
                  <p>{text.noResults}</p>
                  <Button type="button" variant="outline" onClick={resetFilters}>
                    {text.clear}
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <footer className="site-footer container">
        <span>{text.collection}</span>
        <a href="#top">{text.backToTop}</a>
      </footer>
    </div>
  );
}
