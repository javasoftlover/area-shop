package com.area.shop.controller;

import com.area.shop.domain.Demo;
import com.area.shop.service.DemoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

/**
 * demo controller
 */
@RestController
@RequestMapping(value = "/demo")
public class DemoController {

    private static final Logger logger = LoggerFactory.getLogger(DemoController.class);

    @Autowired
    private DemoService demoService;

    /**
     * 测试
     */
    @RequestMapping(value = "/say")
    public String say() {
        String say = demoService.demo("张三");
        logger.info(say);
        return say;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void save(@RequestBody Demo demo){
        demoService.saveDemo(demo);
    }

    @RequestMapping(value = "/{page}/{size}/page", method = RequestMethod.GET)
    public Page<Demo> findPage(@PathVariable(name = "page") int page, @PathVariable(name = "size") int size){
        Page<Demo> demoPage = demoService.findDemoPage(page, size);
        return demoPage;
    }
}
