import * as DialogPrimitive from '@rn-primitives/dialog';
import * as React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

function DialogOverlayWeb({
  style,
  ...props
}: DialogPrimitive.OverlayProps & {
  ref?: React.RefObject<DialogPrimitive.OverlayRef>;
  style?: ViewStyle;
}) {
  return (
    <DialogPrimitive.Overlay
      style={StyleSheet.flatten([styles.overlay, style])}
      {...props}
    />
  );
}

function DialogOverlayNative({
  style,
  children,
  ...props
}: DialogPrimitive.OverlayProps & {
  ref?: React.RefObject<DialogPrimitive.OverlayRef>;
  children?: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <DialogPrimitive.Overlay
      style={[StyleSheet.absoluteFill, styles.overlayNative, style]}
      {...props}
    >
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
      >
        {children}
      </Animated.View>
    </DialogPrimitive.Overlay>
  );
}

const DialogOverlay = Platform.select({
  web: DialogOverlayWeb,
  default: DialogOverlayNative,
});

function DialogContent({
  style,
  children,
  portalHost,
  ...props
}: DialogPrimitive.ContentProps & {
  ref?: React.RefObject<DialogPrimitive.ContentRef>;
  style?: ViewStyle;
  portalHost?: string;
}) {
  const { colors } = useTheme();
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content
          style={StyleSheet.flatten([
            styles.content,
            { borderColor: colors.border, backgroundColor: colors.background },
            style,
          ])}
          {...props}
        >
          {children}
          <DialogPrimitive.Close style={styles.closeButton}>
            <X size={Platform.OS === 'web' ? 16 : 18} color={colors.text} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

function DialogHeader({ style, ...props }: ViewProps) {
  return <View style={StyleSheet.flatten([styles.header, style])} {...props} />;
}

function DialogFooter({ style, ...props }: ViewProps) {
  return (
    <View
      style={StyleSheet.flatten([
        styles.footer,
        Platform.OS === 'web' && styles.footerRow,
        style,
      ])}
      {...props}
    />
  );
}

function DialogTitle({
  style,
  ...props
}: DialogPrimitive.TitleProps & {
  ref?: React.RefObject<DialogPrimitive.TitleRef>;
}) {
  const { colors } = useTheme();
  return (
    <DialogPrimitive.Title
      style={StyleSheet.flatten([styles.title, { color: colors.text }, style])}
      {...props}
    />
  );
}

function DialogDescription({
  style,
  ...props
}: DialogPrimitive.DescriptionProps & {
  ref?: React.RefObject<DialogPrimitive.DescriptionRef>;
}) {
  const { colors } = useTheme();
  return (
    <DialogPrimitive.Description
      style={StyleSheet.flatten([
        styles.description,
        { color: colors.text },
        style,
      ])}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  overlayNative: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  content: {
    maxWidth: 512, // max-w-lg
    gap: 16, // gap-4
    borderWidth: 1,
    padding: 24, // p-6
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 10,
    borderRadius: 8, // rounded-lg
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    right: 16, // right-4
    top: 16, // top-4
    padding: 2, // p-0.5
    borderRadius: 4, // rounded-sm
    opacity: 0.7,
  },
  closeButtonFocused: {
    opacity: 1,
  },
  header: {
    flexDirection: 'column',
    gap: 6, // gap-1.5
    textAlign: 'center',
    borderBottomWidth: 1,
  },
  footer: {
    flexDirection: 'column-reverse',
    gap: 8, // gap-2
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 18 : 20, // text-lg native:text-xl
    fontWeight: '600', // font-semibold
    lineHeight: Platform.OS === 'web' ? 20 : 22, // leading-none
    letterSpacing: -0.025, // tracking-tight
  },
  description: {
    fontSize: Platform.OS === 'web' ? 14 : 16, // text-sm native:text-base
    opacity: 0.7,
  },
});
