import axios from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";

import { ParsedUrlQuery } from "querystring";

export function apiClient(
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_URL;

  const api = axios.create({
    baseURL: BASE_DOMAIN,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  return api;
}
