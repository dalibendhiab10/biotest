import React, { useState } from 'react';
import { CreditCard, Building2, Wallet } from 'lucide-react';

function PanierPage() {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'cash'>('card');

    const orders = [
        { name: 'DESOXYCORTISOL', price: 40, icon: '🌿' },
        { name: 'METHYLHISTIDINE', price: 50, icon: '🌿' }
    ];

    const total = orders.reduce((sum, order) => sum + order.price, 0);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Section - Payment Form */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Détails Payement</h2>

                    <div className="space-y-4">
                        <p className="text-gray-700">Comment voulez vous payer?</p>
                        <div className="flex gap-4">
                            <button
                                className={`flex items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                    }`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                <CreditCard className={paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-400'} />
                            </button>
                            <button
                                className={`flex items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                    }`}
                                onClick={() => setPaymentMethod('bank')}
                            >
                                <Building2 className={paymentMethod === 'bank' ? 'text-blue-500' : 'text-gray-400'} />
                            </button>
                            <button
                                className={`flex items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                    }`}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                <Wallet className={paymentMethod === 'cash' ? 'text-blue-500' : 'text-gray-400'} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Nom</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Prenom</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Email</label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Numero Carte</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Date Exp</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">CVC</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Zip</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="flex justify-between pt-4">
                        <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            Annuler
                        </button>
                        <button className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
                            Valider
                        </button>
                    </div>
                </div>

                {/* Right Section - Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg space-y-6 justify-between flex flex-col">

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Liste de commandes</h3>
                        {orders.map((order, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <span className="text-2xl">{order.icon}</span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">{order.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div className="border-t pt-4 space-y-2">
                        <h4 className="font-semibold text-gray-800">Prix</h4>
                        {orders.map((order, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-600">{order.name}</span>
                                <span className="font-medium">{order.price} DT</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Total</span>
                            <span>{total} DT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PanierPage;
