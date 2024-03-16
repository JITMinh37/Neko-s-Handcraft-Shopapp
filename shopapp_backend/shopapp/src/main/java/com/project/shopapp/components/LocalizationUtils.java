package com.project.shopapp.components;

import com.project.shopapp.utils.WebUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;


@Component
@RequiredArgsConstructor
public class LocalizationUtils {
    private final MessageSource messageSource; //  một interface trong Spring Framework được sử dụng để lấy các thông báo đa ngôn ngữ (i18n) trong ứng dụng.
    private final LocaleResolver localeResolver; // một interface để xác định locale (ngôn ngữ và quốc gia) trong ứng dụng.
    public String getLocalizedMessage(String message, Object...params){
        HttpServletRequest request = WebUtils.getCurrentRequest(); // Lấy ra các thuộc tính của request hiện tại bao gồm  'Accept-Language': 'vi'
        Locale locale = localeResolver.resolveLocale(request); // Xác định ngôn ngữ của request
        return messageSource.getMessage(message, params, locale); // Đưa ra thông báo message dựa trên locale
    }
}
