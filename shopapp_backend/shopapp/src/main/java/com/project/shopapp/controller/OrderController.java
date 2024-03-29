package com.project.shopapp.controller;

import com.project.shopapp.dto.OrderDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.model.Order;
import com.project.shopapp.service.IOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;
    @PostMapping("")
    public ResponseEntity<?> createOrder(
            @Valid @RequestBody OrderDTO orderDTO,
            BindingResult result
            ){
        try {
            if(result.hasErrors()){
                List<String> messageError = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(messageError);
            }
            Order order = orderService.createOrder(orderDTO);
            return ResponseEntity.ok().body(order);
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }
    @GetMapping("user/{user_id}")
    public ResponseEntity<?> getOrderByUserId(
            @Valid @PathVariable("user_id") Long userId
    ){
        try{
            List<Order> orders = orderService.findByUserId(userId);
            return ResponseEntity.ok(orders);
        }catch(Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(
            @Valid @PathVariable("id") Long id
    ){
        try{
            Order order = orderService.getOrderById(id);
            return ResponseEntity.ok(order);
        }catch(Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(
            @Valid @PathVariable long id,
            @Valid @RequestBody OrderDTO orderDTO, //order được cập nhật dựa trên id.
            BindingResult result
    ){
        try {
            if(result.hasErrors()){
                List<String> messageError = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(messageError);
            }
            Order order = orderService.updateOrder(id,orderDTO);
            return ResponseEntity.ok("Update succesfully with order "+ order);
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(
            @Valid @PathVariable long id
    ) throws DataNotFoundException {
        // Xóa mềm => cập nhật trường active => false.
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Delete successfully");
    }
}
