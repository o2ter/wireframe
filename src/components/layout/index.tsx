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
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

const LayoutContext = React.createContext<{
  layout: Record<string, LayoutRectangle | undefined>;
  setLayout: React.Dispatch<React.SetStateAction<Record<string, LayoutRectangle | undefined>>>;
}>({
  layout: {},
  setLayout: () => { },
});

export const LayoutProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [layout, setLayout] = React.useState<Record<string, LayoutRectangle | undefined>>({});
  const value = React.useMemo(() => ({ layout, setLayout }), [layout]);
  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export const useLayout = (name: string) => {
  const { layout, setLayout } = React.useContext(LayoutContext);
  const handlers = React.useMemo(() => ({
    onLayout: (event: LayoutChangeEvent) => {
      setLayout(v => ({ ...v, [name]: event.nativeEvent.layout }));
    },
  }), []);
  React.useEffect(() => {
    return () => setLayout(v => ({ ...v, [name]: undefined }));
  }, []);
  return {
    layout: layout[name],
    handlers,
  };
}