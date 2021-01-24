/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogBySlug
// ====================================================

export interface BlogBySlug_sujamesBlogCollection_items_coverImg {
  width: number | null;
  height: number | null;
  url: string | null;
}

export interface BlogBySlug_sujamesBlogCollection_items {
  slug: string | null;
  title: string | null;
  coverImg: BlogBySlug_sujamesBlogCollection_items_coverImg | null;
  createdAt: any | null;
  description: string | null;
  content: string | null;
  tags: (string | null)[] | null;
}

export interface BlogBySlug_sujamesBlogCollection {
  items: (BlogBySlug_sujamesBlogCollection_items | null)[];
}

export interface BlogBySlug {
  sujamesBlogCollection: BlogBySlug_sujamesBlogCollection | null;
}

export interface BlogBySlugVariables {
  slug?: string | null;
}
