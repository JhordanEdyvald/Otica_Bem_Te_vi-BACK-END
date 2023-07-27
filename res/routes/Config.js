const Routes = {
  products: {
    administrator: {
      createProduct: "/products/administrator/create/newproduct",
    },
    customers: {
      createCustomer: "/customer/all/create/newcustomer",
      createAssessment: "/products/costumers/create/assessments",
    },
    all: {
      getProductByCategory: "/products/all/get/category",
    },
  },
};

module.exports = Routes;
