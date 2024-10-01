import assert from 'assert'; // If you still use assert
import expect from 'chai';  // Use import for Chai
import makePayment from './3-payment.js'; // Change extension if necessary


describe('sendPaymentRequestToApi', () => {
  let spy;

  beforeEach(() => {
    // Create a spy for Utils.calculateNumber
    spy = sinon.spy(Utils, 'calculateNumber');
  });

  afterEach(() => {
    // Restore the original function after each test
    spy.restore();
  });

  it('should call Utils.calculateNumber with SUM, 100, and 20', () => {
    sendPaymentRequestToApi(100, 20);

    // Check that Utils.calculateNumber was called with the correct arguments
    expect(spy.calledOnceWithExactly('SUM', 100, 20)).to.be.true;
  });

  it('should log the correct total', () => {
    const consoleSpy = sinon.spy(console, 'log');

    sendPaymentRequestToApi(100, 20);

    expect(consoleSpy.calledOnceWithExactly('The total is: 120')).to.be.true;

    consoleSpy.restore(); // Restore console.log after test
  });
});
