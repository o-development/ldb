import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { CopyLink } from './CopyLink';
import {
  GetWacRuleError,
  GetWacRuleSuccess,
  SolidContainer,
  SolidLeaf,
  WacRule,
} from '@ldo/connected-solid';
import { useViewContext } from '../useViewContext';
import { LoadingBar } from '../common/LoadingBar';
import { ScrollView } from 'react-native';
import { WacRuleForm } from './WacRuleForm';
import { isEqual } from 'lodash';

interface SharingModalMethods {
  openSharingModal: (resource?: SolidLeaf | SolidContainer) => void;
  closeSharingModal: () => void;
  isModalOpen: boolean;
}
const sharingModalContext = createContext<SharingModalMethods>({
  openSharingModal: () => {},
  closeSharingModal: () => {},
  isModalOpen: false,
});

export const useSharingModal = () => {
  return useContext(sharingModalContext);
};

export const SharingModalProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { targetResource } = useViewContext();
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [resourceOverride, setResourceOverride] = useState<
    SolidLeaf | SolidContainer | undefined
  >();
  const [wacResult, setWacResult] = useState<
    | GetWacRuleError<SolidLeaf | SolidContainer>
    | GetWacRuleSuccess<SolidLeaf | SolidContainer>
    | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [editedRules, setEditedRules] = useState<WacRule>({
    public: { read: false, write: false, append: false, control: false },
    authenticated: { read: false, write: false, append: false, control: false },
    agent: {},
  });
  const { width, height } = useWindowDimensions();

  const activeResource = resourceOverride ?? targetResource;

  useEffect(() => {
    if (
      isOpen &&
      (activeResource?.type === 'SolidContainer' ||
        activeResource?.type === 'SolidLeaf')
    ) {
      setIsLoading(true);

      activeResource.getWac().then((wac) => {
        setWacResult(
          wac as
            | GetWacRuleError<SolidLeaf | SolidContainer>
            | GetWacRuleSuccess<SolidLeaf | SolidContainer>,
        );
        if (wac.type === 'getWacRuleSuccess') {
          setEditedRules(wac.wacRule);
        }
        setIsLoading(false);
      });
    }
  }, [activeResource, isOpen]);

  const didEdit = useMemo(() => {
    if (wacResult?.type !== 'getWacRuleSuccess') return false;
    return !isEqual(editedRules, wacResult.wacRule);
  }, [editedRules, wacResult]);

  const context = useMemo(
    () => ({
      isModalOpen: isOpen,
      openSharingModal: (resource?: SolidLeaf | SolidContainer) => {
        setResourceOverride(resource);
        setIsOpen(true);
      },
      closeSharingModal: () => {
        setIsOpen(false);
        setResourceOverride(undefined);
      },
    }),
    [isOpen],
  );

  const onApplyChanges = useCallback(async () => {
    if (
      didEdit &&
      (activeResource?.type === 'SolidContainer' ||
        activeResource?.type === 'SolidLeaf')
    ) {
      setIsLoading(true);
      const result = await activeResource.setWac(editedRules);
      // TODO throw error with toast
      setIsLoading(false);
    }
    setIsOpen(false);
    setResourceOverride(undefined);
  }, [editedRules, activeResource, didEdit]);

  return (
    <sharingModalContext.Provider value={context}>
      <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
        <DialogContent
          style={{
            width: width > 640 ? 640 : width * 0.95,
            height: height * 0.95,
          }}
        >
          <LoadingBar isLoading={isLoading} />
          <DialogHeader>
            <DialogTitle>Resource Sharing Preferences</DialogTitle>
          </DialogHeader>
          <ScrollView
            style={[{ borderColor: colors.border }, styles.scrollView]}
          >
            {(() => {
              if (!wacResult) return <></>;
              if (wacResult.isError) {
                return (
                  <Text style={{ color: colors.notification }}>
                    {wacResult.message}
                  </Text>
                );
              }
              return (
                <WacRuleForm value={editedRules} onChange={setEditedRules} />
              );
            })()}
          </ScrollView>
          <DialogFooter>
            <CopyLink />
            <Button
              text={didEdit ? 'Apply Changes' : 'Done'}
              onPress={onApplyChanges}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {children}
    </sharingModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: -24,
    marginRight: -24,
    paddingLeft: 24,
    paddingRight: 24,
  },
});
