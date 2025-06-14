import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiStar, FiEye, FiX } from "react-icons/fi";
import ProductForm from "./ProductForm";
import { motion, AnimatePresence } from "framer-motion";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [heroProducts, setHeroProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    const mockProducts = [
      {
        id: 1,
        name: "Silk Abaya",
        price: 189.99,
        category: "Abayas",
        featured: true,
        stock: 15,
      },
      {
        id: 2,
        name: "Embroidered Hijab",
        price: 49.99,
        category: "Hijabs",
        featured: true,
        stock: 32,
      },
    ];
    setProducts(mockProducts);
    setHeroProducts(mockProducts.filter((p) => p.featured).slice(0, 9));
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleFeatured = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProducts(updated);
    setHeroProducts(updated.filter((p) => p.featured).slice(0, 9));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-900">
          Products Management
        </h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
        >
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>

      {/* Hero Products Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">
          Featured Hero Products (Max 9)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {heroProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="border border-amber-200 rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-amber-700">${product.price}</p>
              </div>
              <button
                onClick={() => toggleFeatured(product.id)}
                className="text-amber-600 hover:text-amber-800 p-1 transition-colors duration-200"
              >
                <FiStar
                  className={
                    product.featured ? "fill-amber-500 text-amber-500" : ""
                  }
                />
              </button>
            </motion.div>
          ))}
          {heroProducts.length < 9 && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border-2 border-dashed border-amber-300 rounded-lg p-3 flex items-center justify-center text-amber-600 hover:bg-amber-50 cursor-pointer transition-colors duration-200"
            >
              <span>Select more products</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <motion.tr
                  key={product.id}
                  whileHover={{ backgroundColor: "rgba(254, 243, 199, 0.3)" }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-md"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={`p-1 rounded-full transition-colors duration-200 ${
                        product.featured ? "text-amber-500" : "text-gray-400"
                      }`}
                    >
                      <FiStar
                        className={product.featured ? "fill-amber-500" : ""}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white/30 min-h-screen backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="fixed inset-0 flex items-center min-h-screen justify-center z-50 p-4"
            >
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-amber-900">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <ProductForm
                  product={editingProduct}
                  onClose={() => setShowForm(false)}
                  onSave={(product) => {
                    if (editingProduct) {
                      setProducts(
                        products.map((p) => (p.id === product.id ? product : p))
                      );
                    } else {
                      setProducts([
                        ...products,
                        { ...product, id: products.length + 1 },
                      ]);
                    }
                    setShowForm(false);
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsManager;
