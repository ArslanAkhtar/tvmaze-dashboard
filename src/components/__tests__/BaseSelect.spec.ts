/**
 * @file BaseSelect.spec.ts
 * @description Unit tests for the BaseSelect.vue component.
 * Ensures correct rendering, interaction, and reactivity.
 */

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BaseSelect from "../BaseSelect.vue";

describe("BaseSelect.vue", () => {
  /**
   * @description Default props used across tests.
   */
  const defaultProps = {
    modelValue: "",
    options: ["Option 1", "Option 2", "Option 3"],
    label: "Select",
    multiSelect: false
  };

  /**
   * @test Ensures the component renders correctly with provided props.
   */
  it("renders correctly with given props", () => {
    const wrapper = mount(BaseSelect, { props: defaultProps });
    expect(wrapper.text()).toContain("Select");
  });

  /**
   * @test Opens the dropdown menu when clicked.
   */
  it("opens dropdown when clicked", async () => {
    const wrapper = mount(BaseSelect, { props: defaultProps });
    await wrapper.find("div.cursor-pointer").trigger("click");
    expect(wrapper.text()).toContain("Option 1");
  });

  /**
   * @test Closes the dropdown when clicking outside the component.
   */
  it("closes dropdown when clicking outside", async () => {
    const wrapper = mount(BaseSelect, {
      props: defaultProps,
      attachTo: document.body
    });

    await wrapper.find("div.cursor-pointer").trigger("click");
    expect(wrapper.text()).toContain("Option 1");

    await document.body.click();
    expect(wrapper.text()).not.toContain("Option 1");
  });

  /**
   * @test Selects an option in single-select mode.
   */
  it("selects an option in single-select mode", async () => {
    const wrapper = mount(BaseSelect, { props: defaultProps });
    await wrapper.find("div.cursor-pointer").trigger("click");
    await wrapper.findAll(".p-2")[0].trigger("click");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["Option 1"]);
  });

  /**
   * @test Removes an option when clicked again in multi-select mode.
   */
  it("removes an option when clicked again in multi-select mode", async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        ...defaultProps,
        multiSelect: true,
        modelValue: ["Option 1"]
      }
    });
    await wrapper.find("div.cursor-pointer").trigger("click");
    await wrapper.findAll(".p-2")[0].trigger("click");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([[]]);
  });

  /**
   * @test Displays truncated values when more than two are selected in multi-select mode.
   */
  it("displays truncated values when more than two are selected in multi-select mode", async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        ...defaultProps,
        multiSelect: true,
        modelValue: ["Option 1", "Option 2", "Option 3"]
      }
    });
    expect(wrapper.text()).toContain("Option 1, Option 2...");
  });

  /**
   * @test Closes the dropdown when selecting a value in single-select mode.
   */
  it("closes when selecting a value in single-select mode", async () => {
    const wrapper = mount(BaseSelect, { props: defaultProps });
    await wrapper.find("div.cursor-pointer").trigger("click");
    await wrapper.findAll(".p-2")[0].trigger("click");
    expect(wrapper.text()).not.toContain("Option 1");
  });

  /**
   * @test Keeps the dropdown open when selecting a value in multi-select mode.
   */
  it("does not close when selecting a value in multi-select mode", async () => {
    const wrapper = mount(BaseSelect, {
      props: { ...defaultProps, multiSelect: true, modelValue: [] }
    });
    await wrapper.find("div.cursor-pointer").trigger("click");
    await wrapper.findAll(".p-2")[0].trigger("click");
    expect(wrapper.text()).toContain("Option 1");
  });

  /**
   * @test Handles an empty options array gracefully.
   */
  it("handles an empty options array gracefully", async () => {
    const wrapper = mount(BaseSelect, {
      props: { ...defaultProps, options: [] }
    });
    await wrapper.find("div.cursor-pointer").trigger("click");
    expect(wrapper.findAll(".p-2")).toHaveLength(0);
  });

  /**
   * @test Handles an initial value that is not in the options list.
   */
  it("handles an initial value that is not in the options", async () => {
    const wrapper = mount(BaseSelect, {
      props: { ...defaultProps, modelValue: "Invalid Option" }
    });
    expect(wrapper.text()).toContain("Invalid Option");
  });

  /**
   * @test Ensures the component does not emit duplicate selections in multi-select mode.
   */
  it("does not emit duplicate selections in multi-select mode", async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        ...defaultProps,
        multiSelect: true,
        modelValue: ["Option 1"]
      }
    });

    await wrapper.find("div.cursor-pointer").trigger("click");
    await wrapper.findAll(".p-2")[0].trigger("click");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();

    const lastUpdate = wrapper.emitted()["update:modelValue"].pop();
    expect(lastUpdate).toEqual([[]]);
  });
});
