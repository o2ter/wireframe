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
    const [breakpoint] = _.minBy(_.filter(_.toPairs(theme.breakpoints), ([,v]) => windowDimensions.width >= v), ([,v]) => v) ?? [];
    const paddings: Record<string, ViewStyle> = {};
    for (const [k, v] of _.toPairs(theme.spacers)) {
      paddings[`p-${k}`] = { padding: v };
      paddings[`pt-${k}`] = { paddingTop: v };
      paddings[`pb-${k}`] = { paddingBottom: v };
      paddings[`ps-${k}`] = { paddingStart: v };
      paddings[`pe-${k}`] = { paddingEnd: v };
      paddings[`px-${k}`] = { paddingHorizontal: v };
      paddings[`py-${k}`] = { paddingVertical: v };
      if (breakpoint) {
        paddings[`p-${breakpoint}-${k}`] = { padding: v };
        paddings[`pt-${breakpoint}-${k}`] = { paddingTop: v };
        paddings[`pb-${breakpoint}-${k}`] = { paddingBottom: v };
        paddings[`ps-${breakpoint}-${k}`] = { paddingStart: v };
        paddings[`pe-${breakpoint}-${k}`] = { paddingEnd: v };
        paddings[`px-${breakpoint}-${k}`] = { paddingHorizontal: v };
        paddings[`py-${breakpoint}-${k}`] = { paddingVertical: v };
      }
    }
    const margins: Record<string, ViewStyle> = {};
    for (const [k, v] of _.toPairs(theme.spacers)) {
      margins[`m-${k}`] = { margin: v };
      margins[`mt-${k}`] = { marginTop: v };
      margins[`mb-${k}`] = { marginBottom: v };
      margins[`ms-${k}`] = { marginStart: v };
      margins[`me-${k}`] = { marginEnd: v };
      margins[`mx-${k}`] = { marginHorizontal: v };
      margins[`my-${k}`] = { marginVertical: v };
      if (breakpoint) {
        margins[`m-${breakpoint}-${k}`] = { margin: v };
        margins[`mt-${breakpoint}-${k}`] = { marginTop: v };
        margins[`mb-${breakpoint}-${k}`] = { marginBottom: v };
        margins[`ms-${breakpoint}-${k}`] = { marginStart: v };
        margins[`me-${breakpoint}-${k}`] = { marginEnd: v };
        margins[`mx-${breakpoint}-${k}`] = { marginHorizontal: v };
        margins[`my-${breakpoint}-${k}`] = { marginVertical: v };
      }
    }
    const backgrounds: Record<string, ViewStyle> = {};
    for (const [k, v] of [..._.toPairs(theme.themeColors), ..._.toPairs(theme.colors)]) {
      backgrounds[`bg-${k}`] = { backgroundColor: v };
      if (breakpoint) {
        backgrounds[`bg-${breakpoint}-${k}`] = { backgroundColor: v };
      }
    }
    const texts: Record<string, TextStyle> = {};
    for (const [k, v] of [..._.toPairs(theme.themeColors), ..._.toPairs(theme.colors)]) {
      texts[`bg-${k}`] = { color: v };
      if (breakpoint) {
        texts[`bg-${breakpoint}-${k}`] = { color: v };
      }
    }
    return {
      ...paddings,
      ...margins,
      ...backgrounds,
      ...texts,
    };
  }, [theme]);
  return (
    <StyleProvider classes={styles}>{children}</StyleProvider>
  );
}