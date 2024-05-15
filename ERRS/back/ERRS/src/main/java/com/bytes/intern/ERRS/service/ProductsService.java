package com.bytes.intern.ERRS.service;


import java.util.List;

import com.bytes.intern.ERRS.DTO.ProductsDto;
import com.bytes.intern.ERRS.model.Product;


public interface ProductsService {

	public Product addProduct(ProductsDto productDto);
	public long getProductCount();
	public List<Product> getProductList();
	public void deleteProduct(Long merchId);
	public List<Product> getRecentProductList();
	public Product updateProduct(ProductsDto productDto);
	

}
