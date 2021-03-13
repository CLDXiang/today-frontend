import { ref } from 'vue';

export function useFetchListData(
  fetchListMethod: () => Promise<void | undefined>,
  fetchMoreMethod: () => Promise<void | undefined>,
) {
  /** 正在第一次获取数据 */
  const fetching = ref(true);
  /** 正在获取更多数据 */
  const fetchingMore = ref(false);

  const fetchList = async () => {
    fetching.value = true;
    await fetchListMethod();
    fetching.value = false;
  };

  const fetchMore = async () => {
    fetchingMore.value = true;
    await fetchMoreMethod();
    fetchingMore.value = false;
  };

  return {
    fetching,
    fetchingMore,
    fetchList,
    fetchMore,
  };
}
