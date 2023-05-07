const MyContract = artifacts.require("MyContract");

contract("MyContract", (accounts) => {
    let myContract;

    beforeEach(async () => {
        myContract = await MyContract.deployed();
    });

    it("initially has no stored number", async () => {
        const storedNumber = await myContract.getNumber();
        assert.equal(storedNumber, 0, "Initial stored number should be 0");
    });

    it("sets and gets a stored number", async () => {
        const testNumber = 42;
        await myContract.setNumber(testNumber);
        const storedNumber = await myContract.getNumber();
        assert.equal(storedNumber, testNumber, "Stored number should match the test number");
    });
});
