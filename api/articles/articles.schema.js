const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Un titre est requis'],
    minlength: [5, 'Le titre doit avoir au moins 5 caractères'],
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  content: {
    type: String,
    required: [true, 'Un contenu est requis'],
    minlength: [20, 'Le contenu doit avoir au moins 20 caractères']
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Un utilisateur est requis pour cet article']
  },
}, { timestamps: true });

articleSchema.index({ title: 'text', content: 'text' }); // Indexation sur le titre et le contenu pour une recherche plein texte.

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
