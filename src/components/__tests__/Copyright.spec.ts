/**
 * @file Copyright.spec.ts
 * @description Unit tests for the Copyright.vue component, ensuring all functional edge cases are covered.
 */

import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Copyright from "../Copyright.vue";

/**
 * @description Unit test suite for Footer.vue component.
 */
describe("Copyright.vue", () => {
  /**
   * @test Ensures the Copyright renders the current year correctly.
   */
  it("renders the current year", () => {
    const wrapper = mount(Copyright);
    const currentYear = new Date().getFullYear().toString();
    expect(wrapper.text()).toContain(currentYear);
  });

  /**
   * @test Ensures the Copyright contains the correct author name.
   */
  it("renders the correct author name", () => {
    const wrapper = mount(Copyright);
    expect(wrapper.text()).toContain("Muhammad Arslan");
  });

  /**
   * @test Ensures all social icons are rendered.
   */
  it("renders all social icons", () => {
    const wrapper = mount(Copyright);
    const icons = wrapper.findAll("button");
    expect(icons.length).toBe(3);
  });

  /**
   * @test Ensures clicking an icon opens the correct external link.
   */
  it("opens the correct external link when an icon is clicked", async () => {
    global.open = vi.fn();
    const wrapper = mount(Copyright);
    const buttons = wrapper.findAll("button");

    await buttons[0].trigger("click");
    expect(global.open).toHaveBeenCalledWith(
      "https://www.muhammadarslan.nl/#home",
      "_blank"
    );

    await buttons[1].trigger("click");
    expect(global.open).toHaveBeenCalledWith(
      "https://www.linkedin.com/in/arslan-akhtar",
      "_blank"
    );

    await buttons[2].trigger("click");
    expect(global.open).toHaveBeenCalledWith(
      "https://github.com/ArslanAkhtar",
      "_blank"
    );
  });

  /**
   * @test Ensures component structure remains correct.
   */
  it("maintains correct structure", () => {
    const wrapper = mount(Copyright);
    expect(wrapper.find("footer").exists()).toBe(true);
    expect(wrapper.findAll("button").length).toBe(3);
    expect(wrapper.find("strong").text()).toBe("Muhammad Arslan");
  });
});
