const braintree = require("braintree");
const Order = require("../models/order-model");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

exports.braintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, result) {
      if (err) {
        return res.status(400).json({ msg: "err in braintreeToken", err });
      }
      res.status(201).json(result);
    });
  } catch (err) {
    res.status(400).json({ msg: "Error in braintreeToken", err: err.message });
  }
};

exports.braintreePayment = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((e) => {
      total = total + e.price * e.qty;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (err, result) {
        if (err) {
          return res
            .status(400)
            .json({ msg: "Error in braintreePayment", err: err.message });
        }
        const order = new Order({
          products: cart,
          payment: result,
          buyer: req.user._id,
        });
        const newOrder = await order.save();
        res.json({ ok: true });
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Error in braintreePayment", err: err.message });
  }
};

exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: "products",
        select: "-photo",
        populate: {
          path: "category",
        },
      })
      .populate("buyer", "-password");
    res.status(200).json({ msg: "Orders fetched !", orders });
  } catch (err) {
    res.status(400).json({ msg: "Error in allOrders", err: err.message });
  }
};
