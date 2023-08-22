//
//  index.js
//
//  The MIT License
//  Copyright (c) 2021 - 2023 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import React from 'react';
import { StyleProvider, useTheme } from '@o2ter/react-ui';
import { useWindowDimensions, ViewStyle, TextStyle } from 'react-native';

export const DefaultStyleProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const theme = useTheme();
  const windowDimensions = useWindowDimensions();
  const styles = React.useMemo(() => {

    const [breakpoint] = _.minBy(_.filter(_.toPairs(theme.breakpoints), ([, v]) => windowDimensions.width >= v), ([, v]) => v) ?? [];

    const styles: Record<string, ViewStyle | TextStyle> = {
      'd-none': { display: 'none' },
      'd-flex': { display: 'flex' },
      'flex-row': { flexDirection: 'row' },
      'flex-column': { flexDirection: 'column' },
      'flex-row-reverse': { flexDirection: 'row-reverse' },
      'flex-column-reverse': { flexDirection: 'column-reverse' },
      'align-content-start': { alignContent: 'flex-start' },
      'align-content-end': { alignContent: 'flex-end' },
      'align-content-center': { alignContent: 'center' },
      'align-content-stretch': { alignContent: 'stretch' },
      'align-content-between': { alignContent: 'space-between' },
      'align-content-around': { alignContent: 'space-around' },
      'align-items-start': { alignItems: 'flex-start' },
      'align-items-end': { alignItems: 'flex-end' },
      'align-items-center': { alignItems: 'center' },
      'align-items-stretch': { alignItems: 'stretch' },
      'align-items-baseline': { alignItems: 'baseline' },
      'align-self-start': { alignSelf: 'flex-start' },
      'align-self-end': { alignSelf: 'flex-end' },
      'align-self-center': { alignSelf: 'center' },
      'align-self-stretch': { alignSelf: 'stretch' },
      'align-self-baseline': { alignSelf: 'baseline' },
      'position-relative': { position: 'relative' },
      'position-absolute': { position: 'absolute' },
      'top-0': { top: 0 },
      'top-50': { top: '50%' },
      'top-100': { top: '100%' },
      'bottom-0': { bottom: 0 },
      'bottom-50': { bottom: '50%' },
      'bottom-100': { bottom: '100%' },
      'start-0': { start: 0 },
      'start-50': { start: '50%' },
      'start-100': { start: '100%' },
      'end-0': { end: 0 },
      'end-50': { end: '50%' },
      'end-100': { end: '100%' },
      'left-0': { left: 0 },
      'left-50': { left: '50%' },
      'left-100': { left: '100%' },
      'right-0': { right: 0 },
      'right-50': { right: '50%' },
      'right-100': { right: '100%' },
      'w-25': { width: '25%' },
      'w-50': { width: '50%' },
      'w-75': { width: '75%' },
      'w-100': { width: '100%' },
      'h-25': { height: '25%' },
      'h-50': { height: '50%' },
      'h-75': { height: '75%' },
      'h-100': { height: '100%' },
    };
    if (breakpoint) {
      styles[`d-${breakpoint}-none`] = { display: 'none' };
      styles[`d-${breakpoint}-flex`] = { display: 'flex' };
      styles[`flex-${breakpoint}-row`] = { flexDirection: 'row' };
      styles[`flex-${breakpoint}-column`] = { flexDirection: 'column' };
      styles[`flex-${breakpoint}-row-reverse`] = { flexDirection: 'row-reverse' };
      styles[`flex-${breakpoint}-column-reverse`] = { flexDirection: 'column-reverse' };
      styles[`align-content-${breakpoint}-start`] = { alignContent: 'flex-start' };
      styles[`align-content-${breakpoint}-end`] = { alignContent: 'flex-end' };
      styles[`align-content-${breakpoint}-center`] = { alignContent: 'center' };
      styles[`align-content-${breakpoint}-stretch`] = { alignContent: 'stretch' };
      styles[`align-content-${breakpoint}-between`] = { alignContent: 'space-between' };
      styles[`align-content-${breakpoint}-around`] = { alignContent: 'space-around' };
      styles[`align-items-${breakpoint}-start`] = { alignItems: 'flex-start' };
      styles[`align-items-${breakpoint}-end`] = { alignItems: 'flex-end' };
      styles[`align-items-${breakpoint}-center`] = { alignItems: 'center' };
      styles[`align-items-${breakpoint}-stretch`] = { alignItems: 'stretch' };
      styles[`align-items-${breakpoint}-baseline`] = { alignItems: 'baseline' };
      styles[`align-self-${breakpoint}-start`] = { alignSelf: 'flex-start' };
      styles[`align-self-${breakpoint}-end`] = { alignSelf: 'flex-end' };
      styles[`align-self-${breakpoint}-center`] = { alignSelf: 'center' };
      styles[`align-self-${breakpoint}-stretch`] = { alignSelf: 'stretch' };
      styles[`align-self-${breakpoint}-baseline`] = { alignSelf: 'baseline' };
      styles[`position-${breakpoint}-relative`] = { position: 'relative' };
      styles[`position-${breakpoint}-absolute`] = { position: 'absolute' };
      styles[`top-${breakpoint}-0`] = { top: 0 };
      styles[`top-${breakpoint}-50`] = { top: '50%' };
      styles[`top-${breakpoint}-100`] = { top: '100%' };
      styles[`bottom-${breakpoint}-0`] = { bottom: 0 };
      styles[`bottom-${breakpoint}-50`] = { bottom: '50%' };
      styles[`bottom-${breakpoint}-100`] = { bottom: '100%' };
      styles[`start-${breakpoint}-0`] = { start: 0 };
      styles[`start-${breakpoint}-50`] = { start: '50%' };
      styles[`start-${breakpoint}-100`] = { start: '100%' };
      styles[`end-${breakpoint}-0`] = { end: 0 };
      styles[`end-${breakpoint}-50`] = { end: '50%' };
      styles[`end-${breakpoint}-100`] = { end: '100%' };
      styles[`left-${breakpoint}-0`] = { left: 0 };
      styles[`left-${breakpoint}-50`] = { left: '50%' };
      styles[`left-${breakpoint}-100`] = { left: '100%' };
      styles[`right-${breakpoint}-0`] = { right: 0 };
      styles[`right-${breakpoint}-50`] = { right: '50%' };
      styles[`right-${breakpoint}-100`] = { right: '100%' };
      styles[`w-${breakpoint}-25`] = { width: '25%' };
      styles[`w-${breakpoint}-50`] = { width: '50%' };
      styles[`w-${breakpoint}-75`] = { width: '75%' };
      styles[`w-${breakpoint}-100`] = { width: '100%' };
      styles[`h-${breakpoint}-25`] = { height: '25%' };
      styles[`h-${breakpoint}-50`] = { height: '50%' };
      styles[`h-${breakpoint}-75`] = { height: '75%' };
      styles[`h-${breakpoint}-100`] = { height: '100%' };
    }

    for (const [k, v] of _.toPairs(theme.spacers)) {
      styles[`p-${k}`] = { padding: v };
      styles[`px-${k}`] = { paddingHorizontal: v };
      styles[`py-${k}`] = { paddingVertical: v };
      styles[`pt-${k}`] = { paddingTop: v };
      styles[`pb-${k}`] = { paddingBottom: v };
      styles[`ps-${k}`] = { paddingStart: v };
      styles[`pe-${k}`] = { paddingEnd: v };
      styles[`pl-${k}`] = { paddingLeft: v };
      styles[`pr-${k}`] = { paddingRight: v };
      if (breakpoint) {
        styles[`p-${breakpoint}-${k}`] = { padding: v };
        styles[`px-${breakpoint}-${k}`] = { paddingHorizontal: v };
        styles[`py-${breakpoint}-${k}`] = { paddingVertical: v };
        styles[`pt-${breakpoint}-${k}`] = { paddingTop: v };
        styles[`pb-${breakpoint}-${k}`] = { paddingBottom: v };
        styles[`ps-${breakpoint}-${k}`] = { paddingStart: v };
        styles[`pe-${breakpoint}-${k}`] = { paddingEnd: v };
        styles[`pl-${breakpoint}-${k}`] = { paddingLeft: v };
        styles[`pr-${breakpoint}-${k}`] = { paddingRight: v };
      }
    }

    for (const [k, v] of _.toPairs(theme.spacers)) {
      styles[`m-${k}`] = { margin: v };
      styles[`mx-${k}`] = { marginHorizontal: v };
      styles[`my-${k}`] = { marginVertical: v };
      styles[`mt-${k}`] = { marginTop: v };
      styles[`mb-${k}`] = { marginBottom: v };
      styles[`ms-${k}`] = { marginStart: v };
      styles[`me-${k}`] = { marginEnd: v };
      styles[`ml-${k}`] = { marginLeft: v };
      styles[`mr-${k}`] = { marginRight: v };
      if (breakpoint) {
        styles[`m-${breakpoint}-${k}`] = { margin: v };
        styles[`mx-${breakpoint}-${k}`] = { marginHorizontal: v };
        styles[`my-${breakpoint}-${k}`] = { marginVertical: v };
        styles[`mt-${breakpoint}-${k}`] = { marginTop: v };
        styles[`mb-${breakpoint}-${k}`] = { marginBottom: v };
        styles[`ms-${breakpoint}-${k}`] = { marginStart: v };
        styles[`me-${breakpoint}-${k}`] = { marginEnd: v };
        styles[`ml-${breakpoint}-${k}`] = { marginLeft: v };
        styles[`mr-${breakpoint}-${k}`] = { marginRight: v };
      }
    }

    for (const [k, v] of [..._.toPairs(theme.themeColors), ..._.toPairs(theme.colors)]) {
      styles[`bg-${k}`] = { backgroundColor: v };
      if (breakpoint) {
        styles[`bg-${breakpoint}-${k}`] = { backgroundColor: v };
      }
    }

    for (const [k, v] of [..._.toPairs(theme.themeColors), ..._.toPairs(theme.colors)]) {
      styles[`text-${k}`] = { color: v };
      if (breakpoint) {
        styles[`text-${breakpoint}-${k}`] = { color: v };
      }
    }

    for (const [k, v] of _.toPairs(theme.zIndex)) {
      styles[`zindex-${k}`] = { zIndex: v };
      if (breakpoint) {
        styles[`zindex-${breakpoint}-${k}`] = { zIndex: v };
      }
    }

    return styles;

  }, [theme]);
  return (
    <StyleProvider classes={styles}>{children}</StyleProvider>
  );
}