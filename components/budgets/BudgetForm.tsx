'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import { useOffline } from '@/components/offline/OfflineProvider';
import { Budget } from '@/lib/api/client';

const budgetSchema = z.object({
    name: z.string().min(1, 'Budget name is required').max(50, 'Name is too long'),
    amount: z.coerce
        .number()
        .positive('Amount must be positive')
        .min(0.01, 'Minimum amount is 0.01'),
    category: z.string().min(1, 'Category is required'),
    asset: z.enum(['XLM', 'USDC', 'EURC'], {
        message: 'Please select a valid asset',
    }),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: 'End date must be after start date',
    path: ['endDate'],
});

type BudgetFormData = z.infer<typeof budgetSchema>;

interface BudgetFormProps {
    onSubmit?: (data: BudgetFormData) => void;
    onCancel?: () => void;
    initialData?: Budget | null;
    isEditing?: boolean;
}

export default function BudgetForm({ onSubmit, onCancel, initialData, isEditing = false }: BudgetFormProps) {
    const { isOnline, queueAction } = useOffline();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<BudgetFormData>({
        schema: budgetSchema,
        defaultValues: {
            name: initialData?.name || '',
            amount: initialData?.amount || 0,
            category: initialData?.category || '',
            asset: initialData?.asset || 'XLM',
            startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
            endDate: initialData?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        mode: 'onChange',
    });

    const handleSubmitForm = async (data: BudgetFormData) => {
        if (onSubmit) {
            onSubmit(data);
            return;
        }

        if (!isOnline) {
            queueAction('CREATE_BUDGET', `Create budget: ${data.name}`, data);
            alert('You are offline. Your budget has been queued and will be saved when you reconnect.');
            reset();
            return;
        }

        // Simulate API call
        console.log('Budget submitted:', data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert('Budget saved successfully!');
        reset();
    };

    return (
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {isEditing ? 'Edit Budget' : 'Create Budget'}
            </h2>

            <form onSubmit={handleSubmit(handleSubmitForm as any)} className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Budget Name
                    </label>
                    <input
                        id="name"
                        {...register('name')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                            }`}
                        placeholder="e.g. Groceries"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Amount (XLM)
                    </label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        {...register('amount')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                            }`}
                        placeholder="0.00"
                    />
                    {errors.amount && (
                        <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                    </label>
                    <select
                        id="category"
                        {...register('category')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                            }`}
                    >
                        <option value="">Select a category</option>
                        <option value="food">Food & Drinks</option>
                        <option value="transport">Transport</option>
                        <option value="housing">Housing</option>
                        <option value="utilities">Utilities</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                    {errors.category && (
                        <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="asset" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Asset
                    </label>
                    <select
                        id="asset"
                        {...register('asset')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.asset ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                            }`}
                    >
                        <option value="XLM">XLM (Stellar)</option>
                        <option value="USDC">USDC (USD Coin)</option>
                        <option value="EURC">EURC (Euro Coin)</option>
                    </select>
                    {errors.asset && (
                        <p className="text-xs text-red-500 mt-1">{errors.asset.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        {...register('startDate')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.startDate ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                            }`}
                    />
                    {errors.startDate && (
                        <p className="text-xs text-red-500 mt-1">{errors.startDate.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        End Date
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        {...register('endDate')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.endDate ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                            }`}
                    />
                    {errors.endDate && (
                        <p className="text-xs text-red-500 mt-1">{errors.endDate.message}</p>
                    )}
                </div>

                <div className="flex space-x-3">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`${onCancel ? 'flex-1' : 'w-full'} px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg shadow-md transition-colors duration-200`}
                    >
                        {isSubmitting ? 'Saving...' : (isEditing ? 'Update Budget' : 'Save Budget')}
                    </button>
                </div>
            </form>
        </div>
    );
}
