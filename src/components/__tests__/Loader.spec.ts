/**
 * @file Loader.spec.ts
 * @description Unit tests for the Loader.vue component, covering all functionality and edge cases.
 */

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Loader from "../Loader.vue";

/**
 * @description Unit test suite for Loader.vue component.
 */
describe("Loader.vue", () => {
  /**
   * @test Ensures the loader component renders correctly.
   */
  it("renders the loader component", () => {
    const wrapper = mount(Loader);
    expect(wrapper.exists()).toBe(true);
  });

  /**
   * @test Ensures the loader container is present.
   */
  it("renders the loader container", () => {
    const wrapper = mount(Loader);
    expect(wrapper.find('[data-test-id="loader-container"]').exists()).toBe(
      true
    );
  });

  /**
   * @test Ensures the loader icon is displayed.
   */
  it("displays the loader icon", () => {
    const wrapper = mount(Loader);
    expect(wrapper.find('[data-test-id="loader-icon"]').exists()).toBe(true);
  });

  /**
   * @test Ensures the loading text is present for accessibility.
   */
  it("includes the loading text for accessibility", () => {
    const wrapper = mount(Loader);
    expect(wrapper.find('[data-test-id="loader-text"]').text()).toBe(
      "Loading..."
    );
  });

  /**
   * @test Ensures the loader icon has the correct animation class.
   */
  it("has animation applied to the loader icon", () => {
    const wrapper = mount(Loader);
    expect(wrapper.find('[data-test-id="loader-icon"]').classes()).toContain(
      "animate-spin"
    );
  });

  /**
   * @test Ensures the loader icon is correctly colored.
   */
  it("applies the correct color to the loader icon", () => {
    const wrapper = mount(Loader);
    expect(wrapper.find('[data-test-id="loader-icon"]').classes()).toContain(
      "fill-[#FFC001]"
    );
  });
});
