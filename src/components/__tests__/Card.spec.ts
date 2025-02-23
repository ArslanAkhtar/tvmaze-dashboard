/**
 * @file Card.spec.ts
 * @description Unit tests for the Card.vue component.
 * Ensures correct behavior for hover effects, dynamic UI updates,
 * event handling, and data display.
 */

import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Card from "../Card.vue";
import { navigateToRoute } from "../../helpers/utility";
import { RouteNavigation } from "../../helpers/enum";

/**
 * @description Mock external utilities to prevent actual navigation calls.
 */
vi.mock("@/helpers/utility", () => ({
  imgURL: vi.fn((url) => url || "default-image.jpg"),
  navigateToRoute: vi.fn()
}));

describe("Card.vue", () => {
  /**
   * @description Mock data for a typical show.
   */
  const showMock = {
    id: 1,
    name: "Test Show",
    image: { medium: "test-image.jpg" },
    genres: ["Drama", "Sci-Fi"]
  };

  /**
   * @test Ensures the show title is only displayed when hovering over the image.
   */
  it("shows show title when hovering over the image", async () => {
    const wrapper = mount(Card, { props: { show: showMock } });

    expect(wrapper.find('[data-test-id="show-title"]').exists()).toBe(false);

    await wrapper
      .find('[data-test-id="image-container"]')
      .trigger("mouseenter");
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test-id="show-title"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="show-title"]').text()).toBe(
      "Test Show"
    );
  });

  /**
   * @test Ensures genres are displayed correctly with bullet points when hovering.
   */
  it("shows genres correctly with bullet points on hover", async () => {
    const wrapper = mount(Card, { props: { show: showMock } });

    expect(wrapper.find('[data-test-id="show-genres"]').exists()).toBe(false);

    await wrapper
      .find('[data-test-id="image-container"]')
      .trigger("mouseenter");
    await wrapper.vm.$nextTick();

    const genreItems = wrapper.findAll('[data-test-id^="genre-item"]');

    genreItems.forEach((item, index) => {
      console.log(`Genre ${index}:`, item.text());
    });

    expect(genreItems.length).toBe(2);
    expect(genreItems[0].text()).toBe("Drama");
    expect(genreItems[1].text()).toBe("Sci-Fi");
  });

  /**
   * @test Ensures the hover overlay appears when hovering over the image and disappears on leave.
   */
  it("toggles hover overlay on mouse enter and leave", async () => {
    const wrapper = mount(Card, { props: { show: showMock } });

    expect(wrapper.find('[data-test-id="hover-overlay"]').exists()).toBe(false);

    await wrapper
      .find('[data-test-id="image-container"]')
      .trigger("mouseenter");
    expect(wrapper.find('[data-test-id="hover-overlay"]').exists()).toBe(true);

    await wrapper.find('[data-test-id="hover-overlay"]').trigger("mouseleave");
    expect(wrapper.find('[data-test-id="hover-overlay"]').exists()).toBe(false);
  });

  /**
   * @test Ensures that clicking on the image triggers navigation.
   */
  it("calls navigateToRoute when clicked", async () => {
    const wrapper = mount(Card, { props: { show: showMock } });

    await wrapper.find('[data-test-id="image-container"]').trigger("click");

    expect(navigateToRoute).toHaveBeenCalledWith(RouteNavigation.ShowDetails, {
      id: 1
    });
  });

  /**
   * @test Ensures that a default image is rendered when no image is provided.
   */
  it("renders default image when show image is missing", () => {
    const wrapper = mount(Card, {
      props: { show: { ...showMock, image: null } }
    });

    expect(wrapper.find('[data-test-id="show-image"]').attributes("src")).toBe(
      "default-image.jpg"
    );
  });

  /**
   * @test Ensures that if no genres are provided, the genre section is not rendered.
   */
  it("renders empty genres if none are provided", () => {
    const wrapper = mount(Card, {
      props: { show: { ...showMock, genres: [] } }
    });

    expect(wrapper.find('[data-test-id="show-genres"]').exists()).toBe(false);
  });

  /**
   * @test Ensures that the show title is not rendered if the name is missing.
   */
  it("does not render show title if name is missing", () => {
    const wrapper = mount(Card, {
      props: { show: { ...showMock, name: null } }
    });

    expect(wrapper.find('[data-test-id="show-title"]').exists()).toBe(false);
  });
});
