package com.area.shop.interceptor;

import com.area.shop.framework.ServiceException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

/**
 * 验证拦截器
 */
public class ValidateInterceptor extends HandlerInterceptorAdapter {

    private static final Logger LOGGER = LoggerFactory.getLogger(ValidateInterceptor.class);

//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private RedisService redisService;

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler) throws Exception {
        HandlerMethod hm = (HandlerMethod) handler;
        Method method = hm.getMethod();
        if (method.getDeclaringClass().isAnnotationPresent(RestController.class)) {
            return isAccessAllowed(httpServletRequest);
        }
        return true;
    }

    private boolean isAccessAllowed(HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("token");
        String version = httpServletRequest.getHeader("version");
        String type = httpServletRequest.getHeader("type");
        String pid = httpServletRequest.getHeader("pid");

        //验证header参数不能为空
        if (StringUtils.isBlank(token) || StringUtils.isBlank(version)
                || StringUtils.isBlank(type) || StringUtils.isBlank(pid)) {
            LOGGER.error("【token,version,type,pid】有一项或者多项为空！");
            throw ServiceException.ofUnAuth();
        }
        // todo
        //验证登录人。。。 验证重复提交。。。
        return true;
    }
}
