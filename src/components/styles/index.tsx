//
//  index.tsx
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
import { StyleProvider, shiftColor, useAllStyle, useTheme } from '@o2ter/react-ui';
import { useWindowDimensions, ViewStyle, TextStyle, Platform, StyleSheet } from 'react-native';

export const htmlElementStyles = (
  classes: ReturnType<typeof useAllStyle>['classes'],
) => {
  const styles: typeof classes = {};
  for (const i of [1, 2, 3, 4, 5, 6]) {
    if (classes[`h${i}`]) styles[`h${i}`] = classes[`h${i}`];
  }
  return styles;
};

export const DefaultStyleProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  const theme = useTheme();
  const windowDimensions = useWindowDimensions();

  const styles = React.useMemo(() => {

    const [breakpoint] = _.minBy(_.filter(_.toPairs(theme.breakpoints), ([, v]) => windowDimensions.width >= v), ([, v]) => v) ?? [];

    const base_colors = [
      ..._.toPairs(theme.themeColors),
      ..._.toPairs(theme.colors),
    ];
    const colors = [
      ..._.toPairs({
        black: '#000000',
        white: '#ffffff',
      }),
      ...base_colors,
      ..._.flatMap(base_colors, ([k, v]) => _.map(theme.colorWeights, (s, w) => [`${k}-${w}`, shiftColor(v, s)])),
      ..._.toPairs(theme.grays),
    ];

    const createCompoundStyle = (infix: string) => {

      const styles: Record<string, ViewStyle | TextStyle> = {};

      styles[`absolute${infix}-fill`] = StyleSheet.absoluteFillObject;

      if (Platform.OS === 'web') {
        styles[`fixed${infix}-top`] = {
          position: 'fixed' as any,
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex['fixed'] ?? 1030,
        };
        styles[`fixed${infix}-bottom`] = {
          position: 'fixed' as any,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex['fixed'] ?? 1030,
        };
        styles[`sticky${infix}-top`] = {
          position: 'sticky' as any,
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex['sticky'] ?? 1020,
        };
      }
      for (const [k, v] of _.toPairs(theme.fontSizes)) {
        styles[`h${k}${infix}`] = {
          marginTop: 0,
          marginBottom: 0.5 * theme.fontSizeBase,
          fontWeight: '500',
          fontSize: v,
        };
      }

      styles[`alert${infix}`] = {
        padding: theme.spacer,
        borderStyle: 'solid',
        borderWidth: theme.borderWidth,
        borderRadius: theme.borderRadiusBase,
      };
      for (const [k, v] of base_colors) {
        styles[`alert${infix}-${k}`] = {
          color: shiftColor(v, theme.colorWeights['700']),
          borderColor: shiftColor(v, theme.colorWeights['200']),
          backgroundColor: shiftColor(v, theme.colorWeights['100']),
        };
      }

      return styles;
    }

    const createStyle = (infix: string) => {

      const styles: Record<string, ViewStyle | TextStyle> = {};

      styles[`d${infix}-none`] = { display: 'none' };
      styles[`d${infix}-flex`] = { display: 'flex' };
      if (Platform.OS === 'web') {
        styles[`d${infix}-inline`] = { display: 'inline' as any };
        styles[`d${infix}-inline-block`] = { display: 'inline-block' as any };
        styles[`d${infix}-block`] = { display: 'block' as any };
        styles[`d${infix}-grid`] = { display: 'grid' as any };
        styles[`d${infix}-inline-grid`] = { display: 'inline-grid' as any };
        styles[`d${infix}-table`] = { display: 'table' as any };
        styles[`d${infix}-table-cell`] = { display: 'table-cell' as any };
        styles[`d${infix}-table-row`] = { display: 'table-row' as any };
        styles[`d${infix}-inline-flex`] = { display: 'inline-flex' as any };
      }
      styles[`flex${infix}-row`] = { flexDirection: 'row' };
      styles[`flex${infix}-column`] = { flexDirection: 'column' };
      styles[`flex${infix}-row-reverse`] = { flexDirection: 'row-reverse' };
      styles[`flex${infix}-column-reverse`] = { flexDirection: 'column-reverse' };
      styles[`flex${infix}-fill`] = Platform.select({ web: { flex: 1, flexBasis: 'auto' }, default: { flex: 1 } });
      styles[`flex${infix}-wrap`] = { flexWrap: 'wrap' };
      styles[`flex${infix}-nowrap`] = { flexWrap: 'nowrap' };
      styles[`flex${infix}-wrap-reverse`] = { flexWrap: 'wrap-reverse' };
      styles[`justify-content${infix}-start`] = { justifyContent: 'flex-start' };
      styles[`justify-content${infix}-end`] = { justifyContent: 'flex-end' };
      styles[`justify-content${infix}-center`] = { justifyContent: 'center' };
      styles[`justify-content${infix}-between`] = { justifyContent: 'space-between' };
      styles[`justify-content${infix}-around`] = { justifyContent: 'space-around' };
      styles[`justify-content${infix}-evenly`] = { justifyContent: 'space-evenly' };
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
      if (Platform.OS === 'web') {
        styles[`position${infix}-fixed`] = { position: 'fixed' as any };
        styles[`position${infix}-sticky`] = { position: 'sticky' as any };
      }
      styles[`overflow${infix}-visible`] = { overflow: 'visible' };
      styles[`overflow${infix}-hidden`] = { overflow: 'hidden' };
      styles[`overflow${infix}-scroll`] = { overflow: 'scroll' };
      if (Platform.OS === 'web') {
        styles[`overflow${infix}-auto`] = { overflow: 'auto' as any };
      }
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
        styles[`p${infix}-${k}`] = { padding: v };
        styles[`px${infix}-${k}`] = { paddingHorizontal: v };
        styles[`py${infix}-${k}`] = { paddingVertical: v };
        styles[`pt${infix}-${k}`] = { paddingTop: v };
        styles[`pb${infix}-${k}`] = { paddingBottom: v };
        styles[`ps${infix}-${k}`] = { paddingStart: v };
        styles[`pe${infix}-${k}`] = { paddingEnd: v };
        styles[`pl${infix}-${k}`] = { paddingLeft: v };
        styles[`pr${infix}-${k}`] = { paddingRight: v };
        styles[`m${infix}-${k}`] = { margin: v };
        styles[`mx${infix}-${k}`] = { marginHorizontal: v };
        styles[`my${infix}-${k}`] = { marginVertical: v };
        styles[`mt${infix}-${k}`] = { marginTop: v };
        styles[`mb${infix}-${k}`] = { marginBottom: v };
        styles[`ms${infix}-${k}`] = { marginStart: v };
        styles[`me${infix}-${k}`] = { marginEnd: v };
        styles[`ml${infix}-${k}`] = { marginLeft: v };
        styles[`mr${infix}-${k}`] = { marginRight: v };
        styles[`g${infix}-${k}`] = { gap: v };
        styles[`g-row${infix}-${k}`] = { rowGap: v };
        styles[`g-col${infix}-${k}`] = { columnGap: v };
      }

      for (const [k, v] of colors) {
        styles[`bg${infix}-${k}`] = { backgroundColor: v };
      }
      styles[`bg${infix}-body`] = { backgroundColor: theme.bodyBackground };

      styles[`text${infix}-auto`] = { textAlign: 'auto' };
      styles[`text${infix}-left`] = { textAlign: 'left' };
      styles[`text${infix}-right`] = { textAlign: 'right' };
      styles[`text${infix}-center`] = { textAlign: 'center' };
      styles[`text${infix}-justify`] = { textAlign: 'justify' };
      styles[`text${infix}-lowercase`] = { textTransform: 'lowercase' };
      styles[`text${infix}-uppercase`] = { textTransform: 'uppercase' };
      styles[`text${infix}-capitalize`] = { textTransform: 'capitalize' };
      styles[`fst${infix}-normal`] = { fontStyle: 'normal' };
      styles[`fst${infix}-italic`] = { fontStyle: 'italic' };
      styles[`text-decoration${infix}-none`] = { textDecorationLine: 'none' };
      styles[`text-decoration${infix}-underline`] = { textDecorationLine: 'underline' };
      styles[`text-decoration${infix}-line-through`] = { textDecorationLine: 'line-through' };
      for (const [k, v] of _.toPairs(theme.fontSizes)) {
        styles[`fs${infix}-${k}`] = { fontSize: v };
      }
      for (const [k, v] of _.toPairs(theme.displayFontSizes)) {
        styles[`display${infix}-${k}`] = { fontSize: v, fontWeight: theme.displayFontWeight };
      }
      for (const [k, v] of _.toPairs(theme.fontWeights)) {
        styles[`fw${infix}-${k}`] = { fontWeight: v };
      }

      for (const [k, v] of colors) {
        styles[`text${infix}-${k}`] = { color: v };
      }
      styles[`text${infix}-body`] = { color: theme.bodyColor };

      styles[`border${infix}`] = {
        borderWidth: theme.borderWidth,
        borderColor: theme.grays['300'],
        borderStyle: 'solid',
      };
      styles[`border${infix}-top`] = {
        borderWidth: 0,
        borderTopWidth: theme.borderWidth,
        borderTopColor: theme.grays['300'],
        borderStyle: 'solid',
      };
      styles[`border${infix}-bottom`] = {
        borderWidth: 0,
        borderBottomWidth: theme.borderWidth,
        borderBottomColor: theme.grays['300'],
        borderStyle: 'solid',
      };
      styles[`border${infix}-start`] = {
        borderWidth: 0,
        borderStartWidth: theme.borderWidth,
        borderStartColor: theme.grays['300'],
        borderStyle: 'solid',
      };
      styles[`border${infix}-end`] = {
        borderWidth: 0,
        borderEndWidth: theme.borderWidth,
        borderEndColor: theme.grays['300'],
        borderStyle: 'solid',
      };
      styles[`border${infix}-left`] = {
        borderWidth: 0,
        borderLeftWidth: theme.borderWidth,
        borderLeftColor: theme.grays['300'],
        borderStyle: 'solid',
      };
      styles[`border${infix}-right`] = {
        borderWidth: 0,
        borderRightWidth: theme.borderWidth,
        borderRightColor: theme.grays['300'],
        borderStyle: 'solid',
      };

      styles[`border${infix}-0`] = { borderWidth: 0 };
      styles[`border${infix}-top-0`] = { borderTopWidth: 0 };
      styles[`border${infix}-bottom-0`] = { borderBottomWidth: 0 };
      styles[`border${infix}-start-0`] = { borderStartWidth: 0 };
      styles[`border${infix}-end-0`] = { borderEndWidth: 0 };
      styles[`border${infix}-left-0`] = { borderLeftWidth: 0 };
      styles[`border${infix}-right-0`] = { borderRightWidth: 0 };

      for (const [k, v] of _.toPairs(theme.borderWidths)) {
        styles[`border${infix}-${k}`] = {
          borderWidth: v,
          borderColor: theme.grays['300'],
          borderStyle: 'solid',
        };
        styles[`border${infix}-top-${k}`] = {
          borderTopWidth: v,
          borderTopColor: theme.grays['300'],
          borderStyle: 'solid',
        };
        styles[`border${infix}-bottom-${k}`] = {
          borderBottomWidth: v,
          borderBottomColor: theme.grays['300'],
          borderStyle: 'solid',
        };
        styles[`border${infix}-start-${k}`] = {
          borderStartWidth: v,
          borderStartColor: theme.grays['300'],
          borderStyle: 'solid',
        };
        styles[`border${infix}-end-${k}`] = {
          borderEndWidth: v,
          borderEndColor: theme.grays['300'],
          borderStyle: 'solid',
        };
        styles[`border${infix}-left-${k}`] = {
          borderLeftWidth: v,
          borderLeftColor: theme.grays['300'],
          borderStyle: 'solid',
        };
        styles[`border${infix}-right-${k}`] = {
          borderRightWidth: v,
          borderRightColor: theme.grays['300'],
          borderStyle: 'solid',
        };
      }

      for (const [k, v] of colors) {
        styles[`border${infix}-${k}`] = { borderColor: v };
      }

      styles[`rounded${infix}`] = { borderRadius: theme.borderRadiusBase };
      styles[`rounded${infix}-top`] = {
        borderTopLeftRadius: theme.borderRadiusBase,
        borderTopRightRadius: theme.borderRadiusBase,
      };
      styles[`rounded${infix}-bottom`] = {
        borderBottomLeftRadius: theme.borderRadiusBase,
        borderBottomRightRadius: theme.borderRadiusBase,
      };
      styles[`rounded${infix}-start`] = {
        borderTopStartRadius: theme.borderRadiusBase,
        borderBottomStartRadius: theme.borderRadiusBase,
      };
      styles[`rounded${infix}-end`] = {
        borderTopEndRadius: theme.borderRadiusBase,
        borderBottomEndRadius: theme.borderRadiusBase,
      };
      styles[`rounded${infix}-left`] = {
        borderTopLeftRadius: theme.borderRadiusBase,
        borderBottomLeftRadius: theme.borderRadiusBase,
      };
      styles[`rounded${infix}-right`] = {
        borderTopRightRadius: theme.borderRadiusBase,
        borderBottomRightRadius: theme.borderRadiusBase,
      };

      styles[`rounded${infix}-0`] = { borderRadius: 0 };
      styles[`rounded${infix}-top-0`] = {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      };
      styles[`rounded${infix}-bottom-0`] = {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      };
      styles[`rounded${infix}-start-0`] = {
        borderTopStartRadius: 0,
        borderBottomStartRadius: 0,
      };
      styles[`rounded${infix}-end-0`] = {
        borderTopEndRadius: 0,
        borderBottomEndRadius: 0,
      };
      styles[`rounded${infix}-left-0`] = {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      };
      styles[`rounded${infix}-right-0`] = {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      };

      for (const [k, v] of _.toPairs(theme.borderRadius)) {
        styles[`rounded${infix}-${k}`] = { borderRadius: v };
        styles[`rounded${infix}-top-${k}`] = {
          borderTopLeftRadius: v,
          borderTopRightRadius: v,
        };
        styles[`rounded${infix}-bottom-${k}`] = {
          borderBottomLeftRadius: v,
          borderBottomRightRadius: v,
        };
        styles[`rounded${infix}-start-${k}`] = {
          borderTopStartRadius: v,
          borderBottomStartRadius: v,
        };
        styles[`rounded${infix}-end-${k}`] = {
          borderTopEndRadius: v,
          borderBottomEndRadius: v,
        };
        styles[`rounded${infix}-left-${k}`] = {
          borderTopLeftRadius: v,
          borderBottomLeftRadius: v,
        };
        styles[`rounded${infix}-right-${k}`] = {
          borderTopRightRadius: v,
          borderBottomRightRadius: v,
        };
      }

      for (const [k, v] of _.toPairs(theme.zIndex)) {
        styles[`zindex${infix}-${k}`] = { zIndex: v };
      }

      return styles;
    }

    return {
      ...createCompoundStyle(''),
      ...breakpoint ? createCompoundStyle(`-${breakpoint}`) : {},
      ...createStyle(''),
      ...breakpoint ? createStyle(`-${breakpoint}`) : {},
    };

  }, [theme, windowDimensions.width]);

  return (
    <StyleProvider classes={styles}>{children}</StyleProvider>
  );
}
