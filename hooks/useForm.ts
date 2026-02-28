import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';
import { z } from 'zod';

/**
 * Configuration options for the useForm hook.
 */
interface UseFormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<UseHookFormProps<TFieldValues>, 'resolver'> {
  schema: z.ZodType<any>;
}

/**
 * A reusable wrapper around react-hook-form and zod for consistent form handling.
 */
export function useForm<TFieldValues extends FieldValues = FieldValues>({
  schema,
  ...options
}: UseFormProps<TFieldValues>): UseFormReturn<TFieldValues> {
  return useHookForm<TFieldValues>({
    ...options,
    resolver: zodResolver(schema) as any,
  });
}

export type { UseFormReturn, FieldValues };
