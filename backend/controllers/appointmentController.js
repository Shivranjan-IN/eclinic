const Appointment = require('../models/appointmentModel');
const ResponseHandler = require('../utils/responseHandler');

exports.createAppointment = async (req, res, next) => {
    try {
        const { appointment_id, patient_id, doctor_id, appointment_date } = req.body;

        if (!appointment_id || !patient_id || !doctor_id || !appointment_date) {
            return ResponseHandler.badRequest(res, 'Missing flight parameters for rendezvous');
        }

        const newAppointment = await Appointment.create(req.body);
        ResponseHandler.created(res, newAppointment, 'Rendezvous confirmed');
    } catch (error) {
        next(error);
    }
};

exports.getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.findAll();
        ResponseHandler.success(res, appointments, 'Scheduled encounters retrieved');
    } catch (error) {
        next(error);
    }
};

exports.getAppointmentById = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return ResponseHandler.notFound(res, 'Encounter coordinates not found');
        }
        ResponseHandler.success(res, appointment, 'Rendezvous details accessed');
    } catch (error) {
        next(error);
    }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        if (!status) return ResponseHandler.badRequest(res, 'Status update required');

        const updated = await Appointment.updateStatus(req.params.id, status);
        if (!updated) {
            return ResponseHandler.notFound(res, 'Rendezvous target lost');
        }
        ResponseHandler.updated(res, updated, 'Encounter status recalibrated');
    } catch (error) {
        next(error);
    }
};
