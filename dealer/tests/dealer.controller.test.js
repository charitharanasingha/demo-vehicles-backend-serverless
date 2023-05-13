const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const service = require('../dealer.service');
const controller = require('../dealer.controller');
const mockData = require('./data/dealers.json');

describe('Dealer Controller', function () {
  describe('getDealers', function () {
    it('should return the list of dealers', async function () {
      // Arrange
      const dealers = mockData;
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const next = sinon.stub();
      sinon.stub(service, 'getDealers').resolves(dealers);

      // Act
      await controller.getDealers(req, res, next);

      // Assert
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(dealers)).to.be.true;
      expect(next.notCalled).to.be.true;

      // Clean up
      service.getDealers.restore();
    });

    it('should return an error message when the service throws an error', async function () {
      // Arrange
      const errorMessage = 'Something went wrong';
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const next = sinon.stub();
      sinon.stub(service, 'getDealers').throws(new Error(errorMessage));

      // Act
      await controller.getDealers(req, res, next);

      // Assert
      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(res.json.calledOnceWith({ status: 400, message: errorMessage })).to.be.true;
      expect(next.notCalled).to.be.true;

      // Clean up
      service.getDealers.restore();
    });

    
  });
});
