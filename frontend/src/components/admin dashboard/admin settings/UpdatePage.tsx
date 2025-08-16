import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser, type UpdateUserData } from '../../../services/adminService';
import { useState } from 'react';

interface UpdateFormData extends UpdateUserData {
    // Add any additional form fields here if needed
}

const UpdatePage = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();

    // In a real app, you'd get this from your auth context or user state
    const userId = 'your-user-id-here'; // <-- IMPORTANT: Replace with actual user ID

    const mutation = useMutation({
        mutationFn: (data: UpdateUserData) => updateUser(userId, data),
        onSuccess: () => {
            setSuccessMessage('User updated successfully!');
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: ['user', userId] });
            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(null), 5000);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateFormData>();

    const onSubmit = (data: UpdateFormData) => {
        // Filter out empty fields
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== '')
        ) as UpdateUserData;

        if (Object.keys(filteredData).length === 0) {
            return; // No valid fields to update
        }

        mutation.mutate(filteredData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Modifier vos informations</h1>

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                {mutation.isError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {mutation.error.message}</span>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input
                            type="text"
                            placeholder="Nom"
                            {...register('nom')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input
                            type="text"
                            placeholder="Prénom"
                            {...register('prenom')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="nouveau@email.com"
                            {...register('email', {
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Veuillez entrer une adresse email valide'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message || 'Veuillez entrer une adresse email valide'}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="Nouveau mot de passe"
                            {...register('password', {
                                minLength: {
                                    value: 6,
                                    message: 'Le mot de passe doit contenir au moins 6 caractères'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input
                            type="tel"
                            placeholder="Téléphone"
                            {...register('telephone')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                        <input
                            type="text"
                            placeholder="Adresse"
                            {...register('adresse')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full pt-2">
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {mutation.isPending ? 'Mise à jour en cours...' : 'Mettre à jour'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePage;