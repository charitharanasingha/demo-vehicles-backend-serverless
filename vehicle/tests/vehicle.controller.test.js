const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const service = require("../vehicle.service");
const controller = require("../vehicle.controller");
const mockData = require("./data/vehicles.json");

describe("Vehicle Controller", function () {
  describe("getVehiclesByDealer", function () {
    it("should return the list of vehicles", async function () {
      // Arrange
      const vehicles = mockData;
      const req = { params: { bac: "122345" } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();
      sinon.stub(service, "getVehiclesByDealer").resolves(vehicles);

      // Act
      await controller.getVehiclesByDealer(req, res, next);

      // Assert
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(vehicles)).to.be.true;
      expect(next.notCalled).to.be.true;

      // Clean up
      service.getVehiclesByDealer.restore();
    });

    it("should return an error message when the service throws an error", async function () {
      // Arrange
      const errorMessage = "Something went wrong";
      const req = { params: { bac: "122345" } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();
      sinon
        .stub(service, "getVehiclesByDealer")
        .throws(new Error(errorMessage));

      // Act
      await controller.getVehiclesByDealer(req, res, next);

      // Assert
      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(res.json.calledOnceWith({ status: 400, message: errorMessage })).to
        .be.true;
      expect(next.notCalled).to.be.true;

      // Clean up
      service.getVehiclesByDealer.restore();
    });
  });
});
