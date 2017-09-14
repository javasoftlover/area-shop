package com.area.shop;

import com.area.shop.domain.Demo;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.util.HashMap;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FtlTest {

    private static final Logger logger = LoggerFactory.getLogger(FtlTest.class);

    //freeMarker configuration
    @Autowired
    private Configuration configuration;

    @Test
    public void testFreeMarker() throws Exception {
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name", "张三");

        Demo demo = new Demo();
        demo.setName("李四1");

        Template t = configuration.getTemplate("hello.ftl"); // freeMarker template
        String content = FreeMarkerTemplateUtils.processTemplateIntoString(t, demo);

        logger.info("##################\n" + content);
    }
}
