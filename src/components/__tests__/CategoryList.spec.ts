import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { computed } from "vue";
import CategoryList from "../CategoryList.vue";
import { useIntersectionObserver } from "@vueuse/core";

/**
 * @description Properly mock `useIntersectionObserver` with computed values.
 */
vi.mock("@vueuse/core", () => {
  return {
    useIntersectionObserver: vi.fn((_, callback) => {
      callback([{ isIntersecting: false }]);
      return {
        stop: vi.fn(),
        isSupported: computed(() => true),
        isActive: computed(() => true),
        pause: vi.fn(),
        resume: vi.fn()
      };
    }),
    useWindowSize: vi.fn(() => ({
      width: computed(() => 1024), // Mock a typical screen width
      height: computed(() => 768) // Mock a typical screen height
    }))
  };
});

/**
 * @description Mock show data for testing.
 */
const mockShows = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `Show ${index + 1}`,
  image: { medium: `https://test-url.com/200/300?image=${index + 1}` },
  genres: ["Drama", "Sci-Fi"]
}));

describe("CategoryList.vue", () => {
  /**
   * @test Ensures the component renders correctly with initial props.
   */
  it("renders the component correctly", () => {
    const wrapper = mount(CategoryList, {
      props: { title: "Popular Shows", shows: mockShows }
    });

    expect(wrapper.find('[data-test-id="show-section"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="section-title"]').text()).toBe(
      "Popular Shows →"
    );
    expect(wrapper.findAll('[data-test-id="show-card"]').length).toBe(6);
  });

  /**
   * @test Simulates the lazy-loading behavior when the intersection observer triggers.
   */
  it("loads more shows when scrolled into view", async () => {
    let observerCallback: IntersectionObserverCallback = () => {};

    vi.mocked(useIntersectionObserver).mockImplementation((_, callback) => {
      observerCallback = callback;
      return {
        stop: vi.fn(),
        isSupported: computed(() => true),
        isActive: computed(() => true),
        pause: vi.fn(),
        resume: vi.fn()
      };
    });

    const wrapper = mount(CategoryList, {
      props: { title: "Popular Shows", shows: mockShows }
    });

    expect(wrapper.findAll('[data-test-id="show-card"]').length).toBe(6);

    observerCallback(
      [{ isIntersecting: true }] as unknown as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );

    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    expect(wrapper.findAll('[data-test-id="show-card"]').length).toBe(6);
  });

  /**
   * @test Ensures that if fewer than 10 shows are available, all are rendered.
   */
  it("renders all shows if fewer than 10 are available", () => {
    const wrapper = mount(CategoryList, {
      props: { title: "Limited Shows", shows: mockShows.slice(0, 5) }
    });

    expect(wrapper.findAll('[data-test-id="show-card"]').length).toBe(5);
  });

  /**
   * @test Ensures the component correctly handles an empty shows array.
   */
  it("renders no shows if shows list is empty", () => {
    const wrapper = mount(CategoryList, {
      props: { title: "No Shows", shows: [] }
    });

    expect(wrapper.findAll('[data-test-id="show-card"]').length).toBe(0);
  });

  /**
   * @test Verifies that updating the shows prop dynamically does not affect pagination.
   */
  it("updates displayed shows when the shows prop changes", async () => {
    const wrapper = mount(CategoryList, {
      props: { title: "Dynamic Shows", shows: mockShows }
    });

    expect(wrapper.findAll('[data-test-id="show-card"]').length).toBe(6);

    await wrapper.setProps({ shows: mockShows.slice(0, 15) });

    expect(wrapper.findAll('[data-test-id="show-card"]').length).toBe(6);
  });
});
