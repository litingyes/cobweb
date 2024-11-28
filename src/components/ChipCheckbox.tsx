'use client'

import type { CheckboxProps, ChipProps } from '@nextui-org/react'
import { Chip, tv, useCheckbox, VisuallyHidden } from '@nextui-org/react'

const checkbox = tv({
  slots: {
    base: 'border-default hover:bg-default-200',
    content: 'text-default-500',
  },
  variants: {
    isSelected: {
      true: {
        base: 'border-primary bg-primary hover:border-primary-500 hover:bg-primary-500',
        content: 'pl-1 text-primary-foreground',
      },
    },
    isFocusVisible: {
      true: {
        base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
      },
    },
  },
})

type ChipCheckboxProps = CheckboxProps & Pick<ChipProps, 'variant' | 'children'>
export function ChipCheckbox({ color, variant, ref, ...props }: ChipCheckboxProps) {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
    color,
  })

  const styles = checkbox({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        // @ts-expect-error ref type error
        ref={ref}
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color={color}
        startContent={isSelected ? <i className="icon-[carbon--checkmark-outline] text-green-300"></i> : null}
        variant={variant}
        {...getLabelProps()}
      >
        {children}
      </Chip>
    </label>
  )
}
