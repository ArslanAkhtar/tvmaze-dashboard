import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
const useInfiniteScroll = () => {
  const showCount = 16;
  const target = ref(null);
  const paginationCount = ref(0);
  const displayCount = ref(0);

  const { stop } = useIntersectionObserver(target, () => {
    paginationCount.value = paginationCount.value + 1;
    displayCount.value = paginationCount.value * showCount;
  });

  return { target, displayCount, stop };
};

export default useInfiniteScroll;
