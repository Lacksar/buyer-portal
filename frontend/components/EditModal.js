import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EditModal({ isOpen, value, onChange, onSave, onCancel }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full md:w-[90%] max-w-md bg-white rounded-t-xl md:rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 relative scale-100 opacity-100 transition-all">
        <button 
          onClick={onCancel}
          className="absolute right-6 top-6 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">Edit Property</h3>
            <p className="text-neutral-500 mt-1">Update the name of your saved property.</p>
          </div>
          
          <div className="space-y-4 font-sans">
            <Input 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="h-12 text-lg border-neutral-200 focus:border-indigo-600 focus:ring-0 bg-neutral-50/30 transition-all font-medium py-4"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSave();
                if (e.key === 'Escape') onCancel();
              }}
            />
            
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 h-12 text-neutral-600 font-semibold border-neutral-200 hover:bg-neutral-50"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 h-12 bg-indigo-600 hover:bg-slate-900 text-white font-semibold transition-all shadow-lg shadow-indigo-100"
                onClick={onSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
