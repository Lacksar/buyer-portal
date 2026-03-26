import Favourite from '../models/Favourite.js';

export const addFavourite = async (req, res) => {
  try {
    const { propertyName } = req.body;

    if (!propertyName) {
      return res.status(400).json({ message: 'Property name is required.' });
    }

    const existing = await Favourite.findOne({ userId: req.user._id, propertyName });
    if (existing) {
      return res.status(409).json({ message: 'Property already in your favourites.' });
    }

    const favourite = await Favourite.create({
      userId: req.user._id,
      propertyName,
      liked: false
    });

    res.status(201).json({ message: 'Added to favourites.', favourite });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


export const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ count: favourites.length, favourites });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


export const getFavouriteById = async (req, res) => {
  try {
    const favourite = await Favourite.findOne({ _id: req.params.id, userId: req.user._id });

    if (!favourite) {
      return res.status(404).json({ message: 'Favourite not found.' });
    }

    res.status(200).json({ favourite });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


export const updateFavourite = async (req, res) => {
  try {
    const { propertyName } = req.body;

    const favourite = await Favourite.findOne({ _id: req.params.id, userId: req.user._id });
    if (!favourite) {
      return res.status(404).json({ message: 'Favourite not found.' });
    }

    if (propertyName) favourite.propertyName = propertyName;

    await favourite.save();
    res.status(200).json({ message: 'Favourite updated.', favourite });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

export const deleteFavourite = async (req, res) => {
  try {
    const favourite = await Favourite.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!favourite) {
      return res.status(404).json({ message: 'Favourite not found.' });
    }

    res.status(200).json({ message: 'Removed from favourites.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// @desc    Like a favourite property
// @route   PATCH /api/favourites/:id/like
// @access  Private
export const likeFavourite = async (req, res) => {
  try {
    const favourite = await Favourite.findOne({ _id: req.params.id, userId: req.user._id });
    if (!favourite) {
      return res.status(404).json({ message: 'Favourite not found.' });
    }

    favourite.liked = true;
    await favourite.save();

    res.status(200).json({ message: 'Property liked.', favourite });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// @desc    Dislike a favourite property
// @route   PATCH /api/favourites/:id/dislike
// @access  Private
export const dislikeFavourite = async (req, res) => {
  try {
    const favourite = await Favourite.findOne({ _id: req.params.id, userId: req.user._id });
    if (!favourite) {
      return res.status(404).json({ message: 'Favourite not found.' });
    }

    favourite.liked = false;
    await favourite.save();

    res.status(200).json({ message: 'Property disliked.', favourite });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
