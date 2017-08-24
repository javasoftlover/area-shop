<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div region="north" style="height: 10%;width: 100%;overflow: hidden;">
    <div class="banner">
        <div class="logo"></div>
        <div class="logout"><a plain="true" href="logout.do">登出</a></div>
        <div class="usericon"><shiro:principal property="username"/>(<shiro:principal property="realName"/>)</div>
    </div>
</div>