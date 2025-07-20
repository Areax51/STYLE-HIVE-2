import React from "react";
import ProductForm from "../components/ProductForm";

const CreateProductPage = () => {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">
          Create New Product
        </h2>
        <ProductForm />
      </div>
    </section>
  );
};

export default CreateProductPage;
