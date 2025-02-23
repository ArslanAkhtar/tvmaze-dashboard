/**
 * @file LoadMore.spec.ts
 * @description Unit tests for the LoadMore.vue component, ensuring functionality across all edge cases.
 */

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import LoadMore from "../LoadMore.vue";

/**
 * @description Unit test suite for LoadMore.vue component.
 */
describe("LoadMore.vue", () => {
  /**
   * @test Ensures the component renders correctly.
   */
  it("renders the load more component", () => {
    const wrapper = mount(LoadMore);
    expect(wrapper.exists()).toBe(true);
  });

  /**
   * @test Ensures the loading spinner is present.
   */
  it("displays the loading spinner", () => {
    const wrapper = mount(LoadMore);
    expect(wrapper.find('[data-test-id="loading-spinner"]').exists()).toBe(
      true
    );
  });

  /**
   * @test Ensures the loading text is present.
   */
  it("displays the loading text", () => {
    const wrapper = mount(LoadMore);
    expect(wrapper.find('[data-test-id="loading-text"]').text()).toBe(
      "Loading..."
    );
  });

  /**
   * @test Ensures the component maintains structure.
   */
  it("maintains correct structure with container and spinner", () => {
    const wrapper = mount(LoadMore);
    expect(wrapper.find('[data-test-id="load-more-container"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-test-id="loading-spinner"]').exists()).toBe(
      true
    );
  });

  /**
   * @test Ensures the component has no unexpected elements.
   */
  it("does not contain any extra elements", () => {
    const wrapper = mount(LoadMore);
    expect(wrapper.findAll("svg").length).toBe(1);
    expect(wrapper.findAll("span").length).toBe(1);
  });

  /**
   * @test Ensures the component remains visible while loading.
   */
  it("remains visible while loading is in progress", () => {
    const wrapper = mount(LoadMore);
    expect(wrapper.isVisible()).toBe(true);
  });
});
