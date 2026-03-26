import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyName: {
    type: String,
    required: true,
    trim: true
  },
  liked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
