import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getAllProducts } from "../api";
import { HiCurrencyRupee } from "../assets/icons";
import { DataTable } from "../components";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setAllProducts } from "../context/actions/productActions";


const DBItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  console.log(products);
  
  return (

    <div className="flex items-center justify-self-center gap4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="flex text-{1rem} font-semibold text-textColor ">
                <HiCurrencyRupee className=" text-red-400 " />{parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data = {products}
        title = "List of Products"
        actions={[
          {
            icon:"edit",
            tooltip: "Edit",
            onClick: (event, rowData) => {
              alert("Do you want to edit" + rowData.productName);
            },
          },
          {
            icon:"delete",
            tooltip: "Delete",
            onClick: (event, rowData) => {
              if (
                window.confirm("Are you sure, you want to perform this aciton")
              ) {
                deleteAProduct(rowData.productId).then((res) => {
                  dispatch(alertSuccess("Product Deleted "));
                  setInterval(() => {
                    dispatch(alertNULL());
                  }, 3000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
