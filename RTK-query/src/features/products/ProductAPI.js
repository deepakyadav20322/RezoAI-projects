
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

  const productAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}` }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getAllProductsWithSearch: builder.query({
            query: ({ search, sort, limit, skip }) => {
              let url = "/products";
    
              if (search) {
                url = `/products/search?q=${search}`;
              }
      
              if (sort) {
                const [sortBy, order] = sort.split("-");

                url += `${search ? "&" : "?"}sortBy=${sortBy}&order=${order}`;
              }
      
              const queryParams = [];
              if (limit) queryParams.push(`limit=${limit}`);
              if (skip) queryParams.push(`skip=${skip}`);    
             
              if (queryParams.length > 0) {
                url += `${search || sort ? "&" : "?"}${queryParams.join("&")}`;
              }
      
              return url;
            },
            transformResponse: (response) => response.products,
            providesTags: (result = [], error, arg) => 
              result.length>0
                ? [...result.map(({ id }) => ({ type: 'Product', id })), { type: 'Product', id: 'LIST' }]
                : [{ type: 'Product', id: 'LIST' }],
                cacheTime: 3, 
                refetchOnMountOrArgChange: true, 
                refetchOnFocus: true,
                refetchOnReconnect: true, 
          }),

        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
              url: 'products/add',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: newProduct,
            }),
          }),
          deleteProduct:builder.mutation({
            query:(id)=>({
              url:`/product/${id}`,
              method:'DELETE',
              headers: { 'Content-Type': 'application/json' },
              
            })
            , invalidatesTags: [{ type: 'Product', id: 'LIST' }]
            
          })  
      
    }),
  })

  export const { useGetAllProductsWithSearchQuery, useGetProductByIdQuery ,useAddProductMutation,useDeleteProductMutation} = productAPI;
    export default productAPI;