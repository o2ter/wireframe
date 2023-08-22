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
import { StyleProvider, shiftColor, useTheme } from '@o2ter/react-ui';
import { useWindowDimensions, ViewStyle, TextStyle } from 'react-native';

export const DefaultStyleProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const theme = useTheme();
  const windowDimensions = useWindowDimensions();
  const styles = React.useMemo(() => {

    const [breakpoint] = _.minBy(_.filter(_.toPairs(theme.breakpoints), ([, v]) => windowDimensions.width >= v), ([, v]) => v) ?? [];

    const createStyle = (infix: string) => {

      const styles: Record<string, ViewStyle | TextStyle> = {};

      styles[`d${infix}-none`] = { display: 'none' };
      styles[`d${infix}-flex`] = { display: 'flex' };
      styles[`flex${infix}-row`] = { flexDirection: 'row' };
      styles[`flex${infix}-column`] = { flexDirection: 'column' };
      styles[`flex${infix}-row-reverse`] = { flexDirection: 'row-reverse' };
      styles[`flex${infix}-column-reverse`] = { flexDirection: 'column-reverse' };
      styles[`align-content${infix}-start`] = { alignContent: 'flex-start' };
      styles[`align-content${infix}-end`] = { alignContent: 'flex-end' };
      styles[`align-content${infix}-center`] = { alignContent: 'center' };
      styles[`align-content${infix}-stretch`] = { alignContent: 'stretch' };
      styles[`align-content${infix}-between`] = { alignContent: 'space-between' };
      styles[`align-content${infix}-around`] = { alignContent: 'space-around' };
      styles[`align-items${infix}-start`] = { alignItems: 'flex-start' };
      styles[`align-items${infix}-end`] = { alignItems: 'flex-end' };
      styles[`align-items${infix}-center`] = { alignItems: 'center' };
      styles[`align-items${infix}-stretch`] = { alignItems: 'stretch' };
      styles[`align-items${infix}-baseline`] = { alignItems: 'baseline' };
      styles[`align-self${infix}-start`] = { alignSelf: 'flex-start' };
      styles[`align-self${infix}-end`] = { alignSelf: 'flex-end' };
      styles[`align-self${infix}-center`] = { alignSelf: 'center' };
      styles[`align-self${infix}-stretch`] = { alignSelf: 'stretch' };
      styles[`align-self${infix}-baseline`] = { alignSelf: 'baseline' };
      styles[`position${infix}-relative`] = { position: 'relative' };
      styles[`position${infix}-absolute`] = { position: 'absolute' };
      styles[`top${infix}-0`] = { top: 0 };
      styles[`top${infix}-50`] = { top: '50%' };
      styles[`top${infix}-100`] = { top: '100%' };
      styles[`bottom${infix}-0`] = { bottom: 0 };
      styles[`bottom${infix}-50`] = { bottom: '50%' };
      styles[`bottom${infix}-100`] = { bottom: '100%' };
      styles[`start${infix}-0`] = { start: 0 };
      styles[`start${infix}-50`] = { start: '50%' };
      styles[`start${infix}-100`] = { start: '100%' };
      styles[`end${infix}-0`] = { end: 0 };
      styles[`end${infix}-50`] = { end: '50%' };
      styles[`end${infix}-100`] = { end: '100%' };
      styles[`left${infix}-0`] = { left: 0 };
      styles[`left${infix}-50`] = { left: '50%' };
      styles[`left${infix}-100`] = { left: '100%' };
      styles[`right${infix}-0`] = { right: 0 };
      styles[`right${infix}-50`] = { right: '50%' };
      styles[`right${infix}-100`] = { right: '100%' };
      styles[`w${infix}-25`] = { width: '25%' };
      styles[`w${infix}-50`] = { width: '50%' };
      styles[`w${infix}-75`] = { width: '75%' };
      styles[`w${infix}-100`] = { width: '100%' };
      styles[`h${infix}-25`] = { height: '25%' };
      styles[`h${infix}-50`] = { height: '50%' };
      styles[`h${infix}-75`] = { height: '75%' };
      styles[`h${infix}-100`] = { height: '100%' };

      for (const [k, v] of _.toPairs(theme.spacers)) {
        styles[`gap${infix}-${k}`] = { gap: v };
      }

      for (const [k, v] of _.toPairs(theme.spacers)) {
        styles[`p${infix}-${k}`] = { padding: v };
        styles[`px${infix}-${k}`] = { paddingHorizontal: v };
        styles[`py${infix}-${k}`] = { paddingVertical: v };
        styles[`pt${infix}-${k}`] = { paddingTop: v };
        styles[`pb${infix}-${k}`] = { paddingBottom: v };
        styles[`ps${infix}-${k}`] = { paddingStart: v };
        styles[`pe${infix}-${k}`] = { paddingEnd: v };
        styles[`pl${infix}-${k}`] = { paddingLeft: v };
        styles[`pr${infix}-${k}`] = { paddingRight: v };
      }

      for (const [k, v] of _.toPairs(theme.spacers)) {
        styles[`m${infix}-${k}`] = { margin: v };
        styles[`mx${infix}-${k}`] = { marginHorizontal: v };
        styles[`my${infix}-${k}`] = { marginVertical: v };
        styles[`mt${infix}-${k}`] = { marginTop: v };
        styles[`mb${infix}-${k}`] = { marginBottom: v };
        styles[`ms${infix}-${k}`] = { marginStart: v };
        styles[`me${infix}-${k}`] = { marginEnd: v };
        styles[`ml${infix}-${k}`] = { marginLeft: v };
        styles[`mr${infix}-${k}`] = { marginRight: v };
      }

      for (const [k, v] of [..._.toPairs(theme.themeColors), ..._.toPairs(theme.colors)]) {
        styles[`bg${infix}-${k}`] = { backgroundColor: v };
        for (const [w, n] of _.toPairs(theme.colorWeights)) {
          styles[`bg${infix}-${k}-${w}`] = { backgroundColor: shiftColor(v, n) };
        }
      }

      for (const [k, v] of [..._.toPairs(theme.themeColors), ..._.toPairs(theme.colors)]) {
        styles[`text${infix}-${k}`] = { color: v };
        for (const [w, n] of _.toPairs(theme.colorWeights)) {
          styles[`text${infix}-${k}-${w}`] = { color: shiftColor(v, n) };
        }
      }

      styles[`border${infix}`] = { borderWidth: theme.borderWidth };
      styles[`border${infix}-top`] = { borderTopWidth: theme.borderWidth };
      styles[`border${infix}-bottom`] = { borderBottomWidth: theme.borderWidth };
      styles[`border${infix}-start`] = { borderStartWidth: theme.borderWidth };
      styles[`border${infix}-end`] = { borderEndWidth: theme.borderWidth };
      styles[`border${infix}-left`] = { borderLeftWidth: theme.borderWidth };
      styles[`border${infix}-right`] = { borderRightWidth: theme.borderWidth };

      styles[`border${infix}-0`] = { borderWidth: 0 };
      styles[`border${infix}-top-0`] = { borderTopWidth: 0 };
      styles[`border${infix}-bottom-0`] = { borderBottomWidth: 0 };
      styles[`border${infix}-start-0`] = { borderStartWidth: 0 };
      styles[`border${infix}-end-0`] = { borderEndWidth: 0 };
      styles[`border${infix}-left-0`] = { borderLeftWidth: 0 };
      styles[`border${infix}-right-0`] = { borderRightWidth: 0 };

      for (const [k, v] of _.toPairs(theme.borderWidths)) {
        styles[`border${infix}-${k}`] = { borderWidth: v };
        styles[`border${infix}-top-${k}`] = { borderTopWidth: v };
        styles[`border${infix}-bottom-${k}`] = { borderBottomWidth: v };
        styles[`border${infix}-start-${k}`] = { borderStartWidth: v };
        styles[`border${infix}-end-${k}`] = { borderEndWidth: v };
        styles[`border${infix}-left-${k}`] = { borderLeftWidth: v };
        styles[`border${infix}-right-${k}`] = { borderRightWidth: v };
      }

      for (const [k, v] of [..._.toPairs(theme.themeColors), ..._.toPairs(theme.colors)]) {
        styles[`border${infix}-${k}`] = { borderColor: v };
        for (const [w, n] of _.toPairs(theme.colorWeights)) {
          styles[`border${infix}-${k}-${w}`] = { borderColor: shiftColor(v, n) };
        }
      }

      for (const [k, v] of _.toPairs(theme.zIndex)) {
        styles[`zindex${infix}-${k}`] = { zIndex: v };
      }

      return styles;
    }

    return breakpoint ? {
      ...createStyle(''),
      ...createStyle(`-${breakpoint}`),
    } : createStyle('');

  }, [theme]);
  return (
    <StyleProvider classes={styles}>{children}</StyleProvider>
  );
}