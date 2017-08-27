package com.area.shop.config;

import com.area.shop.interceptor.ValidateInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class SpringMVCConfig extends WebMvcConfigurerAdapter{

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getValidateInterceptor()).excludePathPatterns("/demo/**");
        //registry.addInterceptor(getVerifyRepeatInterceptor()).excludePathPatterns("/home/**");
        //registry.addInterceptor(getLoginInterceptor()).addPathPatterns("/home/**");
    }

    @Bean
    public ValidateInterceptor getValidateInterceptor() {
        return new ValidateInterceptor();
    }

}