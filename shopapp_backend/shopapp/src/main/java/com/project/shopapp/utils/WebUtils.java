package com.project.shopapp.utils;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class WebUtils {
    public static HttpServletRequest getCurrentRequest() { // ấy ra đối tượng HttpServletRequest đang được xử lý trong ngữ cảnh của request hiện tại trong ứng dụng web.
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }
    // RequestContextHolder.currentRequestAttributes() trả về các thuộc tính của request hiện tại, được lưu trữ trong một đối tượng RequestAttributes.
    // getRequest() trên ServletRequestAttributes để lấy ra đối tượng HttpServletRequest.
}
