import Expert from '../models/Expert.js';

export const getExperts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const total = await Expert.countDocuments(query);
    const experts = await Expert.find(query).skip(skip).limit(limit);

    res.json({
      success: true,
      data: experts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getExpertById = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ success: false, message: 'Expert not found' });
    }
    res.json({ success: true, data: expert });
  } catch (error) {
    next(error);
  }
};
