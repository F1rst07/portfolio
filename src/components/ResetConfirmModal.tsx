import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="modal-reset-confirm-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-rose-100 space-y-4"
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-900">
            ยืนยันการคืนค่าเริ่มต้น?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ข้อมูลผลงาน ข้อความ และรูปภาพที่คุณแก้ไขเพิ่มเติมจะถูกรีเซ็ตกลับเป็นข้อมูลตัวอย่างเริ่มต้นทั้งหมด การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 active:scale-97 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ยืนยันคืนค่า</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
