const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre'],
    minlength: [5, 'au moins 5 caractères'],
    maxlength: [100, 'Le titre a 100 caractères']
  },
  content: {
    type: String,
    required: [true, 'Le contenu'],
    minlength: [20, 'Le contenu a 20 caractères']
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true });

articleSchema.index({ title: 'text' }); // ici je rajoute une indexation

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;