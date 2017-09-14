package com.area.shop.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;

/**
 * geo 操作类
 */
public class GeoUtils {


    public static void main(String[] args) {
        String latitude = "39.92032300581961";
        String longitude = "116.4280194380897";
        BufferedReader in = null;
        try {
            URL tirc = new URL("http://api.map.baidu.com/geocoder?location="+ latitude+","+longitude+"&output=json&key="+"E4805d16520de693a3fe707cdc962045");
            in = new BufferedReader(new InputStreamReader(tirc.openStream(),"UTF-8"));
            String res;
            StringBuilder sb = new StringBuilder("");
            while((res = in.readLine())!=null){
                sb.append(res.trim());
            }
            String str = sb.toString();
            //System.out.println(str);
            ObjectMapper mapper = new ObjectMapper();
            if(StringUtils.isNotEmpty(str)){
                JsonNode jsonNode = mapper.readTree(str);
                jsonNode.findValue("status").toString();
                JsonNode resultNode = jsonNode.findValue("result");
                JsonNode locationNode = resultNode.findValue("formatted_address");
                System.out.println(locationNode);
            }

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
