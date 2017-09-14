package com.area.shop.controller;

import com.area.shop.domain.Demo;
import com.area.shop.service.DemoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * hello controller
 */
@Controller
@RequestMapping(value = "/hello")
public class HelloController {

    private static final Logger logger = LoggerFactory.getLogger(HelloController.class);

    @RequestMapping
    public String hello(Map<String,Object> map) {
        map.put("name", "张三");
        return "hello";
    }

}
