import { Heart, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FavoriteItem({
  fav,
  index,
  startEditing,
  handleToggleLike,
  handleDelete,
  showEditDelete = true,
}) {
  return (
    <div className="flex items-center justify-between py-4 group min-h-[64px]">
      <div className="flex-1 mr-4">
        <span className="text-xl font-medium text-neutral-700 group-hover:text-black transition-colors break-all">
          <span className="text-neutral-400">{index + 1}.</span> {fav.propertyName}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {showEditDelete && (
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

        {showEditDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-500 hover:text-red-500 hover:bg-red-50 h-8 w-8 transition-colors"
            onClick={() => handleDelete(fav._id)}
            title="Remove"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
