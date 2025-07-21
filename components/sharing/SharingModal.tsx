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
import {
  Dialog,
  DialogClose,
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
import { useViewContext } from 'components/nav/useViewContext';
import { LoadingBar } from '../common/LoadingBar';
import { ScrollView } from 'react-native';
import { WacRuleForm } from './WacRuleForm';
import { isEqual } from 'lodash';

interface SharingModalMethods {
  openSharingModal: () => void;
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
  const [isOpen, setIsOpen] = useState(true);
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

  useEffect(() => {
    if (
      targetResource &&
      targetResource.type !== 'InvalidIdentifierResouce' &&
      isOpen
    ) {
      setIsLoading(true);

      targetResource.getWac().then((wac) => {
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
  }, [targetResource, isOpen]);

  const didEdit = useMemo(() => {
    if (wacResult?.type !== 'getWacRuleSuccess') return false;
    return !isEqual(editedRules, wacResult.wacRule);
  }, [editedRules, wacResult]);

  const context = useMemo(
    () => ({
      isModalOpen: isOpen,
      openSharingModal: () => setIsOpen(true),
      closeSharingModal: () => setIsOpen(false),
    }),
    [isOpen],
  );

  const onApplyChanges = useCallback(async () => {
    if (
      targetResource?.type === 'SolidContainer' ||
      targetResource?.type === 'SolidLeaf'
    ) {
      setIsLoading(true);
      const result = await targetResource.setWac(editedRules);
      if (result.isError) toast;
      setIsLoading(false);
    }
  }, [editedRules, targetResource]);

  return (
    <sharingModalContext.Provider value={context}>
      <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
        <DialogContent className="sm:w-[640px] w-[95vw] h-[95vh]">
          <LoadingBar isLoading={isLoading} />
          <DialogHeader>
            <DialogTitle>Resource Sharing Preferences</DialogTitle>
          </DialogHeader>
          <ScrollView className="flex-1 border-border border-b border-t pt-2 pb-2 ml-[-24px] mr-[-24px] pl-6 pr-6">
            {(() => {
              if (!wacResult) return <></>;
              if (wacResult.isError) {
                return (
                  <Text className="color-red-800">{wacResult.message}</Text>
                );
              }
              return (
                <WacRuleForm value={editedRules} onChange={setEditedRules} />
              );
            })()}
          </ScrollView>
          <DialogFooter>
            <CopyLink />
            <DialogClose asChild>
              <Button>
                <Text>{didEdit ? 'Apply Changes' : 'Done'}</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {children}
    </sharingModalContext.Provider>
  );
};
