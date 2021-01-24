/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogCollection
// ====================================================

export interface BlogCollection_sujamesBlogCollection_items_coverImg {
  width: number | null;
  height: number | null;
  url: string | null;
}

export interface BlogCollection_sujamesBlogCollection_items {
  slug: string | null;
  title: string | null;
  coverImg: BlogCollection_sujamesBlogCollection_items_coverImg | null;
  createdAt: any | null;
  description: string | null;
  content: string | null;
  tags: (string | null)[] | null;
}

export interface BlogCollection_sujamesBlogCollection {
  items: (BlogCollection_sujamesBlogCollection_items | null)[];
}

export interface BlogCollection {
  sujamesBlogCollection: BlogCollection_sujamesBlogCollection | null;
}

export interface BlogCollectionVariables {
  skip?: number | null;
  limit?: number | null;
  preview?: boolean | null;
}
