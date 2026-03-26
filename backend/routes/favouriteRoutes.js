import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  addFavourite,
  getFavourites,
  getFavouriteById,
  updateFavourite,
  deleteFavourite,
  likeFavourite,
  dislikeFavourite
} from '../controllers/favouriteController.js';

const router = express.Router();


router.use(protect); // protect below routes  from other users

router.post('/', addFavourite);
router.get('/', getFavourites);
router.get('/:id', getFavouriteById);
router.put('/:id', updateFavourite);
router.delete('/:id', deleteFavourite);
router.patch('/:id/like', likeFavourite);
router.patch('/:id/dislike', dislikeFavourite);

export default router;
