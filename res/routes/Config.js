const Routes = {
  products: {
    administrator: {
      createProduct: "/products/administrator/create/newproduct",
    },
    costumers: {
      createAssessment: "/products/costumers/create/assessments",
    },
    all: {
      getProductByCategory: "/products/all/get/category",
    },
  },
};

module.exports = Routes;
