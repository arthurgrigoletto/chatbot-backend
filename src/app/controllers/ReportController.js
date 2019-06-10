/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */

const Reports = require('../models/Reports');

class ReportController {
  async search(req, res) {
    const {
      limit = 10, page = 1, is_correct, sort = 'desc', from, to = new Date(),
    } = req.body;

    const filters = {};

    if (is_correct) {
      filters.is_correct = is_correct;
    }

    if (from) {
      filters.created_at = { $gte: from, $lte: to };
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
