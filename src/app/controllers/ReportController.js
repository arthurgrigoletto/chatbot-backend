/* eslint-disable class-methods-use-this */

const Reports = require('../models/Reports');

class ReportController {
  async index(req, res) {
    const {
      limit = 10, page = 1, isCorrect, sort = 'asc',
    } = req.query;

    const filters = {};

    if (isCorrect) {
      filters.isCorrect = isCorrect;
    }

    const reports = await Reports.paginate(filters, {
      limit,
      page,
      sort: { created_at: sort },
    });
    return res.json(reports);
  }

  async store(req, res) {
    const reportBody = {
      ...req.body,
      user: req.user,
    };

    const report = await Reports.create(reportBody);

    return res.json(report);
  }

  async metrics(req, res) {
    const correctFirstTry = await Reports.find({ is_correct: true, count: 1 });
    const correctSecondTry = await Reports.find({ is_correct: true, count: 2 });
    const correctThirdTry = await Reports.find({ is_correct: true, count: 3 });
    const unsolved = await Reports.find({ is_correct: false, count: { $gte: 3 } });
    const reports = await Reports.find();

    const response = {
      correct_first_try: correctFirstTry.length,
      correct_second_try: correctSecondTry.length,
      correct_third_try: correctThirdTry.length,
      unsolved: unsolved.length,
      message_count: reports.length,
    };

    return res.json(response);
  }
}

module.exports = new ReportController();
