const Order = require("../models/Order");


const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Details of state sent for placing order ----> ", (req.body));
    const data = {
      userId,
      ...req.body,
    };

    const placedOrder = await Order.create(data);
    console.log("----------------->>>>>>>>>>> Order is placed", placedOrder);
    // res.send(placedOrder);
    res.json({
      orderId: placedOrder._id, // Sending the _id of the newly created order
      message: 'Order placed successfully',
      order: placedOrder, // You can send the entire order object if needed
    });

  } catch (error) {
    //if already order exist then return that
    console.log("Error @placing order @controller order line 17 ", error);

    res.send(error);
  }
};


const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;

  console.log("In update order ------>", req.body);

  try {
    // Find the order by orderId and update paymentStatus
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      req.body,
      { new: true } // To return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return the updated order as JSON response
    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}



const getOrderDetailsById = async (req, res) => {
  const { paymentId } = req.params;
  console.log("--------------> payment Id - ", paymentId);

  try {
    Order.findOne({ "paymentDetails.paymentId": paymentId }, (err, order) => {
      if (err) {
        console.error("Error finding order:", err);
        res.send(err);
        return;
      }
      // Order found
      console.log("Order:", order);
      res.send(order);
    });
  } catch (error) {
    console.log(
      "Error in getting order details by payment ID @ order controller"
    );
    res.send(error);
  }
};

const getAllOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    const order = await Order.find({ userId: userId });
    console.log(order.length);
    res.send(order);
  } catch (error) {
    console.log("Errpr in getting all the order details");
    res.send(error);
  }
};

module.exports = { placeOrder, getOrderDetailsById, getAllOrder, updateOrder};
