//
//  index.tsx
//
//  The MIT License
//  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
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
import { StyleProvider, isSSR, useTheme } from '@o2ter/react-ui';
import { _useAllDefaultStyle, _StyleProvider } from './provider';
import { TextStyle, ViewStyle, useWindowDimensions } from 'react-native';

export { _useAllDefaultStyle };

export const htmlElementStyles = (
  theme: ReturnType<typeof useTheme>,
  classes: Record<string, ViewStyle | TextStyle>,
) => {
  const styles: typeof classes = {};
  for (const i of [1, 2, 3, 4, 5, 6]) {
    if (classes[`h${i}`]) styles[`h${i}`] = classes[`h${i}`];
  }
  styles['table'] = {
    width: '100%',
    marginBottom: theme.root.fontSize,
    color: theme.root.textColor,
    verticalAlign: 'top',
    borderColor: theme.grays['300'],
    borderCollapse: 'collapse',
  } as any;
  styles['th'] = {
    textAlign: 'inherit',
  } as any;
  styles['tbody, td, tfoot, th, thead, tr'] = {
    borderColor: 'inherit',
    borderStyle: 'solid',
    borderWidth: 0,
  };
  styles['table > thead > tr > *'] = {
    borderBottomColor: 'currentColor',
  };
  styles['table tr > *'] = {
    padding: theme.spacers['2'],
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
  };
  styles['table > tbody'] = {
    verticalAlign: 'inherit',
  } as any;
  styles['table > thead'] = {
    verticalAlign: 'bottom',
  };
  styles['.table-striped tr:nth-of-type(odd) > *'] = {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  };
  return styles;
};

const _DefaultStyleProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  const theme = useTheme();
  const styles = _useAllDefaultStyle();
  const windowDimensions = useWindowDimensions();
  const selected = React.useMemo(() => {
    const media = _.keys(_.pickBy(theme.breakpoints, v => isSSR || windowDimensions.width >= v));
    const selected = _.pickBy(styles, ({ breakpoint }) => _.isNil(breakpoint) || _.includes(media, breakpoint));
    return _.mapValues(selected, ({ style }) => style);
  }, [styles, theme, windowDimensions.width]);
  return (
    <StyleProvider classes={selected}>{children}</StyleProvider>
  );
}

type DefaultStyleProviderProps = React.PropsWithChildren<{
  gridColumns?: number;
}>;

export const DefaultStyleProvider: React.FC<DefaultStyleProviderProps> = ({
  gridColumns,
  children
}) => (
  <_StyleProvider gridColumns={gridColumns}>
    <_DefaultStyleProvider>{children}</_DefaultStyleProvider>
  </_StyleProvider>
);
