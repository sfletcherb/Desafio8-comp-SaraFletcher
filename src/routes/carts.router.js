const express = require("express");
const router = express.Router();
const cartManagerInstance = require("../controllers/cartManager.js");
const CartModel = require("../models/carts.model.js");

router.get("/", async (req, res) => {
  try {
    const data = await CartModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send({ status: "404 Not Found", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManagerInstance.createCart();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cartById = await cartManagerInstance.getProductById(cartId);
    if (!cartById) {
      res.status(404).json({ error: "cart not found" });
    }
    res.status(200).json(cartById);
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const idProduct = req.params.pid;
    const quantity = req.body.quantity || 1;

    const upDateCart = await cartManagerInstance.addProductToCart(
      cartId,
      idProduct,
      quantity
    );
    res.status(200).json(upDateCart);
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const newQuantity = req.body.quantity || 1;
    const idProduct = req.params.pid;
    const cartId = req.params.cid;
    const updateCart = await cartManagerInstance.updateProductCart(
      cartId,
      idProduct,
      newQuantity
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const newArray = req.body;

    const updateCartWithArray =
      await cartManagerInstance.updateProductCartWithArray(cartId, newArray);
    res.status(200).json(updateCartWithArray);
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const idProduct = req.params.pid;

    const deleteProductInCart = await cartManagerInstance.deleteProductCart(
      cartId,
      idProduct
    );
    res.status(200).json({
      status: "success",
      message: "Product has been deleted",
      deleteProductInCart,
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    const deleteAllProductsInCart =
      await cartManagerInstance.deleteAllProductsCart(cartId);
    res.status(200).json(deleteAllProductsInCart);
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

module.exports = router;
