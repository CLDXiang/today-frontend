import { useRouter } from 'vue-router';

export const useRouterBack: () => (url: string) => void = () => {
  const router = useRouter();
  const routerBack = (url: string) => {
    // 如果用户直接到达此页面则返回主页面，否则返回上一个页面
    if (window.history.state.position === 1) {
      router.replace(url);
    } else {
      router.back();
    }
  };
  return routerBack;
};
