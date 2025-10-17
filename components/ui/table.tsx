import * as TablePrimitive from '@rn-primitives/table';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextStyleContext } from '../ui/text';

function Table({
  style,
  ...props
}: TablePrimitive.RootProps & {
  ref?: React.RefObject<TablePrimitive.RootRef>;
}) {
  return (
    <TablePrimitive.Root
      style={StyleSheet.flatten([styles.table, style])}
      {...props}
    />
  );
}

function TableHeader({
  style,
  ...props
}: TablePrimitive.HeaderProps & {
  ref?: React.RefObject<TablePrimitive.HeaderRef>;
}) {
  return (
    <TablePrimitive.Header
      style={StyleSheet.flatten([styles.header, style])}
      {...props}
    />
  );
}

function TableBody({
  style,
  ...props
}: TablePrimitive.BodyProps & {
  ref?: React.RefObject<TablePrimitive.BodyRef>;
}) {
  return (
    <TablePrimitive.Body
      style={StyleSheet.flatten([styles.body, { minHeight: 2 }, style])}
      {...props}
    />
  );
}

function TableFooter({
  style,
  ...props
}: TablePrimitive.FooterProps & {
  ref?: React.RefObject<TablePrimitive.FooterRef>;
}) {
  return (
    <TablePrimitive.Footer
      style={StyleSheet.flatten([styles.footer, style])}
      {...props}
    />
  );
}

function TableRow({
  style,
  ...props
}: TablePrimitive.RowProps & {
  ref?: React.RefObject<TablePrimitive.RowRef>;
}) {
  return (
    <TablePrimitive.Row
      style={StyleSheet.flatten([styles.row, style])}
      {...props}
    />
  );
}

function TableHead({
  style,
  ...props
}: TablePrimitive.HeadProps & {
  ref?: React.RefObject<TablePrimitive.HeadRef>;
}) {
  return (
    <TextStyleContext.Provider
      value={{ style: { color: 'hsl(var(--muted-foreground))' } }}
    >
      <TablePrimitive.Head
        style={StyleSheet.flatten([styles.head, style])}
        {...props}
      />
    </TextStyleContext.Provider>
  );
}

function TableCell({
  style,
  ...props
}: TablePrimitive.CellProps & {
  ref?: React.RefObject<TablePrimitive.CellRef>;
}) {
  return (
    <TablePrimitive.Cell
      style={StyleSheet.flatten([styles.cell, style])}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  table: {
    width: '100%',
    fontSize: 14,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'hsl(var(--border))',
  },
  body: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'hsl(var(--border))',
  },
  footer: {
    backgroundColor: 'hsl(var(--muted) / 0.5)',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'hsl(var(--border))',
  },
  head: {
    height: 48,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontWeight: '500',
    color: 'hsl(var(--muted-foreground))',
  },
  cell: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
