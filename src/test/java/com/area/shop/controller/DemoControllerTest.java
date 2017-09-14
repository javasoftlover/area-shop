package com.area.shop.controller;

import com.area.shop.domain.Demo;
import net.sf.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.BitSet;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by finup on 2017/8/24.
 */

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DemoControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(DemoControllerTest.class);

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup() {
        mvc = MockMvcBuilders.webAppContextSetup(context).build();
    }


    @Test
    public void demo() throws Exception {
        logger.info("测试controller...");
        RequestBuilder request =get("/demo/say")
                .contentType(MediaType.APPLICATION_JSON_UTF8);
        mvc.perform(request).andExpect(status().isOk()).andDo(print());
    }

    @Test
    public void page() throws Exception {
        RequestBuilder request =get("/demo/0/10/page")
                .contentType(MediaType.APPLICATION_JSON_UTF8);
        mvc.perform(request).andExpect(status().isOk()).andDo(print());
    }

    @Test
    public void saveDemo() throws Exception {
        Demo demo = new Demo();
        demo.setName("李四");
        demo.setAge(10);

        RequestBuilder request =post("/demo/save")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(JSONObject.fromObject(demo).toString());
        mvc.perform(request).andExpect(status().isOk()).andDo(print());
    }
}
