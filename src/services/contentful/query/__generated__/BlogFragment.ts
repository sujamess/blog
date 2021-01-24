/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogFragment
// ====================================================

export interface BlogFragment_coverImg {
  width: number | null;
  height: number | null;
  url: string | null;
}

export interface BlogFragment {
  slug: string | null;
  title: string | null;
  coverImg: BlogFragment_coverImg | null;
  createdAt: any | null;
  description: string | null;
  content: string | null;
  tags: (string | null)[] | null;
}
