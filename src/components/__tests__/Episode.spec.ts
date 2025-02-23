/**
 * @file Episodes.spec.ts
 * @description Unit tests for the Episodes.vue component, focusing on functionality.
 */

import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Episodes from "../Episodes.vue";
import useFetchShows from "../../composables/FetchData";
import { openExternalURL, imgURL } from "../../helpers/utility";
import { ref } from "vue";

/**
 * @description Mock FetchData composable.
 */
vi.mock("@/composables/FetchData", () => ({
  default: vi.fn(() => ({
    loadShowEpisodes: vi.fn(() => {
      const fetchResult = {
        data: ref([]),
        isFetching: ref(true),
        error: ref(null),
        isFinished: ref(false),
        statusCode: ref(200),
        response: ref(null),
        canAbort: vi.fn(() => false),
        aborted: ref(false),
        abort: vi.fn(),
        execute: vi.fn(() => Promise.resolve(fetchResult)),
        onFetchResponse: vi.fn(),
        onFetchError: vi.fn(),
        onFetchFinally: vi.fn(),
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
        patch: vi.fn(),
        head: vi.fn(),
        options: vi.fn()
      };

      return Object.assign(Promise.resolve(fetchResult), fetchResult);
    })
  }))
}));

/**
 * @description Mock external utility functions.
 */
vi.mock("@/helpers/utility", () => ({
  openExternalURL: vi.fn(),
  imgURL: vi.fn((url) => url || "https://default-image.com/default.jpg") // Mock image URL handling
}));

describe("Episodes.vue - Functionality Tests", () => {
  /**
   * @test Ensures the component shows a loader while fetching data.
   */
  it("shows loader when fetching data", async () => {
    vi.mocked(useFetchShows).mockReturnValue({
      loadShowEpisodes: vi.fn(() => ({
        data: ref([]),
        isFetching: ref(true),
        error: ref(null),
        isFinished: ref(false),
        statusCode: ref(200),
        response: ref(null),
        canAbort: vi.fn(() => false),
        aborted: ref(false),
        abort: vi.fn(),
        execute: vi.fn(() => Promise.resolve({ data: ref([]) })),
        onFetchResponse: vi.fn(),
        onFetchError: vi.fn(),
        onFetchFinally: vi.fn()
      }))
    });

    const wrapper = mount(Episodes, { props: { id: 1 } });

    await flushPromises();

    const loaderExists = wrapper.findComponent({ name: "Loader" }).exists();
    expect(loaderExists).toBe(true);
  });

  /**
   * @test Ensures episodes are fetched and available in the component.
   */
  it("fetches and displays episodes", async () => {
    vi.mocked(useFetchShows).mockReturnValue({
      loadShowEpisodes: vi.fn(() => {
        const fetchResult = {
          data: ref([
            {
              id: 1,
              name: "Episode 1",
              number: 1,
              url: "https://test.com/1",
              image: { medium: "https://test.com/image1.jpg" }
            },
            {
              id: 2,
              name: "Episode 2",
              number: 2,
              url: "https://test.com/2",
              image: { medium: "https://test.com/image2.jpg" }
            }
          ]),
          isFetching: ref(false),
          error: ref(null),
          isFinished: ref(true),
          statusCode: ref(200),
          response: ref(null),
          canAbort: ref(false),
          aborted: ref(false),
          abort: vi.fn(),
          execute: vi.fn(() => Promise.resolve(fetchResult)),
          onFetchResponse: vi.fn(),
          onFetchError: vi.fn(),
          onFetchFinally: vi.fn(),
          json: vi.fn(),
          text: vi.fn(),
          blob: vi.fn(),
          arrayBuffer: vi.fn(),
          formData: vi.fn(),
          get: vi.fn(),
          post: vi.fn(),
          put: vi.fn(),
          delete: vi.fn(),
          patch: vi.fn(),
          head: vi.fn(),
          options: vi.fn()
        };

        return Object.assign(Promise.resolve(fetchResult), fetchResult);
      })
    });

    const wrapper = mount(Episodes, { props: { id: 1 } });

    await flushPromises();

    const episodeList = wrapper.vm.episodes;
    expect(episodeList.length).toBe(2);
    expect(episodeList[0].name).toBe("Episode 1");
    expect(imgURL).toHaveBeenCalledWith("https://test.com/image1.jpg");
  });

  /**
   * @test Ensures clicking an episode calls the external URL function.
   */
  it("calls openExternalURL when an episode is clicked", async () => {
    vi.mocked(useFetchShows).mockReturnValue({
      loadShowEpisodes: vi.fn(() => ({
        data: ref([
          {
            id: 1,
            name: "Episode 1",
            number: 1,
            url: "https://test.com/1",
            image: { medium: "https://test.com/image1.jpg" }
          }
        ]),
        isFetching: ref(false),
        error: ref(null),
        isFinished: ref(true),
        statusCode: ref(200),
        response: ref(null),
        canAbort: vi.fn(() => false),
        abort: vi.fn(),
        execute: vi.fn(() => Promise.resolve({ data: ref([]) }))
      }))
    });

    await flushPromises();

    await openExternalURL("https://test.com/1");

    expect(openExternalURL).toHaveBeenCalledWith("https://test.com/1");
  });

  /**
   * @test Ensures error handling works when API fails.
   */
  it("displays error message when there is an API error", async () => {
    vi.mocked(useFetchShows).mockReturnValue({
      loadShowEpisodes: vi.fn(() => ({
        data: ref([]),
        isFetching: ref(false),
        error: ref("Failed to load episodes"),
        isFinished: ref(true),
        statusCode: ref(500),
        response: ref(null),
        canAbort: vi.fn(() => false),
        abort: vi.fn(),
        execute: vi.fn(() => Promise.resolve({ data: ref([]) }))
      }))
    });

    const wrapper = mount(Episodes, { props: { id: 1 } });

    await flushPromises();

    expect(wrapper.vm.ErrorText).toBe("Failed to load episodes");
  });

  /**
   * @test Ensures an empty episode list is handled correctly.
   */
  it("handles empty episodes list gracefully", async () => {
    vi.mocked(useFetchShows).mockReturnValue({
      loadShowEpisodes: vi.fn(() => ({
        data: ref([]),
        isFetching: ref(false),
        error: ref(null),
        isFinished: ref(true),
        statusCode: ref(200),
        response: ref(null),
        canAbort: vi.fn(() => false),
        abort: vi.fn(),
        execute: vi.fn(() => Promise.resolve({ data: ref([]) }))
      }))
    });

    const wrapper = mount(Episodes, { props: { id: 1 } });

    await flushPromises();

    expect(wrapper.vm.episodes.length).toBe(0);
  });
});
