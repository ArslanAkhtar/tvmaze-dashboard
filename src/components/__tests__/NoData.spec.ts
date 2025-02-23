/**
 * @file NoData.spec.ts
 * @description Unit tests for the NoData.vue component.
 * Ensures correct rendering of text and image.
 */

import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import NoData from "../NoData.vue";

describe("NoData.vue", () => {
  /**
   * @test Ensures the component renders properly with the provided text.
   */
  it("renders the component correctly", () => {
    const wrapper = mount(NoData, {
      props: { text: "No Results Found" }
    });

    expect(wrapper.find('[data-test-id="no-data-container"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-test-id="no-data-image"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="no-data-text"]').text()).toBe(
      "No Results Found"
    );
  });

  /**
   * @test Ensures the component updates when the text prop changes.
   */
  it("updates text when prop changes", async () => {
    const wrapper = mount(NoData, {
      props: { text: "No Data Available" }
    });

    await wrapper.setProps({ text: "Nothing to Display" });

    expect(wrapper.find('[data-test-id="no-data-text"]').text()).toBe(
      "Nothing to Display"
    );
  });

  /**
   * @test Ensures a warning is logged when the required text prop is missing.
   */
  it("logs a warning when text prop is missing", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    mount(NoData);

    expect(consoleWarnSpy).toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });
});
