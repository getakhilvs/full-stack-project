package com.bytes.intern.ERRS.EmployeeController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.bytes.intern.ERRS.DTO.ProductsDto;
import com.bytes.intern.ERRS.DTO.TransactionDebitDto;
import com.bytes.intern.ERRS.model.Product;
import com.bytes.intern.ERRS.model.ResponseHandler;
import com.bytes.intern.ERRS.service.ProductsService;
import com.bytes.intern.ERRS.service.TransactionService;
import com.bytes.intern.ERRS.service.serviceImpl.TransactionServiceImpl;

@RestController
@RequestMapping(value="/products")
@CrossOrigin(origins = "*")
public class ProductController {
	@Autowired
	ProductsService productsService;
	
	@Autowired
	TransactionService transactionService;

	@PostMapping("/add")
	public Product addProduct(@RequestBody ProductsDto productDto) {
		return productsService.addProduct(productDto);
	}
	@PostMapping("/update")
	public Product upadateProduct(@RequestBody ProductsDto productDto) {
		return productsService.updateProduct(productDto);
	}

	@GetMapping("/getproducts")
	public List<Product> getProductList() {
		return productsService.getProductList();
	}
	@GetMapping("/getrecentproducts")
	public List<Product> getrecentProductList() {
		return productsService.getRecentProductList();
	}
	
	@PostMapping("/submitorder")
	public ResponseEntity<Object> addTransactionDebit(@RequestBody TransactionDebitDto transactionDebitDto) {
		transactionService.addTransactionDebit(transactionDebitDto);
		 return ResponseHandler.generateResponse("Successfully added to order!", HttpStatus.OK, null);
	}
	
	@GetMapping("/getproductcount")
	public long getProductCount() {
		return productsService.getProductCount();
	}
	
	@DeleteMapping("/delete/{merchId}")
	public ResponseEntity<Object> deleteProduct(@PathVariable Long merchId) {
	    productsService.deleteProduct(merchId);
	    return ResponseHandler.generateResponse("Successfully deleted the product!", HttpStatus.OK, null);
	}
	
}
