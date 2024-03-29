package com.project.shopapp.service;

import com.project.shopapp.dto.OrderDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.model.Order;
import com.project.shopapp.model.OrderStatus;
import com.project.shopapp.model.User;
import com.project.shopapp.repository.OrderRepository;
import com.project.shopapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService{
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    @Override
    public Order createOrder(OrderDTO orderDTO) {
        try {
            User user = userRepository.findById(orderDTO.getUserId())
                    .orElseThrow(()-> new DataNotFoundException("Cannot find user with id " + orderDTO.getUserId()));
            // Convert orderDTO => Order
            // dùng thư viện ModelMapper để ánh xạ
            modelMapper.typeMap(OrderDTO.class, Order.class)
                    .addMappings(mapper -> mapper.skip(Order::setId));
            Order order = new Order();
            modelMapper.map(orderDTO, order);
            order.setUser(user);
            order.setOrderDate(LocalDate.now());
            order.setStatus(OrderStatus.PENDING);

            // Kiểm tra shipping date >= ngày hôm nay
            LocalDate shippingDate = orderDTO.getShippingDate() == null ? LocalDate.now() : orderDTO.getShippingDate();
            if(shippingDate.isBefore(LocalDate.now())){
                throw new DataNotFoundException("Date must be at least today !");
            }
            order.setShippingDate(shippingDate);
            order.setActive(true);
            orderRepository.save(order);
            return order;
        } catch (DataNotFoundException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Order getOrderById(long id) throws DataNotFoundException {

            return orderRepository.findById(id)
                    .orElseThrow(()->new DataNotFoundException("Cannot find order with id "+ id));

    }

    @Override
    public List<Order> findByUserId(Long userId) throws DataNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(()->new DataNotFoundException(("Cannot find user with user's id "+userId)));
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order updateOrder(long id, OrderDTO orderDTO) throws DataNotFoundException {
        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(()->new DataNotFoundException("Cannot find user with user's id " + orderDTO.getUserId()));
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("Cannot find order with order's id "+ id));
        modelMapper.typeMap(OrderDTO.class, Order.class)
                .addMappings(mapper -> mapper.skip(Order::setId));
        modelMapper.map(orderDTO, existingOrder);
        existingOrder.setUser(user);
        orderRepository.save(existingOrder);
        return existingOrder;
    }

    @Override
    public void deleteOrder(long id) throws DataNotFoundException {
        Order order = orderRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("Cannot find order's with id "+ id));
        order.setActive(false);
        orderRepository.save(order);
    }
}
