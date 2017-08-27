package com.area.shop.framework;

/**
 * 业务异常
 */
public class ServiceException extends RuntimeException {

    private static Integer UN_AUTH = 403;
    private static String UN_AUTH_MSG = "无权访问！";

    private static Integer UN_REPEAT = 401;
    private static String UN_REPEAT_MSG = "请求过于频繁！";
    /**
     * 错误编码
     */
    private Integer errorCode;

    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * 无权访问异常
     */
    public static ServiceException ofUnAuth(){
        return new ServiceException(UN_AUTH, UN_AUTH_MSG);
    }

    /**
     * 请求过于频繁
     */
    public static ServiceException ofRepeat(){
        return new ServiceException(UN_REPEAT, UN_REPEAT_MSG);
    }

    /**
     * 构造一个基本异常.
     *
     * @param message 信息描述
     */
    public ServiceException(String message) {
        super(message);
    }

    /**
     * 构造一个基本异常.
     *
     * @param errorCode 错误编码
     * @param message   信息描述
     */
    public ServiceException(Integer errorCode, String message) {
        this(message);
        setErrorCode(errorCode);
    }


}
