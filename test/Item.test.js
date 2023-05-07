const Item = artifacts.require("Item");

contract("Item", (accounts) => {
  let item;

  beforeEach(async () => {
    item = await Item.new();
  });

  it("should mint an item to the specified address", async () => {
    const recipient = accounts[1];
    await item.mintItem(recipient);
    const balance = await item.balanceOf(recipient);
    assert.equal(balance.toString(), "1");
  });
});
