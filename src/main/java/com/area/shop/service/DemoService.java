package com.area.shop.service;

import com.area.shop.repository.DemoRep;
import com.area.shop.domain.Demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * demo service
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class DemoService {

    @Autowired
    private DemoRep demoRep;

    /**
     * demo
     */
    public String demo(String name) {
        return "hello world: "+ name;
    }

    public void saveDemo(Demo demo) throws Exception {
        demoRep.save(demo);
        //throw new Exception("测试会滚");
    }

    public Page<Demo> findDemoPage(int page, int size){
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        Pageable pageable = new PageRequest(page, size, sort);
        return demoRep.findAll(pageable);
    }
}
