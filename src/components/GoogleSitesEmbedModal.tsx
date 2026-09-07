import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Code2, Copy, Check, ExternalLink, Sparkles, Sliders, Info, Monitor, Smartphone } from 'lucide-react';

interface GoogleSitesEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const GoogleSitesEmbedModal: React.FC<GoogleSitesEmbedModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [customHeight, setCustomHeight] = useState('1200');

  if (!isOpen) return null;

  // Determine the best URL to embed
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://your-portfolio-app-url.run.app';

  const embedCode = `<iframe
  src="${currentUrl}"
  width="100%"
  height="${customHeight}"
  style="border:0; width:100%; min-height:${customHeight}px; border-radius:24px; overflow:hidden;"
  loading="lazy"
  title="Portfolio Projects"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedCode(true);
    onShowToast('คัดลอกโค้ด iframe สำหรับ Google Sites เรียบร้อยแล้ว!', 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    onShowToast('คัดลอกลิงก์ URL เว็บไซต์เรียบร้อยแล้ว!', 'success');
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div 
      id="modal-google-sites-embed-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-blue-100 flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Top Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                โค้ดฝังสำหรับ Google Sites (Embed Code)
              </h2>
              <p className="text-xs text-slate-500">
                นำโค้ดนี้ไปวางใน Google Sites เพื่อแสดงผลงานแบบไร้รอยต่อ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-xl transition-colors cursor-pointer"
            aria-label="ปิดหน้าต่างโค้ดฝัง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Height Preset Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>ความสูงของกรอบ (Frame Height): {customHeight}px</span>
              </label>
              <div className="flex items-center gap-1 text-xs">
                {['900', '1200', '1500', '1800'].map((h) => (
                  <button
                    key={h}
                    onClick={() => setCustomHeight(h)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      customHeight === h
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {h}px
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Iframe Code Box */}
          <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
            <pre className="text-slate-300 whitespace-pre-wrap break-all leading-relaxed">
              {embedCode}
            </pre>

            <button
              id="btn-copy-embed-code"
              onClick={handleCopyCode}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>คัดลอกแล้ว!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>คัดลอกโค้ด</span>
                </>
              )}
            </button>
          </div>

          {/* Direct URL Alternative */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="truncate">
              <span className="text-xs font-bold text-purple-900 block mb-0.5">หรือฝังด้วยลิงก์ URL โดยตรง :</span>
              <p className="text-xs text-purple-700 truncate font-mono">{currentUrl}</p>
            </div>
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-purple-200 text-purple-800 text-xs font-semibold hover:bg-purple-100/70 shadow-2xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'คัดลอกแล้ว' : 'คัดลอก URL'}</span>
            </button>
          </div>

          {/* Visual Step-by-Step Instructions */}
          <div className="rounded-2xl border border-slate-200/80 p-4 sm:p-5 bg-white space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ขั้นตอนการนำไปใส่ใน Google Sites :</span>
            </h4>
            
            <ol className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>เปิดหน้าเว็บไซต์ <strong>Google Sites</strong> ที่ต้องการแทรกพอร์ตโฟลิโอผลงาน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>ไปที่แถบเครื่องมือด้านขวา เลือก <strong>"แทรก (Insert)" &gt; "ฝัง (Embed)"</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>เลือกแท็บ <strong>"โค้ดฝัง (Embed Code)"</strong> แล้ววางโค้ดที่คัดลอกจากด้านบนลงไป แล้วกด <strong>"ถัดไป (Next)" &gt; "แทรก (Insert)"</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                <span>ปรับขนาดความกว้างของบล็อกใน Google Sites ให้เต็มความกว้าง (Full Width) เพื่อความสวยงาม</span>
              </li>
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </motion.div>
    </div>
  );
};
