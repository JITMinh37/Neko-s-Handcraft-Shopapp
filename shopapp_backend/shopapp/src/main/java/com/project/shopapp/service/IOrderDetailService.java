package com.project.shopapp.service;

import com.project.shopapp.dto.OrderDTO;
import com.project.shopapp.dto.OrderDetailDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.model.OrderDetail;
import com.project.shopapp.response.OrderDetailResponse;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail createOrderDetail(OrderDetailDTO orderDTO) throws DataNotFoundException;
    OrderDetail getOrderDetailById(long id) throws DataNotFoundException;
    List<OrderDetail> getOrderDetailByOrderId(long orderId) throws DataNotFoundException;
    OrderDetail updateOrderDetail(long id, OrderDetailDTO orderDetailDTO) throws DataNotFoundException;
    void deleteOrderDetail(long id) throws DataNotFoundException;
}
