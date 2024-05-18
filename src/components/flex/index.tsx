//
//  index.tsx
//
//  The MIT License
//  Copyright (c) 2021 - 2024 O2ter Limited. All rights reserved.
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
import { View, createMemoComponent } from '@o2ter/react-ui';

type FlexProps = React.ComponentPropsWithoutRef<typeof View> & {
  reversed?: boolean;
};

const FlexBox = (type: 'row' | 'column') => (
  {
    classes,
    reversed,
    ...props
  }: FlexProps,
  forwardRef: React.ForwardedRef<React.ComponentRef<typeof View>>
) => (
  <View
    ref={forwardRef}
    classes={[
      type.slice(0, 3),
      reversed && `flex-${type}-reverse`,
      classes,
    ]}
    {...props}
  />
);

export const Row = createMemoComponent(FlexBox('row'), { displayName: 'Row' });
export const Col = createMemoComponent(FlexBox('column'), { displayName: 'Col' });