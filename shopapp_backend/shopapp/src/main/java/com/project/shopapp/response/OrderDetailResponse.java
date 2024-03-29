package com.project.shopapp.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.shopapp.model.OrderDetail;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Min;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@Builder
public class OrderDetailResponse {
    @JsonProperty("order_id")
    private long orderId;

    @JsonProperty("product_id")
    private long productId;

    private float price;

    @JsonProperty("number_of_product")
    private int numberOfProduct;

    @JsonProperty("total_money")
    private float totalMoney;

    private String color;

    public static OrderDetailResponse convertToOrderDetail(OrderDetail orderDetail){
        return OrderDetailResponse.builder()
                .orderId(orderDetail.getOrder().getId())
                .productId(orderDetail.getProduct().getId())
                .price(orderDetail.getPrice())
                .numberOfProduct(orderDetail.getNumberOfProducts())
                .totalMoney(orderDetail.getTotalMoney())
                .color(orderDetail.getColor())
                .build();
    }
}
