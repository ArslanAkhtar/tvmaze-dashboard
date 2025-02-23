import { defaultImage } from "./constants";
import { router } from "@/router";
import type { Show } from "./types";

export const imgURL = (url: string | undefined) => url || defaultImage;

export const navigateToRoute = (routeName: string, params = {}) => {
  const route = { name: routeName, params };
  return router.push(route);
};

export const openExternalURL = (url: string) => window.open(url, "_blank");
export const getYear = (date: string | undefined) =>
  date ? new Date(date).getFullYear().toString() : undefined;

export function filterShows(
  genres: string[],
  rating: string | undefined,
  data: Show[]
) {
  let temp = [...data];
  if (rating && rating !== "") {
    const numberRating = Number(rating.replace("+", "").trim());
    temp = temp.filter((item: Show) => item.rating.average >= numberRating);
  }
  if (genres.length) {
    temp = temp.filter((item: Show) =>
      item.genres.some((item: string) => genres.includes(item))
    );
  }
  return temp;
}
