package com.area.shop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.oauth2.OAuth2AutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
//@ComponentScan(value = "com.area")
@ServletComponentScan
public class MainApplication extends SpringBootServletInitializer implements DisposableBean {
    private static final Logger log = LoggerFactory.getLogger(MainApplication.class);
    private static ConfigurableApplicationContext ctx;


    public static void main(String[] args) {
        ctx = SpringApplication.run(MainApplication.class, args);
        for (String str : ctx.getEnvironment().getActiveProfiles()) {
            log.info(str);
        }
        log.info("Boot Server started.");
    }

    @Override
    public void destroy() throws Exception {
        if (null != ctx && ctx.isRunning()) {
            ctx.close();
        }
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MainApplication.class);
    }
}
