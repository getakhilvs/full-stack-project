package com.bytes.intern.ERRS.service.serviceImpl;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bytes.intern.ERRS.DAO.ProductDao;
import com.bytes.intern.ERRS.DAO.TransactionDebitDao;
import com.bytes.intern.ERRS.DTO.ProductsDto;
import com.bytes.intern.ERRS.model.Product;
import com.bytes.intern.ERRS.service.ProductsService;

import jakarta.transaction.Transactional;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    ProductDao productDao;

    @Autowired
    TransactionDebitDao transactionDebitDao;

    @Override
    public Product addProduct(ProductsDto productDto) {
        
        Product existingProductBySINO = productDao.findByMerchSINO(productDto.getMerchSINO());
        if (existingProductBySINO != null) {
            return null; 
        }
        
        Product product = new Product();
        product.setMerchName(productDto.getMerchName());
        product.setMerchSINO(productDto.getMerchSINO());
        product.setMerchDescription(productDto.getMerchDescription());
        product.setMerchCategory(productDto.getMerchCategory());
        product.setMerchManufacturer(productDto.getMerchManufacturer());
        product.setMerchQuantity(productDto.getMerchQuantity());
        product.setMerchCost(productDto.getMerchPoints());
        product.setMerchRedemptionConditions(productDto.getMerchRedemptionConditions());
        
        
        String base64DataWithoutPrefix = productDto.getBase64Image().replaceFirst("data:image/png;base64,", "");
        byte[] decodedImage = Base64.getMimeDecoder().decode(base64DataWithoutPrefix);
        product.setMerchImage(decodedImage);
        
        product.setMerchStatus("In Stock");

        return productDao.save(product); // Save and return the new product
    }


    @Override
    public List<Product> getProductList() {
        return productDao.findProducts();
    }
    @Override
    public List<Product> getRecentProductList() {
        return productDao.findRecentProducts();
    }
    @Override
    public long getProductCount() {
        return transactionDebitDao.count();
    }

    @Transactional
    public void deleteProduct(Long merchId) {
        productDao.deleteStatusById(merchId);
    }

    @Override
    public Product updateProduct(ProductsDto productDto) {
        Product existingProduct = productDao.findById(productDto.getmerchId()).orElse(null);

        if (existingProduct == null) {
            return null; 
        }

        existingProduct.setMerchName(productDto.getMerchName());
        existingProduct.setMerchDescription(productDto.getMerchDescription());
        existingProduct.setMerchCategory(productDto.getMerchCategory());
        existingProduct.setMerchManufacturer(productDto.getMerchManufacturer());
        existingProduct.setMerchQuantity(productDto.getMerchQuantity());
        existingProduct.setMerchCost(productDto.getMerchPoints());
        existingProduct.setMerchRedemptionConditions(productDto.getMerchRedemptionConditions());

        if (productDto.getBase64Image() != null && !productDto.getBase64Image().isEmpty()) {
            String base64DataWithoutPrefix = productDto.getBase64Image().replaceFirst("data:image/png;base64,", "");
            byte[] decodedImage = Base64.getMimeDecoder().decode(base64DataWithoutPrefix);
            existingProduct.setMerchImage(decodedImage);
        }

        
        return productDao.save(existingProduct);
    }


}
