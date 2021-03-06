/**
 * @providesModule SafariViewManager
 */
'use strict';
import {
  NativeModules,
  NativeEventEmitter,
  processColor
} from 'react-native';

const NativeSafariViewManager = NativeModules.SafariViewManager;
const eventEmitter = NativeSafariViewManager ? new NativeEventEmitter(NativeSafariViewManager) : null;

export default {
  show(options) {
    if (options && options.tintColor) {
      options.tintColor = processColor(options.tintColor);
    }
    if (options && options.barTintColor) {
      options.barTintColor = processColor(options.barTintColor);
    }

    return NativeSafariViewManager.show(options);
  },

  dismiss() {
    NativeSafariViewManager.dismiss();
  },

  isAvailable() {
    if (NativeSafariViewManager) {
      return NativeSafariViewManager.isAvailable();
    }
    return Promise.reject(new Error('SafariView cative component is missing'));
  },

  addEventListener(event, listener) {
    if (event === 'onShow') {
      return eventEmitter.addListener('SafariViewOnShow', listener);
    } else if (event === 'onDismiss') {
      return eventEmitter.addListener('SafariViewOnDismiss', listener);
    } else {
      console.warn(`Trying to subscribe to unknown event: ${event}`);
      return {
        remove: () => {}
      };
    }
  },

  removeEventListener(event, listener) {
    if (event === 'onShow') {
      eventEmitter.removeListener('SafariViewOnShow', listener);
    } else if (event === 'onDismiss') {
      eventEmitter.removeListener('SafariViewOnDismiss', listener);
    }
  }
};
