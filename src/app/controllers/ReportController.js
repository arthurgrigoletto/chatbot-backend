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
}

module.exports = new ReportController();
