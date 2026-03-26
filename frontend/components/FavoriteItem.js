import { Heart, Trash2, Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FavoriteItem({
  fav,
  index,
  editingId,
  editName,
  setEditName,
  handleUpdate,
  cancelEditing,
  startEditing,
  handleToggleLike,
  handleDelete,
}) {
  const isEditing = editingId === fav._id;

  return (
    <div className="flex items-center justify-between py-4 group min-h-[64px]">
      <div className="flex-1 mr-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="h-8 border-neutral-200 focus:border-indigo-600 bg-white"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdate(fav._id);
                if (e.key === 'Escape') cancelEditing();
              }}
            />
            <button
              onClick={() => handleUpdate(fav._id)}
              className="text-green-600 hover:text-green-700 p-1"
            >
              <Check size={16} />
            </button>
            <button
              onClick={cancelEditing}
              className="text-neutral-400 hover:text-neutral-600 p-1"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <span className="text-xl font-medium text-neutral-700 group-hover:text-black transition-colors">
            <span className="text-neutral-400">{index + 1}.</span> {fav.propertyName}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {!isEditing && (
          <button
            onClick={() => startEditing(fav)}
            className="p-2 rounded-md text-neutral-500 hover:text-indigo-600 hover:bg-neutral-50 transition-all"
            title="Edit"
          >
            <Pencil size={15} />
          </button>
        )}

        <button
          onClick={() => handleToggleLike(fav)}
          className={`p-2 rounded-md transition-all ${
            fav.liked
              ? 'text-indigo-600 bg-indigo-50/50'
              : 'text-neutral-500 hover:text-indigo-400 hover:bg-neutral-50'
          }`}
          title={fav.liked ? 'Unlike' : 'Like'}
        >
          <Heart size={16} fill={fav.liked ? 'currentColor' : 'none'} />
        </button>

        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-500 hover:text-red-500 hover:bg-red-50 h-8 w-8 transition-colors"
          onClick={() => handleDelete(fav._id)}
          title="Remove"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}
