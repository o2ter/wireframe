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
    };
    if (breakpoint) {
      styles[`d-${breakpoint}-none`] = { display: 'none' };
      styles[`d-${breakpoint}-flex`] = { display: 'flex' };
      styles[`flex-${breakpoint}-row`] = { flexDirection: 'row' };
      styles[`flex-${breakpoint}-column`] = { flexDirection: 'column' };
      styles[`flex-${breakpoint}-row-reverse`] = { flexDirection: 'row-reverse' };
      styles[`flex-${breakpoint}-column-reverse`] = { flexDirection: 'column-reverse' };
    }

    for (const [k, v] of _.toPairs(theme.spacers)) {
      styles[`p-${k}`] = { padding: v };
      styles[`pt-${k}`] = { paddingTop: v };
      styles[`pb-${k}`] = { paddingBottom: v };
      styles[`ps-${k}`] = { paddingStart: v };
      styles[`pe-${k}`] = { paddingEnd: v };
      styles[`px-${k}`] = { paddingHorizontal: v };
      styles[`py-${k}`] = { paddingVertical: v };
      if (breakpoint) {
        styles[`p-${breakpoint}-${k}`] = { padding: v };
        styles[`pt-${breakpoint}-${k}`] = { paddingTop: v };
        styles[`pb-${breakpoint}-${k}`] = { paddingBottom: v };
        styles[`ps-${breakpoint}-${k}`] = { paddingStart: v };
        styles[`pe-${breakpoint}-${k}`] = { paddingEnd: v };
        styles[`px-${breakpoint}-${k}`] = { paddingHorizontal: v };
        styles[`py-${breakpoint}-${k}`] = { paddingVertical: v };
      }
    }

    for (const [k, v] of _.toPairs(theme.spacers)) {
      styles[`m-${k}`] = { margin: v };
      styles[`mt-${k}`] = { marginTop: v };
      styles[`mb-${k}`] = { marginBottom: v };
      styles[`ms-${k}`] = { marginStart: v };
      styles[`me-${k}`] = { marginEnd: v };
      styles[`mx-${k}`] = { marginHorizontal: v };
      styles[`my-${k}`] = { marginVertical: v };
      if (breakpoint) {
        styles[`m-${breakpoint}-${k}`] = { margin: v };
        styles[`mt-${breakpoint}-${k}`] = { marginTop: v };
        styles[`mb-${breakpoint}-${k}`] = { marginBottom: v };
        styles[`ms-${breakpoint}-${k}`] = { marginStart: v };
        styles[`me-${breakpoint}-${k}`] = { marginEnd: v };
        styles[`mx-${breakpoint}-${k}`] = { marginHorizontal: v };
        styles[`my-${breakpoint}-${k}`] = { marginVertical: v };
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