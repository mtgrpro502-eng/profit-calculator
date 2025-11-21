import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, DollarSign, Package, Truck, Megaphone, Calculator, Target, BarChart3, AlertCircle } from 'lucide-react';
import { MadaLogo, StcPayLogo, TabbyLogo, TamaraLogo, VisaLogo, MastercardLogo, ApplePayLogo } from './PaymentLogos';

const GATEWAYS = [
    {
        id: 'mada',
        name: 'مدى',
        feePercent: 1.0,
        feeFixed: 1.0,
        LogoComponent: () => <img src="/mada-logo.png" alt="Mada" className="h-10 w-auto object-contain" />
    },
    {
        id: 'visa',
        name: 'فيزا / ماستركارد',
        feePercent: 2.5,
        feeFixed: 1.0,
        LogoComponent: () => (
            <div className="flex gap-1 items-center">
                <img src="/visa-logo.png" alt="Visa" className="h-8 w-auto object-contain" />
                <MastercardLogo className="h-8 w-auto" />
            </div>
        )
    },
    {
        id: 'apple',
        name: 'Apple Pay',
        feePercent: 2.2,
        feeFixed: 1.0,
        LogoComponent: () => <img src="/apple-pay-logo.png" alt="Apple Pay" className="h-10 w-auto object-contain" />
    },
    {
        id: 'stc',
        name: 'STC Pay',
        feePercent: 1.7,
        feeFixed: 1.0,
        LogoComponent: () => <img src="/stc-pay-logo.png" alt="STC Pay" className="h-10 w-auto object-contain" />
    },
    {
        id: 'tabby',
        name: 'Tabby',
        feePercent: 6.99,
        feeFixed: 1.5,
        LogoComponent: (props) => <TabbyLogo {...props} className="h-10 w-auto" />
    },
    {
        id: 'tamara',
        name: 'Tamara',
        feePercent: 6.99,
        feeFixed: 1.5,
        LogoComponent: (props) => <TamaraLogo {...props} className="h-10 w-auto" />
    },
];

const parseInput = (str) => {
    if (!str) return 0;
    const englishDigits = str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    return parseFloat(englishDigits) || 0;
};

const CurrencySymbol = ({ className = "w-5 h-5", useCurrentColor = false }) => {
    if (useCurrentColor) {
        return (
            <span
                className={`inline-block align-middle bg-current ${className}`}
                style={{
                    maskImage: 'url("/saudi-riyal-symbol.png")',
                    WebkitMaskImage: 'url("/saudi-riyal-symbol.png")',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain'
                }}
            />
        );
    }
    return (
        <img
            src="/saudi-riyal-symbol.png"
            alt="SAR"
            className={`inline-block object-contain align-middle ${className}`}
        />
    );
};

export default function ProfitCalculator() {
    // Inputs
    const [cost, setCost] = useState('');
    const [shipping, setShipping] = useState('');
    const [isShippingEnabled, setIsShippingEnabled] = useState(true);
    const [extra, setExtra] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [cac, setCac] = useState('');
    const [selectedGateway, setSelectedGateway] = useState(GATEWAYS[0]); // Default to Mada

    // State to control results visibility
    const [showResults, setShowResults] = useState(false);

    // Outputs
    const [results, setResults] = useState({
        totalRevenue: 0,
        totalCost: 0,
        gatewayFee: 0,
        grossProfit: 0, // Profit before ads
        netProfit: 0,
        margin: 0,
        roi: 0,
        maxCac: 0      // Break-even CPA
    });

    const handleCalculate = () => {
        const numCost = parseInput(cost);
        const numShipping = isShippingEnabled ? parseInput(shipping) : 0;
        const numExtra = parseInput(extra);
        const numSelling = parseInput(sellingPrice);
        const numCac = parseInput(cac);

        // Calculate Gateway Fee with VAT
        // Fee = (SellingPrice * Percent + Fixed) * 1.15 (VAT)
        const baseFee = (numSelling * (selectedGateway.feePercent / 100)) + selectedGateway.feeFixed;
        const fee = baseFee * 1.15;

        // Costs BEFORE Ads
        const costOfGoods = numCost + numShipping + numExtra + fee;

        // Gross Profit (Profit per unit before marketing)
        const grossProfit = numSelling - costOfGoods;

        // Max CAC (Break-even CPA) - This is exactly the Gross Profit
        const maxCac = grossProfit;

        // Total Cost including CAC
        const totalCost = costOfGoods + numCac;

        const netProfit = numSelling - totalCost;
        const margin = numSelling > 0 ? (netProfit / numSelling) * 100 : 0;
        const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

        setResults({
            totalRevenue: numSelling,
            totalCost,
            gatewayFee: fee,
            grossProfit,
            netProfit,
            margin,
            roi,
            maxCac
        });
        setShowResults(true);
    };

    // Re-calculate when gateway changes IF results are already shown
    useEffect(() => {
        if (showResults) {
            handleCalculate();
        }
    }, [selectedGateway]);

    // Gauge Color Logic
    const getGaugeColor = (margin) => {
        if (margin < 0) return 'bg-red-500';
        if (margin < 15) return 'bg-yellow-500';
        if (margin < 30) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const getGaugeWidth = (margin) => {
        if (margin < 0) return '0%';
        if (margin > 100) return '100%';
        return `${margin}%`;
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white text-center">
                <h1 className="text-3xl font-bold mb-2">حاسبة ربحية المنتج</h1>
                <p className="text-indigo-100 opacity-90">احسب صافي ربحك بدقة مع تحليل نقطة التعادل</p>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Product & Shipping */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <Package className="w-4 h-4 ml-2 text-indigo-500" />
                                سعر التكلفة (للمنتج)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={cost}
                                    onChange={(e) => { setCost(e.target.value); setShowResults(false); }}
                                    className="block w-full pr-4 pl-12 py-3 border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                                    placeholder="0.00"
                                />
                                <span className="absolute left-4 top-3.5 flex items-center justify-center pointer-events-none">
                                    <CurrencySymbol className="w-4 h-4 opacity-50" />
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <Truck className="w-4 h-4 ml-2 text-indigo-500" />
                                    تكلفة الشحن
                                    <div className="group relative mr-2">
                                        <AlertCircle className="w-4 h-4 text-gray-400 cursor-help" />
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none text-center leading-relaxed">
                                            فعل هذا الخيار في حال كنت انت من يتحمل تكلفة الشحن بالنيابه عن العميل
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                        </div>
                                    </div>
                                </label>
                                <button
                                    onClick={() => { setIsShippingEnabled(!isShippingEnabled); setShowResults(false); }}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isShippingEnabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isShippingEnabled ? '-translate-x-1' : '-translate-x-5'}`} />
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={shipping}
                                    onChange={(e) => { setShipping(e.target.value); setShowResults(false); }}
                                    disabled={!isShippingEnabled}
                                    className={`block w-full pr-4 pl-12 py-3 border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all ${!isShippingEnabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 focus:bg-white'}`}
                                    placeholder="0.00"
                                />
                                <span className="absolute left-4 top-3.5 flex items-center justify-center pointer-events-none">
                                    <CurrencySymbol className="w-4 h-4 opacity-50" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Extra & CAC */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <DollarSign className="w-4 h-4 ml-2 text-indigo-500" />
                                مصاريف إضافية (تغليف، إلخ)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={extra}
                                    onChange={(e) => { setExtra(e.target.value); setShowResults(false); }}
                                    className="block w-full pr-4 pl-12 py-3 border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                                    placeholder="0.00"
                                />
                                <span className="absolute left-4 top-3.5 flex items-center justify-center pointer-events-none">
                                    <CurrencySymbol className="w-4 h-4 opacity-50" />
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <Megaphone className="w-4 h-4 ml-2 text-indigo-500" />
                                تكلفة الاستحواذ (CAC)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={cac}
                                    onChange={(e) => { setCac(e.target.value); setShowResults(false); }}
                                    className="block w-full pr-4 pl-12 py-3 border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                                    placeholder="0.00"
                                />
                                <span className="absolute left-4 top-3.5 flex items-center justify-center pointer-events-none">
                                    <CurrencySymbol className="w-4 h-4 opacity-50" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Selling Price */}
                    <div className="space-y-2 pt-2">
                        <label className="flex items-center text-lg font-bold text-gray-800">
                            سعر البيع المقترح
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={sellingPrice}
                                onChange={(e) => { setSellingPrice(e.target.value); setShowResults(false); }}
                                className="block w-full pr-4 pl-12 py-4 text-xl font-bold text-indigo-600 border-2 border-indigo-100 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white shadow-sm"
                                placeholder="0.00"
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center pointer-events-none">
                                <CurrencySymbol className="w-5 h-5 text-gray-400" />
                            </span>
                        </div>
                    </div>

                    {/* Payment Gateways */}
                    <div className="space-y-3 pt-4">
                        <label className="text-sm font-medium text-gray-700 block mb-2">وسيلة الدفع (تؤثر على الرسوم)</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {GATEWAYS.map((gateway) => (
                                <button
                                    key={gateway.id}
                                    onClick={() => setSelectedGateway(gateway)}
                                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 h-20 ${selectedGateway.id === gateway.id
                                        ? 'border-indigo-600 bg-indigo-50 shadow-md transform scale-105'
                                        : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {gateway.LogoComponent ? (
                                        <gateway.LogoComponent className="h-8 w-auto mb-1" />
                                    ) : (
                                        <div className="text-gray-500 mb-1">{gateway.icon}</div>
                                    )}
                                    <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">{gateway.name}</span>
                                    {selectedGateway.id === gateway.id && (
                                        <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-0.5">
                                            <CheckCircle className="w-3 h-3" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-left ltr flex items-center gap-1">
                            * رسوم {selectedGateway.name}: {selectedGateway.feePercent}% + {selectedGateway.feeFixed} <CurrencySymbol className="w-3 h-3" /> (+15% VAT)
                        </p>
                    </div>

                    {/* Calculate Button */}
                    <div className="pt-4">
                        <button
                            onClick={handleCalculate}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <Calculator className="w-6 h-6" />
                            احسب الحين
                        </button>
                    </div>

                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6">
                    {showResults ? (
                        <>
                            {/* Unit Economics / Break-even Analysis */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm animate-fade-in">
                                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <Target className="w-5 h-5 ml-2 text-indigo-600" />
                                    تحليل نقطة التعادل
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="block text-sm text-gray-500">الربح قبل الإعلان (Gross Profit)</span>
                                            <span className="text-xs text-gray-400">الربح من كل طلب قبل خصم التسويق</span>
                                        </div>
                                        <span className="text-xl font-bold text-gray-800 flex items-center gap-1">
                                            {results.grossProfit.toFixed(2)} <CurrencySymbol />
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                        <div>
                                            <span className="block text-sm font-bold text-indigo-900">أقصى تكلفة إعلان (Max CAC)</span>
                                            <span className="text-xs text-indigo-700">أقصى مبلغ تدفعه للإعلان قبل الخسارة</span>
                                        </div>
                                        <span className="text-xl font-bold text-indigo-700 flex items-center gap-1">
                                            {Math.max(0, results.maxCac).toFixed(2)} <CurrencySymbol />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Profit Summary */}
                            <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden animate-fade-in">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>

                                <h2 className="text-lg font-medium text-gray-300 mb-6 flex items-center">
                                    <BarChart3 className="w-5 h-5 ml-2" />
                                    النتيجة النهائية
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-end pb-4 border-b border-gray-800">
                                        <span className="text-gray-400">صافي الربح</span>
                                        <div className={`text-4xl font-bold flex items-baseline gap-2 ${results.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {results.netProfit.toFixed(2)} <CurrencySymbol className="w-6 h-6 opacity-80" useCurrentColor={true} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-800 rounded-xl p-4">
                                            <span className="block text-xs text-gray-400 mb-1">هامش الربح</span>
                                            <span className={`text-xl font-bold ${results.margin >= 15 ? 'text-green-400' : results.margin > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                {results.margin.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="bg-gray-800 rounded-xl p-4">
                                            <span className="block text-xs text-gray-400 mb-1">إجمالي التكاليف</span>
                                            <span className="text-xl font-bold text-white flex items-center gap-1">
                                                {results.totalCost.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Gauge */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>خسارة</span>
                                            <span>ممتاز</span>
                                        </div>
                                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden relative">
                                            <div
                                                className={`h-full rounded-full ${getGaugeColor(results.margin)} gauge-bar`}
                                                style={{ width: getGaugeWidth(Math.max(0, results.margin)) }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Detailed Breakdown */}
                                    <div className="pt-4 space-y-2 text-sm text-gray-400">
                                        <div className="flex justify-between">
                                            <span>رسوم البوابة ({selectedGateway.name})</span>
                                            <span className="text-white flex items-center gap-1">{results.gatewayFee.toFixed(2)} <CurrencySymbol className="w-3 h-3" /></span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>تكلفة التسويق (CAC)</span>
                                            <span className="text-white flex items-center gap-1">{parseFloat(cac || 0).toFixed(2)} <CurrencySymbol className="w-3 h-3" /></span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Alerts */}
                            {results.netProfit < 0 && (
                                <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg flex items-start animate-fade-in">
                                    <AlertTriangle className="w-6 h-6 text-red-500 ml-3 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-red-800">الحملة خاسرة!</h3>
                                        <p className="text-sm text-red-700 mt-1">
                                            {parseFloat(cac) > results.grossProfit ? (
                                                <>
                                                    تكلفة التحويل ({parseFloat(cac).toFixed(2)}) أعلى من ربحك قبل الإعلان ({results.grossProfit.toFixed(2)}).
                                                    <br />
                                                    أنت تدفع للإعلان أكثر مما تربح من المنتج!
                                                </>
                                            ) : (
                                                <>
                                                    أنت تخسر {Math.abs(results.netProfit).toFixed(2)} <CurrencySymbol className="w-3 h-3 inline" /> في كل عملية بيع. راجع تكاليفك.
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {results.margin > 30 && (
                                <div className="bg-green-50 border-r-4 border-green-500 p-4 rounded-lg flex items-start animate-fade-in">
                                    <TrendingUp className="w-6 h-6 text-green-500 ml-3 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-green-800">أداء ممتاز!</h3>
                                        <p className="text-sm text-green-700 mt-1">
                                            هامش ربحك ({results.margin.toFixed(1)}%) ممتاز جداً ويسمح بالتوسع في الإعلانات.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 p-12 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
                            <Calculator className="w-16 h-16 mb-4 text-gray-300" />
                            <p className="text-lg font-medium text-center">أدخل البيانات واضغط على "احسب الحين" لعرض النتائج</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
