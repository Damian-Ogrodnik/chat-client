import React, { useLayoutEffect, FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/rootReducer";
import { AboutDialog } from "../AboutDialog";
import { AddServerView } from "../AddServerView";
import { ScreenSharingDialog } from "../ScreenSharingDialog";
import { SelectClientCertificateDialog } from "../SelectClientCertificateDialog";
import { ServersView } from "../ServersView";
import { SideBar } from "../SideBar";
import { UpdateDialog } from "../UpdateDialog";
import { GlobalStyles, Wrapper, WindowDragBar, ViewsWrapper } from "./styles";

export const Shell: FC = () => {
  const appPath = useSelector(({ appPath }: RootState) => appPath);

  useLayoutEffect(() => {
    if (!appPath) {
      return undefined;
    }

    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = `${appPath}/app/icons/rocketchat.css`;
    document.head.append(linkElement);

    return () => {
      linkElement.remove();
    };
  }, [appPath]);

  return (
    <>
      <GlobalStyles />
      {process.platform === "darwin" && <WindowDragBar />}
      <Wrapper>
        <SideBar />
        <ViewsWrapper>
          <ServersView />
          <AddServerView />
        </ViewsWrapper>
      </Wrapper>
      <AboutDialog />
      <ScreenSharingDialog />
      <SelectClientCertificateDialog />
      <UpdateDialog />
    </>
  );
};
