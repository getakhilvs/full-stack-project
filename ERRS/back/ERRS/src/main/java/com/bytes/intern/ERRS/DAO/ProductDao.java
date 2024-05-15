package com.bytes.intern.ERRS.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.bytes.intern.ERRS.model.Product;

public interface ProductDao extends JpaRepository<Product, Long> {

	@Modifying
	@Query(value="UPDATE product SET ismerch_deleted='true' where merch_id=:merchId", nativeQuery = true) //?1 is a positional parameter plaeholder indicating the first parameter
	void deleteStatusById(Long merchId);
	
	@Query(value="select * from product where ismerch_deleted='false' order by merch_id",nativeQuery=true)
	List<Product> findProducts(); //this sends 
	
	@Query(value="SELECT * FROM product where ismerch_deleted='false' ORDER BY merch_id DESC LIMIT 3   ",nativeQuery=true)
	List<Product> findRecentProducts();
	
	@Modifying
	@Query(value="UPDATE product SET merch_quantity = CASE WHEN merch_quantity > 0 THEN merch_quantity - 1 ELSE 0 END,merch_status = CASE WHEN merch_quantity > 1 THEN 'In Stock' ELSE 'Out of Stock' END WHERE merch_id = :merchId", nativeQuery = true)
	void updateProduct(Long merchId);

	Product findByMerchName(String merchName);

	Product findByMerchImage(byte[] decodedImage);

	Product findByMerchSINO(int merchSINO);

	
}
