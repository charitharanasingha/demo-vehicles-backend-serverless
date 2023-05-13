const service = require('./dealer.service');   

exports.getDealers = async function (req, res, next) {
    try {
        const dealers = await service.getDealers()
        return res.status(200).json(dealers);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}