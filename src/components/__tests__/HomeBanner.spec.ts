/**
 * @file HomeBanner.spec.ts
 * @description Unit tests for the HomeBanner.vue component, ensuring functionality and edge cases are covered.
 */

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import HomeBanner from "../HomeBanner.vue";

/**
 * @description Unit test suite for HomeBanner.vue component.
 */
describe("HomeBanner.vue", () => {
  const mockShow = {
    name: "Breaking Bad",
    image: {
      original: "https://test.com/breakingbad.jpg"
    },
    summary: "<p>A high school chemistry teacher turned meth kingpin.</p>",
    genres: ["Crime", "Drama", "Thriller"]
  };

  /**
   * @test Ensures the component renders correctly.
   */
  it("renders the home banner component", () => {
    const wrapper = mount(HomeBanner, { props: { show: mockShow } });
    expect(wrapper.exists()).toBe(true);
  });

  /**
   * @test Ensures the background image is set correctly.
   */
  it("applies the correct background image", () => {
    const wrapper = mount(HomeBanner, { props: { show: mockShow } });
    expect(
      wrapper.find('[data-test-id="background-image"]').attributes("style")
    ).toContain(`background-image: url(${mockShow.image.original})`);
  });

  /**
   * @test Ensures the show name is displayed correctly.
   */
  it("displays the correct show name", () => {
    const wrapper = mount(HomeBanner, { props: { show: mockShow } });
    expect(wrapper.find('[data-test-id="show-name"]').text()).toBe(
      mockShow.name
    );
  });

  /**
   * @test Ensures the show summary is cleaned and displayed correctly.
   */
  it("removes HTML tags from the show summary", () => {
    const wrapper = mount(HomeBanner, { props: { show: mockShow } });
    expect(wrapper.find('[data-test-id="show-summary"]').text()).toBe(
      "A high school chemistry teacher turned meth kingpin."
    );
  });

  /**
   * @test Ensures all genres are displayed correctly.
   */
  it("displays the correct genres", () => {
    const wrapper = mount(HomeBanner, { props: { show: mockShow } });
    const genres = wrapper.findAll('[data-test-id="genre-item"]');

    expect(genres.length).toBe(mockShow.genres.length);
    mockShow.genres.forEach((genre, index) => {
      expect(genres[index].text()).toBe(genre);
    });
  });

  /**
   * @test Ensures the component handles missing image gracefully.
   */
  it("handles missing image gracefully", () => {
    const wrapper = mount(HomeBanner, {
      props: { show: { ...mockShow, image: {} } }
    });
    expect(
      wrapper.find('[data-test-id="background-image"]').attributes("style")
    ).toContain("background-image: url(undefined)");
  });

  /**
   * @test Ensures the component handles missing genres gracefully.
   */
  it("handles missing genres gracefully", () => {
    const wrapper = mount(HomeBanner, {
      props: { show: { ...mockShow, genres: [] } }
    });
    expect(wrapper.find('[data-test-id="genres"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-test-id="genre-item"]').length).toBe(0);
  });
});
