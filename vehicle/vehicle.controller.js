const service = require('./vehicle.service');   

exports.getVehiclesByDealer = async function (req, res, next) {
    try {
        const vehicles = await service.getVehiclesByDealer(req.params.bac)
        return res.status(200).json(vehicles);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}