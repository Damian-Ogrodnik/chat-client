import { watch } from '../../store';
import { RootState } from '../../store/rootReducer';

const selectIsSideBarVisible = ({ servers, isSideBarEnabled }: RootState): boolean =>
  servers.length > 0 && isSideBarEnabled;

export const handleTrafficLightsSpacing = (): void => {
  if (process.platform === 'darwin') {
    return;
  }

  const style = document.getElementById('sidebar-padding') || document.createElement('style');
  style.id = 'sidebar-padding';
  document.head.append(style);

  watch(selectIsSideBarVisible, (isSideBarVisible) => {
    if (isSideBarVisible) {
      style.innerHTML = `
        .sidebar {
          padding-top: 0 !important;
          transition: padding-top 230ms ease-in-out !important;
        }
      `;
    } else {
      style.innerHTML = `
        .sidebar {
          padding-top: 10px !important;
          transition: padding-top 230ms ease-in-out !important;
        }
      `;
    }
  });
};
