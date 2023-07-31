export const useNavBar = () => {
  let navBarTop = 0;
  let navBarHeight = 0;

  //设备信息
  const app: any = uni.getSystemInfoSync();
  // #ifdef APP-PLUS
  navBarTop = app.safeArea.top;
  navBarHeight = 64 + app.safeAreaInsets.bottom;
  //#endif

  // #ifdef MP-WEIXIN
  //胶囊信息
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  navBarHeight = app.statusBarHeight + menuButtonInfo.height + (menuButtonInfo.top - app.statusBarHeight) * 2;
  navBarTop = menuButtonInfo.top;
  //#endif

  return { navBarHeight, navBarTop };
};
