const Doctor = require('../models/doctorModel');
const ResponseHandler = require('../utils/responseHandler');

exports.createDoctor = async (req, res, next) => {
    try {
        // Basic validation handled by middleware, robust checks here
        const { full_name, email, mobile, medical_council_reg_no } = req.body;

        // Could check duplicates here

        const newDoctor = await Doctor.create(req.body);
        ResponseHandler.created(res, newDoctor, 'Medical officer commissioned successfully');
    } catch (error) {
        next(error);
    }
};

exports.getAllDoctors = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const doctors = await Doctor.findAll(limit, offset);
        const total = await Doctor.count();

        ResponseHandler.success(res, {
            doctors,
            pagination: { total, page, pages: Math.ceil(total / limit) }
        }, 'Medical personnel roster retrieved');
    } catch (error) {
        next(error);
    }
};

exports.getDoctorById = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return ResponseHandler.notFound(res, 'Medical officer not found in database');
        }
        ResponseHandler.success(res, doctor, 'Doctor profile retrieved');
    } catch (error) {
        next(error);
    }
};
