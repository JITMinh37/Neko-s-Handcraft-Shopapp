package com.project.shopapp.repository;

import com.project.shopapp.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name); // Kiểm tra name có tồn tại hay không
    Page<Product> findAll(Pageable pageable);//phân trang

    @Modifying
    @Query("UPDATE Product p SET p.thumbnail = :thumbnailUrl where p.id = :id")
    void updateThumbnail(@Param("id") long productId, @Param("thumbnailUrl") String thumbnail);

    @Query("select p from Product p WHERE (:categoryId IS NULL or :categoryId = 0 OR p.category.id = :categoryId) " +
            "AND (:keyword IS NULL or :keyword = '' OR p.name LIKE %:keyword% OR p.description LIKE %:keyword%)")
    Page<Product> searchProducts(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            Pageable pageable
    );
}
