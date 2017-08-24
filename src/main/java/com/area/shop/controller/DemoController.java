package com.area.shop.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * demo controller
 */
@Controller
@RequestMapping
public class DemoController {

    private static final Logger logger = LoggerFactory.getLogger(DemoController.class);

    /**
     * 测试
     */
    @RequestMapping(value = "/index")
    public String index() {
        logger.info("测试 hello world!");
        return "hello world!";
    }


}
