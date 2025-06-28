// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/api/product.service";

// لعرض كل المنتجات
export const useProducts = () => {
  return useQuery(["products"], getProducts);
};

// لعرض منتج محدد
export const useProduct = (id: string) => {
  return useQuery(["product", id], () => getProductById(id), {
    enabled: !!id,
  });
};

// لإنشاء منتج جديد
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

// لتحديث منتج
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, product }: { id: string; product: any }) =>
      updateProduct(id, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
};

// لحذف منتج
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};


// import React from 'react';
// import { useProducts, useDeleteProduct } from '@/hooks/useProducts';

// export default function ProductsList() {
//   const { data: products, isLoading, error } = useProducts();
//   const deleteMutation = useDeleteProduct();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading products</p>;

//   return (
//     <div>
//       {products.map((product: any) => (
//         <div key={product.id}>
//           <h3>{product.name}</h3>
//           <button onClick={() => deleteMutation.mutate(product.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }
