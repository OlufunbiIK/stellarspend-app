'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import { useOffline } from '@/components/offline/OfflineProvider';

const budgetSchema = z.object({
    name: z.string().min(1, 'Budget name is required').max(50, 'Name is too long'),
    amount: z.coerce
        .number()
        .positive('Amount must be positive')
        .min(0.01, 'Minimum amount is 0.01'),
    category: z.string().min(1, 'Category is required'),
    period: z.enum(['daily', 'monthly', 'quarterly'], {
        message: 'Please select a valid period',
    }),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

export default function BudgetForm() {
    const { isOnline, queueAction } = useOffline();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<BudgetFormData>({
        schema: budgetSchema,
        defaultValues: {
            name: '',
            amount: 0,
            category: '',
            period: 'monthly' as const,
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: BudgetFormData) => {
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
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Budget</h2>

            <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">
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
                    <label htmlFor="period" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Period
                    </label>
                    <div className="flex space-x-4">
                        {['daily', 'monthly', 'quarterly'].map((p) => (
                            <label key={p} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={p}
                                    {...register('period')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm capitalize text-gray-600 dark:text-gray-400">{p}</span>
                            </label>
                        ))}
                    </div>
                    {errors.period && (
                        <p className="text-xs text-red-500 mt-1">{errors.period.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                >
                    {isSubmitting ? 'Saving...' : 'Save Budget'}
                </button>
            </form>
        </div>
    );
}
