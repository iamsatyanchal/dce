import React, { useEffect, useState } from 'react';
import { CreditCard, Download, Receipt, Info, ShieldCheck, Wallet } from 'lucide-react';
import api from '../../services/api';

const btechFees = [
    { category: "Admission Fee (One Time)", ge_bc_ebc: "₹10", sc_st_girls: "₹10" },
    { category: "Tuition Fee (Per Year)", ge_bc_ebc: "₹120", sc_st_girls: "₹0" },
    { category: "Medical Fund (One Time)", ge_bc_ebc: "₹50", sc_st_girls: "₹50" },
    { category: "Caution Money (Refundable)", ge_bc_ebc: "₹500", sc_st_girls: "₹500" },
    { category: "Hostel Fee (Per Semester)", ge_bc_ebc: "₹12,000", sc_st_girls: "₹12,000" },
    { category: "University Registration Fee", ge_bc_ebc: "₹2,100", sc_st_girls: "₹2,100" },
    { category: "Examination Fee (Per Sem)", ge_bc_ebc: "₹3,700", sc_st_girls: "₹700" },
];

const mtechFees = [
    { category: "Admission Fee (One Time)", amount: "₹1,500" },
    { category: "Tuition Fee (Per Year)", amount: "₹15,000" },
    { category: "Development Fee (One Time)", amount: "₹5,000" },
    { category: "Caution Money (Refundable)", amount: "₹5,000" },
    { category: "Library Fee (Per Year)", amount: "₹1,000" },
];

const FeeStructure = () => {
    const [feeChart, setFeeChart] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchFeeChart();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const fetchFeeChart = async () => {
        try {
            const { data } = await api.get('/documents?category=fee_chart');
            if (data && data.length > 0) setFeeChart(data[0]);
        } catch (error) {
            console.error("Error fetching fee chart:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 reveal">
                    <div className="md:w-2/3">
                        <span className="text-[#c6b677] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Financial Information</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#133b5c] mb-6 underline decoration-[#c6b677]/30">Fee Structure</h1>
                        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">
                            Detailed breakdown of academic and residential fees for undergraduate and postgraduate programs. DCE Darbhanga maintains a low-cost, high-quality education policy as per state government norms.
                        </p>
                    </div>
                    {feeChart && (
                        <a
                            href={feeChart.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#133b5c] text-white px-8 py-4 rounded-sm font-bold shadow-xl flex items-center gap-3 hover:translate-y-[-4px] transition-all group"
                        >
                            Download Fee Chart <Download className="group-hover:translate-y-1 transition-transform" />
                        </a>
                    )}
                </div>

                {/* B.Tech Fee Table */}
                <div className="mb-24 reveal">
                    <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100">
                        <div className="bg-[#133b5c] p-3 rounded-2xl text-[#c6b677]">
                            <Receipt size={24} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-[#133b5c] italic">B.Tech Fee Schedule</h2>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#133b5c] text-white">
                                        <th className="px-8 py-6 uppercase tracking-widest text-xs font-bold font-serif">Fee Description</th>
                                        <th className="px-8 py-6 uppercase tracking-widest text-xs font-bold font-serif bg-white/10">GE / BC / EBC (Apx)</th>
                                        <th className="px-8 py-6 uppercase tracking-widest text-xs font-bold font-serif bg-white/5">SC / ST / Girls (Apx)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {btechFees.map((fee, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <span className="font-bold text-[#133b5c] group-hover:text-[#c6b677] transition-colors">{fee.category}</span>
                                            </td>
                                            <td className="px-8 py-6 text-gray-600 font-medium font-mono">{fee.ge_bc_ebc}</td>
                                            <td className="px-8 py-6 text-gray-400 font-mono italic">{fee.sc_st_girls}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-8 py-6 font-bold text-[#133b5c]">Estimated Total (Adm. Year)</td>
                                        <td className="px-8 py-6 font-bold text-green-600 font-mono">₹18,590*</td>
                                        <td className="px-8 py-6 font-bold text-green-600 font-mono italic">₹15,470*</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {/* M.Tech & Other Services */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div className="reveal">
                        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100">
                            <div className="bg-[#c6b677] p-3 rounded-2xl text-[#133b5c]">
                                <Wallet size={24} />
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-[#133b5c] italic">M.Tech Fee Schedule</h2>
                        </div>
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            <table className="w-full text-left">
                                <tbody className="divide-y divide-gray-100">
                                    {mtechFees.map((fee, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-8 py-5 font-bold text-[#133b5c] text-sm">{fee.category}</td>
                                            <td className="px-8 py-5 text-gray-500 font-mono text-sm">{fee.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="reveal delay-200">
                        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100">
                            <div className="bg-green-50 p-3 rounded-2xl text-green-600">
                                <ShieldCheck size={24} />
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-[#133b5c] italic">Payment Modes</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-[#133b5c] p-8 rounded-3xl text-white group hover:shadow-2xl transition-all shadow-[#133b5c]/20">
                                <h4 className="text-[#c6b677] font-bold mb-4 uppercase tracking-widest text-xs">Recommended</h4>
                                <h3 className="text-2xl font-serif font-bold mb-3 italic text-white">Online Payment Gateway</h3>
                                <p className="text-white/50 text-sm font-light italic leading-relaxed">Fastest mode. Pay via Credit Card, Debit Card, or UPI through the student portal.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex gap-6 items-center shadow-sm hover:border-[#c6b677] transition-all">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#133b5c]">Demand Draft (DD)</h4>
                                    <p className="text-xs text-gray-400 font-light mt-1">Payable in favor of "Principal, Darbhanga College of Engineering" payable at Darbhanga.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Note Banner */}
                <div className="bg-[#133b5c] p-12 rounded-3xl text-center relative overflow-hidden group reveal">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative z-10">
                        <Info className="text-[#c6b677] mx-auto mb-6" size={40} />
                        <p className="text-white/70 text-lg md:text-xl font-serif italic mb-8 max-w-3xl mx-auto">
                            "Note: The fee structure is subject to revision by the DST Bihar / BEU Patna from time to time. Actual fees at the time of admission may vary."
                        </p>
                        <div className="flex justify-center gap-2">
                            <span className="h-[2px] w-8 bg-[#c6b677]/30"></span>
                            <span className="h-[2px] w-16 bg-[#c6b677]"></span>
                            <span className="h-[2px] w-8 bg-[#c6b677]/30"></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FeeStructure;
