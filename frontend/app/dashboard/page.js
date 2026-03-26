'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LogOut, Plus, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FavoriteItem } from '@/components/FavoriteItem';
import { EditModal } from '@/components/EditModal';
import {
  getFavourites,
  addFavourite,
  deleteFavourite,
  updateFavourite,
  likeFavourite,
  dislikeFavourite,
  logout as apiLogout,
} from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [showLiked, setShowLiked] = useState(false);

  const likedFavourites = favourites.filter(f => f.liked);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !storedUser) {
      router.replace('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  const fetchFavourites = useCallback(async () => {
    try {
      const data = await getFavourites();
      setFavourites(data.favourites || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchFavourites();
  }, [user, fetchFavourites]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!propertyName.trim()) return;
    setAdding(true);
    try {
      await addFavourite({ propertyName: propertyName.trim() });
      setPropertyName('');
      toast.success('Added.');
      fetchFavourites();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFavourite(id);
      setFavourites((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleLike = async (fav) => {
    try {
      await (fav.liked ? dislikeFavourite(fav._id) : likeFavourite(fav._id));
      setFavourites((prev) =>
        prev.map((f) => (f._id === fav._id ? { ...f, liked: !fav.liked } : f))
      );
      toast.success(fav.liked ? 'Disliked.' : 'Liked.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const startEditing = (fav) => {
    setEditingId(fav._id);
    setEditName(fav.propertyName);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    try {
      await updateFavourite(id, { propertyName: editName.trim() });
      setFavourites((prev) =>
        prev.map((f) => (f._id === id ? { ...f, propertyName: editName.trim() } : f))
      );
      setEditingId(null);
      toast.success('Updated.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (_) {}
    localStorage.clear();
    router.replace('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <header className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Buyer Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl text-neutral-500 break-all">{user.name}</span>
            <Badge variant="secondary" className=" text-md font-mono px-2 leading-none uppercase tracking-tighter bg-neutral-800 py-2 text-neutral-100 rounded shrink-0">
              {user.role}
            </Badge>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="lg" 
          className="text-neutral-900 hover:bg-red-500 hover:text-white border-neutral-400 hover:border-red-500"
          onClick={handleLogout}
        >
           Log out
        </Button>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-12">
        <section className="space-y-4">
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter property name..."
              className="flex-1 h-10 text-xl border-neutral-200 focus:ring-0 focus:border-indigo-600 bg-neutral-50/30"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
            <Button type="submit" disabled={adding} className="h-10 bg-indigo-600 hover:bg-neutral-900 text-white font-semibold rounded-md transition-all active:scale-95 sm:self-end">
              {adding ? '...' : <><Plus size={16} className="mr-2" /> Add Property</>}
            </Button>
          </form>
        </section>

        <Separator className="bg-neutral-100" />

      

        <section>
          <div className="flex flex-col md:flex-row   justify-between mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest text-neutral-700">My Saved Properties</h2>
            <p className="text-xl text-neutral-400 font-mono">{favourites.length} total</p>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-12 w-full bg-neutral-100 animate-pulse rounded" />
              ))}
            </div>
          ) : favourites.length === 0 ? (
            <p className="text-xl text-neutral-400 py-10 text-center border-2 border-dashed border-neutral-100 rounded-lg">No properties saved yet.</p>
          ) : (
            <div className="divide-y divide-neutral-100 border-y border-neutral-100">
              {favourites.map((fav, index) => (
                <FavoriteItem
                  key={fav._id}
                  fav={fav}
                  index={index}
                  startEditing={startEditing}
                  handleToggleLike={handleToggleLike}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          {likedFavourites.length > 0 && (
            <div className="bg-neutral-50 rounded-xl px-6 py-4 border border-neutral-100 transition-all shadow-sm">
              <button 
                onClick={() => setShowLiked(!showLiked)}
                className="w-full flex items-center justify-between text-lg font-bold uppercase tracking-widest text-neutral-600"
              >
                <span>Liked Properties ({likedFavourites.length})</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-300 ${showLiked ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {showLiked && (
                <div className="mt-4 divide-y divide-neutral-100 border-t border-neutral-200 animate-in fade-in slide-in-from-top-2 duration-300">
                  {likedFavourites.map((fav, index) => (
                    <FavoriteItem
                      key={`liked-collapsible-${fav._id}`}
                      fav={fav}
                      index={index}
                      startEditing={startEditing}
                      handleToggleLike={handleToggleLike}
                      handleDelete={handleDelete}
                      showEditDelete={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <EditModal
        isOpen={!!editingId}
        value={editName}
        onChange={setEditName}
        onSave={() => handleUpdate(editingId)}
        onCancel={cancelEditing}
      />
    </div>
  );
}
