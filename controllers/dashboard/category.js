const Category = require('../../database/models/CategorySchema');

const CategoryController = {
  async index (req, res) {
    const categories = await Category.find({})
      .sort({created_at: 'desc'})
      .exec();

    res.render('dashboard/category/index.hbs', {
      categories
    });
  },

  create (req, res) {
    res.render('dashboard/category/create.hbs', {
      csrfToken: req.csrfToken()
    });
  },

  async store (req, res) {
    let slug = req.body.slug;

    if (!slug) {
      slug = req.body.name.replaceAll(' ', '-').toLowerCase();
    }

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      slug: slug
    });

    try {
      await category.save();

      res.redirect('/dashboard/categories');
    } catch (err) {
      console.error(err);
      res.redirect('/dashboard/categories/create')
    }
  },

  show (req, res) {

  },

  async edit (req, res) {
    try {
      const category = await Category.findById(req.params.id).exec();

      if (!category) {
        return res.status(404).send('Not found');
      }
  
      res.render('dashboard/category/create.hbs', {
        csrfToken: req.csrfToken(),
        category,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal error');
    }
  },

  update (req, res) {

  },

  destroy (req, res) {

  },
};

module.exports = CategoryController;
