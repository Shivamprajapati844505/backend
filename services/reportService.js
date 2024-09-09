const Report = require('../models/Report');

// Function to create a new report
const createReport = async (title, content, generatedBy, project, priority) => {
    const report = new Report({ title, content, generatedBy, project, priority });
    await report.save();
    return report;
};

// Function to get all reports
const getAllReports = async () => {
    return await Report.find().populate('generatedBy project');
};

// Function to get a report by ID
const getReportById = async (id) => {
    const report = await Report.findById(id).populate('generatedBy project');
    if (!report) {
        throw new Error('Report not found');
    }
    return report;
};

// Function to update a report
const updateReport = async (id, updates) => {
    const report = await Report.findByIdAndUpdate(id, updates, { new: true }).populate('generatedBy project');
    if (!report) {
        throw new Error('Report not found');
    }
    return report;
};

// Function to delete a report
const deleteReport = async (id) => {
    const result = await Report.findByIdAndDelete(id);
    if (!result) {
        throw new Error('Report not found');
    }
    return result;
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport
};
