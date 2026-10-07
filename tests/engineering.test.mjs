import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import {
  parseArticle,
  getArticles,
  getArticle,
  getRelatedArticles,
} from "../lib/engineering.ts";
import { work } from "../lib/work.ts";

const fixture = (
  fields = "",
  body = "## A system boundary\n\nAn explanation.",
) => `---
title: "A test note"
description: "A test description"
publishedAt: "2026-10-07"
tags: ["Commerce"]
${fields}
---
${body}`;

test("articles get a canonical route without hand-authored metadata", () => {
  const article = parseArticle(fixture(), "system-boundaries");
  assert.equal(
    article.canonicalUrl,
    "https://hexcode.au/engineering/system-boundaries",
  );
  assert.deepEqual(article.tags, ["Commerce"]);
});

test("draft content can be incomplete and is excluded before publication", () => {
  assert.equal(
    parseArticle("---\ndraft: true\n---\nUnfinished", "draft-note"),
    null,
  );
});

test("published dates must be real quoted dates and updates cannot precede publication", () => {
  assert.throws(
    () =>
      parseArticle(fixture().replace('"2026-10-07"', '"2026-02-30"'), "note"),
    /publishedAt/,
  );
  assert.throws(
    () => parseArticle(fixture().replace('"2026-10-07"', "2026-10-07"), "note"),
    /quoted/,
  );
  assert.throws(
    () => parseArticle(fixture('updatedAt: "2026-10-06"'), "note"),
    /precedes/,
  );
});

test("unsafe slugs, canonical schemes and incomplete social metadata fail publication", () => {
  assert.throws(() => parseArticle(fixture(), "../README"), /slug/);
  assert.throws(
    () => parseArticle(fixture('canonicalUrl: "javascript:alert(1)"'), "note"),
    /HTTPS/,
  );
  assert.throws(
    () => parseArticle(fixture('socialImage: "/image.png"'), "note"),
    /socialImageAlt/,
  );
  assert.throws(
    () =>
      parseArticle(
        fixture('socialImage: "//external.example/image.png"'),
        "note",
      ),
    /local/,
  );
});

test("article body cannot introduce a second H1; fenced code may contain one", () => {
  assert.throws(
    () => parseArticle(fixture("", "# Another title"), "note"),
    /H2/,
  );
  assert.ok(
    parseArticle(
      fixture("", "## Example\n\n```sh\n# A shell comment\n```"),
      "note",
    ),
  );
});

test("repository articles resolve to real related projects and related notes exclude self", () => {
  const articles = getArticles();
  assert.ok(articles.length > 0);
  assert.equal(
    new Set(articles.map((article) => article.slug)).size,
    articles.length,
  );
  for (const article of articles) {
    assert.equal(getArticle(article.slug)?.title, article.title);
    if (article.relatedProject)
      assert.ok(
        work.some((project) => project.slug === article.relatedProject),
      );
    assert.ok(
      getRelatedArticles(article).every(
        (related) => related.slug !== article.slug,
      ),
    );
  }
  assert.equal(getArticle("../../README"), undefined);
  assert.equal(getArticle("unpublished-note"), undefined);
});

test("Markdown renderer skips raw HTML and filters unsafe link protocols", () => {
  const html = renderToStaticMarkup(
    React.createElement(
      ReactMarkdown,
      { skipHtml: true },
      "<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))\n\n[case study](/work/palermo)\n\n```ts\nconst value = 1;\n```",
    ),
  );
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(html.includes('href="/work/palermo"'));
  assert.ok(html.includes("<pre><code"));
});
