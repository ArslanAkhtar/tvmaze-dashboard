import { baseURL } from "../helpers/constants";
import { useFetch } from "@vueuse/core";

export default function useFetchShows() {
  interface HttpArgs {
    url: string;
    params?: Record<string, string>;
  }

  const http = (args: HttpArgs) => {
    const url = new URL(baseURL);
    url.pathname = args.url;

    if (args.params) {
      url.search = new URLSearchParams(args.params).toString();
    }

    return useFetch(url.toString(), {
      afterFetch(ctx) {
        // eslint-disable-next-line no-self-assign
        ctx.data = ctx.data;
        return ctx;
      }
    })
      .get()
      .json();
  };

  const loadShows = () => {
    return http({
      url: "/shows"
    });
  };

  const showDetails = (id: number) => {
    return http({
      url: `/shows/${id}`
    });
  };

  const loadShowSeasons = (id: number) => {
    return http({
      url: `/shows/${id}/seasons`
    });
  };

  const loadShowEpisodes = (id: number) => {
    return http({
      url: `/seasons/${id}/episodes`
    });
  };

  const searchShows = (query: string) => {
    return http({
      url: "/search/shows",
      params: {
        q: query
      }
    });
  };

  const loadSimilarShows = (id: number) => {
    return http({
      url: `/shows/${id}/similar`
    });
  };

  return {
    loadShows,
    showDetails,
    loadShowSeasons,
    loadShowEpisodes,
    searchShows,
    loadSimilarShows
  };
}
