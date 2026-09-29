'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MessageSquare, Clock, Eye, X, Check, Download, FileSpreadsheet } from 'lucide-react';
import { Enquiry } from '../lib/types';
import { updateEnquiryStatusAction } from '../app/actions';

interface AdminEnquiriesClientProps {
  initialEnquiries: Enquiry[];
}

export default function AdminEnquiriesClient({ initialEnquiries }: AdminEnquiriesClientProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const router = useRouter();

  const handleStatusChange = async (id: string, newStatus: Enquiry['status']) => {
    try {
      const res = await updateEnquiryStatusAction(id, newStatus);
      if (res.success) {
        setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(prev => prev ? { ...prev, status: newStatus } : null);
        }
        router.refresh();
      }
    } catch (err) {
      console.error('Status change error:', err);
    }
  };

  // Export all recorded enquiries to CSV / Google Sheets format
  const exportToSpreadsheet = () => {
    if (enquiries.length === 0) return;

    const headers = ['Date & Time', 'Customer Name', 'Phone Number', 'Email Address', 'Status', 'Requested Products', 'Customer Message'];
    const rows = enquiries.map(e => [
      e.created_at ? new Date(e.created_at).toLocaleString() : '',
      `"${(e.customer_name || '').replace(/"/g, '""')}"`,
      `"${(e.customer_phone || '').replace(/"/g, '""')}"`,
      `"${(e.customer_email || '').replace(/"/g, '""')}"`,
      e.status.toUpperCase(),
      `"${(e.items || []).map(i => `${i.product_name} (Qty: ${i.quantity}${i.variant_finish ? `, Finish: ${i.variant_finish}` : ''})`).join('; ').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `the_luxury_hub_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
        <div className="text-xs text-neutral-400">
          Total Recorded Enquiries: <span className="text-white font-semibold">{enquiries.length}</span>
        </div>

        <button
          onClick={exportToSpreadsheet}
          disabled={enquiries.length === 0}
          className="px-4 py-2.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 font-semibold text-xs tracking-wider uppercase flex items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" /> EXPORT TO GOOGLE SHEETS / EXCEL (.CSV)
        </button>
      </div>

      <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 text-xs italic">
            No customer enquiries received yet.
          </div>
        ) : (
          <table className="w-full text-left text-xs text-neutral-400">
            <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4">Requested Products</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-white font-medium">{enq.customer_name}</td>
                  <td className="p-4 font-mono">{enq.customer_phone}</td>
                  <td className="p-4">{enq.customer_email || '—'}</td>
                  <td className="p-4">{enq.items?.length || 0} Items</td>
                  <td className="p-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as Enquiry['status'])}
                      className={`text-[10px] tracking-wider uppercase font-bold py-1 px-2 border-0 cursor-pointer ${
                        enq.status === 'new' ? 'bg-amber-500/20 text-amber-300' :
                        enq.status === 'contacted' ? 'bg-blue-500/20 text-blue-300' :
                        enq.status === 'in_progress' ? 'bg-purple-500/20 text-purple-300' :
                        enq.status === 'completed' ? 'bg-[#25D366]/20 text-[#25D366]' :
                        'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      <option value="new" className="bg-[#0C0C0C]">NEW</option>
                      <option value="contacted" className="bg-[#0C0C0C]">CONTACTED</option>
                      <option value="in_progress" className="bg-[#0C0C0C]">IN PROGRESS</option>
                      <option value="completed" className="bg-[#0C0C0C]">COMPLETED</option>
                      <option value="closed" className="bg-[#0C0C0C]">CLOSED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedEnquiry(enq)}
                      className="px-3 py-1.5 border border-white/5 bg-neutral-900 text-neutral-300 hover:text-[#C5A85C] transition-all cursor-pointer text-xs flex items-center ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" /> DETAILS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* DETAIL DRAWER / MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="max-w-2xl w-full bg-[#0C0C0C] border border-white/10 p-8 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <span className="text-[9px] tracking-widest text-[#C5A85C] uppercase">ENQUIRY DETAILS</span>
                <h3 className="font-serif text-2xl text-white font-light">{selectedEnquiry.customer_name}</h3>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="text-neutral-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#050505] p-4 border border-white/5">
              <div><span className="text-neutral-500">Phone:</span> <span className="text-white font-mono">{selectedEnquiry.customer_phone}</span></div>
              <div><span className="text-neutral-500">Email:</span> <span className="text-white">{selectedEnquiry.customer_email || 'N/A'}</span></div>
              <div><span className="text-neutral-500">Status:</span> <span className="text-[#C5A85C] uppercase font-bold">{selectedEnquiry.status}</span></div>
              <div><span className="text-neutral-500">Date:</span> <span className="text-neutral-300">{selectedEnquiry.created_at ? new Date(selectedEnquiry.created_at).toLocaleString() : 'N/A'}</span></div>
            </div>

            {selectedEnquiry.message && (
              <div className="space-y-2 text-xs">
                <h4 className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">CUSTOMER MESSAGE</h4>
                <p className="p-4 bg-[#050505] border border-white/5 text-neutral-300 font-light leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>
            )}

            {selectedEnquiry.items && selectedEnquiry.items.length > 0 && (
              <div className="space-y-3 text-xs pt-2">
                <h4 className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">REQUESTED CATALOGUE PRODUCTS</h4>
                <div className="space-y-2">
                  {selectedEnquiry.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#050505] p-3 border border-white/5">
                      <div>
                        <div className="text-white font-medium">{item.product_name}</div>
                        <div className="text-[10px] text-neutral-500">
                          {item.product_code && <span>Code: {item.product_code} | </span>}
                          {item.variant_finish && <span>Finish: {item.variant_finish}</span>}
                        </div>
                      </div>
                      <div className="text-[#C5A85C] font-semibold">Qty: {item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-full py-3 bg-transparent border border-white/10 text-white font-medium text-xs tracking-widest uppercase hover:border-white/30"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
