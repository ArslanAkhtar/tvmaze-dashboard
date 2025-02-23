/**
 * @file Header.spec.ts
 * @description Unit tests for the Header.vue component.
 * Ensures proper rendering of title, navigation menu, and layout behavior.
 */

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Header from "../Header.vue";

describe("Header.vue", () => {
  /**
   * @test Ensures the header renders with the correct title.
   */
  it("renders the header title correctly", () => {
    const wrapper = mount(Header);
    expect(wrapper.find('[data-test-id="header-title"]').text()).toBe(
      "TV MAZE"
    );
  });

  /**
   * @test Ensures the header is present in the DOM.
   */
  it("renders the header container", () => {
    const wrapper = mount(Header);
    expect(wrapper.find('[data-test-id="header"]').exists()).toBe(true);
  });

  /**
   * @test Ensures the navigation menu is hidden when menuItems is empty.
   */
  it("does not render navigation items when menuItems is empty", () => {
    const wrapper = mount(Header);
    expect(wrapper.find('[data-test-id="nav-menu"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-test-id="nav-item"]').length).toBe(0);
  });

  /**
   * @test Ensures the navigation menu renders correctly with menu items.
   */
  it("renders navigation menu when menuItems are provided", async () => {
    const wrapper = mount(Header, {
      setup() {
        return { menuItems: ["Home", "Shows", "About"] };
      }
    });

    expect(wrapper.findAll('[data-test-id="nav-item"]').length).toBe(3);
    expect(wrapper.findAll('[data-test-id="nav-item"]')[0].text()).toBe("Home");
    expect(wrapper.findAll('[data-test-id="nav-item"]')[1].text()).toBe(
      "Shows"
    );
    expect(wrapper.findAll('[data-test-id="nav-item"]')[2].text()).toBe(
      "About"
    );
  });

  /**
   * @test Ensures each menu item has an anchor tag.
   */
  it("renders each menu item inside an anchor tag", async () => {
    const wrapper = mount(Header, {
      setup() {
        return { menuItems: ["Home", "Shows", "About"] };
      }
    });

    const navItems = wrapper.findAll('[data-test-id="nav-item"]');
    navItems.forEach((item) => {
      expect(item.element.tagName).toBe("A");
    });
  });
});
