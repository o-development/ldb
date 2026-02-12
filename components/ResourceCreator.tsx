import { SolidContainer } from '@ldo/connected-solid';
import { LucideIcon } from 'lucide-react-native';

/**
 * Messager is passed to resourceCreator plugins so they can interact with the user.
 * The host component (e.g. ContainerView) implements this and handles rendering
 * prompts, toasts, and loading messages.
 */
export interface ResourceCreatorMessager {
  /** Prompt the user for text input. Returns null if cancelled. */
  prompt: (
    title: string,
    message?: string,
    defaultValue?: string,
  ) => Promise<string | null>;

  /** Prompt the user to select/upload a file. Returns null if cancelled. */
  promptFile?: (options?: {
    title?: string;
    accept?: string;
  }) => Promise<File | null>;

  /** Show a toast notification. */
  toast: (message: string, options?: { title?: string }) => void;

  /** Add a message to the loading stream. Shown while the resourceCreator is running. */
  loadingMessage: (message: string) => void;
}

/**
 * Context passed to a resourceCreator's create function.
 */
export interface ResourceCreatorContext {
  /** The parent LDO container to create the resource in. */
  container: SolidContainer;
  /** Utilities to prompt the user, show toasts, and stream loading messages. */
  messager: ResourceCreatorMessager;
}

/**
 * A resourceCreator plugin: a function that creates a resource inside a container.
 * Returns a Promise that resolves when creation is complete.
 */
export type ResourceCreatorFn = (
  context: ResourceCreatorContext,
) => Promise<void>;

/**
 * Plugin config for the resourceCreator system (similar to ResourceViewConfig).
 * Any resource view can use these; the main consumer is the Container view.
 */
export interface ResourceCreatorConfig {
  name: string;
  displayName: string;
  displayIcon: LucideIcon;
  /** Whether this creator can run in the given container. */
  canCreate: (container: SolidContainer) => boolean;
  /** Creates the resource. Uses messager for prompts, toasts, and loading messages. */
  create: ResourceCreatorFn;
}
